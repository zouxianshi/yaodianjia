<template>
  <div class="set-navigation-model">
    <div class="set-view-ass">
      <component :is="mod" source-type="set" :item="itemParams" :active="`navigation_${selectIndex}`" @on-drag="onDrag" @on-select="onSelect" @on-create="onCreate" />
    </div>
    <div class="snm-view">
      <m-item-card :title="el.name ? el.name : `导航${selectIndex + 1}`" :is-delete="itemParams.itemList.length > (itemParams.subType === 'first' ? 4 : 5)" @on-ass-submit="onAssSubmit" @on-ass-delete="onAssDelete">
        <m-form-item v-if="isItem" ref="formItem" :el="el" :item-params="{...itemParams,index:selectIndex}" @on-el-update="onElUpdate" />
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams, saveDragItem } from './../../../../default'
import mFirst from './../../../preview/_source/navigation/first'
import mSecond from './../../../preview/_source/navigation/second'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'

export default {
  name: 'SetNavigation',
  data() {
    return {
      selectIndex: 0,
      itemParams: {},
      el: {},
      isItem: true
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onDrag() {
      this.onSelect({ el: {}, i: 0 })
    },
    onElUpdate(item) {
      this.$set(this.itemParams.itemList, this.selectIndex, item)
    },
    onSelect({ el, i }) {
      return new Promise((resolve, reject) => {
        this.isItem = false
        this.selectIndex = i
        this.el = this.itemParams.itemList[this.selectIndex]
        setTimeout(() => {
          this.isItem = true
          resolve()
        })
      })
    },
    onCreate() {
      this.itemParams.itemList.push(_.cloneDeep(itemParams))
      this.onSelect({ el: {}, i: _.size(this.itemParams.itemList) - 1 })
    },
    onAssSubmit() {
      let index = null
      _.forEach(this.itemParams.itemList, (v, i) => {
        if (_.isEmpty(v.img) || _.isEmpty(v.url) || _.isEmpty(v.name)) {
          index = i
          return false
        }
      })

      if (index !== null) {
        this.onSelect({ el: {}, i: index }).then(() => {
          this.$refs.formItem.$verification()
        })
      } else {
        // todo 提交
        saveDragItem(this.$root, this.itemParams)
      }
    },
    onAssDelete() {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== this.selectIndex)
      this.onSelect({ el: {}, i: _.size(this.itemParams.itemList) - 1 })
    }
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
    this.el = this.itemParams.itemList[this.selectIndex]
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
        case 'second':
          return mSecond
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-navigation-model {
    .snm-view {
      min-height: 260px;
    }
  }
</style>
