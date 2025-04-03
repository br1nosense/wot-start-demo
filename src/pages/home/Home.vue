<template>
  <wd-toast></wd-toast>
  <wd-notify />
  <view class="home">
    <view class="header">
      <view class="card-swiper">
        <wd-swiper
          autoplay
          :current="4"
          custom-indicator-class="custom-indicator-class"
          custom-image-class="custom-image"
          custom-next-image-class="custom-image-prev"
          custom-prev-image-class="custom-image-prev"
          :indicator="{ type: 'dots' }"
          :list="swiperList"
          previousMargin="24px"
          nextMargin="24px"
        ></wd-swiper>
      </view>
    </view>
    <view class="main">
      <wd-grid :column="3" border clickable>
        <wd-grid-item
          use-slot
          v-for="(item, index) in chanel"
          :key="index"
          @itemclick="doNavi(item)"
        >
          <view class="grid-item">
            <!-- <image class="main-img" :src="item.image" /> -->
            <Icon
              class="main-img"
              :name="item.image"
              size="64"
              color="#666666"
            />
            <text class="main-txt">{{ item.txt }}</text>
          </view>
        </wd-grid-item>
      </wd-grid>
      <view>{{ '13729882525' }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import DemoApi from '@/api/DemoApi'
import Chanel from '@/model/Chanel'

import { useNotify, useToast } from 'wot-design-uni'
const { show: showToast, loading: showLoading, close: hideLoading } = useToast()
import { onMounted, getCurrentInstance } from 'vue'
const { proxy }: any = getCurrentInstance()
const router = useRouter()
const swiperList = ref([
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/redpanda.jpg',
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/capybara.jpg',
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/panda.jpg',
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://cdn.jsdelivr.net/npm/wot-design-uni-assets/meng.jpg',
])

const chanel = ref<Chanel[]>([
  {
    image: 'vehicle.png',
    txt: '车辆管理',
    path: '/pages/vehicle/list',
  },
  {
    image: 'location.png',
    txt: '实时定位',
    path: '/pages/location/realtime',
  },
  {
    image: 'alarm.png',
    txt: '报警信息',
    path: '/pages/alarm/list',
  },
  {
    image: 'video.png',
    txt: '视频监控',
    path: '/pages/video/index',
  },
  {
    image: 'track.png',
    txt: '历史轨迹',
    path: '/pages/track/history',
  },
  {
    image: 'control.png',
    txt: '车辆控制',
    path: '/pages/control/panel',
  },
])

/**
 * 跳转至对应功能页面
 */
function doNavi(item: Chanel) {
  router.push({ path: item.path })
}

/**
 * 初始化
 */
function doInit(abortRequest: 'same' | 'all' | 'none' = 'none') {
  showLoading({ loadingType: 'ring', msg: '初始化' })
  DemoApi.init(abortRequest)
    .then((resp) => {
      hideLoading()
      chanel.value = resp.data || []
    })
    .catch((error) => {
      hideLoading()
      // 判断如果是取消的请求则不提示
      if (axios.isCancel(error)) {
        return
      }
      showToast({
        msg: error.msg,
        iconName: 'error',
      })
    })
}
</script>

<style lang="scss" scoped>
.home {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  width: 100vw;
  box-sizing: border-box;
  background: #fff;
  padding: 0 24rpx 24rpx;
  .header {
    margin-bottom: 24rpx;
    .card-swiper {
      --wot-swiper-radius: 0;
      --wot-swiper-item-padding: 0 24rpx;
      --wot-swiper-nav-dot-color: #e7e7e7;
      --wot-swiper-nav-dot-active-color: #4d80f0;
      padding-bottom: 24rpx;
      // :deep(.custom-indicator-class) {
      //   bottom: -16px;
      // }
      :deep(.custom-image) {
        border-radius: 12rpx;
      }
      :deep(.custom-image-prev) {
        height: 168px !important;
      }
    }
  }
  .main {
    &-img {
      width: 80rpx;
      height: 80rpx;
      margin-bottom: 16rpx;
    }
    &-txt {
      font-size: 24rpx;
      color: #333;
      font-weight: 500;
    }
    .grid-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24rpx 0;
      background-color: #4d80f0;
    }
  }
}
</style>
