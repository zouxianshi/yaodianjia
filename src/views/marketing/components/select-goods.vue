<template>
  <div class="select-goods">
    <el-table :data="cutData" size="small" style="width: 100%" max-height="500">
      <template v-for="col in cols">
        <el-table-column
          v-if="!col.render"
          :key="col.prop"
          :label="col.label"
          :show-overflow-tooltip="true"
          :prop="col.prop"
          :min-width="col.width"
        />
        <el-table-column
          v-else-if="col.type==='img'"
          :key="col.prop"
          :label="col.label"
          :prop="col.prop"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.picUrl && scope.row.picUrl!==''" style="width: 60px; height: 60px">
              <div class="x-image__preview">
                <el-image
                  style="width: 60px; height: 60px"
                  fit="contain"
                  :src="showImg(scope.row.picUrl)"
                  :preview-src-list="[showImg(scope.row.picUrl)]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂无上传</div>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button
            type="text"
            :disabled="disabled"
            @click.stop="handleDel(scope.row, scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="c-footer">
      <el-pagination
        background
        :current-page="pager.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pager.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>
<script>
// import noData from '@/components/NoData'
export default {
  // components: { noData },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [], // 数据源table
      cutData: [],
      cols: [
        {
          prop: 'picUrl',
          label: '商品图片',
          type: 'img',
          render: true // 交给后续逻辑渲染
        },
        {
          prop: 'erpCode',
          label: '商品编码'
        },
        {
          prop: 'name',
          label: '商品名称'
        },

        {
          prop: 'mprice',
          label: '参考价(元)'
        },
        {
          prop: 'productName',
          label: '商品规格'
        }
      ],
      pager: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    dataFrom(data) {
      console.log('111111111111111111111', data)
      this.tableData = Array.isArray(data)
        ? data.map(item => {
          return {
            ...item,
            productName: this.formatSkuInfo(item.specSkus || '')
          }
        })
        : []
      this.pager = {
        ...this.pager,
        total: this.tableData.length
      }
      this.handleCutData()
    },
    // 获取数据源
    handleCutData() {
      const { current, size } = this.pager
      console.log(
        '1111111111',
        this.pager,
        this.tableData.slice((current - 1) * size, size)
      )
      this.cutData = this.tableData.slice((current - 1) * size, size * current)
    },
    // 格式化规格信息
    formatSkuInfo(skuList) {
      let skuStr = ''
      if (skuList && skuList.length > 0) {
        skuList.forEach(v => {
          skuStr += `${v.skuKeyName}:${v.skuValue}，`
        })
        skuStr = skuStr.substr(0, skuStr.length - 1)
      }
      return skuStr
    },
    handleDel(item, index) {
      this.$emit('del-item', item, index)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager = {
        ...this.pager,
        size: val,
        current: 1
      }
      this.handleCutData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager = {
        ...this.pager,
        current: val
      }
      this.handleCutData()
    }
  }
}
</script>

<style lang="scss">
.select-goods {
  .c-footer {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
