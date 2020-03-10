import col from './src/main';

/* istanbul ignore next */
col.install = function(Vue) {
  Vue.component(col.name, col);
};

export default col;
