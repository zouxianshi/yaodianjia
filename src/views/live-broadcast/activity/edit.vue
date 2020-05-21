<template>
  <div class="app-container">
    <div class="live-activity-wrapper">
      <el-form
        :model="formData"
        size="small"
        label-width="120px"
      >
        <div class="form-title">基本信息</div>
        <el-divider />
        <el-form-item label="直播头像：">
          <el-avatar :size="60" src="https://empty" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </el-form-item>
        <el-form-item label="直播名称：">
          <span />老百姓大药房
        </el-form-item>
        <el-form-item label="直播主题：">
          <el-input v-model="formData.name" placeholder="请输入直播主题" />
        </el-form-item>
        <el-form-item label="开播时间：">
          <el-date-picker
            v-model="formData.time"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="直播封面：">
          <div class="cover">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.coverPicUrl" :src="formData.coverPicUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>

        </el-form-item>
        <!-- 关联商品 -->
        <div class="form-title">关联商品</div>
        <el-divider />
        <el-form-item label="参与商品：">
          <el-button type="primary" size="mini" @click="handleOpenGoods">选择商品</el-button>
          <el-table :data="formData.commoditySpecList" max-height="450px" border size="small">
            <!-- <el-table-column v-if="!activityId" type="selection" width="55" /> -->
            <el-table-column label="商品名称" prop="name" min-width="100" />
            <el-table-column label="商品编码" prop="erpCode" />
            <el-table-column label="规格" prop="mprice">
              <template slot-scope="scope" :show-overflow-tooltip="true">
                <div v-html="formatSkuInfo(scope.row.specSkus)" />
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
          <el-table :data="formData.commoditySpecList" max-height="450" style="width: 100%">
            <el-table-column prop="cname" show-overflow-tooltip label="优惠券名称" />
            <el-table-column prop="address" label="优惠内容">
              <template
                slot-scope="scope"
              >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination) }}</template>
            </el-table-column>
            <el-table-column label="使用时间" width="160">
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
            <el-table-column label="发放张数" width="110">
              <template slot-scope="scope">
                <el-popover
                  v-model="scope.row.showVisible"
                  placement="bottom"
                  width="200"
                  trigger="manual"
                >
                  <div style="text-align: right; margin: 0">
                    <el-form :model="tableFrom" :rules="tableRules" size="mini">
                      <el-form-item label="" prop="sendNum">
                        <el-input v-model.number="tableFrom.sendNum" placeholder="输入发放张数" />
                      </el-form-item>
                      <el-form-item label="">
                        <el-button type="" @click="scope.row.showVisible=false">取消</el-button>
                        <el-button type="primary">确定</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <span v-text="scope.row.nul" />
                  <el-button slot="reference" type="text" icon="el-icon-edit" size="mini" circle @click="scope.row.showVisible=!scope.row.showVisible" />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="deleteRow(scope.$index, forms.selectlist)"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <!-- 广告位 -->
        <div class="form-title">广告位</div>
        <el-divider />
        <el-form-item label="图片：">
          <div class="ad-cover">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.adPicUrl" :src="formData.adPicUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="链接地址：">
          <el-input v-model="formData.adLinkUrl" placeholder="链接地址" />
        </el-form-item>
        <el-form-item label="直播背景色：">
          <colorPicker v-model="formData.bgColor" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">保存</el-button>
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
export default {
  name: 'LiveActivityEdit',
  components: { storeGoods, checkCoupon },
  data() {
    return {
      chooseStore: [],
      formData: {
        color: '#e2534d',
        selectlist: [],
        commoditySpecList: [],
        adLinkUrl: '',
        adPicUrl: '',
        beginTime: '',
        bgColor: '',
        coverPicUrl: '',
        createName: '',
        merLogoUrl: '',
        merName: '',
        name: ''
      },
      pageLoading: null,
      couponList: [],
      showVisible: false,
      tableFrom: {
        sendNum: 0
      },
      tableRules: {
        sendNum: [{ required: true, message: '请输入发放张数', trigger: 'change' }, { type: 'number', message: '必须为数字值' }]
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
  methods: {
    confincheck(val) {
      _.map(val, v => {
        v.showVisible = false
      })
      this.formData.selectlist = val
      if (this.formData.selectlist.length === 0) {
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
      this.$refs.checkCoupons.defaultcheck(this.formData.selectlist)
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
      if (this.$route.query.id) {
        this.updateLive()
      } else {
        this.setLive()
      }
    },
    async setLive() {
      try {
        await liveRequest.createLive(this.formData)
      } catch (error) {
        console.log(error)
      }
    },
    updateLive() {

    },
    errorHandler() {

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
    .m-colorPicker .box{
        z-index: 22
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
      width: 300px;
      height: 100px;
      line-height:100px !important;
    }
    .avatar {
      width: 350px;
      height: 100px;
    }
  }
}
</style>
