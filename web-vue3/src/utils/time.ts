const getFormatData = (date: Date) => {
  const Y = date.getFullYear(), // 年
    M = date.getMonth() + 1, //月
    D = date.getDate(), //日
    h = date.getHours(), //小时
    m = date.getMinutes(), //分钟
    s = date.getSeconds() //秒数
  const zero = (num: number) => (num < 10 ? '0' + num : num)
  return {
    Y,
    M: zero(M),
    D: zero(D),
    h: zero(h),
    m: zero(m),
    s: zero(s)
  }
}
/**
 * 获取当前日期 YYYY-MM-DD
 */
export const getCurrentDate = () => {
  const date = new Date()
  const { Y, M, D } = getFormatData(date)
  return Y + '-' + M + '-' + D
}
/**
 * 获取当前日期 YYYY-MM-DD HH:MM:SS
 */
export const getCurrentDateTime = () => {
  const date = new Date()
  const { Y, M, D, h, m, s } = getFormatData(date)
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
/**
 * 获取前N天的日期 YYYY-MM-DD HH:MM:SS
 */
export const getBeforeDateTime = (N: number = 1) => {
  const oneDay = 1000 * 60 * 60 * 24
  const today = new Date()
  const yesterday = new Date(today.getTime() - oneDay * N)
  const { Y, M, D, h, m, s } = getFormatData(yesterday)
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
/**
 * 返回指定日期的前MS的日期
 */
export const getBeforeDateTime2 = (data: string, MS: number = 1000) => {
  const today = new Date(data.replace(/-/g, '/')) // 这个写法是为了兼容IOS日期
  const yesterday = new Date(today.getTime() - MS)
  const { Y, M, D, h, m, s } = getFormatData(yesterday)
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
/**
 * 返回指定日期的前MS的日期
 */
export const formatTime1 = (data: string) => {
  const today = new Date(data.replace(/-/g, '/')) // 这个写法是为了兼容IOS日期
  const { h, m } = getFormatData(today)
  return h + ':' + m
}
