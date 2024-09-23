const Layout = () => import('@/layout/index.vue')
export default [
  {
    path: '/task',
    name: 'Task',
    component: Layout,
    redirect: '/task/public',
    meta: {
      icon: 'ep:home-filled',
      title: '任务',
      rank: 1,
    },
    children: [
      {
        path: '/task/public',
        name: 'Public',
        meta: { title: '公共任务', showLink: true },
        component: async () => await import('@/views/task/publicTask.vue'),
      },
      {
        path: '/task/public',
        meta: {
          title: '公共任务',
        },
        children: [
          {
            path: '/task/edit:id?',
            name: 'Edit',
            beforeEnter: (to, from, next) => {
              // if (to.query.id) {
              //   // 如果存在 id 参数，则表示正在编辑任务
              //   to.meta.title = '编辑任务1'
              // } else {
              //   // 如果不存在 id 参数，则表示正在添加任务
              //   to.meta.title = '新增任务2'
              // }
              next()
            },
            meta: {
              title: '新增任务3',
              showLink: false,
              showParent: true,
              activePath: '/task/public',
              dynamicId: true,
            },
            component: async () => await import('@/views/task/editPage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/source',
    name: 'Source',
    component: Layout,
    meta: {
      icon: 'ep:van',
      title: '资源',
      rank: 0,
    },
    redirect: '/source/fileEnter',
    children: [
      {
        path: '/source/fileEnter',
        name: 'FileEnter',
        meta: { title: '远程文件系统', noCache: true },
        component: async () => await import('@/views/source/fileEnter.vue'),
      },
      {
        path: '/source/origin',
        name: 'origin',
        meta: { title: '远程数据源', noCache: true },
        component: async () => await import('@/views/source/originData.vue'),
      },
    ],
  },

  {
    path: '/client',
    name: 'Client',
    component: Layout,
    meta: {
      icon: 'ep:hot-water',
      title: '客户端',
      rank: 0,
    },
    redirect: '/client/view',
    children: [
      {
        path: '/client/view',
        name: 'View',
        meta: { title: '查看客户端', noCache: true },
        component: async () => await import('@/views/client/viewClient.vue'),
      },

      {
        path: '/client/deploy',
        name: 'Deploy',
        meta: { title: '部署客户端', noCache: true },
        component: async () => await import('@/views/client/deploy.vue'),
      },
      {
        path: '/client/deployResult',
        name: 'DeployResult',
        meta: { title: '执行客户端', showLink: true, activePath: '/client/deploy' },
        component: async () => await import('@/views/client/deployResult.vue'),
      },
    ],
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/t1',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
      showLink: import.meta.env.MODE === 'development',
    },
    children: [
      {
        path: '/test/t1',
        name: 'T1',
        component: () => import('@/views/test/t1.vue'),
        meta: {
          title: '测试页1',
          showLink: true,
        },
      },
    ],
  },
  {
    path: '/test2',
    component: Layout,
    redirect: '/test/t2',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
      showLink: import.meta.env.MODE === 'development',
    },
    children: [
      {
        path: '/test/t2',
        name: 'T2',
        component: () => import('@/views/test/t2.vue'),
        meta: {
          title: '测试页2',
          showLink: true,
        },
      },
    ],
  },
  {
    path: '/test3',
    component: Layout,
    redirect: '/test/t3',
    meta: {
      icon: 'ep:home-filled',
      title: '测试页',
      rank: 0,
      showLink: import.meta.env.MODE === 'development',
    },
    children: [
      {
        path: '/test/t3',
        name: 'T3',
        component: () => import('@/views/test/t3.vue'),
        meta: {
          title: '测试页3',
          showLink: true,
        },
      },
    ],
  },
]
