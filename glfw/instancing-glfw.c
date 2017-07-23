//------------------------------------------------------------------------------
//  instancing-glfw.c
//  Instanced rendering, static geometry vertex- and index-buffers,
//  dynamically updated instance-data buffer.
//------------------------------------------------------------------------------
#define HANDMADE_MATH_IMPLEMENTATION
#define HANDMADE_MATH_NO_SSE
#include "HandmadeMath.h"
#define GLFW_INCLUDE_NONE
#include "GLFW/glfw3.h"
#include "flextgl/flextGL.h"
#define SOKOL_IMPL
#define SOKOL_USE_GLCORE33
#include "sokol_gfx.h"

const int WIDTH = 800;
const int HEIGHT = 600;
const int MAX_PARTICLES = 512 * 1024;
const int NUM_PARTICLES_EMITTED_PER_FRAME = 10;

/* vertex shader uniform block */
typedef struct {
    hmm_mat4 mvp;
} vs_params_t;

/* particle positions and velocity */
int cur_num_particles = 0;
hmm_vec3 pos[MAX_PARTICLES];
hmm_vec3 vel[MAX_PARTICLES];

int main() {

    /* create window and GL context via GLFW */
    glfwInit();
    glfwWindowHint(GLFW_SAMPLES, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    GLFWwindow* w = glfwCreateWindow(WIDTH, HEIGHT, "Sokol Instancing GLFW", 0, 0);
    glfwMakeContextCurrent(w);
    glfwSwapInterval(1);
    flextInit(w);

    /* setup sokol_gfx */
    sg_desc desc; 
    sg_init_desc(&desc);
    sg_setup(&desc);
    assert(sg_isvalid());
    assert(sg_query_feature(SG_FEATURE_INSTANCED_ARRAYS));

    /* prepeare a draw state, static geometry vertex buffer will go into slot 0,
       instance vertex buffer goes into slot 1 */
    sg_draw_state draw_state;
    sg_init_draw_state(&draw_state);

    /* vertex buffer for static geometry (goes into bind slot 0) */
    const float r = 0.05f;
    const float vertices[] = {
        // positions            colors
        0.0f,   -r, 0.0f,       1.0f, 0.0f, 0.0f, 1.0f,
           r, 0.0f, r,          0.0f, 1.0f, 0.0f, 1.0f,
           r, 0.0f, -r,         0.0f, 0.0f, 1.0f, 1.0f,
          -r, 0.0f, -r,         1.0f, 1.0f, 0.0f, 1.0f,
          -r, 0.0f, r,          0.0f, 1.0f, 1.0f, 1.0f,
        0.0f,    r, 0.0f,       1.0f, 0.0f, 1.0f, 1.0f
    };
    sg_buffer_desc buf_desc;
    sg_init_buffer_desc(&buf_desc);
    buf_desc.size = sizeof(vertices);
    buf_desc.data_ptr = vertices;
    buf_desc.data_size = sizeof(vertices);
    draw_state.vertex_buffers[0] = sg_make_buffer(&buf_desc);

    /* index buffer for static geometry */
    const uint16_t indices[] = {
        0, 1, 2,    0, 2, 3,    0, 3, 4,    0, 4, 1,
        5, 1, 2,    5, 2, 3,    5, 3, 4,    5, 4, 1
    };
    sg_init_buffer_desc(&buf_desc);
    buf_desc.type = SG_BUFFERTYPE_INDEXBUFFER;
    buf_desc.size = sizeof(indices);
    buf_desc.data_ptr = indices;
    buf_desc.data_size = sizeof(indices);
    draw_state.index_buffer = sg_make_buffer(&buf_desc);
    
    /* empty, dynamic instance-data vertex buffer (goes into bind slot 1) */
    sg_init_buffer_desc(&buf_desc);
    buf_desc.size = MAX_PARTICLES * sizeof(hmm_vec4);
    buf_desc.usage = SG_USAGE_STREAM;
    draw_state.vertex_buffers[1] = sg_make_buffer(&buf_desc);

    /* create a shader */
    sg_shader_desc shd_desc;
    sg_init_shader_desc(&shd_desc);
    sg_init_uniform_block(&shd_desc.vs.ub[0], sizeof(vs_params_t));
    sg_init_named_uniform(&shd_desc.vs.ub[0].u[0], "mvp", offsetof(vs_params_t, mvp), SG_UNIFORMTYPE_MAT4, 1);
    shd_desc.vs.source =
        "#version 330\n"
        "uniform mat4 mvp;\n"
        "in vec3 position;\n"
        "in vec4 color0;\n"
        "in vec3 instance_pos;\n"
        "out vec4 color;\n"
        "void main() {\n"
        "  vec4 pos = vec4(position + instance_pos, 1.0);"
        "  gl_Position = mvp * pos;\n"
        "  color = color0;\n"
        "}\n";
    shd_desc.fs.source =
        "#version 330\n"
        "in vec4 color;\n"
        "out vec4 frag_color;\n"
        "void main() {\n"
        "  frag_color = color;\n"
        "}\n";
    sg_id shd = sg_make_shader(&shd_desc);

    /* pipeline state object, note the vertex attribute definition */
    sg_pipeline_desc pip_desc;
    sg_init_pipeline_desc(&pip_desc);
    sg_pipeline_desc_named_attr(&pip_desc, 0, "position", SG_VERTEXFORMAT_FLOAT3);
    sg_pipeline_desc_named_attr(&pip_desc, 0, "color0", SG_VERTEXFORMAT_FLOAT4);
    sg_pipeline_desc_named_attr(&pip_desc, 1, "instance_pos", SG_VERTEXFORMAT_FLOAT3);
    sg_pipeline_desc_enable_instancing(&pip_desc, 1);
    pip_desc.shader = shd;
    pip_desc.index_type = SG_INDEXTYPE_UINT16;
    pip_desc.depth_stencil.depth_compare_func = SG_COMPAREFUNC_LESS_EQUAL;
    pip_desc.depth_stencil.depth_write_enabled = true;
    pip_desc.rast.cull_face_enabled = true;
    draw_state.pipeline = sg_make_pipeline(&pip_desc);

    /* default pass action (clear to grey) */
    sg_pass_action pass_action;
    sg_init_pass_action(&pass_action);

    /* view-projection matrix */
    hmm_mat4 proj = HMM_Perspective(60.0f, (float)WIDTH/(float)HEIGHT, 0.01f, 50.0f);
    hmm_mat4 view = HMM_LookAt(HMM_Vec3(0.0f, 1.5f, 12.0f), HMM_Vec3(0.0f, 0.0f, 0.0f), HMM_Vec3(0.0f, 1.0f, 0.0f));
    hmm_mat4 view_proj = HMM_MultiplyMat4(proj, view);

    /* draw loop */
    vs_params_t vs_params;
    float roty = 0.0f;
    const float frame_time = 1.0f / 60.0f;
    while (!glfwWindowShouldClose(w)) {
        /* emit new particles */
        for (int i = 0; i < NUM_PARTICLES_EMITTED_PER_FRAME; i++) {
            if (cur_num_particles < MAX_PARTICLES) {
                pos[cur_num_particles] = HMM_Vec3(0.0, 0.0, 0.0);
                vel[cur_num_particles] = HMM_Vec3(
                    ((float)(rand() & 0xFFFF) / 0xFFFF) - 0.5f,
                    ((float)(rand() & 0xFFFF) / 0xFFFF) * 0.5f + 2.0f,
                    ((float)(rand() & 0xFFFF) / 0xFFFF) - 0.5f);
                cur_num_particles++;
            }
            else {
                break;
            }
        }

        /* update particle positions */
        for (int i = 0; i < cur_num_particles; i++) {
            vel[i].Y -= 1.0f * frame_time;
            pos[i].X += vel[i].X * frame_time;
            pos[i].Y += vel[i].Y * frame_time;
            pos[i].Z += vel[i].Z * frame_time;
            if (pos[i].Y < -2.0f) {
                pos[i].Y = -1.8f;
                vel[i].Y = -vel[i].Y;
                vel[i].X *= 0.8f; vel[i].Y *= 0.8f; vel[i].Z *= 0.8f;
            }
        }

        /* update instance data */
        sg_update_buffer(draw_state.vertex_buffers[1], pos, cur_num_particles*sizeof(hmm_vec3));

        /* model-view-projection matrix */
        roty += 1.0f;
        vs_params.mvp = HMM_MultiplyMat4(view_proj, HMM_Rotate(roty, HMM_Vec3(0.0f, 1.0f, 0.0f)));;

        sg_begin_pass(SG_DEFAULT_PASS, &pass_action, WIDTH, HEIGHT);
        sg_apply_draw_state(&draw_state);
        sg_apply_uniform_block(SG_SHADERSTAGE_VS, 0, &vs_params, sizeof(vs_params));
        sg_draw(0, 24, cur_num_particles);
        sg_end_pass();
        sg_commit();
        glfwSwapBuffers(w);
        glfwPollEvents();
    }

    /* cleanup */
    sg_destroy_pipeline(draw_state.pipeline);
    sg_destroy_shader(shd);
    sg_destroy_buffer(draw_state.index_buffer);
    sg_destroy_buffer(draw_state.vertex_buffers[0]);
    sg_destroy_buffer(draw_state.vertex_buffers[1]);
    sg_shutdown();
    glfwTerminate();
}