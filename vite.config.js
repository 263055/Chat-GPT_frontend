import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 80,
        host: '0.0.0.0',
        open: false,
        https: true,
        proxy: {
            '^/.*': {
                target: 'https://' + (process.env.HOST || 'localhost') + ':443',
                changeOrigin: true,
                secure: false
            }
        }
    },
    // server: {
    //     port: 5173,//端口号 aaaa 3
    //     host: true,//ip地址 或 '0.0.0.0' 或 "loaclhost"
    //     open: false, //启动后是否自动打开浏览器
    //     https: false, // 是否开启 https
    // },
})

