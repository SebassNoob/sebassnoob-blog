import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import { xmlParser, mdHmr } from './plugins';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '.',
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
    target: 'es2020'
  },
});
