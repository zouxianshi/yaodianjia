<template>
  <div class="rule-awardSetting-modal">
    <el-alert
      type="warning"
      :closable="false"
    >{{ numTips }}</el-alert>
    <div style="margin:20px 0">
      <el-form ref="formsGift" :model="formsGift" :rules="rulesGift">
        <el-table :data="formsGift.selectedGift" style="width: 100%" height="calc(100vh - 430px)">
          <el-table-column label="奖品顺序" type="index" width="100" />
          <el-table-column label="奖品类型">
            <template slot-scope="scope">{{ formatType(scope.row.giftType) }}</template>
          </el-table-column>
          <el-table-column prop="giftImg" label="图片">
            <template slot-scope="scope">
              <img :src="showImgsTabel(scope.row)" style="width:70px;height:70px">
            </template>
          </el-table-column>
          <el-table-column prop="giftName" label="奖品名称" />
          <el-table-column prop="giftContent" label="内容" />
          <el-table-column label="中奖几率">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.winRandom"
                :disabled="isPageUpdateOrView || isRuning"
                size="mini"
                :precision="2"
                :step="1"
                :min="0.01"
                :max="100"
                :controls="false"
                style="width:70px"
              />
              <span style="font-size:16px">%</span>
            </template>
          </el-table-column>
          <el-table-column label="奖品数量">
            <template slot-scope="scope">
              <el-input v-if="scope.row.giftNum===-1" disabled size="mini" style="width:100px" value="无限" />
              <el-input-number
                v-else
                v-model="scope.row.giftNum"
                :disabled="isPageUpdateOrView || isRuning"
                size="mini"
                :precision="0"
                :step="1"
                :min="1"
                :max="100000"
                :controls="false"
                style="width:100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                :disabled="scope.$index === 0 || isPageUpdateOrView || isRuning"
                @click.native.prevent="deleteRow(scope.$index, formsGift.selectedGift)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
    <el-button
      type="primary"
      plain
      :disabled="formsGift.selectedGift.length>= 10 || isPageUpdateOrView || isRuning"
      @click="dialogVisible = true;$refs.ruleForm && $refs.ruleForm.clearValidate()"
    >添加奖品</el-button>
    <span style="margin-left: 20%;color:#F56C6C">概率总计: {{totalGl}}%</span>
    <div style="margin-top:40px">
      <el-button type="primary" @click="$emit('handleNext', 1)">上一步</el-button>
      <el-button v-if="params.pageState!==2" type="primary" @click="submitData">保存并提交</el-button>
      <el-button v-if="params.pageState===2" type="primary" @click="goBack">返回</el-button>
    </div>
    <el-dialog title="添加奖品" :visible.sync="dialogVisible" width="70%" append-to-body>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="奖品类型" prop="giftType">
          <el-select v-model="ruleForm.giftType" @change="changeType">
            <el-option label="优惠券" :value="2" />
            <el-option label="海贝" :value="3" />
            <el-option label="实物" :value="1" />
            <el-option label="再来一次" :value="4" />
            <el-option label="谢谢参与" :value="5" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="ruleForm.giftType===2" label="奖品内容" prop="giftContent">
          <el-button size="mini" @click="selectCoupon">选择优惠券</el-button>
          <mSelectedCoupon ref="selectedCouponView" @onDel="onGetSelectCoupon" />
        </el-form-item>
        <el-form-item label="奖品图片" prop="giftImg">
          <el-upload
            v-loading="uploadLoading"
            class="avatar-uploader x-uploader"
            :action="upLoadUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img :src="showImgs()" class="avatar">
          </el-upload>
        </el-form-item>
        <el-form-item v-show="ruleForm.giftType !== 2" label="奖品内容" prop="giftContent">
          <span v-if="ruleForm.giftType === 3">
            <el-input
              v-model="ruleForm.giftContent"
              onkeyup="this.value=this.value.replace(/\D/g,'')"
              maxlength="6"
              placeholder="请输入海贝值"
              style="width:400px"
            />海贝
          </span>
          <span v-if="ruleForm.giftType === 5">谢谢参与</span>
          <span v-if="ruleForm.giftType === 4">再来一次</span>
          <el-input
            v-if="ruleForm.giftType === 1"
            v-model="ruleForm.giftContent"
            maxlength="6"
            placeholder="请输入奖品名称 不超过六个字"
            style="width:400px"
          />
        </el-form-item>
        <el-form-item label="中奖几率" prop="winRandom">
          <el-input-number
            v-model="ruleForm.winRandom"
            :precision="2"
            :step="1"
            :min="0.01"
            :max="100"
            :controls="false"
            style="width:400px"
          />
          <span style="display:inline-block; height: 34px; line-height: 34px; font-size: 16px;width: 30px;">％</span>
          <span style="margin-left: 24px;color: #F56C6C">剩余概率：{{(10000 - (totalGl*100))/100}}%</span>
        </el-form-item>
        <el-form-item label="奖品数量" prop="giftNum">
          <!-- 在这 -->
          <el-input
            v-show="ruleForm.giftType === 5"
            value="无限"
            disabled
            style="width:400px"
          />
          <el-input-number
            v-show="ruleForm.giftType !== 5"
            v-model="ruleForm.giftNum"
            :precision="0"
            :step="1"
            :min="minNum"
            :max="100000"
            :controls="false"
            style="width:400px"
          />
          <span style="display:inline-block; height: 34px; line-height: 34px; font-size: 16px;width: 30px;">份</span>
        </el-form-item>
      </el-form>
      <mCheckCoupon ref="checkCoupons" state="1" :timevalue="timevalue" :singlechoice="true" @confincheck="onGetSelectCoupon" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import _ from 'lodash'
