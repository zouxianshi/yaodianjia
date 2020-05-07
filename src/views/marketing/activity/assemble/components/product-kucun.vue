<template>
  <span>
    <el-button type="text" size="mini" @click="handleEditAcStock(rowItem)">编辑活动库存</el-button>
    <el-dialog
      :title="`“${dialogVisibleTitle}”商品活动库存管理:`"
      :visible.sync="dialogVisible"
      width="900px"
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
                <el-image :src="showImg(scope.row.picUrl)" style="width:100px" />
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
                  <el-input-number
                    v-model="scope.row.num"
                    :disabled="scope.row.isClearn"
                    size="medium"
                    style="width:120px"
                    controls-position="right"
                    :min="0"
                    :max="99999999"
                    placeholder
                    @input.native="handleInput($event,scope.row)"
                  />
                  <!-- <div class="operate">
                    <span class="el-icon-arrow-up" @click="handleAddTime(1,scope.row)" />
                    <span class="el-icon-arrow-down" @click="handleAddTime(2,scope.row)" />
                  </div>-->
                  <el-button
                    v-if="!scope.row.isClearn"
                    type="text"
                    :underline="false"
                    style="font-size:13px"
                    :loading="setStockLoading"
                    @click="handleSetAddNumber(scope.row)"
                  >&nbsp;立即增加</el-button>
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
          <el-button
            type="danger"
            size="mini"
            :loading="saveLoading"
            @click="handleClean(true)"
          >清空所有活动库存</el-button>
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
import { sortAcAssmbleProductInfo, clearProductStock, setSingleAssembleStock, getActivityGoods } from '@/api/activity'
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
      setStockLoading: false,
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
      this.dialogVisibleTitle = row.pmtName || ''
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
          const { data } = res
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
    async handleSubmitStock() {
      this.saveLoading = true

      Promise.all([
        this.updateAssembleStock(),
        this.clearStock()
      ])
        .then(res => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.saveLoading = false
          this.modalQuery.currentPage = 1
          this._loadActivityGoods()
          this.dialogVisible = false
        })
        .catch(() => {
          this.saveLoading = false
          this.dialogVisible = false
        })
      // 修改库存
    },
    // 清空库存
    clearStock() {
      // 清空库存的情况
      // 如果点击了清空所有那么则调用，另外需查询商品列表是否单独设置库存为0，否则不调用此接口
      return new Promise((resolve, reject) => {
        const specIds = []
        this.modalGoodList.forEach(item => {
          item.isClearn && specIds.push(item.specId)
        })
        if (this.cleanAllCount || specIds.length) {
          clearProductStock({
            activityId: this.rowItem.id,
            specIds: this.cleanAllCount ? [] : specIds
          })
            .then(res => {
              if (res.code === '10000') {
                resolve()
              }
              reject()
            })
            .catch(e => reject(e))
        } else {
          resolve()
        }
      })
    },
    // 增加库存或排序功能
    updateAssembleStock() {
      return new Promise((resolve, reject) => {
        // console.log('this.modalGoodList00000', this.modalGoodList)
        const data = this.modalGoodList.map(item => {
          return {
            activityId: item.activityId,
            sort: item.sortNumber,
            specId: item.specId
          }
        })
        sortAcAssmbleProductInfo(data)
          .then(res => {
            if (res.code === '10000') {
              resolve()
            }
            reject()
          })
          .catch(e => reject(e))
      })
    },
    handleSettingcount(row) {
      console.log('--------------', row)
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
        Number(row.productActivityCount || 0) + Number(row.num)
      row.addCount = Number(row.num)
      // row.isAdd = true
      row.num = ''
      console.log('1111111111111111111-handleSetAddNumber', row)
      this.setStockLoading = true
      setSingleAssembleStock(row)
        .then(res => {
          this.setStockLoading = false
          if (res.code === '10000') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.modalQuery.currentPage = 1
            this._loadActivityGoods()
          }
        })
        .catch(e => {
          this.setStockLoading = false
        })
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
    // handleAddTime(type, row) {
    //   if (!row.num) {
    //     return
    //   }
    //   if (type === 1) {
    //     row.num++
    //   } else {
    //     if (row.num !== 0) {
    //       row.num--
    //     }
    //   }
    // },
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
