import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import xmlParser from './plugins/xml-parser/rollup-plugin-xml-parser';
import mdHmr from './plugins/md-hmr/vite-plugin-md-hmr';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    xmlParser(),
    ViteImageOptimizer(),
    mdHmr(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.xml'],
  },
  base: '/',
  build: {
    target: 'es2020',
  },
});
