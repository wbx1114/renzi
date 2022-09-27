import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  name: 'employees', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }]
}
