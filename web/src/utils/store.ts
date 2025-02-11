export function validatenull(val: any) {
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') {
      return true
    }
    return false
  }
  return false
}
/**
 * 存储localStorage
 */
export const setStore = (params: any) => {
  const { name, content, type } = params
  const obj = {
    dataType: typeof content,
    value: content,
    type: type,
    datetime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000
  }
  if (type === 'session') {
    window.sessionStorage.setItem(name, JSON.stringify(obj))
  } else if (type === 'local') {
    window.localStorage.setItem(name, JSON.stringify(obj))
  }
}

/** 存储localStorage 听评课用 */
export const setStore2 = (params: any) => {
  const { name, content, type } = params
  const obj = {
    value: content,
    expire: new Date().getTime() + 30 * 24 * 60 * 60 * 1000
  }
  if (type === 'session') {
    window.sessionStorage.setItem(name, JSON.stringify(obj))
  } else if (type === 'local') {
    window.localStorage.setItem(name, JSON.stringify(obj))
  }
}
/**
 * 获取localStorage
 */
export const getStore = (params: any) => {
  const { name } = params
  let obj: any = {}
  let content
  obj = window.localStorage.getItem(name)
  if (validatenull(obj)) obj = window.sessionStorage.getItem(name)
  if (validatenull(obj)) return
  obj = JSON.parse(obj)
  if (obj.dataType === 'string') {
    content = obj.value
  } else if (obj.dataType === 'number') {
    content = Number(obj.value)
  } else if (obj.dataType === 'boolean') {
    // content = e v a l(obj.content)
    content = !!obj.value
  } else if (obj.dataType === 'object') {
    content = obj.value
  }
  return content
}
/**
 * 删除localStorage
 */
export const removeStore = (params: any) => {
  const { name } = params
  window.localStorage.removeItem(name)
  window.sessionStorage.removeItem(name)
}
