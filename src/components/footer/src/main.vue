<template>
  <footer class="t-footer" :style={height}>
    <slot></slot>
  </footer>
</template>

<script>
  export default {
    name: 'TFooter',
    componentName: 'TFooter',
    props: {
      height: {
        default: '40px',
        type: String
      }
    }
  };
</script>