<template>
  <div id="app">
    <t-row :gutter="10">
      <t-col :span="12">
        <div>
        </div>
      </t-col>
      <t-col
        :span="12"
        align="bottom"
      >
        <div>
        </div>
      </t-col>
    </t-row>
    <t-row
      style="height:120px"
      align="bottom"
    >
      <t-col
        :span="12"
        align="middle"
      >
        <div>
        </div>
      </t-col>
      <t-col :span="12">
        <div>
        </div>
      </t-col>
    </t-row>
    <t-row :gutter="20">
      <t-col :span="12">
        <div>
        </div>
      </t-col>
      <t-col
        :span="6"
        align="bottom"
      >
        <div>
        </div>
      </t-col>
      <t-col :span="6">
        <div>
        </div>
      </t-col>
    </t-row>
    <t-card>
      <t-font
        color="gray"
        bold="bold"
        size="20"
      >
        裁剪
      </t-font>
      <t-cropper
        :getImage="getImage"
        :canvasSize="200"
      ></t-cropper>
      <img
        :src="source"
        alt="无"
        style="height: 200px"
      >
    </t-card>

    <t-cropper
      :getImage="getImage"
      :canvasSize="200"
    ></t-cropper>
    <img
      :src="source"
      alt="无"
      style="height: 200px"
    >
    <div>
      <t-button>default</t-button>
      <t-button type="primary">primary</t-button>
      <t-button
        type="danger"
        round
      >danger</t-button>
      <t-button
        type="info"
        circle
        @click="handleClick()"
      >T</t-button>
      <t-button disabled>disabled</t-button>
    </div>
    <div>
      <t-card
        round
        border
      >
        <div
          v-for="o in 4"
          :key="o"
        >
          {{'列表内容 ' + o }}
        </div>
      </t-card>
    </div>
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
    },
    handleClick() {
      console.log(123)
    }
  }
}
</script>

<style lang="css">
.t-row + .t-row {
  margin-top: 10px;
}
.t-row {
  height: 120px;
}
.t-col > div {
  height: 40px;
  background: #c0c0c0;
}
</style>
