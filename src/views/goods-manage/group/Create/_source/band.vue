<template>
  <div class="bandGoods">
    <el-button type="primary" circle icon="el-icon-goods" class="band-btn" size="mini" @click="handleShow" />
    <el-dialog
      title="分组绑定商品"
      :visible.sync="dialogVisible"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <div style="margin-bottom:10px">
        <p style="margin-bottom:10px">分组名称：<span v-text="info.name" /></p>
        <p>分类下面</p>
      </div>
      <div>
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商品图片"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.stPath">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.mainPic"
                  lazy
                  fit="contain"
                  :preview-src-list="[`${scope.row.mainPic}`]"
                />
              </template>
              <template v-else>
                <p class="">暂未上传</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            align="left"
            min-width="160"
            label="商品名称"
          />
          <el-table-column
            align="left"
            min-width="120"
            label="生产企业"
            prop="manufacture"
          />
        </el-table>
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSubBand">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getGoodsList } from '@/api/depot'
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import { bandGoods } from '@/api/group'
import { mapGetters } from 'vuex'
export default {
  components: { Pagination },
  mixins: [mixins],
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      multipleSelection: [],
      tableData: [],
      subLoading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getGoodsList(this.listQuery).then(res => {
        const { data, totalCount } = res.data
        if (data) {
          this.tableData = data
          this.total = totalCount
        }
        this.loading = false
      }).catch(_ => {
        this.loading = false
      })
    },
    handleSelectionChange(row) {
      this.multipleSelection = row
    },
    handleShow() {
      this.getList()
      this.dialogVisible = true
    },
    handleSubBand() {
      const data = {
        'ids': [],
        'typeIds': [
          this.info.id
        ],
        'userName': this.name
      }
      this.multipleSelection.map(v => {
        data.ids.push(v.id)
      })
      this.subLoading = true
      bandGoods(data).then(res => {
        this.$message({
          message: '绑定商品成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.subLoading = false
      }).catch(_ => {
        this.subLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bandGoods{
    display: inline-block;
    .headers{
        margin-bottom: 10px;
    }
    .band-btn{
        margin-right: 10px;
    }
}
</style>
