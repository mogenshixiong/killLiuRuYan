const zeroFill = (d: any) => (d < 10 ? '0' + d : d)

/**
 * 格式化时间戳
 * @param timestamp 时间戳 示例值：1738830664906
 * @returns {string} 格式化后的yyyy-MM-dd hh:mm:ss 时间字符串 示例：'2025-02-06 16:31:04'
 */
export const formatTime1 = (timestamp: Date): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}-${zeroFill(month)}-${zeroFill(day)} ${zeroFill(hour)}:${zeroFill(minute)}:${zeroFill(second)}`
}

/**
 * 格式化秒数
 * @param millisecond 单位毫秒
 * @returns {string} 1分钟以为内输出X秒，超过1分钟输出X分X秒，超过1小时输出X小时X分X秒，超过1天输出X天X小时X分X秒，超过1年输出X年X天X小时X分X秒
 */
export const formatTime2 = (millisecond: number): string => {
  const seconds = Math.floor(millisecond / 1000) // 转换为秒
  const minutes = Math.floor(seconds / 60) // 转换为分钟
  const hours = Math.floor(minutes / 60) // 转换为小时
  const days = Math.floor(hours / 24) // 转换为天
  const years = Math.floor(days / 365) // 转换为年

  const remainingSeconds = seconds % 60
  const remainingMinutes = minutes % 60
  const remainingHours = hours % 24
  const remainingDays = days % 365

  if (years > 0) {
    return `${years}年${remainingDays}天${remainingHours}小时${remainingMinutes}分${remainingSeconds}秒`
  } else if (days > 0) {
    return `${days}天${remainingHours}小时${remainingMinutes}分${remainingSeconds}秒`
  } else if (hours > 0) {
    return `${hours}小时${remainingMinutes}分${remainingSeconds}秒`
  } else if (minutes > 0) {
    return `${minutes}分${remainingSeconds}秒`
  } else {
    return `${seconds}秒`
  }

  // // 将毫秒转换为秒
  // let seconds = Math.floor(millisecond / 1000)

  // // 计算天数、小时、分钟和秒
  // const days = Math.floor(seconds / (24 * 60 * 60))
  // seconds = seconds % (24 * 60 * 60)

  // const hours = Math.floor(seconds / (60 * 60))
  // seconds = seconds % (60 * 60)

  // const minutes = Math.floor(seconds / 60)
  // seconds = seconds % 60

  // // 根据时间长度构建结果字符串
  // if (days > 0) {
  //   return `${days}天${hours}小时${minutes}分${seconds}秒`
  // } else if (hours > 0) {
  //   return `${hours}小时${minutes}分${seconds}秒`
  // } else if (minutes > 0) {
  //   return `${minutes}分${seconds}秒`
  // } else {
  //   return `${seconds}秒`
  // }
}

/**
 * 获取当前（yyyy-MM-dd hh:mm:ss）时间
 * @returns {string} yyyy-MM-dd hh:mm:ss 时间字符串 示例：'2025-02-06 16:31:04'
 */
export const formatTime3 = (): string => {
  const dateTimestamp = new Date().getTime() as any
  return formatTime1(dateTimestamp)
}
