export const regMixin = function (type: string, data: string) {
  const portReg = /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))$/
  const IPReg = /^(((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
  const pathReg = /[a-z]|[A-Z]:(\\[^\\/&?\n]+)\\?/
  switch (type) {
    case 'port':
      return portReg.test(data)
    case 'IPReg':
      return IPReg.test(data)
    case 'path':
      return pathReg.test(data)
  }
}

export const octAlert = (obj: any) => {
  window.parent.postMessage(
    {
      message: obj,
    },
    '*',
  )
}

export const getGlobleData: any = null

export const getParentMessage = (nameFn: string) => {
  window.addEventListener('message', (e) => {
    if (e.data.callFn == nameFn) {
      return nameFn
    }
  })
}

export const windowMessage = (fn) => {
  window.addEventListener('message', (e) => {
    const m = e.data
    if (fn) {
      fn(m)
    }
  })
}

export const timeStampType = (val: any) => {
  function add0(m: any) {
    return m < 10 ? '0' + m : m
  }
  const result = (val: any) => {
    const time = new Date(val)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    const h = time.getHours()
    const mm = time.getMinutes()
    const s = time.getSeconds()
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
  }
  return result(val)
}
export const timeStampType2 = (val: any, type: string) => {
  function add0(m: any) {
    return m < 10 ? '0' + m : m
  }
  const result = (val: any) => {
    const time = new Date(val)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    const h = time.getHours()
    const mm = time.getMinutes()
    if (type == 's') {
      const s = time.getSeconds()
      return y + '-' + add0(m) + '-' + add0(d) + '  ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
    } else {
      return y + '-' + add0(m) + '-' + add0(d) + '  ' + add0(h) + ':' + add0(mm)
    }
  }
  return result(val)
}

// 补足两位数
export const formatNumberRgx = (num) => {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (parts.length == 1) {
    return parts[0] + '.00'
  } else {
    if (parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2)
    }
    return parts.join('.')
  }
}
export const countQuota = (nums: any) => {
  let num: any = 0
  if (nums <= 0) {
    return 0 + ' B'
  }
  if (nums < 1048576) {
    // 小于1MB
    if (nums < 1024) {
      num = nums + ' B'
    } else {
      num = (nums / 1024).toFixed(2)
      num = formatNumberRgx(num) + ' KB'
    }
  } else {
    if (nums < 1073741824) {
      // 小于1GB
      num = (nums / 1048576).toFixed(2)
      num = formatNumberRgx(num) + ' MB'
    } else {
      num = (nums / 1073741824).toFixed(2) // GB
      if (num >= 1024) {
        num = num / 1024 // TB
        if (num / 1024 >= 1) {
          num = (num / 1024).toFixed(2)
          num = formatNumberRgx(num) + ' PB'
        } else {
          num = num.toFixed(2) // TB
          num = formatNumberRgx(num) + ' TB'
        }
      } else {
        num = formatNumberRgx(num) + ' GB'
      }
    }
  }
  return num
}

export const testIPFn = (val: any) => {
  console.log(val, 'testIPFn')
  if (val) {
    const ipPattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    if (!ipPattern.test(val)) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
