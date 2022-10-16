import Layout from '@/layout'
export default {
  path: '/permission', // 路径
  name: 'permission', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    component: () => import('@/views/permission'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  },
  {
    path: '/permission/detail/:id', // query传参 动态路由传参
    component: () => import('@/views/permission/detail.vue'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  },
  {
    path: '/permission/print/:id', // query传参 动态路由传参
    component: () => import('@/views/permission/print.vue'),
    hidden: true
  }
  ]
}
