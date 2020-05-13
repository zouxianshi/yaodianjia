<template>
  <div class="app-container">
    <div class="assemble-wrapper">
      <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="120px"
        size="small"
        class="demo-ruleForm"
      >
        <div class="form-title">基础设置</div>
        <el-form-item ref="name" label="活动名称" prop="name">
          <el-input
            v-model="formData.name"
            :disabled="disabled"
            maxlength="12"
            placeholder="活动名称不超过12字"
          />
        </el-form-item>
        <el-form-item label="活动底图">
          <el-radio-group v-model="formData.img" :disabled="disabled">
            <el-radio label="1">不添加</el-radio>
            <el-radio label="2">添加</el-radio>
          </el-radio-group>
          <template v-if="formData.img==='2'">
            <div class="select-picture">
              <el-upload
                class="avatar-uploader"
                :action="upLoadUrl"
                :show-file-list="false"
                :headers="headers"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="handleImgError"
                :disabled="disabled"
              >
                <el-image v-if="formData.imgUrl" :src="showImg(formData.imgUrl)" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <div class="select-btn">
                <!-- <el-popover
                  placement="bottom-end"
                  width="400"
                  popper-class="hydee-popver"
                  trigger="click"
                >
                  <div class="popver-wapper">
                    <div class="pic-poster">
                      <h3>效果展示</h3>
                      <div>
                        <el-image
                          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                        />
                      </div>
                    </div>
                    <div class="pic-list">
                      <h3>历史常用图片</h3>
                      <el-row class="list-wapper" :gutter="10">
                        <el-col :span="12">
                          <img-edit
                            pic-url="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                          />
                        </el-col>
                        <el-col :span="12">
                          <img-edit
                            pic-url="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                          />
                        </el-col>
                        <el-col :span="12">
                          <img-edit
                            pic-url="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                          />
                        </el-col>
                        <el-col :span="12">
                          <img-edit
                            pic-url="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
                          />
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <el-button slot="reference" @click="selectPic">选择历史图片</el-button>
                </el-popover>-->
                <div>上传图片尺寸比例建议：3:1</div>
              </div>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input
            v-model="formData.description"
            type="textarea"
            maxlength="200"
            :autosize="{ minRows: 4, maxRows: 6}"
            :disabled="disabled"
            style="width:300px"
            :show-word-limit="true"
            placeholder="活动描述尽量精简，将会展示在商品副标题内"
          />
        </el-form-item>
        <el-form-item ref="activitTime" label="活动时间" prop="activitTime">
          <el-date-picker
            v-model="formData.activitTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            :disabled="!!activityId || disabled"
            @change="handleTimeChange"
          />
        </el-form-item>
        <el-form-item label="成团有效时间" prop="effectiveTime">
          <div class="custom-input">
            <el-input-number
              v-model="formData.effectiveTime"
              style="width:120px"
              controls-position="right"
              :min="2"
              :max="48"
              :disabled="disabled"
              @input.native="handleInput"
            />
            <!-- <div class="operate">
              <span class="el-icon-arrow-up" @click="handleAddTime(1)" />
              <span class="el-icon-arrow-down" @click="handleAddTime(2)" />
            </div>-->
            <span style="color: rgb(193, 193, 193); margin-left: 4px">小时</span>
            <span style="color: rgb(193, 193, 193); margin-left: 4px">（设置开团后成团有效时间，过时则用户拼团失败）</span>
          </div>
        </el-form-item>
        <div class="form-title">活动店铺</div>
        <!-- <el-form-item label="活动店铺" prop="allStore" required>
          <el-radio-group v-model="formData.allStore" :disabled="!!activityId || disabled">
            <el-radio :label="true">全部门店</el-radio>
            <el-radio :label="false">部分门店</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <el-form-item v-show="!formData.allStore" label="活动店铺" required>
          <!-- storeComponent -->
          <el-button
            type="primary"
            plain
            :disabled="!!activityId || disabled"
            @click="$refs.storeComponent.open()"
          >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
        </el-form-item>
        <!-- 门店列表 -->
        <el-form-item v-show="!formData.allStore || disabled || edit">
          <select-store
            ref="selectStoreComponent"
            :disabled="!!activityId || disabled"
            @del-item="delSelectStore"
          />
        </el-form-item>

        <!-- 二期需求 -->
        <!-- <el-form-item label="跨店拼团">
          <span slot="label">
            跨店拼团
            <el-tooltip class="item" effect="dark" content="选不跨店活动会生成多个以单个门店发起活动" placement="top-start">
              <i class="el-icon-question" />
            </el-tooltip>
          </span>
          <el-radio-group v-model="formData.crossStore">
            <el-radio label="1">跨店活动</el-radio>
            <el-radio label="2">不跨店活动</el-radio>
          </el-radio-group>
        </el-form-item>-->
        <div class="form-title">活动商品</div>
        <el-form-item label>
          <p v-if="!activityId" style="margin-bottom:10px">
            <el-button
              icon="el-icon-circle-plus-outline"
              type="primary"
              size="small"
              :disabled="!formData.activitTime || (!formData.allStore && !chooseStore.length) || disabled"
              @click="handleOpenGoods"
            >添加商品</el-button>
            <!-- <el-button
              size="small"
              :disabled="!goodsList.length || disabled"
              type="danger"
              @click="handleBatchDel"
            >批量删除</el-button> -->
          </p>
          <!-- <el-table :data="goodsList" border size="small" @selection-change="handleSelectionChange"> -->
          <el-table :data="goodsList" border size="small">
            <!-- <el-table-column v-if="!activityId" type="selection" width="55" /> -->
            <el-table-column label="展示顺序" width="80">
              <template slot-scope="scope">
                <el-input
                  v-if="!activityId"
                  v-model="scope.row.sortNumber"
                  size="mini"
                  placeholder
                  :disabled="disabled"
                  style="width:50px"
                  @input.native="handleGoodsInput($event, scope.row.sortNumber,scope.$index)"
                  @blur="handleInputBlur(scope.$index,scope.row.sortNumber)"
                />
                <span v-else v-text="scope.row.sortNumber" />
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name" min-width="100" />
            <el-table-column label="商品编码" prop="erpCode" />
            <el-table-column label="参考价" prop="mprice" />
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
                <el-button
                  type
                  size="mini"
                  :disabled="disabled"
                  @click="handleEditSetting(scope.row)"
                >设置</el-button>
                <el-button
                  v-if="!activityId"
                  type="danger"
                  :disabled="disabled"
                  size="mini"
                  @click="handleGoodsDel(scope.row,scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div v-if="activityId" class="page-box">
            <el-pagination
              background
              small
              layout="total, prev, pager, next"
              :current-page.sync="currentPage"
              :total="total"
              @current-change="handleCurrentChange"
            />
          </div> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 操作按钮 -->
    <div class="action-wapper">
      <el-button
        v-if="!disabled"
        :loading="saveLoading"
        type="primary"
        :disabled="disabled"
        @click="handleSubmit"
      >保存</el-button>
      <el-button @click="$router.go(-1)">返 回</el-button>
    </div>
    <!-- 门店列表 -->
    <store-dialog
      ref="storeComponent"
      :list="chooseStore"
      :store-ids="formData.allStore?[]:chooseStore.map(item => item.id)"
      @complete="handletStoreComplete"
    />
    <!-- 选择主商品组件 -->
    <store-goods
      ref="dialogGoods"
      :limit-max="20"
      :list="goodsList"
      :store-ids="formData.allStore?[]:chooseStore.map(item => item.id)"
      @on-change="onSelectedGoods"
    />
    <!-- 编辑商品 -->
    <edit-goods-modals ref="editGoodsModals" :info="editGoods" @complete="handleSuccessSelectGood" />
  </div>
