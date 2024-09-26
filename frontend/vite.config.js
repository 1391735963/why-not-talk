import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    // 项目插件
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    // 基础配置
    base: "./",
    publicDir: "public",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "@border-color-base": "#dce3e8",
          },
          javascriptEnabled: true,
        },
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      brotliSize: false,
      sourcemap: false,
      minify: "terser",
      rollupOptions: {
        output: {
          format: "es", // 输出格式为 ES 模块
        },
      },
      terserOptions: {
        compress: {
          // 生产环境去除console及debug
          drop_console: false,
          drop_debugger: true,
        },
      },
    },
  };
});
