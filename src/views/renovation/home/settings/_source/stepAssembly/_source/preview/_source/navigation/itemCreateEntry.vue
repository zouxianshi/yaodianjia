<template>
  <div :class="classes">
    <div class="icem-icon">
      <i class="el-icon-plus" />
    </div>
    <div class="icem-text">
      新增
    </div>
  </div>
</template>
<script>
const prefixCls = 'item-create-entry-model'
export default {
  name: 'ItemCreateEntry',
  data() {
    return {}
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`
      ]
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $w:56px;
  $-prefix-cls: "item-create-entry-model";

  .#{$-prefix-cls} {
    width: $w;
    text-align: center;
    margin: 0 auto 8px auto;
    cursor: pointer;
    &:hover {
      .icem-icon {
       border: 1px solid #4F88FF;
      }
      .icem-text,.icem-icon >i {
        color:#4F88FF
      }
    }
    .icem-icon {
      width: $w;
      height: $w;
      line-height: $w + 4px;
      border: 1px solid #CFCFCF;
      border-radius:100%;
      >i {
        font-size: 25px;
        color: #CFCFCF;
      }
    }
    .icem-text {
      font-size: 12px;
      color: #4A4A4A;
      margin-top: 8px;
    }
  }
</style>
