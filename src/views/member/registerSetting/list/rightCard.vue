<template>
  <div class="right-index-model">
    <div class="right-content-model">
      <div class="right-right-model">会员卡信息</div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商户名称">
          <span v-text="form.name">}</span>
        </el-form-item>
        <el-form-item label="商户LOGO">
          <img :src="form.img" alt="">
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.img" :src="form.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="卡片背景">
          <el-radio-group v-model="form.radio">
            <el-radio :label="3">图片</el-radio>
            <el-radio :label="6">颜色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员卡标题" label-width="100px">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="默认发卡机构" label-width="100px">
          <el-input v-model="form.mechanism" />
        </el-form-item>
        <el-form-item label="特权说明" label-width="100px">
          <el-input v-model="form.privilege" type="textarea" />
        </el-form-item>
        <el-form-item label="使用说明" label-width="100px">
          <el-input v-model="form.use" type="textarea" />
        </el-form-item>
        <el-form-item label="商户电话" label-width="100px">
          <el-input v-model="form.num" />
        </el-form-item>
      </el-form>
    </div>
    <div class="right-content-model">
      <div class="right-right-model">会员卡设置</div>
      <h2 class="right-title-model">引导菜单设置</h2>
      <el-form ref="rightform" :model="rightform" label-width="80px">
        <el-form-item label="引导菜单">
          <el-input v-model="rightform.meun" />
        </el-form-item>
        <el-form-item label="引导语">
          <el-input v-model="rightform.lang" />
        </el-form-item>
        <el-form-item label="连接跳转">
          <el-select v-model="form.links" placeholder="">
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
        <el-button type="primary" size="small">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RightCard',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: '海典智慧医药店',
        img: '',
        radio: 3,
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
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
    //   this.form.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!');
    //   }
    //   return isJPG && isLt2M
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
    }
    .right-right-model {
      font-size: 16px;
      border-bottom: 2px solid #eeeeee;
      padding-bottom: 10px;
    }
    .right-play-model{
      border-top: 2px solid #eeeeee;
      padding-bottom: 10px;
    }
    .right-title-model{
        margin:10px 0;
        font-size: 14px;
      }
    avatar-uploader .el-upload {
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
