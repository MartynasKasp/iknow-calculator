/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
            manifest: {
                id: '/',
                name: 'iKNOW Calculator',
                short_name: 'iKNOW Calc',
                description: 'Keeps score in the iKNOW board game, so you can keep playing.',
                theme_color: '#603AFB',
                background_color: '#16161c',
                start_url: '/?utm_source=a2hs',
                scope: '/',
                display: 'standalone',
                icons: [
                    { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
                    { src: '/img/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
                    { src: '/img/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                    {
                        src: '/img/icons/android-chrome-maskable-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/img/icons/android-chrome-maskable-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                navigateFallback: '/index.html',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 3000,
        host: true,
    },
    preview: {
        port: 3000,
    },
    test: {
        environment: 'node',
    },
});
