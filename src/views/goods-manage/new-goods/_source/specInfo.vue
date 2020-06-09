<template>
  <div v-loading="!isSpecSelectData" class="spec-info-model">
    <div v-if="isSpecSelectData" class="sim-table">
      <el-table :data="specListData" style="width: calc(100% - 82px);min-height:151px;">
        <!--规格列表-->
        <template v-for="(item,$index) in specSelectData">
          <el-table-column v-if="item.selected" :key="$index">
            <template slot="header">
              <span class="tip">*</span>
              {{ item.attributeName }}
            </template>
            <template slot-scope="scope">
              <m-column-spec :item="scope.row" :index="scope.$index" :attribute-name="item.attributeName" :spec-select-data="specSelectData" />
            </template>
          </el-table-column>
        </template>
        <el-table-column>
          <template slot="header">
            <span class="tip">*</span> 商品编码
          </template>
          <template slot-scope="scope">
            <!--商品编码-->
            <m-column-erp-code :item="scope.row" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="条形码" prop="barCode">
          <!--条形码-->
          <template slot-scope="scope">
            <m-column-bar-code :item="scope.row" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="货主" min-width="100">
          <template slot-scope="scope">
            <!--货主-->
            <template>
              <el-select v-model="scope.row.owner" size="small" clearable :disabled="scope.row.isSku===0">
                <el-option label="自营" :value="0" />
                <el-option label="平安" :value="1" />
              </el-select>
            </template>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <span class="tip">*</span> 参考价格
          </template>
          <template slot-scope="scope">
            <!--参考价格-->
            <m-column-mprice :item="scope.row" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="限购数量">
          <template slot-scope="scope">
            <!--限购数量-->
            <m-column-Limit-num :item="scope.row" :index="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <!--规格图片上传-->
            <m-column-upload :item="scope.row" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import mColumnUpload from './columnUpload'
import mColumnLimitNum from './columnLimitNum'
import mColumnMprice from './columnMprice'
import mColumnBarCode from './columnBarCode'
import mColumnErpCode from './columnErpCode'
import mColumnSpec from './columnSpec'
/* eslint-disable */
export default {
  name: 'SpecInfo',
  data() {
    return {
      specListData: [],
      specSelectData: [],
      isSpecSelectData:true
    }
  },
  props: {
    specList: {
      type: Array,
      default: () => []
    },
    specSelect: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  },
  watch: {
    'specList': {
      deep: true,
      immediate: true,
      handler(v) {
        this.isSpecSelectData = false
        this.specListData = v
        setTimeout(() => {
          this.isSpecSelectData = true
        })
      }
    }
  },
  beforeCreate() {
  },
  created() {
    this.specSelectData = this.specSelect
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
  components: { mColumnUpload, mColumnLimitNum, mColumnMprice, mColumnBarCode, mColumnErpCode, mColumnSpec }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-info-model {
    min-height:151px;
    .sim-table {
    }
  }
</style>
