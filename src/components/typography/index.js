import Typography from './src/main.vue';
Typography.install = function(Vue) {
  Vue.component(Typography.name, Typography);
};

export default Typography;