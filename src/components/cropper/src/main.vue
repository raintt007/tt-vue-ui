<template>
  <section class="t-cropper">
    <div
      class="cropper-wrapper"
      :style="{height,width}"
    >
      <canvas
        ref="canvas"
        class="cropper-canvas"
        :style="{height,width}"
        @mousedown="cropperDown($event)"
        @mousemove="cropperMove($event)"
        @mouseup="cropperUp($event)"
      >
      </canvas>
    </div>
    <input
      id="upload"
      type="file"
      style="display: none"
      @change="handleChange($event)"
      ref="input"
    />
    <button :style={width:buttonWidth} class="cropper-confirm" @click="getCropedImage()">确定</button>
    <button :style={width:buttonWidth} class="cropper-upload" @click="uploadImg()">上传</button>
    
    <div>
      <Canvas
        ref="saveCanvas"
        class="cropper-save-canvas"
        style="display:none"
      ></Canvas>
      <Canvas
        ref="exportCanvas"
        class="cropper-export-canvas"
        style="display:none"
      ></Canvas>
    </div>
  </section>
</template>

<script>
import imgFn from '../../../utils/cropper';
export default {
  name: 'TCropper',
  componentName: 'TCroppeer',
  props: {
    img: {
      default: null
    },
    canvasSize: {
      default: 200,
      type: Number
    },
    maxHeight: {
      default: 300,
      type: Number
    },
    minHeight: {
      default: 100,
      type: Number
    },
    maxWidth: {
      default: 300,
      type: Number
    },
    minWidth: {
      default: 100,
      type: Number
    },
    getImage: Function,

  },
  computed: {
    height() {
      return this.canvasSize + 'px'
    },
    width() {
      return this.canvasSize + 'px'
    },
    buttonWidth() {
      return this.canvasSize / 2 + 'px'
    },
    configs() {
      return {
        maxHeight: this.maxHeight,
        maxWidth: this.maxWidth,
        minHeight: this.minHeight,
        minWidth: this.minWidth,
        maxRatio: 4,
        minRatio: 1,
      }
    }
  },
  data() {
    return {
      source: null,
      imageInfo: null,
      saveCtx: null,
      saveCanvas: null,
      exportCanvas: null,
      exportCtx: null,
      // 裁剪器配置
      ctx: null,
      canvas: null,
      ratio: null,
      scale: null,
      fileInfo: null,
      // 裁剪框
      dragging: false,
      clickFlag: false,
      draggingCropper: false,
      cropperPosition: {
        startX: null,
        startY: null,
        width: null,
        height: null,
      },
      cropperTmpPosition: {
        startX: null,
        startY: null,
        width: null,
        height: null,
      },
      loading: false,
      cropperBorder: [],
      bordersEvent: [],
      borderSize: 10,
      cropperBorderOpt: null,
      // 点击裁剪框时的鼠标位置参数
      moveStartX: null,
      moveStartY: null,
    }
  },
  async mounted() {
    // 初始化画布
    const canvas = this.$refs.canvas;
    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.canvas = canvas;
    const saveCanvas = this.$refs.saveCanvas;
    const saveCtx = saveCanvas.getContext('2d');
    this.saveCtx = saveCtx;
    this.saveCanvas = saveCanvas;
    const exportCanvas = this.$refs.exportCanvas;
    const exportCtx = exportCanvas.getContext('2d');
    this.exportCtx = exportCtx;
    this.exportCanvas = exportCanvas;
    
    if (this.img) {
      this.initCropper();
      this.imageInfo = await imgFn.imageInfo(this.img, this.canvasSize, this.ratio, this.configs);
      this.imgToCropper();
    }
  },
  methods: {
    uploadImg() {
      this.$refs.input.click();
    },
    async handleChange(e) {
      const file = e.target.files[0];
      // 校验规则
      // 限制大小
      // 限制图片类型
      // ...
      if (!/image\/\w+/.test(file.type)) {
        alert('请上传图片');
        return false;
      }
      this.loading = true;
      this.initCropper();
      this.clearCropper();
      this.imageInfo = await imgFn.imageInfo(file, this.canvasSize, this.ratio, this.configs);
      this.imgToCropper()

    },
    // 传输到裁剪器
    imgToCropper() {
      if (!this.imageInfo) return;
      let { imgBase, scale, canvasWidth, canvasHeight } = this.imageInfo;
      this.scale = scale;
      this.image = imgBase;
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
      this.canvas.style.width = canvasWidth / this.ratio + 'px';
      this.canvas.style.height = canvasHeight / this.ratio + 'px';
      this.ctx.drawImage(imgBase, 0, 0, this.canvas.width, this.canvas.height);
      // 初始化裁剪框
      this.drawCropper(canvasWidth / 4, canvasHeight / 4, canvasWidth / 2, canvasHeight / 2, this.ctx);
      this.saveCropperInfo();
    },

    // 清理画布
    clearCropper() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.clearRect(0, 0, this.saveCanvas.width, this.saveCanvas.height)
      this.ctx.clearRect(0, 0, this.exportCanvas.width, this.exportCanvas.height)
    },
    // 初始化裁剪器
    initCropper() {
      this.ratio = imgFn.getPixelRatio(this.ctx);
      // 当前canvas绘制的图片实例
      this.imgBase = null;
      this.imageInfo = null;
      // 图片自身压缩比例
      this.scale = null;
      this.dragging = false;
      this.draggingCropper = false;
      // 判断click事件的触发时机
      this.clickFlag = false;
      // 点击裁剪框时的鼠标位置参数
      this.moveStartX = null;
      this.moveStartY = null;
      // 裁剪框边框节点事件坐标
      this.cropperBorder = [];
      // 裁剪框边框节点直径
      this.borderSize = 10;
      // 裁剪框边框事件参数
      this.cropperBorderOpt = null;
      // 判断canvas图层鼠标事件结束与否
      this.dragging = false;
      // 判断裁剪框鼠标事件结束与否
      this.draggingCropper = false;


      this.cropperPosition = {
        startX: null,
        startY: null,
        width: null,
        height: null,
      };
      this.cropperTmpPosition = {
        startX: null,
        startY: null,
        width: null,
        height: null,
      };
    },
    // 绘制裁剪框
    drawCropper(startX, startY, width, height, ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.6)'; // 蒙层颜色
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.globalCompositeOperation = 'source-atop';
      ctx.clearRect(startX, startY, width, height); // 裁剪选择框
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#fc178f';
      let size = this.borderSize; // 自定义像素点大小
      let { imgBase, scale, cropperPosition, canvasWidth, canvasHeight } = this.imageInfo;
      const rect = [
        [startX - size / 2, startY - size / 2],
        [startX - size / 2 + width / 2, startY - size / 2],
        [startX - size / 2 + width, startY - size / 2],
        [startX - size / 2, startY - size / 2 + height / 2],
        [startX - size / 2 + width, startY - size / 2 + height / 2],
        [startX - size / 2, startY - size / 2 + height],
        [startX - size / 2 + width / 2, startY - size / 2 + height],
        [startX - size / 2 + width, startY - size / 2 + height],
      ];
      for (let i = 0; i < rect.length; i++) {
        ctx.fillRect(rect[i][0], rect[i][1], size, size);
      }
      ctx.restore();
      // 再次使用drawImage将图片绘制到蒙层下方
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.drawImage(this.image, 0, 0, imgBase.width * scale * this.ratio, imgBase.height * scale * this.ratio);
      ctx.restore();
      // 将截图框宽高临时保存, 其实是防止重复赋值
      this.cropperTmpPosition.startX = startX;
      this.cropperTmpPosition.startY = startY;
      this.cropperTmpPosition.width = width;
      this.cropperTmpPosition.height = height;
    },
    moveCropper(currentX, currentY, startX, startY, width, height, ctx) {
      if (this.cropperBorder.length && !this.draggingCropper) {

        let flag = false;
        //判断鼠标位置
        ctx.beginPath();
        for (var i = 0; i < this.cropperBorder.length; i++) {
          ctx.rect(this.cropperBorder[i].x, this.cropperBorder[i].y, this.cropperBorder[i].width, this.cropperBorder[i].height);
          // console.log(ctx.isPointInPath(currentX, currentY), currentX)
          if (ctx.isPointInPath(currentX, currentY)) {
            switch (this.cropperBorder[i].index) {
              case 1:
                this.canvas.style.cursor = 'move'; break;
              case 2:
                this.canvas.style.cursor = 'ns-resize'; break;
              case 3:
                this.canvas.style.cursor = 'ew-resize'; break;
              case 4:
                this.canvas.style.cursor = 'nwse-resize'; break;
              case 5:
                this.canvas.style.cursor = 'nesw-resize'; break;
              default:
                break;
            }
            this.cropperBorderOpt = this.cropperBorder[i].option;
            flag = true;
            break;
          }
          if (!flag) {
            this.canvas.style.cursor = 'default';
            this.cropperBorderOpt = null;
          }
        }
        ctx.closePath();
      }
      // 正在操作裁剪框时
      if (this.draggingCropper) {
        if (this.cropperBorderOpt == 1) {
          let x = imgFn.fixedData(currentX - (this.moveStartX - startX), width, this.canvas.width);
          let y = imgFn.fixedData(currentY - (this.moveStartY - startY), height, this.canvas.height);
          // move
          this.drawCropper(x, y, width, height, this.ctx);
        } else {
          // 其他8个方向
          let { tempStartX, tempStartY, tempWidth, tempHeight } = imgFn.moveTrimPosition(currentX, currentY, startX, startY, width, height, this.cropperBorderOpt);
          this.drawCropper(tempStartX, tempStartY, tempWidth, tempHeight, this.ctx);
        }
      }
    },
    // 保存裁剪框信息
    saveCropperInfo() {
      Object.keys(this.cropperPosition).forEach(key => {
        this.cropperPosition[key] = this.cropperTmpPosition[key]
      })
      console.log(this.cropperBorder, this.borderSize, this.cropperPosition);
      // 转换拉开裁剪框时坐标为负时的情况
      imgFn.transformDot(this.cropperPosition);
      // 保存裁剪边框的坐标
      imgFn.saveBorderArr(this.cropperBorder, this.borderSize, this.cropperPosition);
      // 储存裁剪位置信息

      this.imageInfo.cropperPosition = this.cropperPosition;
    },
    cropperMove(e) {
      if (!this.imageInfo) {
        return
      }
      this.clickFlag = false;
      // 计算临时裁剪框的宽高
      let { startX, startY, width, height } = this.cropperPosition;
      let currentX = imgFn.nonNegativeData(e.offsetX * this.ratio),
        currentY = imgFn.nonNegativeData(e.offsetY * this.ratio),
        // 制造临时裁剪框的宽高
        tempWidth = currentX - startX,
        tempHeight = currentY - startY;
      this.moveCropper(currentX, currentY, startX, startY, width, height, this.ctx);
      // 如果没有点击或者当前操作的是裁剪框都return
      if (!this.dragging || this.draggingCropper) return;
      this.drawCropper(startX, startY, tempWidth, tempHeight, this.ctx)
    },
    cropperUp() {
      if (!this.imageInfo) {
        return
      }
      // 保存相关裁剪信息
      if (this.dragging) {
        this.saveCropperInfo()
      }
      this.dragging = false;
      this.draggingCropper = false
    },
    cropperDown(e) {
      if (!this.imageInfo) {
        return
      }
      this.dragging = true;
      this.clickFlag = true;
      // 如果操作的是裁剪框
      if (this.cropperBorderOpt) {
        this.draggingCropper = true;
        this.moveStartX = imgFn.nonNegativeData(e.offsetX * this.ratio);
        this.moveStartY = imgFn.nonNegativeData(e.offsetY * this.ratio);
      } else {
        // 保存当前鼠标开始坐标, 坐标都会乘以个像素比
        this.cropperPosition.startX = imgFn.nonNegativeData(e.offsetX * this.ratio);
        this.cropperPosition.startY = imgFn.nonNegativeData(e.offsetY * this.ratio);
      }
    },
    // 获取裁剪图片
    async getCropedImage() {
      if (!this.imageInfo) {
        return;
      }
      const { cropperPosition, imgBase, type, scale, canvasWidth, canvasHeight } = this.imageInfo;
      await new Promise((res, rej) => {
        // 正常绘制图片
        this.saveCtx.clearRect(0, 0, this.saveCanvas.width, this.saveCanvas.height);
        this.saveCanvas.width = imgBase.width;
        this.saveCanvas.height = imgBase.height;
        this.saveCanvas.style.width = imgBase.width / this.ratio + 'px';
        this.saveCanvas.style.height = imgBase.height / this.ratio + 'px';
        this.saveCtx.save();
        this.saveCtx.drawImage(imgBase, 0, 0, this.saveCanvas.width, this.saveCanvas.height);
        this.saveCtx.restore();
        // 然后将裁剪的位置坐标转换，在原图片尺寸的canvas上输入
        let startX = cropperPosition ? cropperPosition.startX : 0,
          startY = cropperPosition ? cropperPosition.startY : 0,
          width = cropperPosition ? cropperPosition.width : canvasWidth,
          height = cropperPosition ? cropperPosition.height : canvasHeight,
          resultStartX = imgFn.resetData(startX, scale, this.ratio),
          resultStartY = imgFn.resetData(startY, scale, this.ratio),
          resultWidth = imgFn.resetData(width, scale, this.ratio),
          resultHeight = imgFn.resetData(height, scale, this.ratio)
        let data = this.saveCtx.getImageData(resultStartX, resultStartY, resultWidth, resultHeight);
        // 最后输出在第三个canvas上
        this.exportCtx.clearRect(0, 0, this.exportCanvas.width, this.exportCanvas.height);
        // 获取等比例缩放后的canvas宽高尺寸
        this.exportCanvas.width = resultWidth;
        this.exportCanvas.height = resultHeight;
        this.exportCanvas.style.width = resultWidth / this.ratio + 'px';
        this.exportCanvas.style.height = resultHeight / this.ratio + 'px';
        this.exportCtx.putImageData(data, 0, 0);
        this.source = this.exportCanvas.toDataURL();
        this.getImage && this.getImage(this.source);
        // this.exportCanvas.toBlob((blob) => {

        //   // 加个时间戳缓存
        //   blob.lastModifiedDate = new Date();
        //   console.log(blob)
        //   res(blob)
        // }, type)

      })
    }

  },

}
</script>
<style lang="scss">
</style>