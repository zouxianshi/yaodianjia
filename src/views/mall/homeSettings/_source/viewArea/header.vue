<template>
  <div class="va-header-model">

    <div class="vhm-title-box">
      <div class="drag-area">
        <span class="sp1">商城名组件</span>
        <div class="oper">
          <m-edit :item="{type:'mall-title'}" />
        </div>
      </div>
      <div id="va-title" class="title">
        <b>{{ dragGlobal.title || '请输入商城名称' }}</b>
      </div>
    </div>

    <div class="vhm-search-box">
      <div class="drag-area">
        <span class="sp1">搜索关键字组件</span>
        <div class="oper">
          <m-edit :item="{type:'mall-search-hint'}" />
        </div>
      </div>
      <div id="va-search-hint" class="title">
        <b>{{ dragGlobal.searchHint || '' }}</b>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import mEdit from './_source/edit'
export default {
  name: 'VaHeader',
  components: { mEdit },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('mall', ['dragGlobal'])
  },
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  methods: {},
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @mixin vhm-box($left:-2px,$top:56px) {
    width: 424px;
    height: 36px;
    line-height: 34px;
    position: absolute;
    left: $left;
    top: $top;
    border: 2px solid transparent;
    &:hover {
      border-color: #409EFF;
      .drag-area {
        display: block;
      }
    }
    .drag-area {
      width: 422px;
      height: 30px;
      line-height: 28px;
      background: #409EFF;
      position: absolute;
      left: -2px;
      top: -30px;
      display: none;
      text-align: center;
      border-radius:4px 0 0 0;
      .oper {
        position: absolute;
        right: -40px;
        top: 0;
        z-index: 2;
      }
      .sp1 {
        position: absolute;
        left: 10px;
        top: 3px;
        font-size: 13px;
        color: #fff;
      }
    }
    .title {
      font-size: 18px;
      color: #fff;
    }
  }
  .va-header-model {
    width: 420px;
    height: 150px;
    background: url('./img/va_header.png') no-repeat;
    position: relative;
    z-index: 0;
    .vhm-title-box {
      @include vhm-box();
      text-align: center;
    }
    .vhm-search-box {
      @include vhm-box(-2px,106px);
      .title {
        b {
          padding-left: 180px;
          color: #8A95A4;
          font-size: 16px;
        }
      }
    }
  }
</style>
