<template>
  <div class="va-five-advertise-model">
    <div v-for="(el,i) in item.itemList" :key="i">
      <m-tag-ads v-if="source === 'sa'" :text="`广告${i + 1}`" />
      <img v-if="el.img" :src="showImg(el.img)" alt="" width="100%">
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
  name: 'VaFiveAdvertise',
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
  computed: {},
  components: { mTagAds, mIcons }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-five-advertise-model {
    position: relative;
    .no-img {
      width: 100%;
      height: 300px;
      background: #F0F2F5;
    }
  }
</style>
