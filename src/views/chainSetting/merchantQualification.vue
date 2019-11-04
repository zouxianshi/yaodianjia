<template>
  <div class="container">
    <h3>商家资质</h3>
    <el-row style="margin-top: 30px">
      <el-col :span="4" class="label-name">营业执照</el-col>
      <el-col :span="20" style="font-size: 14px;color: #999999">资质证号：12345678</el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">药品经营许可证</el-col>
      <el-col :span="20">
        <span style="font-size: 14px;color: #ffffff;background-color: orangered;padding-left: 5px;padding-right: 5px">待完善</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">药品经营质量管理规范认证证书</el-col>
      <el-col :span="20">
        <span style="font-size: 14px;color: #ffffff;background-color: orangered;padding-left: 5px;padding-right: 5px">待完善</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">互联网药品信息规范认证证书</el-col>
      <el-col :span="20">
        <span style="font-size: 14px;color: #ffffff;background-color: orangered;padding-left: 5px;padding-right: 5px">待完善</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">互联网药品交易服务资格证书</el-col>
      <el-col :span="20">
        <span style="font-size: 14px;color: #ffffff;background-color: orangered;padding-left: 5px;padding-right: 5px">待完善</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">食品流通许可证</el-col>
      <el-col :span="20">
        <span style="font-size: 14px;color: #ffffff;background-color: orangered;padding-left: 5px;padding-right: 5px">待完善</span>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">医疗器械经营许可证</el-col>
      <el-col :span="20" style="font-size: 14px;color: #999999">资质证号：12345678</el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">其他证书</el-col>
      <el-col :span="20" style="font-size: 14px;color: #999999">资质证号：12345678</el-col>
    </el-row>
    <el-row style="margin-top: 15px">
      <el-button type="text" @click="visable = true">添加其他证书</el-button>
    </el-row>
    <el-dialog
      append-to-body
      title="完善证书"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <el-form ref="form" :model="form" label-position="right">
        <el-form-item label="证书名称：">
          <el-input v-model="form.name" style="width: 260px" />
        </el-form-item>
        <el-form-item label="证书编号：">
          <el-input v-model="form.code" style="width: 260px" />
        </el-form-item>
        <el-form-item label="证书图片：">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small">取 消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MerchantQualification',
  data() {
    return {
      visable: false,
      form: {
        name: null,
        code: null,
        imgPath: null
      }
    }
  }
}
</script>

<style scoped>
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    color: #99a9bf;
  }
  .label-name {
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
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
</style>
