<template>
  <div class="va-second-advertise-model">
    <div class="vsam-left">
      <div class="ads-p1">
        <m-tag-ads v-if="source === 'sa'" text="广告1" />
        <img v-if="isItemList && item.itemList[0].img" :src="item.itemList[0].img" alt="" width="181" height="203">
        <div v-else class="no-img">
          <m-icons :is-center="true" text="请上传广告图" />
        </div>
      </div>
    </div>
    <div class="vsam-right">
      <div class="ads-p2">
        <m-tag-ads v-if="source === 'sa'" text="广告2" />
        <img v-if="isItemList && item.itemList[1].img" :src="item.itemList[1].img" alt="" width="215" height="96">
        <div v-else class="no-img">
          <m-icons :is-center="true" text="请上传广告图" />
        </div>
      </div>
      <div class="ads-p3">
        <m-tag-ads v-if="source === 'sa'" text="广告3" />
        <img v-if="isItemList && item.itemList[2].img" :src="item.itemList[2].img" alt="" width="215" height="96">
        <div v-else class="no-img">
          <m-icons :is-center="true" text="请上传广告图" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mIcons from './../../_source/icons'
import mTagAds from './../_source/tagAds'
export default {
  name: 'VaSecondAdvertise',
  data() {
    return {}
  },
  props: {
    source: {
      type: String,
      default: 'va'
    },
    item: {
      type: Object,
      default: () => {}
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
  computed: {
    isItemList() {
      return !_.isEmpty(this.item.itemList)
    }
  },
  components: { mTagAds, mIcons }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-second-advertise-model {
    overflow: hidden;
    height: 203px;
    .vsam-left,.vsam-right {
      float: left;
    }
    .vsam-left {
      width: 181px;
      margin-right: 8px;
      margin-left: 8px;
      .ads-p1 {
        .no-img {
          width: 181px;
          height: 203px;
          background: #F0F2F5;
        }
      }
    }
    .vsam-right {
      width: 215px;
      .ads-p2 {
        margin-bottom: 11px;
      }
      .ads-p2,.ads-p3 {
        .no-img {
          width: 215px;
          height: 96px;
          background: #F0F2F5;
        }
      }
    }
    .ads-p1,.ads-p2,.ads-p3 {
      position: relative;
    }
  }
</style>
