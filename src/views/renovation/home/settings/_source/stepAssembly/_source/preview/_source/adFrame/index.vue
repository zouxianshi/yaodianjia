<template>
  <div class="ad-frame-index-model">
    <div class="afim-box">
      <div class="afim-title">
        <strong>{{ item.subTitle || '主标题' }}</strong>
        <span>{{ item.title || '副标题' }}</span>
      </div>
    </div>
    <div class="afim-comp-box">
      <component :is="mod" :item="item" />
    </div>
  </div>
</template>
<script>
import mFirst from './first'
export default {
  name: 'AdFrameIndex',
  data() {
    return {}
  },
  props: {
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
    mod() {
      switch (this.item.subType) {
        case 'first':
          return mFirst
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .ad-frame-index-model {
    min-height: 180px;
    .afim-box {
      height: 180px;
      border-radius:8px 8px 0 0;
      background: -moz-linear-gradient(top,  rgba(245,41,42,0.94) 0%, rgba(245,41,42,0.94) 20%, rgba(245,41,42,0) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top,  rgba(245,41,42,0.94) 0%,rgba(245,41,42,0.94) 20%,rgba(245,41,42,0) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom,  rgba(245,41,42,0.94) 0%,rgba(245,41,42,0.94) 20%,rgba(245,41,42,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f5292a', endColorstr='#00f5292a',GradientType=0 ); /* IE6-9 */
      .afim-title {
        color: #fff;
        padding: 20px;
        strong {
          font-size: 15px;
        }
        span {
          font-size: 12px;
          padding-left: 6px;
        }
      }
    }
    .afim-comp-box {
      margin-top: -128px;
      padding: 0 8px;
    }
  }
</style>
