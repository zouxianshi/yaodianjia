<template>
  <div class="app-container ">
    <div class="assemble-wrapper">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px" size="small" class="demo-ruleForm">
        <div class="form-title">
          基础设置
        </div>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="formData.name" placeholder="活动名称不超过12字" />
        </el-form-item>
        <el-form-item label="活动底图">
          <el-radio-group v-model="formData.img">
            <el-radio label="1">不添加</el-radio>
            <el-radio label="2">添加</el-radio>
          </el-radio-group>
          <template v-if="formData.img==='2'">
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="handleImgError"
            >
              <el-image v-if="formData.imgUrl" :src="showImg(formData.imgUrl)" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </template>

        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="formData.description" type="textarea" maxlength="200" :autosize="{ minRows: 4, maxRows: 6}" style="width:300px" :show-word-limit="true" placeholder="活动描述尽量精简，将会展示在商品副标题内" />
        </el-form-item>
        <el-form-item label="活动时间" prop="activitTime">
          <el-date-picker
            v-model="formData.activitTime"
            type="datetimerange"
            value-format="yyyy-MM-dd hh:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleTimeChange"
          />
        </el-form-item>
        <el-form-item label="成团有效时间" prop="effectiveTime">
          <div class="custom-input">
            <el-input v-model="formData.effectiveTime" style="width:80px" class="custom-inner-input" placeholder="" @input.native="handleInput" />
            <div class="operate">
              <span class="el-icon-arrow-up" @click="handleAddTime(1)" />
              <span class="el-icon-arrow-down" @click="handleAddTime(2)" />
            </div>
          </div>
        </el-form-item>
        <div class="form-title">
          活动店铺
        </div>
        <el-form-item label="所有店铺">
          <el-radio-group v-model="formData.isAllStore" @change="handleStoreChange">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="已选店铺">
          <template v-if="formData.isAllStore===0">
            <div class="choose-store-box">
              <el-tag v-for="(item,index) in chooseStore" :key="index" type="para" size="small">{{ item.stName }}</el-tag>
            </div>
            <p style="margin-top:5px">
              <el-button type="primary" size="mini" @click="handleOpenStore">选择门店</el-button>
            </p>
          </template>
          <template v-else>
            <span>已选全部门店<el-link type="primary" :underline="false">{{ allStore.length }}</el-link>个店铺</span>
          </template>
        </el-form-item>
        <div class="form-title">
          活动商品
        </div>
        <el-form-item label="">
          <p v-if="!activityId" style="margin-bottom:10px">
            <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="handleOpenGoods">添加商品</el-button>
            <el-button size="small" type="danger" @click="handleBatchDel">批量删除</el-button>
          </p>
          <el-table
            :data="goodsList"
            border
            size="small"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              v-if="!activityId"
              type="selection"
              width="55"
            />
            <el-table-column label="展示顺序" width="80">
              <template slot-scope="scope">
                <el-input v-if="!activityId" v-model="scope.row.sortNumber" size="mini" placeholder="" style="width:50px" @input.native="handleGoodsInput(scope.row.sortNumber,scope.$index)" @blur="handleInputBlur(scope.$index,scope.row.sortNumber	)" />
                <span v-else v-text="scope.row.sortNumber" />
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name" min-width="100" />
            <el-table-column label="商品编码" prop="productId" />
            <el-table-column label="原售价" prop="mprice" />
            <el-table-column label="拼团价" prop="activityPrice" />
            <el-table-column label="活动库存" prop="productActivityCount">
              <template slot-scope="scope">
                <span v-text="scope.row.productActivityCount" />
                <el-tag v-show="isShowTips(scope.row)" type="danger" size="mini">活动库存偏少</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="成团人数" prop="activityNumber" />
            <el-table-column label="操作" min-width="110">
              <template slot-scope="scope">
                <el-button type="" size="mini" @click="handleEditSetting(scope.row)">设置</el-button>
                <el-button v-if="!activityId" type="danger" size="mini" @click="handleGoodsDel(scope.row,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="activityId" class="page-box">
            <el-pagination
              background
              small
              layout="total, prev, pager, next"
              :current-page.sync="currentPage"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-form-item>
        <el-form-item />
        <el-form-item label="" class="text-center">
          <el-button type="">取消</el-button>
          <el-button type="primary" :loading="saveLoading" @click="handleSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 门店模态框 -->
    <store :is-show="showStore" :list="chooseStore" @close="showStore=false" @complete="handletStoreComplete" />
    <!-- 选择商品弹窗组件 -->
    <goods ref="dialogGoods" :limit-max="20" :editable="!disabled" :list="chooseGoods" @on-change="onSelectedGoods" />
    <!-- 编辑商品 -->
    <edit-goods-modals ref="editGoodsModals" :info="editGoods" @complete="handleSuccessSelectGood" />
  </div>
