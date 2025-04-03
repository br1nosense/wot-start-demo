/*
 * @Author: ‘baifeirong’ ‘963015343@qq.com’
 * @Date: 2025-04-03 11:35:46
 * @LastEditors: ‘baifeirong’ ‘963015343@qq.com’
 * @LastEditTime: 2025-04-03 11:39:11
 * @FilePath: \jtt808-admin-app\src\uitls\common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//手机号码屏蔽中间四位
export function maskPhone(phoneNumber) {
  // 使用正则表达式匹配手机号中间的4位数字
  if (phoneNumber) return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
//手机号码规范校验
export function isValidPhoneNumber(phoneNumber) {
  // 定义手机号码的正则表达式
  const regex = /^1[3-9]\d{9}$/
  // 使用正则表达式测试输入的电话号码
  return regex.test(phoneNumber)
}

/**
 * 创建一个防抖函数
 * @param {Function} func - 需要防抖处理的函数
 * @param {number} wait - 等待的时间，单位为毫秒
 * @param {boolean} [immediate=false] - 如果设置为 true，则立即执行函数，而不是等待
 * @returns {Function} 返回一个经过防抖处理后的新函数
 */
// debounce.js - 可以放在项目的 utils 文件夹中
export function debounce(func, wait = 500, immediate = false) {
  let timeout: number | null = null

  return function (...args) {
    const context = this
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && timeout === null

    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}
export function handleError(error) {
  console.error('API Error:', error)
  uni.showToast({ title: '服务异常，请稍后再试', icon: 'none' })
}
