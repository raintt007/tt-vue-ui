<template>
  <div
    class="t-card"
    :style="style"
    :class="[
    shadow ? `is-${shadow}-shadow` : 'is-always-shadow',
      {
        'is-border': border,
        'is-round': round,
      }
    ]"
  >
    <div class="t-card__header" v-if="$slots.header || header">
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <div class="t-card__body" :style="bodyStyle">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TCard',

  componentName: 'TCard',
  computed: {
    style() {
      const ret = {};
      if (this.width) {
        ret.width = this.width;
      } else {
        ret.minWidth = '300px'
      }
      return ret;
    }
  },
  props: {
    width: Number,
    border: Boolean,
    round: Boolean,
    shadow: String,
    header: null,
    bodyStyle: {}
  },
  
};
</script>
