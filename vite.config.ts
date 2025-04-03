/*
 * @Author: weisheng
 * @Date: 2023-03-21 22:49:24
 * @LastEditTime: 2025-04-01 18:10:42
 * @LastEditors: ‘baifeirong’ ‘963015343@qq.com’
 * @Description:
 * @FilePath: \wot-starter\vite.config.ts
 * 记得注释
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  base: './',
  plugins: [
    uni(),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          from: 'uni-mini-router',
          imports: ['createRouter', 'useRouter', 'useRoute'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/store', 'src/components/common'],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
      },
    }),
  ],
})
