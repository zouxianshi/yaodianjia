<template>
  <div class="va-four-advertise-model">
    <div v-for="(el,i) in item.itemList" :key="i" class="vfam-item">
      <m-tag-ads v-if="source === 'sa'" :text="`广告${i + 1}`" />
      <img v-if="el.img" :src="showImg(el.img)" alt="" width="199" height="91">
      <div v-else class="no-img">
        <m-icons :is-center="true" text="请上传广告图" />
      </div>
    </div>
  </div>
</template>
<script>
import mIcons from './../../_source/icons'
import mTagAds from './../_source/tagAds'
export default {
  name: 'VaFourAdvertise',
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
  .va-four-advertise-model {
    overflow: hidden;
    .vfam-item {
      width: 199px;
      height: 91px;
      float: left;
      margin: 0 3px;
      margin-bottom: 6px;
      position: relative;
      .no-img {
        width: 199px;
        height: 91px;
        background: #F0F2F5;
      }
      &:nth-child(1),&:nth-child(3) {
        margin-left: 8px;
      }
      &:nth-child(3),&:nth-child(4) {
        margin-bottom: 0;
      }
    }
  }
</style>
