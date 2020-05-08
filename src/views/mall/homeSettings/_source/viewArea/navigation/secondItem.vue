<template>
  <div class="n-second-item-model">
    <m-tag-ads v-if="source === 'sa'" :text="`导航${index + 1}`" />
    <template v-if="item.img">
      <img v-if="item.img.startsWith('http')" class="icon" :src="item.img" :alt="item.name">
      <div v-else>
        <m-icons :icon-clx="item.img" :size="55" />
      </div>
    </template>
    <m-Icons v-else icon-clx="no-data" :size="55" />
    <p class="text">{{ item.name || '请填写' }}</p>
  </div>
</template>
<script>
import mTagAds from './../_source/tagAds'
import mIcons from './../../_source/icons'
export default {
  name: 'VaSecondItem',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
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
  components: { mIcons, mTagAds }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .n-second-item-model {
    text-align: center;
    width: 55px;
    margin: 0 0px 16px 0px;
    position: relative;
    .icon {
      width: 55px;
      height: 55px;
      display: block;
    }
    .text {
      font-size: 13px;
      color: #333;
      padding-top: 8px;
    }
  }
</style>
