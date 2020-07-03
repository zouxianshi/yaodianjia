<template>
  <div class="commodity-form-item-model">
    <div class="cfim-btn-goods">
      <el-button size="mini" @click="dialogVisible = true">选择商品</el-button>
      <span class="cfim-text-1">已选：{{ itemList.length }}</span>
    </div>
    <div class="cfim-item-box">
      <table>
        <tr v-for="(el,$index) in itemList" :key="$index">
          <td width="60"><img class="cfim-good-img" :src="showImg(el.img)"></td>
          <td><span class="cfim-good-name">{{ el.name }}</span></td>
          <td width="50"><el-button type="text" :disabled="source === 'adFrame' ? itemList.length <= 3 : false" @click="onItemDelete($index)">删除</el-button></td>
        </tr>
      </table>
    </div>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body size="700px" :visible.sync="dialogVisible">
      <div slot="title">选择商品</div>
      <m-goods-table v-if="dialogVisible" ref="gt" :g-source="source === 'adFrame' ? 'new-home' : 'home'" :item-list="itemList" :sub-type="cpdSubType" @on-update="_onUpdate" />
    </el-drawer>
  </div>
</template>
<script>
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
        this.itemList = v
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
  components: { mGoodsTable }
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
      table {
        width: 100%;
        tr {
          td {
            height: 52px;
          }
        }
      }
      .cfim-good-img {
        width: 42px;
        height:42px;
        border: 1px solid #F0F0F0;
        padding: 4px;
      }
      .cfim-good-name {
        font-size: 14px;
        color: #4A4A4A;
        line-height: 52px;
      }
      .cfim-good-delete {
        font-size: 14px;
        color: #4F88FF;
        line-height: 52px;
        display: block;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>
