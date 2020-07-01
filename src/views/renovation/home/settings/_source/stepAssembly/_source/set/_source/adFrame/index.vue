<template>
  <div class="set-ad-frame-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" />
    </div>
    <div class="snm-view">
      <m-item-card title="广告框设置" @on-ass-submit="onAssSubmit">
        <el-divider content-position="left">标题设置</el-divider>
        <el-form label-width="90px" size="mini">
          <el-form-item label="主标题">
            <el-input v-model="itemParams.subTitle" maxlength="10" @change="onUploadItem" />
            <div v-if="error.isSubTitle" class="sa-assembly-error">
              {{ error.isSubTitle }}
            </div>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="itemParams.title" maxlength="8" @change="onUploadItem" />
            <div v-if="error.isTitle" class="sa-assembly-error">
              {{ error.isTitle }}
            </div>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">商品选择</el-divider>
        <div>
          <m-form-item :item="itemParams" @on-el-delete="onElDelete" @on-update="onUpdate" />
        </div>
        <div v-if="error.isGoods" class="sa-assembly-error">
          {{ error.isGoods }}
        </div>
      </m-item-card>
    </div>
  </div>
</template>
<script>
import { itemParams, saveDragItem } from './../../../../default'
import mAdFrame from './../../../preview/_source/adFrame'
import mItemCard from './../itemCard'
import mFormItem from './../commodity/_source/formItem'
export default {
  name: 'SetTitle',
  data() {
    return {
      dialogVisible: false,
      itemParams: {},
      error: {
        isSubTitle: false,
        isTitle: false,
        isGoods: false
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onUploadItem() {
      const { subTitle, title, itemList } = this.itemParams

      this.reset()

      let flag = true

      if (!subTitle) {
        this.error.isSubTitle = '请输入主标题'
        flag = false
      }

      if (!title) {
        this.error.isTitle = '请输入副标题'
        flag = false
      }

      if (!itemList.length) {
        this.error.isGoods = '请选择广告商品'
        flag = false
      }

      return flag
    },
    onAssSubmit() {
      if (this.onUploadItem()) {
        // todo 提交
        saveDragItem(this.$root, this.itemParams)
      }
    },
    reset() {
      this.error = _.assign(this.error, {
        isSubTitle: false,
        isTitle: false,
        isGoods: false
      })
    },
    onUpdate(itemList) {
      this.itemParams.itemList = _.map(itemList, v => {
        return {
          ...itemParams,
          ...v,
          itemId: v.specId
        }
      })
    },
    onElDelete(index) {
      this.itemParams.itemList = _.filter(this.itemParams.itemList, (v, i) => i !== index)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
    console.log(this.itemParams)
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
          return mAdFrame
      }
    }
  },
  components: { mItemCard, mFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-ad-frame-model {
    .set-view-ass {

    }
    .safm-text-1 {
      font-size: 12px;
      margin-left: 10px;
      color: #333;
    }
  }
</style>
