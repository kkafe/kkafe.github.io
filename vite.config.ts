import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base './' : le site fonctionne aussi bien sur kkafe.github.io que dans un sous-dossier
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // Le fichier des points du globe pèse un peu : on relève le seuil d'avertissement
  build: { chunkSizeWarningLimit: 800 },
});
