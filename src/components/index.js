// import PageTools from './PageTools'
// const components = [PageTools]
// export default (Vue) => {
//   components.forEach(ele => {
//     //  注册全局的通用栏组件对象
//     Vue.component(ele.name, ele)
//   })
// }
import * as filters from '@/filters'
// require.context实现组件的自动注册
const fn = require.context('./', true, /\.vue$/)
console.log(fn.keys())// 路径
console.log(fn('./PageTools/index.vue')) // 根据路径查找模块
// 一次性导入所有的模块
const components = fn.keys().map(ele => {
  return fn(ele)
})
console.log(components)
export default (Vue) => {
  components.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
