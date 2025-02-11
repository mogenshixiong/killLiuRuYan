<script setup lang="ts">
import img7 from '@/assets/img/7.jpg'
import CoinComp from '@/components/form/coin/CoinComp.vue'
import useStore from '@/stores/stores'
import CompExpProgress from '@/components/form/progress/CompExpProgress.vue'
import { devLog } from '@/views/notice/devLog'

const store = useStore()
</script>

<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      color="#ffd100"
      background="#15171e"
      mode="link"
      :scrollable="true"
      style="--van-notice-bar-height: 28px"
      @click="$router.push('/notice')"
      class="cursor-pointer"
      v-if="store.userConfig.userConfig.lastReadNotice !== devLog[0].date + devLog[0].content"
      :text="`[${devLog[0].date}]:${devLog[0].content}`"
    />
    <CompExpProgress />
    <div class="dashboard-view-item">
      <div style="display: flex; gap: 10px">
        <div style="width: 40px; border-radius: 5px; overflow: hidden">
          <van-image block width="40px" height="40px" :src="img7">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            <template v-slot:error>failed</template>
          </van-image>
        </div>
        <div style="flex: 1">
          <div class="text-gold text-name">
            {{ store.userPlayer.userPlayerInfo?.nickName }}
            [LV.{{ store.userPlayer.userPlayerInfo?.stateLevel }}]
            <!-- <span>[战力.{{ store.userAttribute.userPower }}]</span> -->
          </div>
          <div class="text-gold" style="font-size: 12px">
            <CoinComp :coin="store.userPlayer.userPlayerInfo?.gold || 0" />
          </div>
        </div>
      </div>
      <div class="p-1 props-container" v-if="store.userAttribute.userAttribute">
        <div class="text-xs text-gold text-prop">
          生命值:{{ store.userAttribute.userAttribute.hp }}
        </div>
        <div class="text-xs text-gold text-prop">
          物攻:{{ store.userAttribute.userAttribute.ap }}
        </div>
        <div class="text-xs text-gold text-prop">
          物防:{{ store.userAttribute.userAttribute.ac }}
        </div>
        <div class="text-xs text-gold text-prop">
          法伤:{{ store.userAttribute.userAttribute.sfk }}
        </div>
        <div class="text-xs text-gold text-prop">
          法防:{{ store.userAttribute.userAttribute.mdef }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.text-gold {
  color: #d0aa00;
  font-weight: bold;
  font-family: 'Microsoft YaHei';
  font-size: 12px;
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
  cursor: pointer;
  padding: 4px;
  margin-bottom: 8px;
  // margin-left: 10px;
  // margin-right: 10px;
  // border-radius: 4px;
  /* background-image: url('@/assets/img/4.jpg'); */
  // background-color: #1a150e;
  background-color: #15171e;
  background-size: 100% auto;
  background-position: 0px -45px;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* border: 2px solid #8c690f;
  border: 2px solid #5f5a58; */
}
.text-name {
  font-size: 16px;
}
.props-container {
  display: flex;
  border-radius: 5px;
  margin: 3px 0;
  border: 0.5px solid white;
  border: 0.5px solid #fd1c1d;
}
.text-prop {
  flex: 1;
  text-align: center;
}
</style>
