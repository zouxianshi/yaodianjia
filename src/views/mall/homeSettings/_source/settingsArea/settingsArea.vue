<template>
  <div class="settings-area-model">
    <component :is="mod" v-if="isComponent" :item="item" />
  </div>
</template>
<script>
// import { uuid } from '@/utils'
import { mapMutations, mapState } from 'vuex'
import mNavigation from './navigation'
import mAdvertise from './advertise'
import mRecommend from './recommend'
import mCommodity from './commodity'
import mTitle from './title'
import mSearchHint from './searchHint'
import { itemParams } from './../_source/default'

export default {
  name: 'SettingsArea',
  components: {},
  props: {},
  data() {
    return {
      item: {
        type: 'mall-title',
        itemList: [itemParams]
      },
      isComponent: true
    }
  },

  computed: {
    ...mapState('mall', ['saLoading']),
    mod() {
      switch (this.item.type) {
        case 'title':
          return mTitle
        case 'mall-title':
          return mTitle
        case 'mall-search-hint':
          return mSearchHint
        case 'advertise':
          return mAdvertise
        case 'recommend':
          return mRecommend
        case 'commodity':
          return mCommodity
        case 'navigation':
          return mNavigation
        default:
          return mTitle
      }
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
  methods: {
    ...mapMutations('mall', ['setLoading']),
    setSelected(item) {
      this.isComponent = false
      this.setLoading({ type: 'sa', is: true })

      // No caching update uuid.
      // this.item = _.assign(item, {
      //   uuid: `${uuid(`${item.type}-`)}${uuid()}${uuid()}${uuid()}`
      // })

      this.item = item

      setTimeout(() => {
        this.isComponent = true
        this.setLoading({ type: 'sa', is: false })
      })
    }
  },
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .settings-area-model {
    min-height: 500px;
    @media screen and (min-width:1500px) {
      .sam-width{
        width: 70%;
      }
    }
    .el-tabs__nav-scroll {
      padding-left: 110px;
      .el-tabs__item {
        height: 36px;
        line-height: 36px;
      }
    }
    .sa-error {
      font-size: 12px;
      color: #ff0000;
    }
  }
</style>
