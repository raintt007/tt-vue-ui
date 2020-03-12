# tt-vue-ui

I'm noob.This package is used for study.

Component has a simple image cropper ---- `<t-cropper></t-cropper>`

## setup

```
npm install tt-vue-ui --s
```

## import

```js
import tui from "tt-vue-ui";
import "tt-vue-ui/lib/styles/tt-ui.css";

Vue.use(tui);
```

## use

```html
<template>
  <t-card>
    <t-font color="gray" bold="bold" size="20">
      裁剪
    </t-font>
    <t-cropper :getImage="getImage" :canvasSize="200"></t-cropper>
    <img :src="source" alt="无" style="height: 200px" />
  </t-card>
  <t-row :gutter="10">
    <t-col :span="12">
      <div></div>
    </t-col>
    <t-col :span="12" align="bottom">
      <div></div>
    </t-col>
  </t-row>
  <div>
    <t-button>default</t-button>
    <t-button type="primary">primary</t-button>
    <t-button type="danger" round>danger</t-button>
    <t-button type="info" circle @click="handleClick()">T</t-button>
    <t-button disabled>disabled</t-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      source: null,
    }
  },
  methods: {
    getImage(file) {
      this.source = file;
      console.log(file);
    },
    handleClick() {
      console.log('test');
    }
  }
}
</script>

```
