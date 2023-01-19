const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['api/api.ts'],
    outdir: 'dist',
    bundle: true,
    platform: 'node',
    tsconfig: 'tsconfig_api.json',
    minify: true,
});
