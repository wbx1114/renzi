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
