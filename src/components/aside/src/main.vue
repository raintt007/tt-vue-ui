<template>
  <aside class="t-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
  export default {
    name: 'TAside',

    componentName: 'TAside',

    props: {
      width: {
        type: String,
        default: '300px'
      }
    }
  };
</script>
