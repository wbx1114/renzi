import Layout from '@/layout'
export default {
  path: '/salarys', // 路径
  name: 'salarys',
  meta: {
    id: 'salarys'
  }, // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'salarys',

    component: () => import('@/views/salarys'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
