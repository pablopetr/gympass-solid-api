import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths/dist'

export default defineConfig({
  plugins: [tsconfigPaths()],
})
