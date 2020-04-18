<template>
  <div class="va-third-advertise-model">
    <div v-for="(el,i) in item.itemList" :key="i" class="vtam-item">
      <m-tag-ads v-if="source === 'sa'" :text="`广告${i + 1}`" />
      <img v-if="el.img" :src="el.img" alt="" width="129" height="129">
      <div v-else class="no-img">
        <m-icons :is-center="true" :size="50" text="请上传广告图" />
      </div>
    </div>
  </div>
</template>
<script>
import mIcons from './../../_source/icons'
import mTagAds from './../_source/tagAds'
export default {
  name: 'VaThirdAdvertise',
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
      default: () => []
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
  components: { mTagAds, mIcons }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-third-advertise-model {
    overflow: hidden;
    .vtam-item {
      width: 129px;
      height: 129px;
      float: left;
      margin-right: 8px;
      position: relative;
      .no-img {
        width: 129px;
        height: 129px;
        background: #F0F2F5;
      }
      &:nth-child(1) {
        margin-left: 8px;
      }
    }
  }
</style>
