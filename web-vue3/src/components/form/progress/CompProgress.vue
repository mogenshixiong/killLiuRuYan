<script lang="ts" setup>
interface Props {
  progress: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div
    :style="{ '--progress-width': props.progress }"
    class="h-0.5 absolute top-0 left-0 bg-[#148eff] z-[calc(var(--van-nav-bar-z-index)+1)] w-[calc(var(--progress-width))]"
  ></div>
</template>
