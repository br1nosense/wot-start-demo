<!--
 * @Author: ‘baifeirong’ ‘963015343@qq.com’
 * @Date: 2025-04-01 15:41:12
 * @LastEditors: ‘baifeirong’ ‘963015343@qq.com’
 * @LastEditTime: 2025-04-02 15:09:05
 * @FilePath: \wot-starter-main\src\components\common\Icon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <image
    v-if="isImage"
    :src="iconSrc"
    :style="[
      {
        width: size + 'rpx',
        height: size + 'rpx',
        color: color,
      },
      customStyle,
    ]"
    :class="['icon', customClass]"
    @click="onClick"
  />
  <text
    v-else
    :class="['icon', customClass]"
    :style="[
      {
        color: color,
        fontSize: size + 'rpx',
      },
      customStyle,
    ]"
    @click="onClick"
    >{{ name }}</text
  >
</template>

<script lang="ts" setup>
import { computed } from 'vue'

/* 将静态资源的图片导入vue中 */
const getImageUrl = (name: string): string => {
  try {
    return new URL(`/src/static/icons/${name}`, import.meta.url).href
  } catch (error) {
    console.error('Invalid image path:', name)
    return ''
  }
}
interface Props {
  name: string // 图标名称
  size?: string // 图标大小
  color?: string // 图标颜色(仅对内置图标生效)
  customStyle?: object // 自定义样式
  customClass?: string // 自定义类名
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  size: '32', // 默认大小为32rpx
  color: '#333',
  customStyle: () => ({}),
  customClass: '',
})

// const getStaticIcon = (name: string, type: string = 'png') => {
//   const path = `/static/icons/${name}.${type}`
//   const modules = import.meta.glob('/static/icons/*', {
//     eager: true,
//   })
//   return modules[path].default
// }

const emit = defineEmits(['click'])

// 判断是否为图片图标
const isImage = computed(() => {
  const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i
  return imageRegex.test(props.name)
})

// 获取图标路径
const iconSrc = computed(() => {
  if (props.name.indexOf('/') === 0) {
    // 绝对路径
    console.log(props.name)
    return props.name
  } else {
    // 默认从 static/icon 目录读取
    const path =
      props.name.indexOf('.') !== -1 ? props.name : `${props.name}.svg`
    console.log(getImageUrl(`/static/icons/${props.name}`))
    return `/static/icons/${path}`
  }
})

// 点击事件
const onClick = (event: any) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
}
</style>
