import Layout from '@/layout'
export default {
  path: '/salarys', // 路径
  name: 'salarys', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
