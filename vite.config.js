import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" debe coincidir con el nombre del repositorio en GitHub
// para que GitHub Pages encuentre los archivos en /nextpixel-games-eft/
export default defineConfig({
  plugins: [react()],
  base: '/nextpixel-games-eft/',
});
