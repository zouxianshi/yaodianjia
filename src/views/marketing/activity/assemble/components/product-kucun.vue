<template>
  <span>
    <el-button type="success" size="mini" @click="handleEditAcStock(rowItem)">编辑活动库存</el-button>
    <el-dialog
      :title="`“${dialogVisibleTitle}”商品活动库存管理:`"
      :visible.sync="dialogVisible"
      width="750px"
      append-to-body
      :close-on-click-modal="false"
      @close="modalQuery.currentPage = 1; modalQuery.total = 1; cleanAllCount = false"
    >
      <div v-loading="listLoading" class="modal-body">
        <p
          style="color: rgb(144, 147, 153); margin-bottom: 10px; line-height: 22px"
        >(拼团活动商品的活动库存被设置为0时，用户无法再开团，已经开的团正常进行，参团人员最多仅可购买一份拼团商品，直到活动结束)</p>
        <el-table :data="modalGoodList" border size="small" width="100%">
          <el-table-column label="序号" width="80">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.sortNumber"
                size="mini"
                @input.native="handleGoodsInput($event,scope.row.sortNumber,scope.$index)"
                @blur="handleInputBlur(scope.$index,scope.row.sortNumber	)"
              />
            </template>
          </el-table-column>
          <el-table-column label="商品" min-width="200">
            <template slot-scope="scope">
              <div class="goods-info">
                <el-image :src="showImg(scope.row.imgUrl)" style="width:100px" />
                <div class="goods-txt">
                  <p v-text="scope.row.productName" />
                  <div style="display:flex;justify-content: space-between;">
                    <span>
                      拼团价：
                      <span class="price">￥{{ scope.row.activityPrice }}</span>
                    </span>
                    <span style="color:#909399">活动库存：{{ scope.row.productActivityCount }}</span>
                  </div>
                  <el-tag type="danger" size="small">{{ scope.row.activityNumber }}人成团</el-tag>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <div class="table-opeater">
                <span>增加活动库存：</span>
                <div class="custom-input">
                  <el-input
                    v-model="scope.row.num"
                    :disabled="scope.row.isClearn"
                    size="small"
                    style="width:80px"
                    class="custom-inner-input"
                    placeholder
                    @input.native="handleInput($event,scope.row)"
                  />
                  <div class="operate">
                    <span class="el-icon-arrow-up" @click="handleAddTime(1,scope.row)" />
                    <span class="el-icon-arrow-down" @click="handleAddTime(2,scope.row)" />
                  </div>
                  <el-link
                    v-if="!scope.row.isClearn"
                    type="primary"
                    :underline="false"
                    style="font-size:13px"
                    @click="handleSetAddNumber(scope.row)"
                  >&nbsp;立即增加</el-link>
                </div>
              </div>
              <el-link
                v-if="!scope.row.isClearn"
                style="font-size:13px"
                :underline="false"
                type="primary"
                @click="handleSettingcount(scope.row)"
              >设置库存活动为0</el-link>
              <p v-else style="color:#909399">已清空活动库存</p>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <el-button type="danger" size="mini" @click="handleClean(true)">清空所有活动库存</el-button>
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="modalQuery.total"
            :page-size="5"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <span slot="footer">
        <el-button type size="small" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" size="small" :loading="saveLoading" @click="handleSubmitStock">确定</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { getActivityGoods, setAssembleStock, clearProductStock } from '@/api/marketing'

export default {
  props: {
    rowItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      dialogVisible: false,
      dialogVisibleTitle: '',
      modalGoodList: [],
      modalQuery: {
        total: 0,
        currentPage: 1
      },
      saveLoading: false,
      listLoading: false,
      cleanAllCount: false // 是否清空所有库存
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this._loadActivityGoods()
      }
    }
  },
  methods: {
    handleEditAcStock(row) {
      this.editInfo = row
      this.dialogVisible = true
      this.dialogVisibleTitle = row.name || ''
    },
    _loadActivityGoods() {
      this.listLoading = true
      // 通过活动id加载商品
      getActivityGoods({
        activityId: this.editInfo.id,
        pageSize: 5,
        currentPage: this.modalQuery.currentPage
      })
        .then(res => {
          const { data } = res.data
          data.map(v => {
            v.isClearn = !!this.cleanAllCount
            v.isAdd = !!this.cleanAllCount
            v.num = ''
            v.productActivityCount = this.cleanAllCount
              ? 0
              : v.productActivityCount
          })
          this.modalGoodList = data
          this.modalQuery.total = res.data.totalCount
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
          this.listLoading = false
        })
    },
    handleClean(val) {
      console.log('handleClean', val)
      this.cleanAllCount = !!val
      this.modalGoodList.map(row => {
        row.productActivityCount = 0
        row.isClearn = true
      })
    },
    handleSubmitStock() {
      // 修改库存
      this.saveLoading = true
      console.log('handleSubmitStock', this.cleanAllCount)
      if (this.cleanAllCount) {
        // 执行清空当前活动id下所有商品库存
        clearProductStock({ activityId: this.rowItem.id }).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.saveLoading = false
            this.dialogVisible = false
          }
        }).catch(() => {
          this.saveLoading = false
        })
      } else {
        setAssembleStock(this.modalGoodList)
          .then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.saveLoading = false
            this.dialogVisible = false
          })
          .catch(_ => {
            this.saveLoading = false
          })
      }
    },
    handleSettingcount(row) {
      // 设置该条记录0库存
      row.productActivityCount = 0
      row.isClearn = true
    },
    handleSetAddNumber(row) {
      // 立即增加库存
      if (!row.num) {
        return
      }
      row.productActivityCount =
        Number(row.productActivityCount) + Number(row.num)
      // row.isAdd = true
      row.num = ''
    },
    handleInput(e, row) {
      const value = e.target.value
      e.target.value = value.replace(/[^\d]/g, '')
      row.num = value.replace(/[^\d]/g, '')
    },
    handleInputBlur(index, sort) {
      // 排序设置
      this.modalGoodList.sort(function(a, b) {
        return a.sortNumber > b.sortNumber ? 1 : -1
      })
    },
    handleGoodsInput(e, val, index) {
      const value = e.target.value
      e.target.value = value.replace(/[^\d]/g, '')
      const data = this.modalGoodList[index]
      data.sortNumber = e.target.value
      this.$set(this.modalGoodList, index, data)
    },
    handleAddTime(type, row) {
      if (!row.num) {
        return
      }
      if (type === 1) {
        row.num++
      } else {
        if (row.num !== 0) {
          row.num--
        }
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.modalQuery.currentPage = val
      this._loadActivityGoods()
    }
  }
}
</script>

<style>
</style>
