import Layout from '@/layout'
export default {
  path: '/social', // 路径
  name: 'social',
  meta: {
    id: 'social_securitys'
  }, // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'social',

    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
