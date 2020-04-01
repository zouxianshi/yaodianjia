<template>
  <div class="right-index-model">
    <div class="right-content-model">
      <div class="right-right-model">会员卡信息</div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商户名称">
          <span v-text="form.name">}</span>
        </el-form-item>
        <el-form-item label="商户LOGO">
          <img :src="form.img" alt>
        </el-form-item>
        <el-form-item label="上传图片">
          <div class="right-input-line">
            <el-upload
              class="avatar-uploader"
              :headers="headers"
              :action="upLoadUrl"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :show-file-list="false"
            >
              <img v-if="form.imgUrl" :src="showImgHandler(form.imgUrl)" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="right-input-rule">图片尺寸要求：1000像素*600像素，支持.jpg .png .jpeg格式，大小不超过1M 详细规范请参考</div>
          </div>
        </el-form-item>
        <el-form-item label="卡片背景">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">图片</el-radio>
            <el-radio :label="0">颜色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员卡标题" label-width="100px">
          <div class="right-input-line">
            <el-input v-model="form.title" class="right-input-model" />
            <div class="right-input-rule">不能为空且长度不能超过9个汉字或18个英文字符</div>
          </div>
        </el-form-item>
        <el-form-item label="默认发卡机构" label-width="100px">
          <el-input v-model="form.mechanism" class="right-input-model" />
        </el-form-item>
        <el-form-item label="特权说明" label-width="100px">
          <el-input v-model="form.privilege" type="textarea" />
        </el-form-item>
        <el-form-item label="使用说明" label-width="100px">
          <el-input v-model="form.use" type="textarea" />
        </el-form-item>
        <el-form-item label="商户电话" label-width="100px">
          <el-input v-model="form.num" class="right-input-model" />
        </el-form-item>
      </el-form>
    </div>
    <div class="right-content-model">
      <div class="right-right-model">会员卡设置</div>
      <h2 class="right-title-model">引导菜单设置</h2>
      <el-form ref="rightform" :model="rightform" label-width="80px">
        <el-form-item label="引导菜单">
          <el-input v-model="rightform.meun" class="right-input-model" />
        </el-form-item>
        <el-form-item label="引导语">
          <el-input v-model="rightform.lang" class="right-input-model" />
        </el-form-item>
        <el-form-item label="连接跳转">
          <el-select v-model="form.links" placeholder>
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="right-play-model">
        <h2 class="right-title-model">微信支付注册设置</h2>
        <el-form ref="rightform" :model="rightform" label-width="80px">
          <el-form-item label="微信支付注册">
            <el-radio-group v-model="form.radio">
              <el-radio :label="3">开启</el-radio>
              <el-radio :label="6">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { editMemberInfo } from '@/api/member'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
export default {
  name: 'RightCard',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: '海典智慧医药店',
        imgUrl: '',
        radio: 1,
        title: '',
        mechanism: '',
        privilege: '',
        use: '',
        num: ''
      },
      rightform: {
        meun: '',
        lang: '',
        link: ''
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    headers() {
      return { Authorization: this.token, merCode: this.merCode }
    },
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    beforeUpload(file) {
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 1MB!',
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
    uploadSuccess(res, file, fileList) {
      // 图片上传成功
      if (res.code === '10000') {
        this.form.imgUrl = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 验证标题格式
    titleReg(title) {
      var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
      if (!reg.test(title)) {
        this.$message({
          message: '标题中不能包含特殊符号',
          type: 'error'
        })
      }
      if (reg.test(title)) {
        let len = 0
        for (var i in title) {
          if (title.charCodeAt(i) > 127 || title.charCodeAt(i) === 94) {
            len += 2
          } else {
            len++
          }
        }
        alert(len)
        if (len < 18) {
          return true
        } else {
          this.$message({
            message: '标题长度不能超过9个汉字或18个英文字符',
            type: 'error'
          })
        }
      }
    },
    // 验证商家电话
    iphoneReg(num) {
      const numReg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if (numReg.test(num) === false) {
        this.$message({
          message: '电话格式错误',
          type: 'error'
        })
      } else {
        return true
      }
    },
    submit() {
      const regtitle = this.titleReg(this.form.title)
      const regphone = this.iphoneReg(this.form.num)
      if (regtitle && regphone) {
        editMemberInfo({
          cardBgContent: '', // 会员卡背景,图片地址或者颜色型号
          cardBgType: this.form.radio, // 会员卡背景类型,0:颜色,1:图片
          cardStatus: '', // 审核状态
          cardTitle: '', // 会员卡标题
          cardType: '', // 会员卡类型
          color: '', // 颜色
          createId: '', // 创建人
          'guideMemu[0].memu': '', // 微信公众号引导菜单
          'guideMemu[0].note': '', // 微信公众号引导语
          'guideMemu[0].url': '', // 微信公众号菜单跳转地址
          id: '', // 数据主键
          integral: '', // 开卡送积分
          isCard: '', // 微信开卡设置
          isPay: '', // 支付注册设置
          isValid: '', // 是否有效
          merCode: '', // 商户ID
          organization: '', // 默认发卡机构
          prerogative: '', // 特权说明
          serviceTel: '', // 联系电话
          updateId: '', // 修改人ID
          useNotice: '' // 使用须知
        }).then(res => {
          // 获取门店员工
          if (res.data) {
            this.employeeData = res.data.data
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.right-index-model {
  padding: 5px;
  background: #f5f7fa;
  .right-content-model {
    padding: 10px;
    background: #ffffff;
    margin-bottom: 10px;
    .right-input-line {
      display: flex;
      .right-input-rule {
        font-size: 12px;
        color: #d9d9d9;
      }
    }
    .right-input-model {
      width: 40%;
    }
  }
  .right-right-model {
    font-size: 16px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 10px;
  }
  .right-play-model {
    border-top: 2px solid #eeeeee;
    padding-bottom: 10px;
  }
  .right-title-model {
    margin: 10px 0;
    font-size: 14px;
  }
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
    width: 100px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
