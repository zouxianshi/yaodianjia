<template>
  <div class="rule-ruleList-modal">
    <div class="rule-ruleList-title">活动信息</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
      :disabled="isPageUpdateOrView"
    >
      <el-form-item label="活动名称" prop="activityDetailName">
        <el-input v-model="ruleForm.activityDetailName" style="width:400px" placeholder="最多30字" />
      </el-form-item>
      <el-form-item label="活动时间" prop="activeTime">
        <el-date-picker
          v-model="ruleForm.activeTime"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          :disabled="isRuning"
          @input="daterangeChange"
        />
        <!-- <el-date-picker
          v-model="ruleForm.activeTime"
          :disabled="isRuning"
          type="datetimerange"
          range-separator="至"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        /> -->
      </el-form-item>
      <el-form-item label="活动说明" prop="activityNote">
        <el-input
          v-model="ruleForm.activityNote"
          style="width:500px"
          type="textarea"
          maxlength="200"
          placeholder="最多200字"
        />
      </el-form-item>
      <el-form-item label="底部文案" prop="bottomNote">
        <el-input
          v-model="ruleForm.bottomNote"
          :disabled="isRuning"
          style="width:400px"
          placeholder="解释说明，最多20字"
        />
      </el-form-item>
      <el-form-item label="封面上传" prop="cover">
        <el-upload
          v-loading="uploadLoading"
          class="avatar-uploader x-uploader"
          :action="upLoadUrl"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <span v-if="!ruleForm.cover || ruleForm.cover === ''" style="width: 178px; height: 178px; display:block; line-height: 178px; font-weight: bold">
            <i slot="default" class="el-icon-plus" />
          </span>
          <img v-else :src="showImg(ruleForm.cover)" class="avatar">
        </el-upload>
        <span style="color:#999">
          （用于个人中心精彩活动聚合页展示，建议上传图片尺寸750*200，不大于2m，格式jpg、png）
        </span>
      </el-form-item>
      <el-form-item>
        <div v-if="intrShow && this.$route.query.code==='TA003'" class="intrwarning">
          大转盘的玩法场景说明：
          <ul>
            <li>1. 免费参与：创建抽奖活动后，将链接发布至商城首页或打印活动二维码，会员进入免费参与抽奖，较适用于小面额优惠券抽奖，提高用户活跃，促进商品销售；</li>
            <li>2. 海贝参与：会员需要消耗一定的海贝才能参与抽奖， 消耗会员海贝库存，设置活动后可以将链接发布至微商城广告位，或打印二维码制作海报，会员扫码参与抽奖；</li>
            <li>3. 活动参与：适用于支付满一定金额获得抽奖机会的奖励，可以提高用户活跃，创建一个大转盘活动后，设置抽奖次数，然后在支付有礼中，添加支付后权益为参与抽奖，会员在微商城或线下消费满足条件后，触发抽奖机会入口，会员进入参与抽奖。</li>
          </ul>
        </div>
        <div v-if="intrShow && this.$route.query.code==='TA004'" class="intrwarning">
          刮刮乐的玩法场景说明：
          <ul>
            <li>1. 免费参与：创建抽奖活动后，将链接发布至商城首页或打印活动二维码，会员进入免费参与抽奖，较适用于小面额优惠券抽奖，提高用户活跃，促进商品销售；</li>
            <li>2. 海贝参与：会员需要消耗一定的海贝才能参与抽奖， 消耗会员海贝库存，设置活动后可以将链接发布至微商城广告位，或打印二维码制作海报，会员扫码参与抽奖；</li>
            <li>3. 活动参与：适用于支付满一定金额获得抽奖机会的奖励，可以提高用户活跃，创建一个活动后，设置抽奖次数，然后在支付有礼中，添加支付后权益为参与抽奖，会员在微商城或线下消费满足条件后，触发抽奖机会入口，会员进入参与抽奖。</li>
          </ul>
        </div>
        <div slot="label">
          活动规则
          <i
            style="color: #faad14;"
            class="el-icon-question"
            @click="()=>intrShow?intrShow=false:intrShow=true"
          />
        </div>
      </el-form-item>
      <el-form-item label="参与方式" prop="joinRule">
        <el-radio-group
          v-model="ruleForm.joinRule"
          :disabled="isRuning"
          style="width:120px;font-size: 18px;line-height: inherit;"
          @change="changeJoinrule"
        >
          <el-radio :label="1">
            <span>免费参与</span>
          </el-radio>
          <el-radio :label="2">
            <span>消耗海贝&emsp;每消耗&emsp;</span>
            <el-input
              v-model="ruleForm.integralRule"
              onkeyup="this.value=this.value.match(/^[1-9]{1}[0-9]*$/)"
              :disabled="isRuning || ruleForm.joinRule !== 2"
              maxlength="8"
              style="width:100px"
            />&emsp;海贝，参与一次
          </el-radio>
          <el-radio :label="3">
            <span>活动参与</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="抽奖次数" prop="countRule">
        <el-radio-group
          v-if="ruleForm.joinRule !== 3"
          v-model="ruleForm.countType"
          :disabled="isRuning"
          style="width:120px;font-size: 18px;line-height: inherit;"
          @change="changeCount"
        >
          <el-radio :label="2">
            <span>
              每天可抽奖
              <el-input
                v-model="ruleForm.dayLimit"
                onkeyup="this.value=this.value.match(/^[1-9]{1}[0-9]*$/)"
                :disabled="isRuning || ruleForm.countType===1"
                maxlength="6"
                style="width:100px"
                @input="$forceUpdate()"
              />次
            </span>
          </el-radio>
          <el-radio :label="1">
            <span>
              每人可抽奖
              <el-input
                v-model="ruleForm.personLimit"
                onkeyup="this.value=this.value.match(/^[1-9]{1}[0-9]*$/)"
                :disabled=" isRuning || ruleForm.countType===2"
                maxlength="6"
                style="width:100px"
                @input="$forceUpdate()"
              />次
            </span>
          </el-radio>
        </el-radio-group>
        <span v-else>
          <el-input
            v-model="ruleForm.activeLimit"
            :disabled="isRuning"
            onkeyup="this.value=this.value.replace(/\D/g,'')"
            maxlength="6"
            style="width:120px"
            @input="$forceUpdate()"
          />次
        </span>
      </el-form-item>
    </el-form>
    <div style="margin-left:30px">
      <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/timer'
