import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import autoPreprocess from 'svelte-preprocess';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import { injectManifest } from 'rollup-plugin-workbox';

const production = !process.env.ROLLUP_WATCH;

const SRC_DIR = 'src';
const BUILD_DIR = 'public';

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: `${SRC_DIR}/main.ts`,
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
      preprocess: sveltePreprocess(),
      compilerOptions: {
        dev: !production,
      },
    }),
    typescript({ sourceMap: !production, inlineSourceMap: false }),
    commonjs(),
    css({ output: 'bundle.css' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'production'
      ),
      preventAssignment: true,
    }),
    injectManifest({
      globDirectory: BUILD_DIR,
      globPatterns: [
        'manifest.json',
        'assets/icons/*.png',
        'assets/icons/*.svg',
        'favicon.svg',
        'global.css',
        'index.html',
      ],
      mode: 'production',
      swDest: `${BUILD_DIR}/serviceWorker.js`,
      swSrc: `${SRC_DIR}/serviceWorker.js`,
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    json(),

    !production && serve(),

    !production && livereload('public'),
    production && terser({ compress: true }),
  ],
  output: {
    sourcemap: !production,
    format: 'iife',
    file: `${BUILD_DIR}/build/bundle.js`,
  },
};
