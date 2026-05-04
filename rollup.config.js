import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'peach.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    typescript({
      declaration: false,
    }),
    terser()
  ]
};
