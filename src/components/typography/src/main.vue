<template>
  <span class="t-typography" :style={fontSize,fontWeight,color:colors[color]||color}>
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'TFont',
    componentName: 'TFont',
    data() {
      return {
        colors: {
          Success: '#67C23A',
          gray: '#C0C4CC',
          gray1: '#DCDFE6',
          gray2: '#E4E7ED',
          gray3: '#EBEEF5',
          gray4: '#F2F6FC'
        }
      }
    },
    computed: {
      fontSize() {
        return this.size + 'px';
      },
      fontWeight() {
        return this.bold;
      },
    },
    props: {
      type: {

      },
      size: {
        default: '16',
        type: String
      },
      bold: {
        default: '400',
        type: String
      },
      padding: {
        default: '0',
      },
      color: {
        default: 'black',
        type: String
      }
    }
  };
</script>