<script setup lang="ts">
// import PrimaryButton1 from '@/components/button/primaryButton/PrimaryButton1.vue'

interface Props {
  text: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="relative h-[25px] inline-block w-[130px]">
    <a class="!absolute top-[6px] left-[10px] scale-150 button-red" name="这叫致敬">
      <em>
        <b>
          <i class="!font-thin">{{ props.text }}</i>
        </b>
        <span> {{ props.text }}</span>
      </em>
    </a>
  </div>
</template>

<style scoped lang="less">
a.button-red {
  user-select: none;
  position: relative;
  display: block;
  float: right;
  text-decoration: none;
  cursor: pointer;
  line-height: 21px;
  color: #ffd100;
  font-weight: bold;
  // font-size: 11px;
  font-size: 10px;
  background: url(@/assets/img/button-red.gif) left 0 no-repeat;
  padding-left: 13px;
  white-space: nowrap;
  outline: none;
  margin-left: 8px;
}

a.button-red span {
  display: block;
  position: relative;
  z-index: 5;
}

a.button-red i {
  position: absolute;
  left: -1px;
  top: 2px;
  z-index: 1;
  font-style: normal;
  color: black;
}

a.button-red em {
  display: block;
  font-style: normal;
  padding-right: 13px;
  background: url(@/assets/img/button-red.gif) right 0 no-repeat;
}

a.button-red b {
  display: block;
  position: absolute;
}

a:hover.button-red {
  color: white;
  background-position: left -21px;
}

a:hover.button-red em {
  background-position: right -21px;
}

a:active.button-red {
  background-position: left -63px;
}

a:active.button-red em {
  background-position: right -63px;
}

a:active.button-red span,
a:active.button-red i {
  left: -2px;
}

a:active.button-red-disabled i {
  left: -1px;
}

a.button-red-disabled,
a:hover.button-red-disabled {
  background-position: left -84px !important;
  color: #a0a0a0;
  cursor: default;
}

a.button-red-disabled em,
a:hover.button-red-disabled em {
  background-position: right -84px !important;
}
</style>
