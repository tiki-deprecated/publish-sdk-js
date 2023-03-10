import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';


export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/module.js',
        name: 'TikiSdk',
        exports: 'named',
        format: 'esm'
      },
      {
        dir: 'dist/bundle.js',
        exports: 'named',
        name: 'TikiSdk',
        format: 'cjs'
      }
    ],
    plugins: [
      typescript(),
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'TikiSdk',
      file: 'dist/tiki.js',
      format: 'umd'
    },
    plugins: [
      typescript(),
      commonjs() // so Rollup can convert `ms` to an ES module
    ]
  },
];
