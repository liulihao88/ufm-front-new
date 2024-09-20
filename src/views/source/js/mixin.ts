import { ref } from 'vue'

export const LFS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const XFS_testFn = <T>(data: T) => {
  console.log(data, '?data=XFS_testFn')
  if (data.name) {
    if (data.name.length <= 0) {
      return '请输入名称'
    }
    if (data.host.length <= 0) {
      return '请输入主机名称或者IP地址'
    }
    if (data.port.length <= 0) {
      return '请输入端口'
    }
    return 0
  } else {
    return '请输入名称'
  }
}
export const AS3S_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const S3_CS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const S3_OSS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const MABS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const MADLG_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const OEOS1OS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const HCP_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const MQE_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const HCP_CS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const OS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const BBCS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const FTP_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const SFTP_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const TFTP_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const CIFS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const NFS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const HDFS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const WEBDAV_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}
export const MFS_testFn = <T>(data: T) => {
  console.log(data, '?data')
  if (data.name) {
    if (data.name.length <= 0) {
      return false
    } else {
      return data
    }
  } else {
    return false
  }
}

export const saveTestFn = (fileName, formState, octAlert, fn) => {
  const isOK = ref<boolean>(false)
  const tipsStr = ref<string>('')
  // 校验数据是否符合保存要求
  switch (fileName) {
    case 'LFS':
      isOK.value = !!LFS_testFn(formState)
      tipsStr.value = '请输入名称'
      break
    case 'XFS':
      if (XFS_testFn(formState) != 0) {
        tipsStr.value = XFS_testFn(formState)
      } else {
        isOK.value = true
      }
      break
    case 'AS3S':
      isOK.value = !!AS3S_testFn(formState)
      break
    case 'S3-CS':
      isOK.value = !!S3_CS_testFn(formState)
      break
    case 'S3-OSS':
      isOK.value = !!S3_OSS_testFn(formState)
      break
    case 'MABS':
      isOK.value = !!MABS_testFn(formState)
      break
    case 'MADLG':
      isOK.value = !!MADLG_testFn(formState)
      break
    case 'OEOS1OS':
      isOK.value = !!OEOS1OS_testFn(formState)
      break
    case 'HCP':
      isOK.value = !!HCP_testFn(formState)
      break
    case 'MQE':
      isOK.value = !!OS_testFn(formState)
      break
    case 'HCP-CS':
      isOK.value = !!HCP_CS_testFn(formState)
      break
    case 'OS':
      isOK.value = !!FTP_testFn(formState)
      break
    case 'BBCS':
      isOK.value = !!BBCS_testFn(formState)
      break
    case 'FTP':
      isOK.value = !!FTP_testFn(formState)
      break
    case 'SFTP':
      isOK.value = !!SFTP_testFn(formState)
      break
    case 'TFTP':
      isOK.value = !!TFTP_testFn(formState)
      break
    case 'CIFS':
      isOK.value = !!CIFS_testFn(formState)
      break
    case 'NFS':
      isOK.value = !!NFS_testFn(formState)
      break
    case 'HDFS':
      isOK.value = !!HDFS_testFn(formState)
      break
    case 'WEBDAV':
      isOK.value = !!WEBDAV_testFn(formState)
      break
    case 'MFS':
      isOK.value = !!MFS_testFn(formState)
      break
  }
  if (!isOK.value) {
    octAlert('message', tipsStr.value)
  } else {
    fn()
  }
}
