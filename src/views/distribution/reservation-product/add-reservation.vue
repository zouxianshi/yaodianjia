<template>
  <div class="add">
    <div class="product-info">
      <h4>商品信息</h4>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名称：">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="所属品牌：">
          <el-input v-model="form.brandName" />
        </el-form-item>
        <el-form-item label="标签价格：">
          <el-input v-model="form.price" />
        </el-form-item>
        <el-form-item label="库存量：">
          <el-input v-model="form.inventory" />
        </el-form-item>
      </el-form>
    </div>
    <div class="product-rules">
      <h4>预约规则<span class="rule-tips">（如无需设置限购条件，请填写0）</span></h4>
      <el-form ref="form" :model="form" label-width="100px" class="demo-form-inline">
        <el-form-item label="限购规则：">
          每人&emsp;<el-input v-model="form.daysPerMember" class="inline-input" />&emsp;天内限购&emsp;
          <el-input v-model="form.countPerMember" class="inline-input" />&emsp;个
        </el-form-item>
      </el-form>
    </div>
    <div class="product-img">
      <h4>商品橱窗图</h4>
      <el-upload
        list-type="picture-card"
        :action="upLoadUrl"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
      >
        <i class="el-icon-plus" />
      </el-upload>
      <p class="tips">1、图片单张大小不超过 1M。仅支持 jpg，jpeg，png格式。</p>
      <p class="tips">2、图片质量要聚焦清晰，不能虚化。商品图片必须为白色或无色背景。</p>
      <p class="tips">3、图片内容展示方向，应始终保持文字正向。</p>
    </div>
    <div class="submit-box">
      <el-button type="primary" @click="submitData()">提交</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import distributionService from '@/api/distributionService'
export default {
  data() {
    return {
      form: {
        'brandName': '',
        'daysPerMember': '',
        'imgUrl': '',
        'inventory': '',
        'countPerMember': '',
        'name': '',
        'price': '',
        'status': '1'
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    headers() {
      return { Authorization: this.token }
    },
    upLoadUrl() {
      return `${this.uploadFileURL}${
        config.merGoods
      }/1.0/file/_uploadImg?merCode=${this.merCode}`
    }
  },
  methods: {
    beforeUpload(file) {
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
    submitData() {
      var params = {}
      params = JSON.parse(JSON.stringify(this.form))
      distributionService.saveProduct(params).then(res => {
        console.log(res)
        if (res.code === '10000') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$router.replace('/distribution/reservation-product')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  padding: 10px 61px;height: calc(100vh - 158px);overflow-y: scroll;
  .product-img, .product-info, .product-rules{
    padding: 20px 0;
    form{
      padding-left: 15%; width:80%;
      .inline-input{
          width: 60px ;
      }
    }
    h4{
      height: 30px;line-height: 30px;font-weight: 600;font-size: 16px;
      margin-bottom: 21px;
      .rule-tips{
          font-size: 14px;color:rgba(0,0,0,0.45);
      }
    }
    .tips{
      font-size:14px;
      font-weight:400;
      color:rgba(0,0,0,0.45);
      margin-top: 10px;
      line-height:14px;
    }
  }
  .product-rules{
    border-top: 1px solid #eee ;border-bottom: 1px solid #eee
  }
  .submit-box{
    text-align: center;margin-top: 20px
  }
}
</style>
