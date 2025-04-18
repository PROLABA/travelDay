import { defineConfig } from 'vite';
import vitePugPlugin from 'vite-plugin-pug-transformer';
import pugPlugin from 'vite-plugin-pug';
// import { ViteSvgIconsPlugin } from 'vite-plugin-svg-icons';
// import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path, { resolve } from 'path';

const root = resolve(__dirname, 'src');
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    build: {
        emptyOutDir: true,
        outDir: './dist',
        rollupOptions: {
            input: {
                index: resolve('index.html'),
                404: resolve(root, 'pages', '404', 'index.html'),
                about: resolve(root, 'pages', 'about-company', 'index.html'),
                answers: resolve(root, 'pages', 'answers-questions', 'index.html'),
                cart: resolve(root, 'pages', 'cart', 'index.html'),
                cartBlankData: resolve(root, 'pages', 'cart-blank-data', 'index.html'),
                cartBlankSelect: resolve(root, 'pages', 'cart-blank-select-place', 'index.html'),
                cartOrder: resolve(root, 'pages', 'cart-order', 'index.html'),
                cartPayError: resolve(root, 'pages', 'cart-pay-error', 'index.html'),
                cartPaySuccess: resolve(root, 'pages', 'cart-pay-success', 'index.html'),
                contacts: resolve(root, 'pages', 'contacts', 'index.html'),
                discounts: resolve(root, 'pages', 'discounts', 'index.html'),
                discountsDetail: resolve(root, 'pages', 'discounts-detail', 'index.html'),
                excursionDetail: resolve(root, 'pages', 'excursion-detail', 'index.html'),
                main: resolve(root, 'pages', 'main', 'index.html'),
                privacy: resolve(root, 'pages', 'privacy-policy', 'index.html'),
                ui: resolve(root, 'pages', 'ui', 'index.html')
            },
            output: {
                assetFileNames: assetInfo => {
                    const name = assetInfo.name || 'unknown';
                    if (name.endsWith('.css')) {
                        return 'assets/css/[name][extname]';
                    } else if (
                        name.endsWith('.jpg') ||
                        name.endsWith('.png') ||
                        name.endsWith('.webp') ||
                        name.endsWith('.svg')
                    ) {
                        return 'assets/img/[name][extname]';
                    } else {
                        return 'assets/[name][extname]';
                    }
                },
                entryFileNames: 'assets/js/[name].js',
                chunkFileNames: 'assets/js/[name].js'
            }
        }
    },
    plugins: [
        vitePugPlugin({}),
        pugPlugin({
            localImports: true,
            alias: {
                '~/src': path.resolve(__dirname, './src/')
            }
        } as any),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'icon-[dir]-[name]'
        })
    ]
});
