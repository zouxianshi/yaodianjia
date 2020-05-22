<template>
  <div class="app-container">
    <div class="live-activity-wrapper">
      <el-form
        ref="formData"
        :model="formData"
        size="small"
        label-width="120px"
        :rules="ruleForm"
      >
        <div class="form-title">基本信息</div>
        <el-divider />
        <el-form-item label="直播头像：">
          <template v-if="!showUpAvatar">
            <div style="width:50px;height:50px;border-radius:50%">
              <img :src="showImg(formData.merLogoUrl)" width="100%">
              <el-button type="info" size="mini" circle class="edit-avatar" icon="el-icon-edit" @click="showUpAvatar=!showUpAvatar" />
            </div>
          </template>
          <template v-else>
            <div class="cover">
              <el-upload
                class="avatar-uploader"
                :action="upLoadUrl"
                :show-file-list="false"
                :headers="headers"
                :on-success="handleLogoSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="formData.merLogoUrl" :src="showImg(formData.merLogoUrl)" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="直播名称：">
          <span />{{ formData.merName }}
        </el-form-item>
        <el-form-item label="直播主题：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入直播主题" />
        </el-form-item>
        <el-form-item label="公告" prop="activityNotice">
          <el-input
            v-model="formData.activityNotice"
            type="textarea"
            :rows="2"
            show-word-limit
            maxlength="200"
            placeholder="请输入公告"
          />
        </el-form-item>
        <el-form-item label="开播时间：" prop="beginTime">
          <el-date-picker
            v-model="formData.beginTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开播时间"
          />
        </el-form-item>
        <el-form-item label="直播封面：" prop="coverPicUrl">
          <div class="cover">
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleCoverSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.coverPicUrl" :src="showImg(formData.coverPicUrl)" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <span class="tip">建议上传16：9的图片</span>
          </div>

        </el-form-item>
        <!-- 关联商品 -->
        <div class="form-title">关联商品</div>
        <el-divider />
        <el-form-item label="参与商品：">
          <el-button type="primary" size="mini" @click="handleOpenGoods">选择商品</el-button>
          <el-table :data="formData.commoditySpecList" max-height="450px" border size="small" style="margin-top:10px">
            <!-- <el-table-column v-if="!activityId" type="selection" width="55" /> -->
            <el-table-column label="商品名称" prop="name" min-width="100" />
            <el-table-column label="商品编码" prop="erpCode" />
            <el-table-column label="规格">
              <template slot-scope="scope" :show-overflow-tooltip="true">
                <!-- <div v-html="formatSkuInfo(scope.row.specSkus)" /> -->
                <span v-text="scope.row.specStr" />
              </template>
            </el-table-column>
            <el-table-column label="参考价" prop="mprice" />
            <el-table-column label="操作" min-width="110">
              <template slot-scope="scope">
                <!-- <el-button
                  type
                  size="mini"
                  :disabled="disabled"
                  @click="handleEditSetting(scope.row)"
                >设置</el-button> -->
                <el-button
                  type="text"
                  size="mini"
                  @click="handleGoodsDel(scope.row,scope.$index)"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="选择优惠券：">
          <el-button type="primary" size="mini" @click="handleCheckCoupon">选择优惠券</el-button>
          <el-table :data="formData.couponRelationReqDto" max-height="450" style="width: 100%;margin-top:10px">
            <el-table-column prop="cname" width="100" show-overflow-tooltip label="优惠券名称" />
            <el-table-column prop="address" label="优惠内容">
              <template
                slot-scope="scope"
              >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination) }}</template>
            </el-table-column>
            <el-table-column label="使用时间" width="120">
              <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
            </el-table-column>
            <el-table-column label="使用场景" width="110">
              <template
                slot-scope="scope"
              >{{ scope.row.sceneRule ===1?'线上':'' || scope.row.sceneRule ===2?'线下':'' || scope.row.sceneRule ===3?'线上线下通用':'' }}</template>
            </el-table-column>
            <el-table-column label="适用门店" width="100">
              <template
                slot-scope="scope"
              >{{ scope.row.shopRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
            </el-table-column>
            <el-table-column label="适用商品" width="100">
              <template
                slot-scope="scope"
              >{{ scope.row.productRule ===1?'全部商品':'' || scope.row.productRule ===2?'部分商品':'' || scope.row.productRule ===3?'部分商品不可用':'' }}
              </template>
            </el-table-column>
            <el-table-column label="每人限领张数" width="110">
              <template slot-scope="scope">
                <span v-text="scope.row.perCount" />
                <el-popover
                  v-model="scope.row.showVisible"
                  placement="bottom"
                  width="200"
                  trigger="manual"
                >
                  <div style="text-align: right; margin: 0">
                    <el-form :model="tableFrom" :rules="tableRules" size="mini">
                      <el-form-item label="" prop="perCount">
                        <el-input v-model.number="tableFrom.perCount" placeholder="输入发放张数" />
                      </el-form-item>
                      <el-form-item label="">
                        <el-button type="" @click="scope.row.showVisible=false">取消</el-button>
                        <el-button type="primary" @click="handlePerCount(scope.$index,scope.row)">确定</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button slot="reference" type="text" icon="el-icon-edit" size="mini" circle @click="scope.row.showVisible=!scope.row.showVisible;tableFrom.perCount=scope.row.perCount" />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="发放总数" width="110">
              <template slot-scope="scope">
                <span v-text="scope.row.totalCount" />
                <el-popover
                  v-model="scope.row.showVisibleTotal"
                  placement="bottom"
                  width="200"
                  trigger="manual"
                >
                  <div style="text-align: right; margin: 0">
                    <el-form :model="tableFrom" :rules="tableRules" size="mini">
                      <el-form-item label="" prop="totalCount">
                        <el-input v-model.number="tableFrom.totalCount" placeholder="输入发放张数" />
                      </el-form-item>
                      <el-form-item label="">
                        <el-button type="" @click="scope.row.showVisibleTotal=false">取消</el-button>
                        <el-button type="primary" @click="handletotalCount(scope.$index,scope.row)">确定</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <el-button slot="reference" type="text" icon="el-icon-edit" size="mini" circle @click="scope.row.showVisibleTotal=!scope.row.showVisibleTotal;tableFrom.totalCount=scope.row.totalCount" />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="80">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="handleDeleteCoup(scope.$index, forms.couponRelationReqDto)"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <!-- 广告位 -->
        <div class="form-title">广告位</div>
        <el-divider />
        <el-form-item label="广告位：" prop="adPicUrl">
          <div class="ad-cover">
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.adPicUrl" :src="showImg(formData.adPicUrl)" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <span class="tip">建议上传750*80</span>
          </div>
        </el-form-item>
        <el-form-item label="链接地址：" prop="adLinkUrl">
          <el-input v-model="formData.adLinkUrl" placeholder="链接地址" />
        </el-form-item>
        <el-form-item label="直播背景色：">
          <!-- <colorPicker v-model="formData.bgColor" /> -->
          <el-radio-group v-model="formData.bgColor" size="mini">
            <el-radio label="SIMPLE" border>
              <span class="color-box" style="background:#fff" />
            </el-radio>
            <el-radio label="ORIGAN" border>
              <span class="color-box" style="background:#FF6A48;" />
            </el-radio>
            <el-radio label="GREEN" border>
              <span class="color-box" style="background:#47BD88;" />
            </el-radio>
            <el-radio label="CYAN" border>
              <span class="color-box" style="background:#31CCED;" />
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :loading="saveLoading" @click="handleSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择主商品组件 -->
    <store-goods
      ref="dialogGoods"
      :limit-max="20"
      :list="formData.commoditySpecList"
      @on-change="onSelectedGoods"
    />
    <!-- 选择优惠券 -->
    <checkCoupon ref="checkCoupons" :timevalue="couponList" @confincheck="confincheck" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import storeGoods from '@/views/marketing/components/store-gods'
import checkCoupon from '@/components/Marketings/checkCoupon'
import _ from 'lodash'
import liveRequest from '@/api/live'
import { merchantDetail } from '@/api/merchant_Person_Api'
export default {
  name: 'LiveActivityEdit',
  components: { storeGoods, checkCoupon },
  data() {
    return {
      chooseStore: [],
      showUpAvatar: false,
      formData: {
        couponRelationReqDto: [],
        commoditySpecList: [],
        adLinkUrl: '',
        adPicUrl: '',
        beginTime: '',
        bgColor: 'SIMPLE',
        coverPicUrl: '',
        createName: '',
        merLogoUrl: '',
        merName: '',
        name: '',
        activityNotice: ''
      },
      ruleForm: {
        name: [{ required: true, message: '请输入直播主题', trigger: 'blur' }],
        beginTime: [{ required: true, message: '请选择开播时间', trigger: 'change' }],
        adLinkUrl: [{ required: true, message: '请输入广告链接地址', trigger: 'blur' }],
        activityNotice: [{ required: true, message: '请输入直播公告', trigger: 'blur' }],
        adPicUrl: [{ required: true, message: '请上传广告位图片', trigger: 'change' }],
        coverPicUrl: [{ required: true, message: '请上传封面', trigger: 'change' }]
      },
      pageLoading: null,
      couponList: [],
      showVisible: false,
      tableFrom: {
        perCount: 0
      },
      saveLoading: false,
      tableRules: {
        perCount: [{ required: true, message: '请输入没人限领张数', trigger: 'change' }, { type: 'number', message: '必须为数字值' }],
        totalCount: [{ required: true, message: '请输入发放总数', trigger: 'change' }, { type: 'number', message: '必须为数字值' }]
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  created() {
    if (this.$route.query.id) {
      this._loadLiveInfo()
    } else {
      this._loadMerchantInfo()
    }
  },
  methods: {
    async _loadMerchantInfo() {
      try {
        const { data } = await merchantDetail()
        this.formData.merName = data.merName
        this.formData.merLogoUrl = data.merLogo
      } catch (error) {
        console.log(error)
      }
    },
    async _loadLiveInfo() {
      try {
        const { data } = await liveRequest.getLiveInfo(this.$route.query.id)
        const detaiInfo = data
        detaiInfo.commoditySpecList = data.commoditys
        detaiInfo.couponRelationReqDto = data.activityCouponList.activityCouponDetailResDTO
        delete detaiInfo.commoditys
        delete detaiInfo.activityCouponList
        this.formData = _.assign(this.formData, detaiInfo)
      } catch (error) {
        console.log(error)
      }
    },
    confincheck(val) {
      _.map(val, v => {
        v.perCount = 0
        v.showVisible = false
        v.showVisibleTotal = false
      })
      this.formData.couponRelationReqDto = val
      if (this.formData.couponRelationReqDto.length === 0) {
        this.checkedit = false
      } else {
        this.checkedit = true
      }
      this.write = []
      const write = {
        totalCoupons: 0,
        totalLimit: 0,
        totalNeed: 0
      }
      for (const i in val) {
        console.log(i)
        this.write.push(_.cloneDeep(write))
      }
    },
    handleGoodsDel(index) { // 删除选择的商品
      this.formData.commoditySpecList.splice(index, 1)
    },
    // 格式化规格信息
    formatSkuInfo(skuList) {
      let skuStr = ''
      if (skuList && skuList.length > 0) {
        skuList.forEach(v => {
          skuStr += `<div>${v.skuKeyName}: ${v.skuValue}</div>`
        })
      }
      return skuStr
    },
    // 商品折扣处理
    handleshopRule(ctype, useRule, denomination) {
      if (ctype === 1) {
        if (useRule === 0) {
          return `无门槛，${denomination}折`
        } else {
          return `满${useRule}可用,${denomination}折`
        }
      } else if (ctype === 2) {
        if (useRule === 0) {
          return `无门槛，减${denomination}`
        } else {
          return `满${useRule}可用,减${denomination}元`
        }
      } else {
        return '指定礼品'
      }
    },
    handleDeleteCoup(index) {
      this.formData.couponRelationReqDto.splice(index, 1)
    },
    // 使用日期
    handletimeRule(timeRule, effectTime) {
      if (timeRule) {
        if (timeRule === 1) {
          return `自领取起${effectTime}天有效`
        } else if (timeRule === 2) {
          return `自领取起${effectTime.split(',')[0]}天有效,${
            effectTime.split(',')[1]
          }天失效`
        } else {
          return `${effectTime.split(',')[0]} 到 ${effectTime.split(',')[1]}`
        }
      }
    },
    handleOpenGoods() {
      // 打开选择商品弹窗组件
      this.$refs.dialogGoods.open()
    },
    handleCheckCoupon() {
      this.$refs.checkCoupons.handleGetlist()
      this.$refs.checkCoupons.defaultcheck(this.formData.couponRelationReqDto)
    },
    handlePerCount(index, row) {
      row.perCount = this.tableFrom.perCount
      row.showVisible = false
    },
    handletotalCount(index, row) {
      row.totalCount = this.tableFrom.totalCount
      row.showVisibleTotal = false
    },
    onSelectedGoods(row) {
    //      // 商品选择确定事件
    //   row.map((v, index) => {
    //     v.sortNumber = index + 1
    //     v.commodityId = v.erpCode
    //   })
      console.log('onSelectedGoods', row)
      this.formData.commoditySpecList = row
    },
    handleSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.formData.commoditySpecList.length === 0) {
            this.$message({
              message: '请选择商品',
              type: 'warning'
            })
            return
          }
          if (this.formData.couponRelationReqDto.length === 0) {
            this.$message({
              message: '请选择优惠券',
              type: 'warning'
            })
            return
          }
          if (this.$route.query.id) {
            this.updateLive()
          } else {
            this.setLive()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async setLive() {
      this.saveLoading = true
      try {
        await liveRequest.createLive(this.formData)
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.back()
        }, 500)
      } catch (error) {
        this.saveLoading = false
        console.log(error)
      }
    },
    async updateLive() {
      this.saveLoading = true
      try {
        await liveRequest.updateLiveInfo(this.formData)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.back()
        }, 500)
      } catch (error) {
        console.log(error)
        this.saveLoading = false
      }
    },
    errorHandler() {

    },
    handleCoverSuccess(res, file) {
      this.formData.coverPicUrl = res.data
      this.pageLoading.close()
    },
    handleAvatarSuccess(res) {
      this.formData.adPicUrl = res.data
      this.pageLoading.close()
    },
    handleLogoSuccess(res) {
      this.formData.merLogoUrl = res.data
      this.pageLoading.close()
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
    }
  }
}
</script>
<style lang="scss">
.live-activity-wrapper {
  .color-box{
    width: 10px;
    height: 10px;
    display: inline-block;
  }
    .m-colorPicker .box{
        z-index: 22
    }
    .avatar-box{
      position: relative;
    }
    .edit-avatar{
      position: absolute;
      top: 0;
    }
  .form-title {
    line-height: 16px;
    font-size: 16px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 16px;
  }
  .cover{
    .avatar-uploader-icon {
      width: 80px;
      height: 80px;
      line-height: 80px !important;
    }
    .avatar {
      width: 80px;
      height: 80px;
    }
  }
  .ad-cover{
    .avatar-uploader-icon {
      width: 250px;
      height: 80px;
      line-height:80px !important;
    }
    .avatar {
      width: 250px;
      height: 80px;
    }
  }
}
</style>
