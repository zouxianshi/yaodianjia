<template>
  <div class="together-item-model">
    <div class="tim-img">
      <img v-if="el.storeSpec.picUrl" :src="showImg(el.storeSpec.picUrl)" alt="" style="height: 158px">
      <m-item-no-data v-else height="158px" :size="50" />
    </div>
    <div class="tim-name">
      <span>{{ truName(el.storeSpec.name) }}</span>
    </div>
    <div class="tim-price">
      <span class="tim-t1">团购价</span>
      <span class="tim-t2">¥{{ el.storeSpec.price }}</span>
      <span class="tim-t3">¥{{ el.storeSpec.mprice }}</span>
    </div>
    <div class="tim-groups">
      <m-avatar />
    </div>
    <div class="tim-btn">
      <el-button type="danger" round size="mini">立即拼单</el-button>
    </div>
  </div>
</template>
<script>
import mAvatar from './avatar'
import mItemNoData from './../../../../itemNoData'
export default {
  name: 'TogetherItem',
  data() {
    return {}
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    truName(v) {
      return _.truncate(v, { 'length': 12, 'omission': '...' })
    }
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
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: { mItemNoData, mAvatar }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .together-item-model {
    width: 100%;
    background: #fff;
    border-radius: 4px;
    position: relative;
    .tim-img {
      height: 158px;
    }
    .tim-name {
      >span {
        padding: 8px 8px 2px 8px;
        display: inline-block;
        font-size: 13px;
        color: #3E3E3E;
        line-height: 18px;
      }
    }
    .tim-price {
      padding:2px 8px;
      .tim-t1 {
        font-size: 12px;
        color: #3E3E3E;
      }
      .tim-t2 {
        font-size: 13px;
        color: #F32525;
        padding: 0 2px;
      }
      .tim-t3 {
        font-size: 12px;
        color: #C3C3C3;
        text-decoration:line-through;
      }
    }
    .tim-groups {
      padding: 8px 8px;
    }
    .tim-btn {
      position: absolute;
      right: 6px;
      bottom: 11px;
      .el-button {
        padding:4px 6px;
      }
    }
  }
</style>
