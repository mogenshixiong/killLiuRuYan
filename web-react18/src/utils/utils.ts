import mitt from 'mitt'
export const bus = mitt()

/** 当前是否处于开发环境 */
export const isDev = import.meta.env.DEV

export const log = (...args: any[]) => {
  if (isDev || (window as any).isDebugger) {
    console.log(...args)
  }
}
export const sleep = async (ms = 3000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const getIconUrl = (icon: string) => {
  return `/img/${icon}`
}

console.log((window as any).performance.memory)
console.log((window as any).performance.memory.jsHeapSizeLimit / (1024 * 1024) + 'MB') // // 上下文内可用堆的最大体积，以字节计算。
console.log((window as any).performance.memory.totalJSHeapSize / (1024 * 1024) + 'MB') // 已分配的堆体积，以字节计算。
console.log((window as any).performance.memory.usedJSHeapSize / (1024 * 1024) + 'MB') // 当前 JS 堆活跃段（segment）的体积，以字节计算。
