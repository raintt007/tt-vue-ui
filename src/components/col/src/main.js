export default {
  name: "TCol",
  componentName: "TCol",
  props: {
    align: String,
    span: {
      type: Number,
      default: 24
    },
    offset: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== "TRow") {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let classList = [];
    let style = {};
    const alignSelf = {
      'top': 'flex-start',
      'middle': 'center',
      'bottom': 'flex-end',
    }
    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + "px";
      style.paddingRight = style.paddingLeft;
    }
    if (this.align) {
      style.alignSelf = alignSelf[this.align] || alignSelf['top'];
    }
    ['span', 'offset'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `t-col-${prop}-${this[prop]}`
            : `t-col-${this[prop]}`
        );
      }
    });
    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        let props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `t-col-${size}-${prop}-${props[prop]}`
              : `t-col-${size}-${props[prop]}`
          );
        });
      }
    });

    return h(
      "div",
      {
        class: ["t-col", classList],
        style
      },
      this.$slots.default
    );
  }
};
