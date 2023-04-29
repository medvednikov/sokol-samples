/*
    Experimental build description for https://github.com/floooh/fibs

    (please ignore for now)
*/
import * as fibs from 'https://raw.githubusercontent.com/floooh/fibs/main/mod.ts'

type Sample = {
    name: string,
    ext: 'c' | 'cc' | 'm' | 'mm',
    libs: string[],
    type: ('metal' | 'glfw' | 'emsc' | 'd3d11' | 'sapp')[],
    ui?: 'c' | 'cc',
    shd?: boolean,
};

const samples: Sample[] = [
    { name: 'arraytex',             ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'binshader',            ext: 'c',                       libs: [], type: ['metal','d3d11'] },
    { name: 'blend',                ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'bufferoffsets',        ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'clear',                ext: 'c', ui: 'cc',             libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'cube',                 ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'dyntex',               ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'imgui',                ext: 'cc',                      libs: ['imgui'], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'inject',               ext: 'c',                       libs: [], type: ['metal','glfw','emsc','d3d11'] },
    { name: 'instancing',           ext: 'c',                       libs: [], type: ['metal','glfw','emsc','d3d11'] },
    { name: 'mipmap',               ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'mrt',                  ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'multiwindow',          ext: 'c',                       libs: [], type: ['glfw'] },
    { name: 'noninterleaved',       ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc', 'sapp'] },
    { name: 'offscreen',            ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'quad',                 ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'releasetest',          ext: 'c',                       libs: [], type: ['metal'] },
    { name: 'texcube',              ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'triangle',             ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['metal','glfw','emsc','d3d11','sapp'] },
    { name: 'uniformarrays',        ext: 'c',                       libs: [], type: ['glfw'] },
    { name: 'shadows',              ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'mrt-pixelformats',     ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'tex3d',                ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'uvwrap',               ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'uniformtypes',         ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'events',               ext: 'cc',                      libs: ['imgui'], type: ['sapp'] },
    { name: 'pixelformats',         ext: 'c',           shd: true,  libs: ['cimgui'], type: ['sapp'] },
    { name: 'sgl',                  ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'sgl-lines',            ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'sgl-points',           ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'sgl-context',          ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'cubemaprt',            ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'sdf',                  ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'shapes',               ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'shapes-transform',     ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'primtypes',            ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'debugtext',            ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'debugtext-printf',     ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'debugtext-userfont',   ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'debugtext-context',    ext: 'c', ui: 'cc', shd: true,  libs: [], type: ['sapp'] },
    { name: 'debugtext-layers',     ext: 'c', ui: 'cc',             libs: [], type: ['sapp'] },
    { name: 'saudio',               ext: 'c',                       libs: [], type: ['sapp'] },
    { name: 'icon',                 ext: 'c',                       libs: [], type: ['sapp'] },
    { name: 'droptest',             ext: 'c',                       libs: ['cimgui'], type: ['sapp'] },
    { name: 'imgui-dock',           ext: 'cc',                      libs: ['imgui-docking'], type: ['sapp'] },
    { name: 'imgui-highdpi',        ext: 'cc',                      libs: ['imgui'], type: ['sapp']},
    { name: 'cimgui',               ext: 'c',                       libs: ['cimgui'], type: ['sapp'] },
    { name: 'imgui-usercallback',   ext: 'c',           shd: true,  libs: ['cimgui'], type: ['sapp'] },
    { name: 'imgui-perf',           ext: 'c',                       libs: ['cimgui'], type: ['sapp'] },
    { name: 'sgl-microui',          ext: 'c', ui: 'c',              libs: ['microui'], type: ['sapp'] },
    { name: 'nuklear',              ext: 'c', ui: 'cc',             libs: ['nuklear'], type: ['sapp'] },
    { name: 'nuklear-images',       ext: 'c', ui: 'cc',             libs: ['nuklear'], type: ['sapp'] },
    { name: 'loadpng',              ext: 'c', ui: 'cc', shd: true,  libs: ['stb', 'fileutil'], type: ['sapp'] },
    { name: 'restart',              ext: 'c',           shd: true,  libs: ['stb', 'fileutil', 'libmodplug'], type: ['sapp'] },
    { name: 'plmpeg',               ext: 'c', ui: 'cc', shd: true,  libs: ['fileutil'], type: ['sapp'] },
    { name: 'cgltf',                ext: 'c', ui: 'cc', shd: true,  libs: ['basisu', 'fileutil'], type: ['sapp'] },
    { name: 'basisu',               ext: 'c', ui: 'cc',             libs: ['basisu'], type: ['sapp'] },
];

const extraJobs: {[key: string]: fibs.TargetJobDesc[] } = {
    'loadpng': [{
        job: 'copyfiles',
        args: { srcDir: '@targetsources:data', files: [ 'baboon.png' ] },
    }],
    'restart': [{
        job: 'copyfiles',
        args: { srcDir: '@targetsources:data', files: [ 'baboon.png', 'comsi.s3m' ] },
    }],
    'plmpeg': [{
        job: 'copyfiles',
        args: { srcDir: '@targetsources:data', files: [ 'bjork-all-is-full-of-love.mpg'] },
    }],
    'cgltf': [{
        job: 'copyfiles',
        args: {
            srcDir: '@targetsources:data/gltf/DamagedHelmet',
            files: [
                'DamagedHelmet.bin',
                'DamagedHelmet.gltf',
                'Default_albedo.basis',
                'Default_AO.basis',
                'Default_emissive.basis',
                'Default_metalRoughness.basis',
                'Default_normal.basis',
            ],
        },
    }],
    'basisu': [{
        job: 'embedfiles',
        args: {
            dir: '@targetsources:data/basisu',
            files: [ 'testcard.basis', 'testcard_rgba.basis' ],
            outHeader: '@targetbuild:basisu-assets.h',
        },
    }]
}

const sappEnabled = (ctx: fibs.Context) => ctx.config.name.startsWith('sapp-');
const glfwEnabled = (ctx: fibs.Context) => ctx.config.name.startsWith('glfw-');
const metalEnabled = (ctx: fibs.Context) => ctx.config.name.startsWith('metal-');
const d3d11Enabled = (ctx: fibs.Context) => ctx.config.name.startsWith('d3d11-');
const emscEnabled = (ctx: fibs.Context) => ctx.config.name.startsWith('emsc-');
const sappJobs = (sample: Sample) => [
    sample.shd ? { job: 'sokolshdc', args: { src: `${sample.name}-sapp.glsl` } } : undefined,
    ...(extraJobs[sample.name] !== undefined) ? extraJobs[sample.name] : [undefined],
];

export const project: fibs.ProjectDesc = {
    name: 'sokol-samples',
    imports: [
        {
            name: 'libs',
            url: 'https://github.com/floooh/fibs-libs',
            import: [
                'sokol.ts',
                'imgui.ts',
                'cimgui.ts',
                'imgui-docking.ts',
                'glfw3.ts',
                'microui.ts',
                'nuklear.ts',
                'libmodplug.ts',
            ],
        },
        {
            name: 'utils',
            url: 'https://github.com/floooh/fibs-utils',
            import: [ 'stdoptions.ts', 'sokolshdc.ts', 'copyfiles.ts', 'embedfiles.ts' ],
        }
    ],
    includeDirectories: () => [ 'libs' ],
    configs: [
        // use these configs to build the samples under metal/
        { name: 'metal-macos-ninja-debug',      inherits: 'macos-ninja-debug' },
        { name: 'metal-macos-ninja-release',    inherits: 'macos-ninja-release' },
        { name: 'metal-macos-make-debug',       inherits: 'macos-make-debug' },
        { name: 'metal-macos-make-release',     inherits: 'macos-make-release' },
        { name: 'metal-macos-vscode-debug',     inherits: 'macos-vscode-debug' },
        { name: 'metal-macos-vscode-release',   inherits: 'macos-vscode-release' },
        { name: 'metal-macos-xcode-debug',      inherits: 'macos-xcode-debug' },
        { name: 'metal-macos-xcode-release',    inherits: 'macos-xcode-release' },
        // use these configs to build the samples under d3d11/
        { name: 'd3d11-win-vstudio-debug',      inherits: 'win-vstudio-debug' },
        { name: 'd3d11-win-vstudio-release',    inherits: 'win-vstudio-release' },
        // use these configs to build the samples under glfw/
        { name: 'glfw-macos-ninja-debug',       inherits: 'macos-ninja-debug' },
        { name: 'glfw-macos-ninja-release',     inherits: 'macos-ninja-release' },
        { name: 'glfw-macos-make-debug',        inherits: 'macos-make-debug' },
        { name: 'glfw-macos-make-release',      inherits: 'macos-make-release' },
        { name: 'glfw-macos-vscode-debug',      inherits: 'macos-vscode-debug' },
        { name: 'glfw-macos-vscode-release',    inherits: 'macos-vscode-release' },
        { name: 'glfw-macos-xcode-debug',       inherits: 'macos-xcode-debug' },
        { name: 'glfw-macos-xcode-release',     inherits: 'macos-xcode-release' },
        { name: 'glfw-win-vstudio-debug',       inherits: 'win-vstudio-debug' },
        { name: 'glfw-win-vstudio-release',     inherits: 'win-vstudio-release' },
        // configs to build the sokol-app samples under sapp/ for macos+metal
        { name: 'sapp-metal-macos-ninja-debug',     inherits: 'macos-ninja-debug',    compileDefinitions: { SOKOL_METAL: '1' } },
        { name: 'sapp-metal-macos-ninja-release',   inherits: 'macos-ninja-release',  compileDefinitions: { SOKOL_METAL: '1' } },
        { name: 'sapp-metal-macos-make-debug',      inherits: 'macos-make-debug',     compileDefinitions: { SOKOL_METAL: '1' } },
        { name: 'sapp-metal-macos-make-release',    inherits: 'macos-make-release',   compileDefinitions: { SOKOL_METAL: '1' } },
        { name: 'sapp-metal-macos-vscode-debug',    inherits: 'macos-vscode-debug',   compileDefinitions: { SOKOL_METAL: '1' } },
        { name: 'sapp-metal-macos-vscode-release',  inherits: 'macos-vscode-release', compileDefinitions: { SOKOL_METAL: '1' } },
        { name: 'sapp-metal-macos-xcode-debug',     inherits: 'macos-xcode-debug',    compileDefinitions: { SOKOL_METAL: '1' } },
        { name: 'sapp-metal-macos-xcode-release',   inherits: 'macos-xcode-release',  compileDefinitions: { SOKOL_METAL: '1' } },
        // configs to build the sokol-app samples under sapp/ for macos+gl
        { name: 'sapp-gl-macos-ninja-debug',        inherits: 'macos-ninja-debug',    compileDefinitions: { SOKOL_GLCORE33: '1' } },
        { name: 'sapp-gl-macos-ninja-release',      inherits: 'macos-ninja-release',  compileDefinitions: { SOKOL_GLCORE33: '1' } },
        { name: 'sapp-gl-macos-make-debug',         inherits: 'macos-make-debug',     compileDefinitions: { SOKOL_GLCORE33: '1' } },
        { name: 'sapp-gl-macos-make-release',       inherits: 'macos-make-release',   compileDefinitions: { SOKOL_GLCORE33: '1' } },
        { name: 'sapp-gl-macos-vscode-debug',       inherits: 'macos-vscode-debug',   compileDefinitions: { SOKOL_GLCORE33: '1' } },
        { name: 'sapp-gl-macos-vscode-release',     inherits: 'macos-vscode-release', compileDefinitions: { SOKOL_GLCORE33: '1' } },
        { name: 'sapp-gl-macos-xcode-debug',        inherits: 'macos-xcode-debug',    compileDefinitions: { SOKOL_GLCORE33: '1' } },
        { name: 'sapp-gl-macos-xcode-release',      inherits: 'macos-xcode-release',  compileDefinitions: { SOKOL_GLCORE33: '1' } },
        // configs to build the sokol-app samples under sapp/ for windows+d3d11
        { name: 'sapp-d3d11-win-vstudio-debug',     inherits: 'win-vstudio-debug',    compileDefinitions: { SOKOL_D3D11: '1'} },
        { name: 'sapp-d3d11-win-vstudio-release',   inherits: 'win-vstudio-release',  compileDefinitions: { SOKOL_D3D11: '1'} },
        // configs to build the sokol-app samples under sapp/ for windows+d3d11
        { name: 'sapp-gl-win-vstudio-debug',        inherits: 'win-vstudio-debug',    compileDefinitions: { SOKOL_GLCORE33: '1'} },
        { name: 'sapp-gl-win-vstudio-release',      inherits: 'win-vstudio-release',  compileDefinitions: { SOKOL_GLCORE33: '1'} },
    ],
    targets: [
        // only enable glfw3 target for glfw build configs
        {
            name: 'glfw3',
            enabled: glfwEnabled,
        },
        // sokol-app samples
        ...samples.filter((sample) => sample.type.includes('sapp')).map((sample): fibs.TargetDesc => ({
            name: `${sample.name}-sapp`,
            enabled: sappEnabled,
            type: 'windowed-exe',
            dir: 'sapp',
            sources: () => [
                `${sample.name}-sapp.${sample.ext}`,
                sample.shd ? `${sample.name}-sapp.glsl` : undefined,
            ],
            includeDirectories: { public: () => [ '@targetbuild:' ] },
            libs: () => [ 'sokol', ...sample.libs ],
            jobs: sappJobs(sample),
        })),
        ...samples.filter((sample) => sample.type.includes('sapp') && sample.ui).map((sample): fibs.TargetDesc => ({
            name: `${sample.name}-sapp-ui`,
            enabled: sappEnabled,
            type: 'windowed-exe',
            dir: 'sapp',
            sources: () => [
                `${sample.name}-sapp.${sample.ext}`,
                sample.shd ? `${sample.name}-sapp.glsl` : undefined,
            ],
            includeDirectories: { public: () => [ '@targetbuild:' ] },
            libs: () => [ 'sokol', sample.ui === 'cc' ? 'dbgui' : 'cdbgui', ...sample.libs ],
            jobs: sappJobs(sample),
            compileDefinitions: {
                private: () => ({ USE_DBG_UI: '1' })
            }
        })),
        {
            name: 'sokol',
            enabled: sappEnabled,
            type: 'lib',
            dir: 'libs/sokol',
            sources: () => [ 'sokol.c' ],
            libs: () => [ 'sokol-config' ],
        },
        {
            name: 'cdbgui',
            enabled: sappEnabled,
            type: 'lib',
            dir: 'libs/cdbgui',
            sources: () => [ 'cdbgui.c', 'cdbgui.h' ],
            libs: () => [ 'sokol', 'cimgui' ],
        },
        {
            name: 'dbgui',
            enabled: sappEnabled,
            type: 'lib',
            dir: 'libs/dbgui',
            sources: () => [ 'dbgui.cc', 'dbgui.h' ],
            libs: () => [ 'sokol', 'imgui' ],
        },
        {
            name: 'stb',
            enabled: sappEnabled,
            type: 'lib',
            dir: 'libs/stb',
            sources: () => [ 'stb_image.c', 'stb_image.h' ],
            compileOptions: {
                private: (ctx) => {
                    if (ctx.compiler !== 'msvc') {
                        return [ '-Wno-sign-conversion', '-Wno-unused-function' ]
                    } else {
                        return [];
                    }
                }
            }
        },
        {
            name: 'fileutil',
            enabled: sappEnabled,
            type: 'lib',
            dir: 'libs/util',
            sources: (ctx) => {
                if ((ctx.config.platform === 'macos') || (ctx.config.platform === 'ios')) {
                    return [ 'fileutil_osx.m', 'fileutil.h' ];
                } else {
                    return [ 'fileutil.c', 'fileutil.h' ];
                }
            }
        },
        {
            name: 'basisu',
            enabled: sappEnabled,
            type: 'lib',
            dir: 'libs/basisu',
            sources: () => [ 'sokol_basisu.cpp', 'sokol_basisu.h'],
            libs: () => [ 'sokol' ],
            compileOptions: {
                private: (ctx) => {
                    const gccClangWarnings = [ '-Wno-unused-value', '-Wno-unused-variable', '-Wno-unused-parameter', '-Wno-type-limits' ];
                    const gccWarnings = [ '-Wno-maybe-uninitialized', '-Wno-class-memaccess' ];
                    const clangWarnings = [ '-Wno-deprecated-declarations' ];
                    if (ctx.compiler === 'gcc') {
                        return [ ...gccClangWarnings, ...gccWarnings ];
                    } else if ((ctx.compiler === 'clang') || (ctx.compiler === 'appleclang')) {
                        return [ ...gccClangWarnings, ...clangWarnings ];
                    } else {
                        return [];
                    }
                }
            },
        },
        // ### d3d11 samples
        ...samples.filter((sample) => sample.type.includes('d3d11')).map((sample): fibs.TargetDesc => ({
            name: `${sample.name}-d3d11`,
            enabled: d3d11Enabled,
            type: 'windowed-exe',
            dir: 'd3d11',
            sources: () => [ `${sample.name}-d3d11.${sample.ext}`],
            libs: () => [ 'entry_d3d11', ...sample.libs ],
        })),
        {
            name: 'entry_d3d11',
            enabled: d3d11Enabled,
            type: 'lib',
            dir: 'd3d11',
            sources: () => [ 'd3d11entry.c', 'd3d11entry.h' ],
            libs: () => [ 'sokol-includes' ],
        },
        // ### Metal samples
        ...samples.filter((sample) => sample.type.includes('metal')).map((sample): fibs.TargetDesc => ({
            name: `${sample.name}-metal`,
            enabled: metalEnabled,
            type: 'windowed-exe',
            dir: 'metal',
            sources: () => [ `${sample.name}-metal.${sample.name === 'inject' ? 'mm' : sample.ext}` ],
            libs: () => [ 'entry_metal', ...sample.libs ],
        })),
        {
            name: 'entry_metal',
            enabled: metalEnabled,
            type: 'lib',
            dir: 'metal',
            sources: () => [ 'osxentry.m', 'osxentry.h', 'sokol.m' ],
            libs: (ctx) => {
                const libs = [ 'sokol-includes', '-framework Metal', '-framework MetalKit' ];
                if (ctx.config.platform === 'macos') {
                    libs.push('-framework Cocoa', '-framework QuartzCore');
                } else {
                    libs.push('-framework UIKit');
                }
                return libs;
            }
        },
        // ### emscripten samples
        ...samples.filter((sample) => sample.type.includes('emsc')).map((sample): fibs.TargetDesc => ({
            name: `${sample.name}-emsc`,
            enabled: emscEnabled,
            type: 'windowed-exe',
            dir: 'html5',
            sources: () => [ `${sample.name}-emsc.${sample.ext}` ],
            libs: () => [ 'sokol-includes', ...sample.libs ],
            linkOptions: { public: () => [ '-sUSE_WEBGL2=1', "-sMALLOC='emmalloc'" ] },
        })),
        // ### glfw samples
        ...samples.filter((sample) => sample.type.includes('glfw')).map((sample): fibs.TargetDesc => ({
            name: `${sample.name}-glfw`,
            enabled: glfwEnabled,
            type: 'plain-exe',  // not a bug
            dir: 'glfw',
            sources: () => [ `${sample.name}-glfw.${sample.ext}` ],
            libs: () => [ 'sokol-includes', 'glfw3', ...sample.libs ],
        })),
        {
            name: 'metal-glfw',
            enabled: (ctx) => glfwEnabled(ctx) && ctx.config.platform === 'macos',
            type: 'plain-exe',
            dir: 'glfw',
            sources: () => [ 'metal-glfw.m' ],
            libs: () => [ 'sokol-includes', 'glfw3', '-framework Metal', '-framework QuartzCore' ]
        },
        {
            name: 'sgl-test-glfw',
            enabled: glfwEnabled,
            type: 'plain-exe',
            dir: 'glfw',
            sources: () => [ 'sgl-test-glfw.c', 'flextgl12/flextGL.c' ],
            // suppress flextGL warnings on MSVC
            compileOptions: {
                private: (ctx) => (ctx.compiler === 'msvc') ? ['/wd4996', '/wd4152'] : []
            },
            libs: () => [ 'glfw3' ],
        }
    ],
}
