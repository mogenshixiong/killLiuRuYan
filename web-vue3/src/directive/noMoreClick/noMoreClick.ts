export default {
  mounted(el: any, binding: any) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        el.style.cursor = 'not-allowed'
        setTimeout(
          () => {
            el.style.cursor = 'pointer'
            el.disabled = false
          },
          !binding.value || binding.value < 500 ? 500 : binding.value
        ) // 默认500ms,最小500ms
      }
    })
  }
}