</template>
<script>
import config from '@/utils/config'
import store from './_source/store'
import goods from './_source/goods'
import EditGoodsModals from './_source/signle-goods-set'
import { mapGetters } from 'vuex'
import { assembleActivityAdd, getAssembleAcInfo, getActivityGoods, updateAssembleInfo, updateAcAssmbleProductInfo } from '@/api/marketing'
import { getAllStore } from '@/api/common'
export default {
  components: { store, goods, EditGoodsModals },
  data() {
    return {
      formData: {
        effectiveTime: '',
        name: '',
        activitTime: '',
        img: '1',
        imgUrl: '',
        isAllStore: 1,
        startTime: '',
        endTime: '',
        description: ''
      },
      goodsList: [],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activitTime: [{ required: true, message: '请选择活动开始和结束时间', trigger: 'change' }],
        effectiveTime: [{ required: true, message: '请输入成团有效时间', trigger: 'blur' }]
      },
      showStore: false,
      chooseStore: [],
      showGoods: false,
      chooseGoods: [],
      disabled: false,
      editGoods: {},
      pageLoading: '',
      saveLoading: false,
      allStore: [],
      activityId: '',
      currentPage: 1,
      total: 0,
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['token', 'merCode']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImg?merCode=${this.merCode}`
    },
    headers() {
      return { 'Authorization': this.token }
    }
  },
  created() {
    this.activityId = this.$route.query.id
    if (this.activityId) {
      this._loadInfo()
    }
    this._loadAllStoreData()
  },
  methods: {
    handleSelectionChange(val) { // 选择商品
      this.multipleSelection = val
    },
    handleInput(e) {
      const value = e.target.value
      e.target.value = value.replace(/[^\d]/g, '')
      this.formData.effectiveTime = value.replace(/[^\d]/g, '')
    },
    handleAddTime(type) {
      if (!this.formData.effectiveTime) {
        return
      }
      if (type === 1) {
        this.formData.effectiveTime++
      } else {
        if (this.formData.effectiveTime !== 0) {
          this.formData.effectiveTime--
        }
      }
    },
    _loadInfo() { // 加载基本信息
      getAssembleAcInfo(this.$route.query.id).then(res => {
        this._loadGoods()
        for (const key in res.data) {
          this.formData[key] = res.data[key]
        }
        this.formData.activitTime = [res.data.startTime, res.data.endTime]
        if (this.formData.imgUrl) {
          this.formData.img = '2'
        }
        if (this.formData.isAllStore === 0) {
          this.chooseStore = res.data.storeIds
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _loadGoods() { // 通过活动id查询商品
      getActivityGoods({ activityId: this.activityId, pageSize: 10, currentPage: this.currentPage }).then(res => {
        const { data, totalCount } = res.data
        data.map(v => {
          v.mprice = v.price
          v.name = v.productName
          v.mainPic = v.imgUrl
        })
        this.goodsList = data
        this.total = totalCount
      }).catch(err => {
        console.log(err)
      })
    },
    handleStoreChange(val) {
      if (val === '1') {
        this._loadAllStoreData()
      }
    },
    _loadAllStoreData() { // 加载所有门店
      getAllStore(this.merCode).then(res => {
        this.allStore = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleImgError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        // location.reload()
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
        this.pageLoading.close()
      }
    },
    isShowTips(row) { // 是否显示活动库存提示
      if (row.activityNumber) {
        const activityNumber = row.activityNumber * 5
        if (row.productActivityCount < activityNumber) {
          return true
        }
      }
      return false
    },
    handleTimeChange(row) {
      if (row) {
        this.formData.startTime = row[0]
        this.formData.endTime = row[1]
      }
    },
    handleInputBlur(index, sort) { // 排序设置
      this.goodsList.sort(function(a, b) { return a.sortNumber > b.sortNumber ? 1 : -1 })
    },
    handleGoodsInput(val, index) {
      const data = this.goodsList[index]
      data.sortNumber = val
      this.$set(this.goodsList, index, data)
    },
    handleEditSetting(row) { // 打开设置单个商品modal
      this.editGoods = row
      this.$nextTick(_ => {
        this.$refs.editGoodsModals.open()
      })
    },
    handleOpenStore() { // 打开选择门店modal
      this.showStore = true
    },
    handleOpenGoods() { // 打开选择商品弹窗组件
      this.chooseGoods = this.goodsList
      this.$nextTick(_ => {
        this.$refs.dialogGoods.open()
      })
    },
    handletStoreComplete(row) { // 选择门店确定
      this.chooseStore = row
      this.showStore = false
    },
    handleGoodsDel(row, index) { // 删除商品表格数据
      this.goodsList.splice(index, 1)
    },
    handleBatchDel() { // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择你要删除的商品',
          type: 'warning'
        })
        return
      }
      this.$confirm('是否确定删除这些商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.goodsList = []
      }).catch(() => {
        console.log('取消删除')
      })
    },
    onSelectedGoods(row) { // 商品选择确定事件
      row.map((v, index) => {
        v.sortNumber = index + 1
        v.productId = v.specId
      })
      this.goodsList = row
    },
    handleSubmit() { // 数据提交
      this.$refs.formData.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          if (data.img === '1') {
            data.imgUrl = ''
          }
          data.storeIds = []
          if (data.isAllStore === 0) {
            if (this.chooseStore.length > 0) {
              this.chooseStore.map(v => {
                data.storeIds.push(v.id)
              })
            } else {
              this.$message({
                message: '请选择门店',
                type: 'error'
              })
              return
            }
          } else {
            data.storeIds = this.allStore
          }
          delete data.img
          delete data.activitTime
          if (this.$route.query.id) {
            this.saveLoading = true
            this.editActivity(data)
          } else {
            if (!this.goodsList) {
              this.$message({
                message: '请选择商品',
                type: 'error'
              })
              return
            }
            data.products = this.formatItems(this.goodsList)
            if (!data.products) {
              return
            }
            this.saveLoading = true
            this.addActivity(data)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addActivity(data) {
      assembleActivityAdd(data).then(res => {
        this.$message({
          message: `保存成功`,
          type: 'success'
        })
        setTimeout(_ => {
          this.$router.push('/marketing/activity/assemble')
          this.saveLoading = false
        }, 1000)
      }).catch(err => {
        this.saveLoading = false
        console.log(err)
      })
    },
    editActivity(data) { // 修改基本信息
      updateAssembleInfo(data).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        setTimeout(_ => {
          this.$router.push('/marketing/activity/assemble')
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    },
    formatItems(list) {
      const products = []
      for (let index = 0; index < list.length; index++) {
        const v = list[index]
        if (!v.activityNumber) {
          this.$message({
            message: `第${index + 1}个商品成团人数不能为空`,
            type: 'warning'
          })
          return
        }
        if (!v.activityPrice) {
          this.$message({
            message: `第${index + 1}个商品活动价格不能为空`,
            type: 'warning'
          })
          return
        }
        if (!v.productActivityCount) {
          this.$message({
            message: `第${index + 1}个商品活动库存不能为空`,
            type: 'warning'
          })
          return
        }
        products.push({
          // 'activityId': v.activityId || '',
          'activityNumber': v.activityNumber, // 成团人数
          'activityPrice': v.activityPrice, // 活动价格
          'addLimitTimes': v.addLimitTimes, // 限购  加入次数
          'id': '',
          'isFreeshipping': v.isFreeshipping, // 是否包邮
          'limitCount': v.limitCount, // 限购次数
          'openLimitTimes': v.openLimitTimess, // 开团次数
          'price': v.mprice, // 原售价
          'productActivityCount': v.productActivityCount, // 活动产品库存量
          'productId': v.specId, //
          'imgUrl': v.mainPic,
          'productName': v.commonName, // 商品名
          'sortNumber': v.sortNumber // 商品排序
        })
      }
      return products
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '10000') {
        this.formData.imgUrl = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this._loadGoods()
    },
    handleSuccessSelectGood(row) { // 单个商品设置确定callback
      if (this.activityId) {
        const data = {
          'activityId': row.activityId,
          'activityNumber': row.activityNumber,
          'activityPrice': row.activityPrice,
          'addLimitTimes': row.addLimitTimes,
          'id': row.id,
          'isFreeshipping': row.isFreeshipping,
          'limitCount': row.limitCount,
          'openLimitTimes': row.openLimitTimes,
          'price': row.price,
          'productActivityCount': row.productActivityCount,
          'productId': row.productId,
          'productName': row.productName,
          'sortNumber': row.sortNumber
        }
        updateAcAssmbleProductInfo(data).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this._loadGoods()
        }).catch(_ => {

        })
      } else {
        const index = this.goodsList.findIndex(mItem => {
          return row.id === mItem.id
        })
        this.goodsList[index] = row
        this.$set(this.goodsList, index, row)
      }
      this.$refs.editGoodsModals.close()
    },
    beforeAvatarUpload(file) {
      const size = file.size / 1024
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isImg) {
        this.$message({
          message: '只能上传格式为 jpg、jpeg、png的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return
      }
      if (size > 1024) {
        this.$message({
          message: '最大只能上传1MB的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return false
      }
      this.pageLoading = this.$loading({
        lock: true,
        text: '图片上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
.assemble-wrapper{
  .page-box{
    margin-top: 12px;
    text-align: right;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px!important;
    text-align: center;
  }

    .form-title{
        line-height: 16px;
      font-size: 16px;
      border-left: #409eff 2px solid;
      padding-left: 10px;
      margin-bottom: 16px;
    }
    .el-input{
        width: 200px;
    }
    .custom-input{
      display: flex;
      .custom-input-box{
         border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
        border-right: none!important;
        &:focus{
          outline: none;
          border-color: #147de8;
        }
      }
      .operate{
        display: flex;
        flex-direction: column;
        margin-left: -12px;
        z-index: 3;
        width: 30px;
        align-items: center;
        background: #f5f7fa;
        border: 1px solid #dcdfe6;
        height: 32px;
         border-radius: 4px;
         border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        color: #909399;
        span{
          width: 100%;
          text-align: center;
          &:last-child{
            border-top:1px solid #dcdfe6;
          }
        }
      }
    }
    .choose-store-box{
      width: 300px;
      height: 100px;
      border:1px solid #dcdfe6;
      border-radius: 4px;
      padding: 5px;
      overflow-y: auto;
      .el-tag{
        margin-right: 10px;
      }
    }
}
  .search-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .search-query{
      display: flex;
      .el-input{
        margin-right: 5px;
      }
    }
  }

</style>
