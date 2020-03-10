<template>
  <header class="t-header" :style={height}>
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'THeader',
    componentName: 'THeader',
    props: {
      height: {
        default: '40px',
        type: String
      }
    }
  };
</script>