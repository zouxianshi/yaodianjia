<template>
  <div class="bandGoods">
    <el-tooltip class="item" effect="dark" content="绑定商品" placement="top">
      <el-button type="primary" circle icon="el-icon-goods" class="band-btn" size="mini" @click="handleShow" />
    </el-tooltip>
    <el-dialog
      title="分组绑定商品"
      :visible.sync="dialogVisible"
      width="50%"
      append-to-body
      :lock-scroll="true"
      :close-on-click-modal="false"
    >
      <div style="margin-bottom:10px">
        <p style="margin-bottom:10px">分组名称：<span v-text="info.name" /></p>
        <!-- <p>分类下面</p> -->
      </div>
      <section @keydown.enter="getList">
        <div
          class="search-form"
          style="margin-top:20px;margin-bottom:10px"
        >
          <div class="search-item">
            <span class="label-name">商品信息</span>
            <el-input
              v-model.trim="listQuery.name"
              size="mini"
              style="width:100px"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="listQuery.manufacture"
              style="width:100px"
              size="mini"
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <el-button type="primary" size="mini" @click="getList">查询</el-button>
            <el-button type="" size="mini" @click="resetQuery">重置</el-button>
          </div>
        </div>
      </section>
      <div>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          max-height="300"
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
              <template v-if="scope.row.mainPic">
                <el-image
                  style="width: 40px; height: 40px"
                  :src="showImg(scope.row.mainPic)"
                  lazy
                  fit="contain"
                  :preview-src-list="[`${showImg(scope.row.mainPic)}`]"
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
            show-overflow-tooltip
            prop="manufacture"
          />
        </el-table>
        <div class="text-right" style="margin-top:10px">
          <el-pagination
            small
            :current-page="listQuery.currentPage"
            background
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="subLoading" @click="handleSubBand">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { bandGoods, getGoodsList } from '@/api/group'
import { mapGetters } from 'vuex'
import { findArray } from '@/utils/index'
export default {
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
        pageSize: 10,
        name: '',
        manufacture: '',
        onlyCom: true,
        typeId: ''
      },
      is_choose: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['name', 'merCode'])
  },
  created() {
  },
  methods: {
    getList() {
      this.loading = true
      this.listQuery.typeId = this.info.id
      getGoodsList(this.listQuery).then(res => {
        const { data, totalCount } = res.data
        if (data) {
          this.tableData = data
          setTimeout(() => {
            this.setChoose()
          }, 500)
          this.total = totalCount
        }
        this.loading = false
      }).catch(_ => {
        this.loading = false
      })
    },
    setChoose() {
      this.tableData.forEach(v => {
        if (v.currentType) {
          const findIndex = findArray(this.is_choose, { id: v.id })
          if (findIndex === -1) { // 不存在的放入储存的数组中
            this.is_choose.push(v)
          }
          this.$refs.multipleTable.toggleRowSelection(v)
        }
      })
    },
    handleSelectionChange(row) {
      this.multipleSelection = row
    },
    handleShow() {
      this.getList()
      this.is_choose = []
      this.dialogVisible = true
    },
    resetQuery() {
      this.listQuery.name = ''
      this.listQuery.manufacture = ''
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleSubBand() {
      const data = {
        'addIds': [],
        'delIds': [],
        'empty': true,
        'merCode': this.merCode,
        'typeId': this.info.id,
        'userName': this.name
      }
      this.multipleSelection.map(v => {
        if (!v.currentType) {
          data.addIds.push(v.id)
        }
      })
      this.is_choose.map(v => {
        const findIndex = findArray(this.multipleSelection, { id: v.id })
        if (findIndex === -1) {
          data.delIds.push(v.id)
        }
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
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
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
