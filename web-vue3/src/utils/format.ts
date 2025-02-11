export const formatGold = (gold: number) => {
  const g = Math.floor(gold / 10000)
  const s = Math.floor((gold - g * 10000) / 100)
  const c = gold - g * 10000 - s * 100
  if (g > 0) {
    if (c === 0 && s === 0) {
      return `${g}金`
    } else {
      return `${g}金${s}银${c}铜`
    }
  } else if (s > 0) {
    if (c === 0) {
      return `${s}银`
    } else {
      return `${s}银${c}铜`
    }
  } else {
    return `${c}铜`
  }
}
export const formatStageTime = (stageTime: string) => {
  if (!stageTime) return '0秒'

  const now = Date.now()
  const old_date = new Date(stageTime.replace(/-/g, '/')).getTime() // 这个写法是为了兼容IOS日期

  const diff = (now - old_date) / 1000
  if (diff < 0) return '0秒'

  const days = parseInt(diff / 86400 + '') // 天  24*60*60*1000
  const hours = parseInt(diff / 3600 + '') - 24 * days // 小时 60*60 总小时数-过去的小时数=现在的小时数
  const minutes = parseInt((diff % 3600) / 60 + '') // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
  const seconds = parseInt((diff % 60) + '') // 以60秒为一整份 取余 剩下秒数

  if (days > 0) {
    return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
  }
  if (hours > 0) {
    return hours + '小时' + minutes + '分钟' + seconds + '秒'
  }
  if (minutes > 0) {
    return minutes + '分钟' + seconds + '秒'
  }
  if (seconds > 0) {
    return seconds + '秒'
  }
  return '0秒'
}
export const formatLastLoginTime = (str: string) => {
  if (!str) return '从未登录'
  let time = new Date(str.replace(/-/g, '/')).getTime() // 这个写法是为了兼容IOS日期
  if (('' + time).length === 10) {
    time = parseInt(time + '') * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '在线'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  } else if (diff < 3600 * 24 * 366) {
    return Number(d.getMonth()) + 1 + '.' + d.getDate() + ''
  }
  return d.getFullYear()
  // d.getFullYear() + '年' + (Number(d.getMonth()) + 1) + '月' + d.getDate() + '日'
  // d.getHours() +
  // '时' +
  // d.getMinutes() +
  // '分'
}
