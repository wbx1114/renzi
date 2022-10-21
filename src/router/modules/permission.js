import Layout from '@/layout'
export default {
  path: '/permission', // 路径
  name: 'permission',
  meta: {
    id: 'permissions'
  }, // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'permission',

    component: () => import('@/views/employees'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }

  ]
}
