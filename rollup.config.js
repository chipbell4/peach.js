import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/peach.js',
  output: {
    file: 'peach.js',
    format: 'iife',
    name: 'Peach'
  },
  plugins: [
    terser()
  ]
}
