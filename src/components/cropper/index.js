import Cropper from './src/main.vue';
Cropper.install = function(Vue) {
  Vue.component(Cropper.name, Cropper);
};

export default Cropper;