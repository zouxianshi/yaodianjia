<template>
  <div>
    <el-table :data="data" size="small" style="width: 100%">
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
            <div
              v-if="scope.row.mainPic && scope.row.mainPic!==''"
              class="x-img-mini"
              style="width: 60px; height: 60px"
            >
              <div class="x-image__preview">
                <el-image
                  style="width: 60px; height: 60px"
                  fit="contain"
                  :src="showImg(scope.row.mainPic)"
                  :preview-src-list="[showImg(scope.row.mainPic)]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂无上传</div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
// import noData from '@/components/NoData'
export default {
  // components: { noData },
  data() {
    return {
      tableData: [],
      cols: [
        {
          prop: 'mainPic',
          label: '商品图片',
          type: 'img',
          render: true // 交给后续逻辑渲染
        },
        {
          prop: 'name',
          label: '商品名称'
        },
        {
          prop: 'erpCode',
          label: '商品编码'
        },
        {
          prop: 'specId',
          label: 'sku编码'
        },
        {
          prop: 'mprice',
          label: '参考价'
        }
      ],
      data: []
    }
  }
}
</script>
