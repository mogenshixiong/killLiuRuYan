<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.beforeRouteEnter(to, from)
    })
  }
})
</script>
<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/layout/NavBar/NavBar.vue'
import { t } from '@/i18n'
import AboutContent from '@/views/about/AboutContent.vue'

const headerShow = ref(false)
const beforeRouteEnter = async (to: any, from: any) => {
  if (from.path === '/login') {
    console.log(to, from)
    headerShow.value = false
  } else {
    headerShow.value = true
  }
}
defineExpose({ beforeRouteEnter })
</script>

<template>
  <div class="bg-white min-h-dvh">
    <NavBar :title="t('about')" v-if="headerShow" />
    <AboutContent />
  </div>
</template>
