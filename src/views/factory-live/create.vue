<template>
  <div class="app-cotainer factory-live-create">
    <div class="info-title">基本信息</div>
    <el-form :model="liveForm" ref="rulesForm" label-width="100px" :rules="rules" class="demo-ruleForm">
      <el-form-item label="直播头像：" required>
          <img v-if="liveForm.merLogoUrl" :src="showImg(liveForm.merLogoUrl)" class="avatar" />
      </el-form-item>
      <el-form-item label="直播名称：" required>
        <el-input size="mini" v-model="liveForm.merName" style="width:400px" disabled />
      </el-form-item>
      <el-form-item label="直播主题：" prop="name">
        <el-input size="mini" v-model="liveForm.name" style="width:400px" />
      </el-form-item>
      <el-form-item label="开播时间：" prop="beginTime">
        <el-date-picker
          size="mini"
          v-model="liveForm.beginTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="直播封面：" prop="coverPicUrl">
        <el-upload
          size="mini"
          class="avatar-uploader"
          :action="upLoadUrl"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="liveForm.coverPicUrl" :src="showImg(liveForm.coverPicUrl)" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="直播简介：" prop="liveIntroduce">
        <el-input
          type="textarea"
          placeholder="请输入直播简介"
          v-model="liveForm.liveIntroduce" style="width:400px">
        </el-input>
      </el-form-item>
      <el-form-item label="直播公告：" prop="activityNotice">
        <el-input
          type="textarea"
          placeholder="请输入直播简介"
          v-model="liveForm.activityNotice" style="width:400px">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="info-title">关联介绍</div>
    <el-form :model="liveForm" ref="liveForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="参与商品：">
        <el-button type="primary" size="mini" @click="$refs.GoodsComponent.open()">选择商品</el-button>
        <selectedGoods ref="storeGods" @del-item="delSelectGoods" v-show="liveForm.commoditySpecList.length>0" />
      </el-form-item>
      <el-form-item label="直播奖励：">
        成交<el-input-number size="mini" :min="0" :max="99999" :precision="0" :controls="false" v-model="liveForm.prizeRule"></el-input-number>
        奖励<el-input-number size="mini" :min="0" :max="99999" :precision="0" :controls="false" v-model="liveForm.prizeAmount"></el-input-number>
      </el-form-item>
      <el-form-item label="订阅门槛：">
        <el-select v-model="liveForm.subscribeLimitType" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图文信息：">
        <Tinymce
          ref="editor"
          v-model="liveForm.graphicDetails"
          :height="400"
        />
      </el-form-item>
    </el-form>
    <div class="submit-btn">
      <el-button size="mini" @click="saveLive" v-loading="submitLoading">保存</el-button>
    </div>
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :limit-max="9999"
      :list="liveForm.commoditySpecList"
      @on-change="handleSelectGoods"
    />
  </div>
</template>
<script>
import _ from 'lodash'
import { formatDate } from '@/utils/timer'
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import LiveRequest from '@/api/live'
import { merchantDetail } from '@/api/merchant_Person_Api' // 商户信息
import { getProduct, updateLiveInfo } from '@/api/factory-live'
import Tinymce from '@/components/Tinymce'
import selectedGoods from './_source/selected-goods'
import storeGoods from './_source/pop-goods'
export default {
  components: {
    Tinymce, storeGoods, selectedGoods
  },
  data() {
    return {
      liveForm: {
        merLogoUrl: '', // 直播logo
        merType: 2, // 厂家直播
        merName: '', // 活动名
        name: '', // 直播主题
        coverPicUrl: '',
        beginTime: '', // 直播开始时间
        liveIntroduce: '', // 直播简介
        activityNotice: '',
        commoditySpecList: [], //商品信息
        prizeAmount: '', // 奖励金额
        prizeRule: '', // 奖励规则
        subscribeLimitType: 1, //订阅门槛
        graphicDetails: '' // 图文详情
      },
      rules: {
        name: [
          { required: true, message: '请输入直播主题', trigger: 'blur' }
        ],
        beginTime: [
          { required: true, message: '请选择直播开始时间', trigger: 'change' }
        ],
        coverPicUrl: [
          { required: true, message: '请上传直播封面', trigger: 'change' }
        ],
        activityNotice: [
          { required: true, message: '请输入直播公告', trigger: 'blur' }
        ],
        liveIntroduce: [
          { required: true, message: '请输入直播简介', trigger: 'blur' }
        ]
      },
      // 订阅门槛
      options:[
        {value: 1, label: '无对应商品可订阅'},
        {value: 2, label: '至少要有一个对应商品方可订阅'},
        {value: 3, label: '必须对应所有商品方可订阅'}
      ],
      submitLoading: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token', 'user']),
    upLoadUrl() { // 图片上传路径
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  mounted() {
    const  querys = this.$route.query
    if (querys.id) { // 编辑
      LiveRequest.getLiveInfo(querys.id).then(res => {
        console.log(res)
        _.map(res.data.commoditys, goods => {
          goods.mainPic = goods.picUrl
        })
        this.liveForm = Object.assign(this.liveForm, res.data)
        // 赋值值
        if (this.liveForm.graphicDetails === null) {
          this.liveForm.graphicDetails = ''
        }
        this.$refs.editor.setContent(this.liveForm.graphicDetails)
        this.liveForm.commoditySpecList = res.data.commoditys
        this.$refs.storeGods.dataFrom(this.liveForm.commoditySpecList)
      })
    } else {
      merchantDetail().then(res => {
        if (res.code === '10000') {
          this.liveForm.merLogoUrl = res.data.merLogo
          this.liveForm.merName = res.data.merName
        }
      })
    }
  },
  methods: {
    handleAvatarSuccess1(res, file) {
      this.liveForm.coverPicUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 选择商品
    handleSelectGoods(val) {
      this.liveForm.commoditySpecList = val
      this.$refs.storeGods.dataFrom(val)
    },
    // 删除已选择商品
    delSelectGoods(item, index) {
      this.liveForm.commoditySpecList.splice(index, 1)
      this.$refs.storeGods.dataFrom(this.liveForm.commoditySpecList)
    },
    // 提交直播数据
    saveLive() {
      this.$refs['rulesForm'].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const params = _.cloneDeep(this.liveForm)
          params.beginTime = formatDate(params.beginTime)
          _.map(params.commoditySpecList, goods => {
            goods.picUrl = goods.mainPic ? goods.mainPic : ''
            goods.merCode = this.merCode
            goods.specStr = goods.specSkuList ? (goods.specSkuList[0].skuKeyName + ': ' + goods.specSkuList[0].skuValue) : goods.specStr
          })
          if (this.$route.query.id) {
            updateLiveInfo(params).then(res => {
            this.submitLoading = false
            if (res.code === '10000') {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.$router.push('/factory-live/list')
            }
          })
          } else {
            LiveRequest.createLive(params).then(res => {
              this.submitLoading = false
              if (res.code === '10000') {
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.$router.push('/factory-live/list')
              }
            })
          }
        } else {
          return false;
        }
      }) 
    }
  }
}
</script>
<style lang="scss">
.factory-live-create {
  .info-title {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
  }
  .submit-btn{
    margin-top: 24px; text-align: center;
  }
}
</style>