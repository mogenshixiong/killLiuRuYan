import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// https://pinia.vuejs.org/zh/core-concepts/
// 你可以任意命名 `defineStore()` 的返回值，
// 但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
// 这个名字 ，也被用作 id ，是必须传入的， Pinia 将用它来连接 store 和 devtools。
// 为了养成习惯性的用法，将返回的函数命名为 use... 是一个符合组合式函数风格的约定。
export const useCounterStore = defineStore('counter', () => {
  // 在 Setup Store 中：
  // ref() 就是 state 属性
  // computed() 就是 getters
  // function() 就是 actions
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  // 注意，要让 pinia 正确识别 state，你必须在 setup store 中返回 state 的所有属性。
  // 这意味着，你不能在 store 中使用私有属性。
  // 不完整返回会影响 SSR ，开发工具和其他插件的正常运行。
  return { count, doubleCount, increment }
})

/**
 * 使用 Store
<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
</script>

<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store

// ✅ 这样写是响应式的
// 💡 当然你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount)
</script>
 */
