import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import packageJson from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh()
  ],
  define: {
    '__ENV__':JSON.stringify('default'),
    __VERSION__:JSON.stringify(packageJson.version)
  }
})
