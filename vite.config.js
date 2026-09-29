import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    server: {
        watch: {
            // Tell Vite to never reload the page when db.json updates
            ignored: ['**/db.json'],
        },
    },
})
