<script lang="ts" setup>
import { t } from '@/i18n'
import PrimaryButton from '@/components/button/primaryButton/PrimaryButton.vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
// const toPage = () => {
//   router.push('/chat')
// }
</script>

<template>
  <div class="b-page">
    <div class="dashboard-view-item" style="padding-bottom: 4px; position: relative">
      <PrimaryButton
        style="position: absolute; right: 3px; top: 3px; padding-top: 0; padding-bottom: 0"
        text="进入"
      />
      <div class="text-gold" style="margin-top: -2px; transform: translateY(-1px)">
        {{ t('LoggingCamp') }}
      </div>
      <div style="margin-top: 3px">1</div>
    </div>
  </div>
</template>

<style scoped lang="less">
// .b-page {
//   min-height: calc(100vh - 10px);
//   padding-top: 10px;
// }
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
.dashboard-view-item {
  /* display: flex; */
  /* gap: 8px; */
  /* min-height: 80px; */
  padding: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 8px;
  /* background-image: url('@/assets/img/4.jpg'); */
  background-color: #1a150e;
  background-size: 100% auto;
  background-position: 0px -45px;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* border: 2px solid #8c690f;
  border: 2px solid #5f5a58; */
  border: 2px solid #373737;
}
</style>
