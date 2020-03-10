<template>
  <div class="t-row" :style=style>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TRow',
  componentName: 'TRow',
  props: {
    type: {
      type: String,
      default: 'flex'
    },
    align: {
      type: String,
      default: 'top',
    },
    gutter: {
      default: 0,
      type: Number
    },
    justify: {
      type: String,
      default: 'start'
    },
  },
  computed: {
    style() {
      const ret = {}
      const justifyContent = {
        'start': 'flex-start',
        'end': 'flex-end',
        'center': 'center',
        'between': 'space-between',
        'around': 'space-around',
      }
      const alignItems = {
        'top': 'flex-start',
        'middle': 'center',
        'bottom': 'flex-end',
      }
      ret.display="flex";
      ret.marginLeft = `${this.gutter / 2}px`;
      ret.marginRight = `${this.gutter / 2}px`;
      ret.justifyContent = justifyContent[this.justify] || justifyContent['start'];
      ret.alignItems = alignItems[this.align] || alignItems['top'];
      return ret;
    }
  },

}
</script>

<style lang="scss" scoped>
</style>