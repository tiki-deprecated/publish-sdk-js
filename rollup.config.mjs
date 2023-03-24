/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssReporter from "postcss-reporter";
import stylelint from "stylelint";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/module.js",
        name: "TikiSdk",
        exports: "named",
        format: "esm",
      },
      {
        file: "dist/bundle.js",
        exports: "named",
        name: "TikiSdk",
        format: "cjs",
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: ["babel-plugin-transform-html-import-to-string"],
        extensions: [".js", ".html"],
        babelHelpers: "bundled",
      }),
      postcss({
        plugins: [
          stylelint(),
          postcssPresetEnv(),
          //cssnano(),
          postcssReporter(),
        ],
      }),
      //terser(),
      typescript(),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      name: "TikiSdk",
      file: "dist/index.js",
      format: "umd",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: ["babel-plugin-transform-html-import-to-string"],
        extensions: [".js", ".html"],
        babelHelpers: "bundled",
      }),
      postcss({
        plugins: [
          stylelint(),
          postcssPresetEnv(),
          //cssnano(),
          postcssReporter(),
        ],
      }),
      //terser(),
      typescript(),
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },
  {
    input: "src/index.ts",
    output: {
      name: "TikiSdk",
      file: "example/dist/index.js",
      format: "umd",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: ["babel-plugin-transform-html-import-to-string"],
        extensions: [".js", ".html"],
        babelHelpers: "bundled",
      }),
      postcss({
        plugins: [
          stylelint(),
          postcssPresetEnv(),
          //cssnano(),
          postcssReporter(),
        ],
      }),
      //terser(),
      typescript(),
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },
];
