import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE = '/react-3d-model-viewer-demo/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    // 开发时在 base 路径下提供 public 文件，使 /react-3d-model-viewer-demo/models/xxx 可访问
    {
      name: 'serve-public-under-base',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0] ?? ''
          if (!url.startsWith(BASE)) return next()
          const subpath = url.slice(BASE.length).replace(/^\//, '')
          const file = path.join(__dirname, 'public', subpath)
          if (fs.existsSync(file) && fs.statSync(file).isFile()) {
            res.setHeader('Content-Type', getMime(subpath))
            fs.createReadStream(file).pipe(res)
            return
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

function getMime(p: string): string {
  if (p.endsWith('.glb') || p.endsWith('.gltf')) return 'model/gltf-binary'
  if (p.endsWith('.svg')) return 'image/svg+xml'
  if (p.endsWith('.json')) return 'application/json'
  return 'application/octet-stream'
}
