<template>
  <div class="add">
    <div class="product-info">
      <h4>商品信息</h4>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="所属品牌:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="单位:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="标签价格:">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="限购量:">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>
    <div class="product-rules">
      <h4>预约规则
        <span class="tips-yuyue">（预约规则为选填项，请您根据商品库存选择是否填写设置）</span>
      </h4>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="数量限制:">
          一个ID仅可购买&nbsp; <el-input v-model="form.name" style="width:50px" /> &nbsp;个
        </el-form-item>
        <el-form-item label="ID限制:">
          一个ID&nbsp; <el-input v-model="form.name" style="width:50px" /> &nbsp;天内仅可购买&nbsp;
          <el-input v-model="form.name" style="width:50px" /> &nbsp;次
        </el-form-item>
      </el-form>
    </div>
    <div class="product-img">
      <h4>商品橱窗图</h4>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
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
