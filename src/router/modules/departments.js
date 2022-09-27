import Layout from '@/layout'
export default {
  path: '/departments', // 路径
  name: 'departments', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: '组织架构',
      icon: 'tree'

    }
  }]
}

