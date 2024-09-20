interface SystemArr {
  name: string
  isSenior: boolean
  isDeputy: boolean
  isSelect: boolean
  haveItem: string[]
}
const setUpTypeData: SystemArr[] = [
  {
    name: 'LFS',
    isSenior: false,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1'],
  },
  {
    name: 'XFS',
    isSenior: false,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1'],
  },
  {
    name: 'AS3S',
    isSenior: true,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '2', '3'],
  },
  {
    name: 'S3-CS',
    isSenior: true,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '2', '3'],
  },
  {
    name: 'S3-OSS',
    isSenior: true,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '2', '3'],
  },
  {
    name: 'MABS',
    isSenior: false,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '3'],
  },
  {
    name: 'MADLG',
    isSenior: false,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '3'],
  },
  {
    name: 'OEOS1OS',
    isSenior: true,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '2', '3'],
  },
  {
    name: 'HCP',
    isSenior: true,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '2', '3'],
  },
  {
    name: 'MQE',
    isSenior: true,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '2', '3'],
  },
  {
    name: 'HCP-CS',
    isSenior: false,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '3'],
  },
  {
    name: 'OS',
    isSenior: true,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '2', '3'],
  },
  {
    name: 'BBCS',
    isSenior: false,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1'],
  },
  {
    name: 'FTP',
    isSenior: true,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1', '2'],
  },
  {
    name: 'SFTP',
    isSenior: true,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1', '2'],
  },
  {
    name: 'TFTP',
    isSenior: true,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1', '2'],
  },
  {
    name: 'CIFS',
    isSenior: false,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1'],
  },
  {
    name: 'NFS',
    isSenior: false,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1'],
  },
  {
    name: 'HDFS',
    isSenior: true,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1', '2'],
  },
  {
    name: 'WEBDAV',
    isSenior: false,
    isDeputy: true,
    isSelect: false,
    haveItem: ['1', '3'],
  },
  {
    name: 'MFS',
    isSenior: false,
    isDeputy: false,
    isSelect: false,
    haveItem: ['1'],
  },
]
export { setUpTypeData }
