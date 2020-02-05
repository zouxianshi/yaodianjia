<template>
  <div class="add">
    <div class="product-info">
      <h4>提货门店信息</h4>
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="提货门店名称:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="门店编码:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="门店地址:" style="padding-right:20%">
          <el-input v-model="form.name" />
          <el-button type="primary" class="position-btn">定位</el-button>
        </el-form-item>
        <div class="map-box">
          地图
        </div>
        <el-form-item label="电话号码:">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>
    <div class="product-img">
      <h4>门店账号</h4>
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="账号设置:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码设置:">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>
    <div class="submit-box">
      <el-button type="primary" @click="submitData()">完成添加</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitData() { // 提交数据
      console.log(this.form)
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  padding: 10px 61px;height: calc(100vh - 158px);overflow-y: scroll;
  .product-img, .product-info, .product-rules{
    padding: 20px 0;
    h4{
      height: 30px;line-height: 30px;font-weight: 600;font-size: 16px;
      margin-bottom: 21px;
      .tips-yuyue{
        font-size:14px;color:rgba(0,0,0,0.45);
      }
    }
    form{
      padding-left: 20%; width:80%;
      .position-btn{
        position: absolute;right: 0;transform: translateX(110%)
      }
      .map-box{
        width: calc(100% - 110px);
        margin: 20px 0;
        margin-left: 110px;
        height: 200px;
        border: 1px solid #eee
      }
    }
    .tips{
      font-size:14px;
      font-weight:400;
      color:rgba(0,0,0,0.45);
      line-height:20px;
      margin-top: 10px
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
