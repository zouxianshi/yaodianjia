<template>
  <div class="spec-info-model">
    {{ JSON.stringify(specSelectData) }}
    <el-table :data="specInfoData" style="width: calc(100% - 82px);min-height:151px;">
      <!--<el-table-column v-for="(propsf,indexs) in dynamicProp" :key="indexs">
        <template slot="header">
          <span class="tip">*</span>
          {{ propsf.name }}
        </template>
        <template slot-scope="scope">
          {{ scope.row }}
          <span v-if="scope.row[propsf.keys]" v-text="scope.row[propsf.keys]" />
          <template v-if="!is_query">
            <edit-table :title="propsf.name" :keys="propsf.keys" :info="scope.row" max-length="50" :index="scope.$index" @saveInfo="handleEditTabSpecs"/>
          </template>
        </template>
      </el-table-column>-->

      <el-table-column v-for="(item,$index) in specSelectData" :key="$index">
        <template slot="header">
          <span class="tip">*</span>
          {{ item.name }}
        </template>
        <template slot-scope="scope">
          <m-column-spec :item="scope.row" />
        </template>
      </el-table-column>

      <el-table-column>
        <template slot="header">
          <span class="tip">*</span> 商品编码
        </template>
        <template slot-scope="scope">
          <m-column-erp-code :item="scope.row" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="条形码" prop="barCode">
        <template slot-scope="scope">
          <m-column-bar-code :item="scope.row" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="货主" min-width="100">
        <template slot-scope="scope">
          <template>
            <el-select
              v-model="scope.row.owner"
              size="small"
              clearable
              :disabled="scope.row.isSku===0"
            >
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
          <m-column-mprice :item="scope.row" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="限购数量">
        <template slot-scope="scope">
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
</template>
<script>
import mColumnUpload from './columnUpload'
import mColumnLimitNum from './columnLimitNum'
import mColumnMprice from './columnMprice'
import mColumnBarCode from './columnBarCode'
import mColumnErpCode from './columnErpCode'
import mColumnSpec from './columnSpec'

export default {
  name: 'SpecInfo',
  data() {
    return {
      specListData: [],
      specSelectData: []
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
  watch: {},
  beforeCreate() {
  },
  created() {
    debugger
    this.specListData = _.cloneDeep(this.specList)
    this.specSelectData = _.cloneDeep(this.specSelect)
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

  }
</style>
