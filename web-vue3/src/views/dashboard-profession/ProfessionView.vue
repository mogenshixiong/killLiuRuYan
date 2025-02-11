<script setup lang="ts">
const onClickBack = () => history.back()
// const zhuan_ye = ref([
//   { name: 'lian jin shu', path: '/lianjin', icon: 'shopping-cart-o' },
//   { name: 'kao gu xue', path: '/kaogu', icon: 'shopping-cart-o' },
//   { name: 'duan zao', path: '/kaogu', icon: 'shopping-cart-o' },
//   { name: 'peng ren', path: '/pengren', icon: 'shopping-cart-o' },
//   { name: 'fu mo', path: '/pengren', icon: 'shopping-cart-o' },
//   { name: 'gong cheng xue', path: '/pengren', icon: 'shopping-cart-o' },
//   { name: 'ji jiu', path: '/bengdai', icon: 'wap-home-o' },
//   { name: 'diao yu', path: '/diaoyu', icon: 'apps-o' },
//   { name: 'fei xing', path: '/diaoyu', icon: 'apps-o' },
//   { name: 'cao yao xue', path: '/pengren', icon: 'shopping-cart-o' },
//   { name: 'ming wen', path: '/pengren', icon: 'shopping-cart-o' },
//   { name: 'zhu bao jia gong', path: '/pengren', icon: 'shopping-cart-o' },
//   { name: 'zhi pi', path: '/lianjin', icon: 'shopping-cart-o' },
//   { name: 'cai kuang', path: '/lianjin', icon: 'shopping-cart-o' },
//   { name: 'qi shu', path: '/lianjin', icon: 'shopping-cart-o' },
//   { name: 'bo pi', path: '/lianjin', icon: 'shopping-cart-o' },
//   { name: 'cai feng', path: '/lianjin', icon: 'shopping-cart-o' }
// ])
</script>
<template>
  <div>
    <van-nav-bar :title="`profession`" left-arrow @click-left="onClickBack" />
    <van-back-top bottom="80px" immediate />
  </div>
</template>

<style scoped></style>
