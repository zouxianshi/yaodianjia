<template>
  <div class="set-banner-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item-list="itemParams.itemList" />
    </div>
    <div class="snm-view">
      <template v-for="(el,$index) in itemParams.itemList">
        <m-item-card :key="$index" :title="`轮播图${$index + 1}`" :is-submit="$index === itemParams.itemList.length - 1" :is-delete="(itemParams.itemList.length - 1) > 0" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete($event,$index)">
          <m-form-item :key="$index" :ref="`banner_${$index}`" height="41px" :el="el" :ips="{type:itemParams.type,subType:itemParams.subType,index:$index}" @on-el-update="onElUpdate($event,$index)" />
          <div v-if="($index === itemParams.itemList.length - 1) && itemParams.itemList.length < itemParams.max" slot="create" style="margin-top: 16px">
            <el-button size="mini" @click="onAddBanner">添加轮播图</el-button>
          </div>
        </m-item-card>
      </template>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { itemParams, defaultParams } from './../../../../default'
import mItemCard from './../itemCard'
import mFormItem from './../advertisement/_source/formItem'
import mBanner from './../../../preview/_source/banner/banner'

export default {
  name: 'SetBanner',
  data() {
    return {
      selectIndex: 0,
      itemParams: {}
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations('renovation', ['setStaticDragData']),
    onAddBanner() {
      this.itemParams.itemList.push(_.cloneDeep(itemParams))
    },
    onElUpdate(el, index) {
      this.$set(this.itemParams.itemList, index, el)
    },
    onAssSubmit() {
      const { itemList } = this.itemParams
      let flag = true

      _.map(itemList, (v, i) => {
        const refs = this.$refs[`banner_${i}`][0].$verification()
        if (!refs) {
          flag = false
        }
      })

      if (flag) {
        this.setStaticDragData({
          banner: {
            ..._.cloneDeep(this.itemParams),
            ..._.cloneDeep(defaultParams[`banner_first`])
          }
        })
      }
    },
    onAssDelete($event, index) {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== index)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
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
          return mBanner
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-banner-model {
    .set-view-ass {
      .banner-first-item-model,
      .banner-second-item-model,
      .banner-third-item-model,
      .banner-four-item-model {
        border: 1px solid #F0F0F0;
        box-sizing: border-box
      }
    }
  }
</style>