import { mapGetters } from 'vuex'
import config from '@/utils/config'
export default {
  name: 'RuleList',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    var validateparticipatio = (rule, value, callback) => {
      if (
        this.ruleForm.joinRule === 2 &&
        (Number(this.ruleForm.integralRule) === 0 ||
          ('' + this.ruleForm.integralRule).trim() === '' ||
          Number(this.ruleForm.integralRule) > 10000)
      ) {
        callback(new Error('请输入0~10000的消耗海贝数'))
      } else {
        callback()
      }
    }
    var validatedayLimit = (rule, value, callback) => {
      if (
        this.ruleForm.joinRule === 3 &&
        (Number(this.ruleForm.activeLimit) === 0 ||
          ('' + this.ruleForm.activeLimit).trim() === '' ||
          Number(this.ruleForm.activeLimit) > 1000)
      ) {
        callback(new Error('请输入0~1000的抽奖次数'))
      } else if (
        this.ruleForm.joinRule !== 3 &&
        this.ruleForm.countType === 1 &&
        (Number(this.ruleForm.personLimit) === 0 ||
          ('' + this.ruleForm.personLimit).trim() === '' ||
          Number(this.ruleForm.personLimit) > 1000)
      ) {
        callback(new Error('请输入0~1000抽奖次数'))
      } else if (
        this.ruleForm.joinRule !== 3 &&
        this.ruleForm.countType === 2 &&
        (Number(this.ruleForm.dayLimit) === 0 ||
          ('' + this.ruleForm.dayLimit).trim() === '' ||
          Number(this.ruleForm.dayLimit) > 1000)
      ) {
        callback(new Error('请输入0~1000抽奖次数'))
      } else {
        callback()
      }
    }
    const checkActivitTime = (rule, value, callback) => {
      if (Number(value.length) === 0) {
        return callback(new Error('请选择活动开始和结束时间'))
      }
      if (value[0] >= value[1]) {
        return callback(new Error('活动结束时间要大于开始时间'))
      }
      callback()
    }
    return {
      uploadLoading: false,
      intrShow: false,
      ruleForm: {
        activeTime: [], // 活动有效期
        activityDetailName: '', // 活动名称
        bottomNote: '', // 底部文案
        beginTime: '', // 活动开始时间
        endTime: '', // 活动结束时间
        activityNote: '', // 活动说明
        integralRule: '', // 参与消耗海贝
        joinRule: 1, // 参与方式
        countType: 2, // 参与限制类型  1：每人 2：每天
        countRule: '', // 次数限制
        dayLimit: '', // 每天限制
        personLimit: '', // 每人限制
        activeLimit: '', // 活动参与
        cover: ''
      },
      rules: {
        activityDetailName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 30, message: '最多30字', trigger: 'blur' }
        ],
        bottomNote: [
          // { required: true, message: '请输入底部文案', trigger: 'blur' },
          { min: 1, max: 20, message: '最多20字', trigger: 'blur' }
        ],
        activityNote: [
          // { required: true, message: '请填写活动说明', trigger: 'blur' },
          { min: 1, max: 200, message: '最多200字', trigger: 'blur' }
        ],
        joinRule: [{ validator: validateparticipatio, trigger: 'change' }], // 参与消耗海贝
        countRule: [
          // { required: true, message: '请填写抽奖次数', trigger: 'change' },
          { validator: validatedayLimit, trigger: 'change' }
        ],
        activeTime: [
          {
            required: true,
            validator: checkActivitTime,
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token']),
    upLoadUrl() { // 图片上传路径
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    },
    isPageUpdateOrView() {
      // 判断编辑还是查看页面
      if (this.params.pageState === 2) {
        // 查看
        return true
      } else {
        // 编辑
        return false
      }
    },
    isRuning() {
      // 活动进行中
      if (this.params.state === 1) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    ruleForm: {
      handler: function(vv) {
        this.ruleForm.beginTime = formatDate(this.ruleForm.activeTime[0])
        this.ruleForm.endTime = formatDate(this.ruleForm.activeTime[1])
        if (this.ruleForm.countType === 2) {
          this.ruleForm.countRule = this.ruleForm.dayLimit
        } else if (this.ruleForm.countType === 1 && this.ruleForm.joinRule !== 3) {
          this.ruleForm.countRule = this.ruleForm.personLimit
        } else {
          this.ruleForm.countRule = this.ruleForm.activeLimit
        }
      },
      deep: true
    },
    personLimit(newVal) {
      // 监听按人限制变化
    }
  },
  mounted() {
  },
  methods: {
    beforeAvatarUpload(file) { // 图片上传之前
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 2MB!',
          type: 'warning'
        })
        return false
      }
      if (!isImg) {
        this.$message({
          message: '请上传jpeg、png、jpg格式的图片',
          type: 'warning'
        })
        return false
      }
      if (isImg) {
        this.uploadLoading = true
      }
      return isImg
    },
    handleAvatarSuccess(res, file) { // 图片上传成功
      if (res.code === '10000') {
        this.ruleForm.cover = res.data
        this.uploadLoading = false
      } else {
        this.uploadLoading = false
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    daterangeChange(e) {
      const _this = this
      _this.$nextTick(() => {
        _this.$set(_this.ruleForm, 'activeTime', [e[0], e[1]])
        _this.ruleForm.beginTime = formatDate(e[0])
        _this.ruleForm.endTime = formatDate(e[1])
        _this.$forceUpdate()
      })
    },
    setActiveTime(v) {
      this.ruleForm.activeTime = v
    },
    handlechangetime(e) {
      console.log(e)
    },
    changeJoinrule() {
      if (this.ruleForm.joinRule === 3) {
        // 活动参与选抽奖次数
        this.ruleForm.countType = 1
        this.ruleForm.integralRule = this.ruleForm.countRule = this.ruleForm.dayLimit = this.ruleForm.personLimit = this.ruleForm.activeLimit = ''
      } else {
        this.ruleForm.integralRule = this.ruleForm.countRule = this.ruleForm.activeLimit = ''
      }
    },
    changeCount() {
      // 改变限制次数类型
      this.ruleForm.personLimit = this.ruleForm.dayLimit = this.ruleForm.activeLimit = ''
      this.ruleForm.countRule = ''
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.activeTime[0]) {
            this.$message({
              message: '请选择活动时间',
              type: 'error'
            })
            return false
          }
          if (Number(this.ruleForm.countRule) === '') {
            this.$message({
              message: '请输入正确抽奖次数限制',
              type: 'error'
            })
            return false
          }
          this.$emit('handleNext', 2, this.ruleForm)
          this.$emit('getcouponList', this.ruleForm)
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.rule-ruleList-modal {
  .rule-ruleList-title {
    height: 15px;
    padding-left: 10px;
    margin-top: 10px;
    line-height: 15px;
    width: 70%;
    border-left: 2px solid #409eff;
    margin-bottom: 20px;
  }
  .intrwarning {
    font-size: 13px;
    margin-left: 20px;
    background-color: #fdf6ec;
    color: #e6a23c;
    border-radius: 5px;
    padding: 10px;
  }
  .el-textarea__inner {
    min-height: 70px !important;
  }
  .el-icon-warning-outline:hover {
    cursor: pointer;
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
