<template>
  <div class="app-cotainer factory-live-create">
    <div class="info-title">基本信息</div>
    <el-form ref="rulesForm" :model="liveForm" disabled label-width="100px" class="demo-ruleForm">
      <el-form-item label="直播头像：">
        <img v-if="liveForm.merLogoUrl" :src="showImg(liveForm.merLogoUrl)" class="avatar">
      </el-form-item>
      <el-form-item label="直播名称：">
        {{ liveForm.merName }}
      </el-form-item>
      <el-form-item label="直播主题：" prop="name">
        {{ liveForm.name }}
      </el-form-item>
      <el-form-item label="开播时间：" prop="beginTime">
        {{ liveForm.beginTime }}
      </el-form-item>
      <el-form-item label="直播封面：" prop="coverPicUrl">
        <img v-if="liveForm.coverPicUrl" style="width:110px;height:110px" :src="showImg(liveForm.coverPicUrl)" class="avatar">
      </el-form-item>
      <el-form-item label="直播简介：" prop="liveIntroduce">
        {{ liveForm.liveIntroduce }}
      </el-form-item>
      <el-form-item label="直播公告：" prop="activityNotice">
        {{ liveForm.activityNotice }}
      </el-form-item>
    </el-form>
    <div class="info-title">关联介绍</div>
    <el-form ref="liveForm" :model="liveForm" disabled label-width="100px" class="demo-ruleForm">
      <el-form-item label="参与商品：">
        <selectedGoods v-show="liveForm.commoditySpecList.length>0" ref="storeGods" disabled />
      </el-form-item>
      <el-form-item label="直播奖励：">
        成交 {{ liveForm.prizeRule }} 奖励 {{ liveForm.prizeAmount }}
      </el-form-item>
      <el-form-item label="订阅门槛：">
        <el-select v-model="liveForm.subscribeLimitType" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="图文信息：">
        <Tinymce
          v-model="liveForm.graphicDetails"
          :height="400"
          disabled
        />
      </el-form-item>
    </el-form>
    <el-button size="mini" :disabled="false" @click="$router.push('/live-manage/factory-live')">返回</el-button>
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
import selectedGoods from '../../factory-live/_source/selected-goods'
import storeGoods from '../../factory-live/_source/pop-goods'
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
        commoditySpecList: [], // 商品信息
        prizeAmount: '', // 奖励金额
        prizeRule: '', // 奖励规则
        subscribeLimitType: 0, // 订阅门槛
        graphicDetails: '' // 图文详情
      },
      // 订阅门槛
      options: [
        { value: 0, label: '无对应商品可订阅' },
        { value: 1, label: '至少要有一个对应商品方可订阅' },
        { value: 2, label: '必须对应所有商品方可订阅' }
      ]
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
  created() {
    const querys = this.$route.query
    if (querys.id) { // 编辑
      LiveRequest.getLiveInfo(querys.id).then(res => {
        console.log(res)
        _.map(res.data.commoditys, goods => {
          goods.mainPic = goods.picUrl
        })
        this.liveForm = Object.assign(this.liveForm, res.data)
        this.liveForm.commoditySpecList = res.data.commoditys
        this.$refs.storeGods.dataFrom(this.liveForm.commoditySpecList)
      })
    } else {
      merchantDetail().then(res => {
        console.log(res)
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