</template>
<script>
import _ from 'lodash'
import config from '@/utils/config'
import EditGoodsModals from './_source/signle-goods-set'

import storeDialog from '../../components/store'
import storeGoods from '../../components/store-gods'
import selectStore from '../../components/select-store'
import { mapGetters } from 'vuex'
import { throttle } from '@/utils/throttle'

import {
  assembleActivityAdd,
  getAssembleAcInfo,
  updateAssembleInfo,
  updateAcAssmbleProductInfo
} from '@/api/activity'
export default {
  name: 'AssembleEdit',
  components: { selectStore, storeGoods, EditGoodsModals, storeDialog },
  data() {
    const checkEffectiveTime = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error('请输入成团有效时间'))
      }
      if (value < 2) {
        return callback(new Error('成团有效时间不得低于2小时'))
      }
      if (value > 48) {
        return callback(new Error('成团有效时间不得高于48小时'))
      }
      callback()
    }
    const checkActivitTime = (rule, value, callback) => {
      if (!value && !value.length) {
        return callback(new Error('请选择活动开始和结束时间'))
      }
      if (value[0] >= value[1]) {
        return callback(new Error('活动结束时间要大于开始时间'))
      }
      callback()
    }
    return {
      formData: {
        effectiveTime: 12,
        name: '',
        activitTime: '',
        img: '1',
        imgUrl: '',
        allStore: false,
        startTime: '',
        endTime: '',
        description: ''
      },
      goodsList: [],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activitTime: [
          {
            required: true,
            validator: checkActivitTime,
            trigger: 'change'
          }
        ],
        effectiveTime: [
          { required: true, validator: checkEffectiveTime, trigger: 'blur' }
        ]
      },
      chooseStore: [], // 选择的店铺
      disabled: false,
      editGoods: {},
      pageLoading: '',
      saveLoading: false,
      activityId: '',
      // currentPage: 1,
      // total: 0,
      multipleSelection: [],
      leaveAction: false
    }
  },
  computed: {
    ...mapGetters(['token', 'merCode']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  created() {
    this.activityId = this.$route.query.id
    if (this.activityId) {
      this.disabled = this.$route.query.id && !!this.$route.query._ck // 当前页面为查看
      this.edit = this.$route.query.id && !this.$route.query._ck // 当前页面为编辑
      this._loadInfo()
    }
  },
  mounted() {
    let title = ''
    title = this.$route.query.id
      ? !this.$route.query._ck
        ? '编辑拼团'
        : '查看拼团详情'
      : '创建拼团'
    this.$route.meta.title = title
    this.$store.dispatch('tagsView/updateVisitedView', {
      ...this.$route,
      meta: {
        ...this.$route.meta,
        title
      },
      title
    })
  },
  methods: {
    delSelectStore(item, index) {
      console.log('item, index', item, index, this.chooseStore)
      this.chooseStore.splice(index, 1)
      this.$refs.selectStoreComponent.dataFrom(this.chooseStore)
    },
    handleSelectionChange(val) {
      // 选择商品
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
    _loadInfo() {
      // 加载基本信息
      getAssembleAcInfo(this.$route.query.id)
        .then(res => {
          // this._loadGoods()
          // for (const key in res.data) {
          //   this.formData[key] = res.data[key]
          // }
          console.log('res-----getAssembleAcInfo', res)
          this.formData = {
            activitTime: [res.data.startTime, res.data.endTime],
            startTime: res.data.startTime,
            endTime: res.data.endTime,
            name: res.data && res.data.pmtName,
            description: res.data && res.data.description,
            allStore: !!(res.data && res.data.allStore),
            effectiveTime: res.data && res.data.effectiveTime,
            img: res.data && res.data.imgUrl ? '2' : '1',
            imgUrl: res.data && res.data.imgUrl
          }
          this.chooseStore =
            res.data && Array.isArray(res.data.storeResDTOList)
              ? res.data.storeResDTOList
              : []
          this.$refs.selectStoreComponent.dataFrom(
            Array.isArray(res.data.storeResDTOList)
              ? res.data.storeResDTOList
              : []
          )
          this.goodsList =
            res.data && Array.isArray(res.data.activityDetail.ruleList)
              ? res.data.activityDetail.ruleList
              : []
        })
        .catch(err => {
          console.log(err)
        })
    },
    // _loadGoods() {
    //   // 通过活动id查询商品
    //   getActivityGoods({
    //     activityId: this.activityId,
    //     pageSize: 20,
    //     currentPage: 1
    //   })
    //     .then(res => {
    //       // const { data, totalCount } = res.data
    //       console.log('1111111---getActivityGoods', res);
    //       const dataList = res.data
    //       dataList.map(v => {
    //         v.mprice = v.price
    //         v.name = v.productName
    //         v.erpCode = v.productCode
    //         v.mainPic = v.imgUrl
    //       })
    //       this.goodsList = dataList
    //       // this.total = totalCount
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // },
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
    isShowTips(row) {
      // 是否显示活动库存提示
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
    handleInputBlur(index, sort) {
      // 排序设置
      this.goodsList.sort(function(a, b) {
        return a.sortNumber > b.sortNumber ? 1 : -1
      })
    },
    handleGoodsInput(e, val, index) {
      const data = this.goodsList[index]
      data.sortNumber = val.replace(/[^\d]/g, '')
      e.target.value = val.replace(/[^\d]/g, '')
      this.$set(this.goodsList, index, data)
    },
    handleEditSetting(row) {
      // 打开设置单个商品modal
      this.editGoods = row
      this.$nextTick(_ => {
        this.$refs.editGoodsModals.open()
      })
    },
    handleOpenGoods() {
      // 打开选择商品弹窗组件
      this.$refs.dialogGoods.open()
    },
    handletStoreComplete(val) {
      // 选择门店确定
      this.chooseStore = val
      console.log('11111111111111', val, this.$refs)
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    handleGoodsDel(row, index) {
      // 删除商品表格数据
      this.goodsList.splice(index, 1)
    },
    handleBatchDel() {
      // 批量删除
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
      })
        .then(() => {
          _.pullAllBy(this.goodsList, this.multipleSelection, 'id')
          this.$set(this.goodsList)
        })
        .catch(err => {
          console.log('取消删除', err)
        })
    },
    onSelectedGoods(row) {
      // 商品选择确定事件
      row.map((v, index) => {
        v.sortNumber = index + 1
        v.commodityId = v.erpCode
      })
      console.log('onSelectedGoods', row)
      this.goodsList = row
    },
    handleSubmit: throttle(function() {
      // 数据提交
      this.$refs.formData.validate((valid, object) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.formData))
          console.log('this.formData', this.formData, this.goodsList)
          if (
            new Date(this.formData.startTime).getTime() < new Date().getTime()
          ) {
            this.$message.warning('活动开始时间不能小于当前时间')
            return
          }
          if (data.img === '1') {
            data.imgUrl = ''
          }
          data.storeIds = []
          // 部分店铺
          if (!data.allStore) {
            if (this.chooseStore.length > 0) {
              this.chooseStore.map(v => {
                data.storeIds.push(v.id)
              })
            } else {
              this.$message({
                message: '请选择门店',
                type: 'warning'
              })
              return
            }
          }
          delete data.img
          delete data.activitTime
          if (Array.isArray(this.goodsList) && !this.goodsList.length) {
            this.$message({
              message: '请选择商品',
              type: 'warning'
            })
            return false
          }
          data.pmtRule = {
            ruleList: this.formatItems(this.goodsList)
          }
          console.log('this.formData------data.products', data.products)
          if (!data.pmtRule.ruleList) {
            return
          }
          if (this.$route.query.id) {
            this.saveLoading = true
            this.editActivity({
              ...data,
              id: this.$route.query.id
            })
          } else {
            console.log('this.formData------', this.goodsList)
            this.saveLoading = true
            console.log('待提交数据---', data)
            this.addActivity(data)
          }
        } else {
          console.log('error submit!!')
          for (const i in object) {
            let dom = this.$refs[i]
            if (Object.prototype.toString.call(dom) !== '[object Object]') {
              // 这里是针对遍历的情况（多个输入框），取值为数组
              dom = dom[0]
            } // 第一种方法（包含动画效果）
            dom.$el.scrollIntoView({
              // 滚动到指定节点
              block: 'center', // 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            break // 因为我们只需要检测一项,所以就可以跳出循环了
          }
          return false
        }
      })
    }, 3000),
    addActivity(data) {
      assembleActivityAdd(data)
        .then(res => {
          this.saveLoading = false
          this.leaveAction = true
          this.resultData(res.data, '保存成功')
        })
        .catch(err => {
          this.saveLoading = false
          console.log(err)
        })
    },
    editActivity(data) {
      // 修改基本信息
      updateAssembleInfo(data)
        .then(res => {
          this.saveLoading = false
          this.leaveAction = true
          this.resultData(res.data, '修改成功')
        })
        .catch(err => {
          this.saveLoading = false
          console.log(err)
        })
    },
    resultData(data, msg) {
      if (data) {
        this.$alert(
          '<div><h3 style="font-weight: 600">活动已成功创建，但部分商品未添加活动成功，部分商品创建不成功的原因可能有：</h3> <p style="color: red">1. 同一时间段内，门店部分商品已参加了其他互斥的营销活动</p> <p style="color: red">2. 部分门店对应商品未上架，该门店商品活动无法创建</p></div>',
          '部分商品未添加成功提醒',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '返回列表查看',
            callback: () => {
              this.$router.push('/marketing/activity/list/13')
            }
          }
        )
      } else {
        this.$message.success(msg)
        setTimeout(_ => {
          this.$router.push('/marketing/activity/list/13')
        }, 1000)
      }
    },
    formatItems(list) {
      console.log('11111111111111111111111111-', list)
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
          manufacture: v.manufacture,
          brandName: v.brandName,
          activityNumber: v.activityNumber, // 成团人数
          activityPrice: v.activityPrice, // 活动价格
          addLimitTimes: v.addLimitTimes, // 限购  加入次数
          id: v.id,
          isFreeshipping: v.isFreeshipping, // 是否包邮
          limitCount: v.limitCount, // 限购次数
          openLimitTimes: v.openLimitTimes, // 开团次数
          price: v.mprice, // 参考价
          productActivityCount: v.productActivityCount, // 活动产品库存量
          specId: v.specId, //
          imgUrl: v.mainPic,
          productName: v.name, // 商品名
          sortNumber: v.sortNumber, // 商品排序
          commodityId: v.id,
          erpCode: v.erpCode,
          barCode: v.barCode
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
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`)
    //   this.currentPage = val
    //   this._loadGoods()
    // },
    handleSuccessSelectGood(row) {
      // 单个商品设置确定callback
      console.log('11111', row)
      if (this.activityId) {
        const data = {
          ...row,
          ruleId: row.id
        }
        updateAcAssmbleProductInfo(data)
          .then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // this._loadGoods()
            this._loadInfo()
          })
          .catch(_ => {})
      } else {
        const index = this.goodsList.findIndex(mItem => {
          return row.specId === mItem.specId
        })
        this.goodsList[index] = row
        this.$set(this.goodsList, index, row)
      }
      this.$refs.editGoodsModals.close()
    },
    beforeAvatarUpload(file) {
      const size = file.size / 1024
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
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
    },
    // 选择历史图片
    selectPic() {
      console.log('1111111111, 准备加载图片')
    }
  },
  beforeRouteLeave(to, from, next) {
    // 路由离开关闭标签
    if (this.leaveAction) {
      this.$store.dispatch('tagsView/delView', from)
    }
    next()
    // if (this.disabled || this.leaveAction) {
    //   this.$store.dispatch('tagsView/delView', from)
    //   next()
    //   if (this.pageLoading) {
    //     this.pageLoading.close()
    //   }
    // } else {
    //   const answer = window.confirm('你还有数据没有保存，是否确认退出')
    //   if (answer) {
    //     if (this.pageLoading) {
    //       this.pageLoading.close()
    //     }
    //     this.$store.dispatch('tagsView/delView', from)
    //     next()
    //   } else {
    //     next(false)
    //   }
    // }
  }
}
</script>
<style lang="scss">
.hydee-popver {
  max-height: 400px;
  overflow: auto;
  h3 {
    color: #222;
  }
}
</style>
<style lang="scss" scoped>
.assemble-wrapper {
  .page-box {
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
    line-height: 100px !important;
    text-align: center;
  }
  .select-picture {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .select-btn {
      margin-left: 10px;
      font-size: 12px;
      color: #8c939d;
    }
  }

  .form-title {
    line-height: 16px;
    font-size: 16px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 16px;
  }
  .el-input {
    width: 200px;
  }
  .custom-input {
    display: flex;
    .custom-input-box {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      border-right: none !important;
      &:focus {
        outline: none;
        border-color: #147de8;
      }
    }
    .operate {
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
      span {
        width: 100%;
        text-align: center;
        &:last-child {
          border-top: 1px solid #dcdfe6;
        }
      }
    }
  }
  .choose-store-box {
    width: 300px;
    height: 100px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 5px;
    overflow-y: auto;
    .el-tag {
      margin-right: 10px;
    }
  }
}
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .search-query {
    display: flex;
    .el-input {
      margin-right: 5px;
    }
  }
}
.app-container {
  padding-bottom: 100px;
  .action-wapper {
    position: absolute;
    padding: 12px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 1;
  }
}
</style>
