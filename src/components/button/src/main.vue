<template>
  <button
    class="t-button"
    @click="handleClick"
    :disabled="onDisabled"
    :type="nativeType"
    :autofocus="autofocus"
    :class="[
      type ? `t-button-${type}` : '',
      size ? `t-button-${size}` : '',
      {
        'is-disabled': onDisabled,
        'is-loading': loading,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'TButton',

  componentName: 'TButton',

  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    nativeType: {
      type: String,
      default: ''
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    }
  },
  computed: {
    onDisabled() {
      return this.disabled || this.loading;
    },
  },
};
</script>
