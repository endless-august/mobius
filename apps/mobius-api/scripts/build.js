/* eslint-disable */
const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/index.ts'],
    outdir: 'build',
    bundle: true,
    platform: 'node',
    tsconfig: 'tsconfig.json',
    minify: true,
});
