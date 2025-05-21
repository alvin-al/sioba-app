import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { vercelPreset } from "@vercel/react-router/vite";
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  presets: [vercelPreset()],server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost+1-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost+1.pem')),
    },
    host: '0.0.0.0',
    port: 5173
  }
});
