import row from './src/main';

/* istanbul ignore next */
row.install = function(Vue) {
  Vue.component(row.name, row);
};

export default row;