import mCheckCoupon from '@/components/Marketings/checkCoupon'
import mSelectedCoupon from '../../../_source/selectedCouNonum'
export default {
  name: 'AwardSetting',
  components: {
    mCheckCoupon, mSelectedCoupon
  },
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    console.log(this.params, 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
  },
  data() {
    var validategiftNum = (rule, value, callback) => {
      if (
        (
          ('' + value).trim() === '' ||
          Number(value) > 100000)
      ) {
        callback(new Error('请输入0~100000的奖品数量'))
      } else {
        callback()
      }
    }
    return {
      totalGl: 0,
      minNum: 1, // 最小礼品数量
      uploadLoading: false,
      dialogVisible: false,
      timevalue: [new Date(), new Date()],
      selectedCoupons: [], // 已选择的优惠券列表
      formsGift: {
        selectedGift: [
          {
            giftContent: '谢谢参与',
            giftImg: '',
            giftName: '谢谢参与',
            giftNum: -1,
            giftType: 5,
            winRandom: 1
          }
        ] // 已选择的礼品券
      },
      couponList: [],
      ruleForm: {
        giftId: null, // 选择优惠券时的id
        giftType: 1, // 礼品类型
        giftNum: 1, // 礼品数量
        giftName: '', // 礼品名称
        giftContent: '', // 礼品内容
        giftImg: '', // 礼品图片
        winRandom: '' // 中
      },
      rulesGift: {
        winRandom: [
          { required: true, message: '请设置中奖几率', trigger: 'blur' }
        ],
        giftNum: [
          { required: true, message: '请设置奖品数量', trigger: 'blur' },
          { validator: validategiftNum, trigger: 'blur' }
        ]
      },
      rules: {
        winRandom: [
          { required: true, message: '请设置中奖几率', trigger: 'blur' }
        ],
        giftNum: [
          { required: true, message: '请设置奖品数量', trigger: 'blur' },
          { validator: validategiftNum, trigger: 'change' }
        ],
        giftContent: [
          { required: true, message: '请设置奖品内容', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    formsGift: {
      handler(newVal) { // 计算剩余中奖概率
        let glTotal = 0
        _.map(newVal.selectedGift, v => {
          glTotal += v.winRandom
        })
        this.totalGl = parseInt(glTotal*100)/100
      },
      deep: true,
      immediate: true
    },
    params: { // 将时间传给选择优惠券组件、筛选符合时间要求的优惠券
      handler(newVal) {
        this.timevalue = [newVal.beginTime, newVal.endTime]
        console.log(this.timevalue)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    numTips() {
      if (this.$route.query.code === 'TA003') {
        return `奖项个数说明：大转盘支持设置6或8个奖项； 排
                序说明：将按照您添加的先后顺序在大转盘活动中显示；中奖几率说明：单位默认为百分比，中奖总和必须等于1`
      } else {
        return `奖项个数说明：刮刮乐最多设置10个奖项；排序说明：奖品的添加先后顺序，刮刮乐的获奖几率与顺序无关；
                中奖几率说明：单位默认为百分比，中奖总和必须等于1`
      }
    },
    upLoadUrl() {
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
  methods: {
    selectCoupon() { // 选择优惠券
      this.$refs.checkCoupons.handleGetlist()
      this.$refs.checkCoupons.defaultcheck(this.selectedCoupons)
    },
    onGetSelectCoupon(selectedCoupons) {
      if (selectedCoupons.length > 0) {
        this.ruleForm.giftId = selectedCoupons[0].id
        this.ruleForm.giftContent = selectedCoupons[0].cname
      }
      this.selectedCoupons = selectedCoupons
      this.$refs.selectedCouponView.showPage(selectedCoupons, 1)
    },
    goBack() {
      if (this.$route.query.code === 'TA003') {
        this.$router.push(
          '/marketings/activity-manage/turntable/list?code=TA003&name=大转盘'
        )
      } else if (this.$route.query.code === 'TA004') {
        this.$router.push(
          '/marketings/activity-manage/turntable/guaList?code=TA004&name=刮刮乐'
        )
      }
    },
    showImgs() {
      if (this.ruleForm.giftImg) {
        return this.showImg(this.ruleForm.giftImg)
      } else {
        if (this.ruleForm.giftType === 2) {
          return require('../img/discountpng.png')
        } else if (this.ruleForm.giftType === 3) {
          return require('../img/coin.png')
        } else {
          return require('../img/giftpng.png')
        }
      }
    },
    showImgsTabel(data) {
      if (data.giftImg.length < 1) {
        if (data.giftType === 2) {
          return require('../img/discountpng.png')
        } else if (data.giftType === 3) {
          return require('../img/coin.png')
        } else {
          return require('../img/giftpng.png')
        }
      } else {
        return this.showImg(data.giftImg)
      }
    },
    deleteRow(index, table) {
      this.$confirm('删除该项奖品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          table.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    submitForm(formName) {
      var that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.giftType === 3) {
            // 海贝时数据处理
            this.ruleForm.giftId = this.ruleForm.giftContent
            this.ruleForm.giftName = this.ruleForm.giftContent =
              this.ruleForm.giftContent + '海贝'
          } else if (this.ruleForm.giftType === 5) {
            this.ruleForm.giftNum = -1
            this.ruleForm.giftName = this.ruleForm.giftContent
          } else {
            this.ruleForm.giftName = this.ruleForm.giftContent
          }
          this.ruleForm.winRandom = this.ruleForm.winRandom
          that.formsGift.selectedGift.push(_.cloneDeep(that.ruleForm))
          this.ruleForm = {
            giftId: '', // 选择优惠券时的id
            giftType: 1, // 礼品类型
            giftNum: 1, // 礼品数量
            giftName: '', // 礼品名称
            giftContent: '', // 礼品内容
            giftImg: '', // 礼品图片
            winRandom: ''
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    changeType() {
      var types = this.ruleForm.giftType
      this.minNum = 1
      if (types === 5) {
        this.ruleForm.giftNum = 1
        this.ruleForm.giftContent = '谢谢参与'
      } else if (types === 4) {
        this.ruleForm.giftContent = '再来一次'
      } else {
        this.ruleForm.giftContent = ''
      }
      this.resetForm()
    },
    resetForm() {
      var form = this.ruleForm
      form.giftId = ''
      form.giftNum = ''
      form.giftName = ''
      form.giftImg = ''
      form.winRandom = ''
    },
    // 格式化表格数据：礼品类型
    formatType(type) {
      var typeName = ''
      switch (type) {
        case 1:
          typeName = '实物'
          break
        case 2:
          typeName = '优惠券'
          break
        case 3:
          typeName = '海贝'
          break
        case 4:
          typeName = '再来一次'
          break
        case 5:
          typeName = '谢谢参与'
          break
        default:
          typeName = ''
      }
      return typeName
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '10000') {
        this.ruleForm.giftImg = res.data
        this.uploadLoading = false
      } else {
        this.uploadLoading = false
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload(file) {
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
    // 提交数据到add
    submitData() {
      var params = {}
      var selected = _.cloneDeep(this.formsGift.selectedGift)
      selected.map(item => {
        item.winRandom = item.winRandom / 100
      })
      var activeCode = this.$route.query.code
      if (activeCode === 'TA003') {
        if (selected.length !== 6 && selected.length !== 8) {
          this.$message({
            message: '奖项总数需设置为6或者8',
            type: 'error'
          })
          return
        }
      } else {
        if (selected.length < 1 || selected.length > 10) {
          this.$message({
            message: '奖项总数限制1-10',
            type: 'error'
          })
          return
        }
      }
      var num = 0
      _.map(selected, item => {
        num += item.winRandom * 10000
      })
      if (parseInt(num) !== 10000) {
        this.$message({
          message: '奖品总中奖几率需等于100%',
          type: 'error'
        })
        return
      }
      params.activityGiftReqDTO = selected
      this.$emit('submitAjax', params)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.rule-awardSetting-modal {
  padding-top: 10px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
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
}
</style>
