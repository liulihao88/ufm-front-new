const Layout = () => import('@/layout/index.vue')
export default [
  {
    path: '/task',
    name: 'task',
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
        name: 'public',
        meta: { title: '公共任务', showLink: true },
        component: async () => await import('@/views/task/publicTask.vue'),
      },
      {
        path: '/task/edit/:id?',
        name: 'edit',
        meta: { title: '新增任务', showLink: false, showParent: true, activePath: '/task/public' },
        component: async () => await import('@/views/task/editPage.vue'),
      },
    ],
  },
  {
    path: '/source',
    name: 'source',
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
        name: 'fileEnter',
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
    name: 'client',
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
        name: 'view',
        meta: { title: '查看客户端', noCache: true },
        component: async () => await import('@/views/client/viewClient.vue'),
      },

      {
        path: '/client/deploy',
        name: 'deploy',
        meta: { title: '部署客户端', noCache: true },
        component: async () => await import('@/views/client/deploy.vue'),
      },
      {
        path: '/client/deployResult',
        name: 'deployResult',
        meta: { title: '执行客户端', showLink: false, activePath: '/client/deploy' },
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
