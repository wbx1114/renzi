import store from '@/store'
export const imgerror = {
  inserted: function(el, binding, vnode) {
    // el:指令绑定的元素
    console.log(el)
    // binding.name指令名	binding.value绑定值	bingding.expression绑定至(字符串形式)
    console.log(binding)
    // vnode 虚拟节点
    console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
export const isHas = {
  inserted(el, binding) {
    // el:指令绑定的元素
    const isHas = store.state.user.userInfo.roles.points.includes(binding.value)
    if (isHas) return
    el.remove()
  },
  bind() {
    console.log(123)
  }
}
