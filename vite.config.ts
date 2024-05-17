import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import xmlParser from './plugins/xml-parser/rollup-plugin-xml-parser';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), xmlParser(), ViteImageOptimizer()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.xml'],
  },
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/routes')) {
            return 'routes';
          }
          return 'main';
        },
      },
    },
  },
});
