
export default {
  input: 'src/index.js',
  plugins: [],
  external: ['@rollup/pluginutils', 'istanbul-lib-instrument' ],
  output: [
    {
      format: 'cjs',
      file: 'index.js'
    },
    {
      format: 'es',
      file: 'index.mjs'
    }
  ]
};
