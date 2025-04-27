import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vercelPreset } from "@vercel/react-router/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  presets: [vercelPreset()],
});
