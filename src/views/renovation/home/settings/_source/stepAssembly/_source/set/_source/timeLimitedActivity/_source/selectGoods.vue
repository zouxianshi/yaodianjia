<template>
  <div class="set-select-goods-model">
    <div class="scrollbar sscm-select-box">
      <el-form label-width="80px">
        <el-form-item label="已选">
          <el-tag v-for="(items,$index) in selectList" :key="$index">{{ items.name }}</el-tag>
        </el-form-item>
      </el-form>
    </div>
    <div class="sscm-condition-box">
      <!--<span class="sscm-coupon-type">
        <span class="sscm-text-1">活动类型 </span>
      </span>-->
      <span class="sscm-coupon-name">
        <span class="sscm-text-1">当前活动：{{ item.pmtName }} </span>
        <el-input v-model="searchParams.itemName" size="mini" placeholder="请输入名称" style="width: 200px;" />
      </span>
      <el-button type="primary" size="mini" style="margin-left: 8px;" @click="onQuery">查询</el-button>
    </div>
    <div class="sscm-list-box">
      <el-table size="mini" :data="list" style="width: 100%" height="250" class="hdv-table">
        <el-table-column width="46">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.selected" @change="onSelect($event,scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="80">
          <template slot-scope="scope">
            <img :src="showImg(scope.row.img)" alt="" class="sscm-table-img">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name" />
        <el-table-column label="商品编码" prop="erpCode" />
        <el-table-column label="规格" prop="specStr" />
        <el-table-column label="参考价(元)">
          <template slot-scope="scope">
            <span style="color:#ff0000;font-size: 12px;">¥{{ scope.row.mprice }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sscm-page">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange" />
    </div>
  </div>
</template>
<script>
/**
   * 急忙求产出，不拆分了
   * Hurry to seek output, not to split !!!
   * Google translate
   */
import { mapState } from 'vuex'
import { itemParams } from './../../../../../default'
import renovationService from '@/api/renovation'

export default {
  name: 'SetSelectGoods',
  data() {
    return {
      list: [],
      selectList: [],
      total: null,
      searchParams: {
        currentPage: 1,
        itemName: '',
        pageSize: 20,
        origin: 0
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
    $verification() {
      const { selectList, list, item: { max }} = this
      if (list.length && !selectList.length) {
        this.$message.error('请选择商品')
        return false
      }
      if (_.size(selectList) > max) {
        this.$message.error(`当前组件可展示${max}个商品`)
        return false
      }
      return selectList
    },
    currentChange(v) {
      this.searchParams.currentPage = v
      this.getData()
    },
    onQuery() {
      this.searchParams.currentPage = 1
      this.getData()
    },
    onSelect(is, item) {
      if (is) {
        this.selectList.push(item)
      } else {
        this.selectList = _.reject(this.selectList, ['id', item.id])
      }
    },
    getData() {
      const { activityId, chooseFlag } = this.item
      const p = { activityId, chooseFlag, storeId: this.centerStoreId }
      const is = specId => _.some(this.item.itemList, ['itemId', specId])
      renovationService.getHomepageActItemList({ ...this.searchParams, ...p }).then(res => {
        this.total = res.data.totalCount
        this.list = _.map(res.data.data, v => {
          const { price, mprice, name, picUrl, specId, erpCode, specStr, id } = v
          return {
            ...itemParams,
            price,
            mprice,
            name,
            itemId: specId,
            img: this.showImg(picUrl),
            selected: is(specId),
            erpCode,
            specStr,
            commodityId: id
          }
        })
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getData()
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
    ...mapState('mall', ['centerStoreId'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-select-goods-model {
    margin: -20px 0;
    .sscm-select-box {
      height: 84px;
      padding: 8px 0;
      overflow-y: scroll;
      background: #F2F2F6;
      .el-tag {
        margin-right: 8px;
      }
    }
    .sscm-condition-box {
      padding: 16px 0;
      .sscm-coupon-type {
        display: inline-block;
        margin-right: 12px;
      }
      .sscm-text-1 {
        font-size: 12px;
        color: #666;
        display: inline-block;
        margin-right: 6px;
      }
    }
    .sscm-page {
      text-align: right;
      padding-top: 16px;
    }
    .sscm-list-box {
      .hdv-table {
        table {
          thead {
            tr {
              th {
                height: 24px;
                background: #F1F8FF;
              }
            }
          }
        }
        .sscm-table-img{
          width:40px;
          height: 40px;
          padding:3px;
          border: 1px solid #ccc;
          border-radius:4px;
          display: block;
        }
      }
    }
  }
</style>
