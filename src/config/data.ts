interface MeunDataChild {
  svg: string
  name: string
  path: any
  pathName: any
  isActive: boolean
  isHidden?: boolean
}

interface MeunData {
  title: string
  //   svg: string;
  isOpen: boolean
  child: MeunDataChild[]
}

let meunDataArr: MeunData[] = [
  {
    title: '任务',
    // svg: "icon_menu_04",
    isOpen: true,
    child: [
      {
        svg: 'icon_menu_03',
        name: 'Public',
        path: '/task/public',
        pathName: '公共任务',
        isActive: true,
      },
    ],
  },
  {
    title: '资源',
    // svg: "icon_menu_05",
    isOpen: false,
    child: [
      {
        svg: 'icon_menu_01',
        name: 'FileEnter',
        path: '/source/fileEnter',
        pathName: '远程文件系统',
        isActive: true,
      },
      {
        svg: 'icon_menu_02',
        name: 'origin',
        path: '/source/origin',
        pathName: '远程数据源',
        isActive: false,
      },
    ],
  },

  {
    title: '客戶端',
    isOpen: false,
    child: [
      {
        svg: 'icon_menu_08',
        name: 'View',
        path: '/client/view',
        pathName: '查看客户端',
        isActive: false,
      },
      {
        svg: 'icon_menu_07',
        name: 'Deploy',
        path: '/client/deploy',
        pathName: '部署客户端',
        isActive: false,
      },
      {
        svg: 'icon_menu_09',
        name: 'DeployResult',
        path: '/client/deployResult',
        pathName: '执行客户端',
        isActive: true,
        isHidden: true,
      },
    ],
  },
]
const testRouteData = [
  {
    title: '测试',
    isOpen: true,
    child: [
      {
        svg: 'icon_menu_08',
        name: 'T1',
        path: '/test/t1',
        pathName: '测试1',
        isActive: false,
      },
      {
        svg: 'icon_menu_08',
        name: 'T2',
        path: '/test/t2',
        pathName: '测试2',
        isActive: false,
      },
      {
        svg: 'icon_menu_08',
        name: 'T3',
        path: '/test/t3',
        pathName: '测试3',
        isActive: false,
      },
      {
        svg: 'icon_menu_08',
        name: 'T4',
        path: '/test/t4',
        pathName: '测试4',
        isActive: false,
      },
    ],
  },
]

if (location.hostname === 'localhost') {
  meunDataArr.push(...testRouteData)
}

export { meunDataArr }
