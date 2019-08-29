import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/peach.js',
  output: {
    file: 'peach.js',
    format: 'iife',
    name: 'Peach'
  },
  plugins: [
    babel({
      presets: [
        ['@babel/preset-env', { targets: { ie: '11' } }]
      ]
    }),
    terser()
  ]
}
