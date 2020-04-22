<template>
  <div class="c-second-item-model">
    <el-button v-if="source === 'sa-select-goods'" class="csim-delete" size="mini" type="danger" icon="el-icon-close" circle @click="() => $emit('on-delete',item)" />
    <m-icon-activity v-if="item.activityId || false" />
    <div class="csim-photo" :class="{'no-data':!item.img}">
      <img v-if="item.img" :src="`${showImg(item.img)}?x-oss-process=style/w_160`" alt="" width="100" height="100">
      <m-icons v-else :is-center="true" />
    </div>
    <p class="csim-name">{{ item.name || '-' }}</p>
    <p class="csim-price">
      <span class="p-1">¥{{ item.price || '-' }}</span>
    </p>
  </div>
</template>
<script>
import mIcons from './../../_source/icons'
import mIconActivity from '../_source/iconActivity'
export default {
  name: 'CSecondItem',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    source: {
      type: String,
      default: 'va'
    }
  },
  methods: {},
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
  components: { mIconActivity, mIcons }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .c-second-item-model {
    width: 126px;
    height: 178px;
    float: left;
    background: #fff;
    border-radius: 6px;
    position: relative;
    margin: 0 5px;
    display: block;
    margin-bottom: 10px;
    .csim-delete {
      position: absolute;
      right: 6px;
      top: 6px;
      padding: 2px;
      z-index: 1;
    }
    &:nth-child(1) {
      margin-left: 11px;
    }
    .csim-name,.csim-price {
      padding:0 10px;
    }
    .csim-photo {
      width: 126px;
      height: 132px;
      display: block;
      &.no-data {
        background: #F0F2F5;
        border-radius: 4px 4px 0 0;
      }
      >img {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -66px;
      }
    }
    .csim-name {
      font-size: 14px;
      color: #333;
    }
    .csim-price {
      font-size: 14px;
      padding-top: 8px;
      .p-1 {
        color: #fb3f38;
      }
    }
  }

</style>
