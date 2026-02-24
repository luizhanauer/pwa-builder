import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/pwa-builder/",
  plugins: [tailwindcss(), vue()],
  test: {
    environment: 'jsdom', // Simula um navegador para testar Canvas e Componentes Vue
    globals: true         // Permite usar describe, it, expect sem importar sempre
  }
});
