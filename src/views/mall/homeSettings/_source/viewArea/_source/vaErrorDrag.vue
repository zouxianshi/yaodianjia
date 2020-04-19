<template>
  <div :class="prefixCls">
    <p class="p-text">请填写{{ typeList[type] }}配置参数</p>
  </div>
</template>
<script>
import { handlerDragComp } from './../../_source/default'
const typeList = handlerDragComp().reduce((p, c) => { return { ...p, [c.component[0].type]: c.name } }, {})
const prefixCls = 'va-error-drag'
export default {
  name: 'VaErrorDrag',
  data() {
    return {
      typeList
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    prefixCls() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-title`]: this.type === 'title'
        }
      ]
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $prefix-cls: "va-error-drag";
  .#{$prefix-cls} {
    width: 100%;
    height: calc(100%);
    background: rgba(255,0,0,.2);
    position: absolute;
    left: 0;
    top: 4px;
    z-index: 2;
    .p-text {
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background: #ff0000;
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -50%;
      font-size: 12px;
      color: #fff;
    }
    &-title {
      top: 0;
      border: 0;
      height: 100%;
      .p-text {
        margin-top: 2px;
        background: none;
        color: #ff0000;
      }
    }
  }
</style>
