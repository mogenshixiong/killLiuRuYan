<script setup lang="ts">
import useStore from '@/stores/stores'

const store = useStore()
interface Props {
  text: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div v-if="store.userConfig.userConfig.theme === 'work'">
    <van-button type="default">{{ props.text }}</van-button>
  </div>
  <div v-else-if="store.userConfig.userConfig.theme === 'wow'" class="primaryButton">
    <div class="text-gold">{{ props.text }}</div>
  </div>
</template>

<style scoped>
.text-gold {
  color: #d0aa00;
  font-weight: bold;
  font-family: 'Microsoft YaHei';
  font-size: 16px;
  letter-spacing: 1px;
  -webkit-text-stroke: 0.1px black;
  user-select: none;
  background: -webkit-linear-gradient(270deg, #d2b30e 0%, #ff7757 100%);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.primaryButton {
  display: inline-block;
  text-align: center;
  padding: 3px 20px;
  background: -webkit-linear-gradient(180deg, #630200, #660100, #590100);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(180deg, #630200, #660100, #590100);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: rgb(248, 183, 0);
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
  -webkit-text-stroke: 0.1px black;
  border: 1px solid #4c5750;
}
</style>
