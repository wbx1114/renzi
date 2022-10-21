import Layout from '@/layout'
export default {
  path: '/attendances', // 路径
  name: 'attendances',
  meta: {
    id: 'attendances'
  }, // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    name: 'attendances',
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}

