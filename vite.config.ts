import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import xmlParser from './plugins/xml-parser/rollup-plugin-xml-parser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), xmlParser()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.xml'],
  },
});
