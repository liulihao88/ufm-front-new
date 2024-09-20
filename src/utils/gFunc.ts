import { md5 } from 'js-md5'
import { $toast, getStorage } from 'oeos-components'
function gDownType(item) {
  if (!item.bucket) {
    $toast('不是有效数据，不支持下载!', 'warn')
    return false
  } else {
    if (item.bucket.length <= 0) {
      $toast('不是有效数据，不支持下载!', 'warn')
    }
  }
  let getUrl = `/v1/admin/tenant/object/download` //接口
  let bucketName = item.bucket ? item.bucket : ''
  let objectKey = item.key ? item.key : ''
  let objectVersionID = item.version ? item.version : ''
  let dataUrl = `?bucket=${bucketName}&key=${encodeURIComponent(objectKey)}&version=${objectVersionID}`
  let _href = parseOrigin + getUrl + dataUrl + `&Authorization=${getStorage('oeos-token')}`
  window.location.href = _href
}

export function md5EncryptToBytes(pwd, toByte = false) {
  pwd = '' + pwd
  let encrypted = md5(pwd)
  if (toByte) {
    // 将加密后的十六进制字符串转换为byte数组
    const encoder = new TextEncoder()
    let encodePwd = encoder.encode(encrypted)
    return Array.from(encodePwd)
  }
  return encrypted
}

export function test() {
  return 'isTest'
}

export function formatImg(photoName, addPath = '', { basePath = '../assets/image' } = {}) {
  if (photoName.startsWith('http') || photoName.startsWith('https')) {
    return photoName
  }
  if (photoName.indexOf('.') === -1) {
    photoName = photoName + '.png'
  }
  const addLastSlash = addPath.endsWith('/') || !addPath ? addPath : `${addPath}/`
  const addLastBasePathSlash = basePath.endsWith('/') || !basePath ? basePath : `${basePath}/`
  let mergeSrc = `${addLastSlash}${photoName}`
  console.log(`66 addLastBasePathSlash`, addLastBasePathSlash)
  console.log(`46 mergeSrc`, mergeSrc)
  // '../assets/images/1.png'
  let res = new URL(`${addLastBasePathSlash}${mergeSrc}`, import.meta.url).href
  return res
}
