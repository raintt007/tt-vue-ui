<template>
  <div id="app">
    <t-container style="height: 500px; border: 1px solid #eee">
      <t-header>
        pzz
      </t-header>
      <t-main>
        <t-font
          color="gray"
          bold="bold"
          size="20"
        >
          裁剪
        </t-font>
        <t-cropper :getImage="getImage" :canvasSize="400"></t-cropper>
        <img :src="source" alt="无">
      </t-main>
      <t-footer>
        pzz
      </t-footer>
    </t-container>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      source: null,
    }
  },
  methods: {
    getImage(file) {
      this.source = file;
      console.log(file);
    }
  }
}
</script>

<style>
</style>
