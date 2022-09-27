import Layout from '@/layout'
export default {
  path: '/setting', // 路径
  name: 'setting', // 给路由规则加一个name
  component: Layout, // 组件
  children: [{
    path: '',
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
