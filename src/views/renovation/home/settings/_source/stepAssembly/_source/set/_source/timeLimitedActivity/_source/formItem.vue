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
          <td width="50"><span class="cfim-good-delete" @click="onItemDelete($index)">删除</span></td>
        </tr>
      </table>
    </div>
    <el-dialog title="选择商品" append-to-body	:visible.sync="dialogVisible" width="800">
      <m-select-goods v-if="dialogVisible" ref="selectGoods" :item="item" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCouponSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mSelectGoods from './selectGoods'
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
    }
  },
  methods: {
    onCouponSubmit() {
      const selectGoods = this.$refs.selectGoods.$verification()
      if (typeof selectGoods === 'object') {
        this.itemList = selectGoods
        this.$emit('on-update', this.itemList)
        this.dialogVisible = false
      }
    },
    onItemDelete(i) {
      this.$emit('on-el-delete', i)
    },
    _onUpdate(itemList) {
      this.itemList = _.map(itemList, v => {
        const { mprice, price, commodityId, specId } = v
        return { ...v, mprice, price, commodityId, specId }
      })
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
  components: { mSelectGoods }
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
