export default {
  beforeMount(el, binding, vnode) {
    el.handleMousedown = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };

    document.addEventListener('mousedown', el.handleMousedown);
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el.handleMousedown);
  },
};