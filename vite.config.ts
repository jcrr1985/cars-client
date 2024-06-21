import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dotenv from "dotenv";
import reactRefresh from "@vitejs/plugin-react-refresh";

dotenv.config({ path: resolve(__dirname, ".env") });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  define: {
    "process.env": process.env,
  },
});
