import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true, // Enable polling for file changes
        },
        host: true, // Allow access from the network (optional)
    },
});