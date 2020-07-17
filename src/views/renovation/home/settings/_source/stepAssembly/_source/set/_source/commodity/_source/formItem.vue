<template>
  <div class="commodity-form-item-model">
    <div class="cfim-btn-goods">
      <el-button size="mini" @click="dialogVisible = true">选择商品</el-button><span class="sa-mandatory-asterisk">*</span>
      <span class="cfim-text-1">已选：{{ itemList.length }}</span>
    </div>
    <div class="cfim-item-box">
      <v-draggable v-model="itemList" draggable=".cfim-item" v-bind="dragOptions" @end="onEnd">
        <div v-for="(el,$index) in itemList" :key="$index" class="cfim-item">
          <div class="cfim-good-pic"><img :src="showImg(el.img)"></div>
          <div class="cfim-good-name">{{ tru(el.name,12) }}</div>
          <div class="cfim-good-del"><el-button type="text" :disabled="source === 'adFrame' ? itemList.length <= 3 : false" @click="onItemDelete($index)">删除</el-button></div>
        </div>
      </v-draggable>
    </div>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body size="700px" :visible.sync="dialogVisible">
      <div slot="title">选择商品 <span class="sa-mandatory-asterisk">*</span></div>
      <m-goods-table v-if="dialogVisible" ref="gt" :g-source="source === 'adFrame' ? 'new-home' : 'home'" :item-list="itemList" :sub-type="cpdSubType" @on-update="_onUpdate" />
    </el-drawer>
  </div>
</template>
<script>
import vDraggable from 'vuedraggable'
import { itemParams } from './../../../../../default'
import mGoodsTable from '@/views/mall/homeSettings/_source/settingsArea/_source/goodsTable'
export default {
  name: 'CommodityFormItem',
  data() {
    return {
      dialogVisible: false,
      itemList: []
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    source: {
      type: String,
      default: 'commodity'
    }
  },
  methods: {
    onEnd() {
      this.$emit('on-update', this.itemList)
    },
    tru(key, length) {
      return _.truncate(key, { 'length': length, 'omission': '' })
    },
    onItemDelete(i) {
      this.$emit('on-el-delete', i)
    },
    _onUpdate(itemList, fn) {
      this.itemList = _.map(itemList, v => {
        const { mprice, price, commodityId, specId } = v
        return {
          ...itemParams,
          ...v, mprice, price, commodityId, specId,
          itemId: specId
        }
      })

      if (this.source === 'adFrame' && _.size(this.itemList) < 3) {
        this.$message.error('最少限制3个商品')
        fn(false)
        return
      }

      fn && fn(true)

      this.$emit('on-update', this.itemList)
    }
  },
  watch: {
    'item.itemList': {
      deep: true,
      immediate: true,
      handler(v) {
        this.itemList = _.map(v, v1 => {
          return {
            ...v1,
            specId: v1.itemId
          }
        })
      }
    }
  },
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
    dragOptions() {
      return {
        animation: 150,
        disabled: false,
        ghostClass: 'ghost',
        group: {
          put: false,
          name: 'shared',
          pull: 'clone'
        }
      }
    },
    cpdSubType() {
      const { subType } = this.item
      switch (subType) {
        case 'first':
          return 'four'
        case 'second':
          return 'first'
        case 'third':
          return 'second'
        case 'four':
          return 'third'
      }
    }
  },
  components: { mGoodsTable, vDraggable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .commodity-form-item-model {
    .cfim-btn-goods {
      .cfim-text-1 {
        font-size: 12px;
        color: #4A4A4A;
        margin-left: 20px;
      }
    }
    .cfim-item-box {
      margin-top: 10px;
      .cfim-item {
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          .cfim-good-name {
            color: #147de8;
          }
        }
        .cfim-good-pic {
          width: 42px;
          float: left;
          >img {
            width: 40px;
            height: 40px;
            display: block;
            border: 1px solid #F0F0F0;
            padding: 2px;
          }
        }
        .cfim-good-name {
          width: calc(100% - 82px);
          float: left;
          font-size: 14px;
          color: #4A4A4A;
          line-height: 40px;
          margin-left: 8px;
        }
        .cfim-good-del {
          float: left;
          width: 30px;
        }
      }
    }
  }
</style>
