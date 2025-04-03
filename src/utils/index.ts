/*
 * @Author: ‘baifeirong’ ‘963015343@qq.com’
 * @Date: 2025-04-03 11:53:04
 * @LastEditors: ‘baifeirong’ ‘963015343@qq.com’
 * @LastEditTime: 2025-04-03 11:54:24
 * @FilePath: \jtt808-admin-app\src\uitls\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
///utils/index.ts
import type { App } from 'vue'
export default {
  install(app: App) {
    const files: any = import.meta.glob('./common/*.ts', { eager: true })
    for (const path in files) {
      console.log('files[path]==', files[path])
      const module: any = files[path]
      Object.keys(module).forEach((key) => {
        console.log('key==', key)
        app.config.globalProperties['$' + key] = module[key]
      })
    }
  },
}
