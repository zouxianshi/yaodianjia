<template>
  <div class="add">
    <div class="product-info">
      <h4>商品信息</h4>
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="form.name" maxlength="254" />
        </el-form-item>
        <el-form-item label="所属品牌：" prop="brandName">
          <el-input v-model="form.brandName" maxlength="99" />
        </el-form-item>
        <el-form-item label="单位：" prop="unit">
          <el-select v-model="form.unit" style="width:200px" placeholder="请选择单位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签价格：" prop="price">
          <el-input v-model="form.price" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="17" />
        </el-form-item>
        <el-form-item label="可预约总量：" prop="inventory">
          <el-input v-model="form.inventory" style="width:200px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="10" />
          <el-button class="set-store" type="primary" @click="goToSetting()">设置门店最大可预约总量</el-button>
        </el-form-item>
        <el-form-item label="预计到货时长：" prop="deliveryTime">
          <el-input v-model="form.deliveryTime" style="width:60px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="10" />
          &emsp;天<span class="tips">&emsp;&emsp;预计到货时间仅供用户参考，以实际门店到货</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="product-rules">
      <h4>预约规则<span class="rule-tips">（如无需设置限购条件，请填写0）</span></h4>
      <el-form :model="form" label-width="100px" class="demo-form-inline">
        <el-form-item label="限购规则：">
          每人&emsp;
          <el-input v-model="form.daysPerMember" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="10" class="inline-input" prop="daysPerMember" />
          &emsp;天内限购&emsp;
          <el-input v-model="form.countPerMember" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="10" class="inline-input" prop="countPerMember" />
          &emsp;
        </el-form-item>
      </el-form>
    </div>
    <div class="product-img">
      <h4>商品橱窗图</h4>
      <el-upload
        class="avatar-uploader"
        :action="upLoadUrl"
        :headers="headers"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <img v-if="form.imgUrl" :src="showImgHandler(form.imgUrl)" class="avatar">
        <i v-else class="el-icon-plus" />
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
    var checkPrice = (rule, value, callback) => {
      var val = '' + value
      if (!val) {
        return callback(new Error('请输入商品价格'))
      } else if (val.includes('-')) {
        callback(new Error('商品价格为正数'))
      } else {
        callback() // 添加成功回调
      }
    }
    var checkDeliveryTime = (rule, value, callback) => {
      var val = '' + value
      if (!val) {
        return callback(new Error('请输入商品预计到货时长'))
      } else if (val.includes('-') || val.includes('.')) {
        callback(new Error('商品预计到货时长为正整数'))
      } else {
        callback() // 添加成功回调
      }
    }
    return {
      oldInventory: 0,
      form: {
        'brandName': '',
        'daysPerMember': '',
        'imgUrl': '',
        'inventory': '',
        'countPerMember': '',
        'name': '',
        'unit': '',
        'price': '',
        'status': ''
      },
      options: [
        { value: '个', label: '个' },
        { value: '瓶', label: '瓶' },
        { value: '盒', label: '盒' },
        { value: '包', label: '包' },
        { value: '件', label: '件' }
      ],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        price: [
          { validator: checkPrice, trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        deliveryTime: [
          { validator: checkDeliveryTime, trigger: 'blur' }
        ]
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
        config.mask
      }/1.0/file/_uploadImg?merCode=${this.merCode}`
    },
    ids() {
      return this.$route.query.id
    }
  },
  created() {
    distributionService.getProduct(this.ids).then(res => {
      var data = res.data
      this.form = {
        'brandName': data.brandName,
        'daysPerMember': data.daysPerMember,
        'imgUrl': data.imgUrl,
        'inventory': data.inventory,
        'countPerMember': data.countPerMember,
        'name': data.name,
        'unit': data.unit,
        'price': data.price,
        'status': data.status,
        'deliveryTime': data.deliveryTime
      }
      this.oldInventory = this.form.inventory
      console.log(this.oldInventory)
    })
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
      if (this.oldInventory > Number(this.form.inventory)) {
        this.$message({
          message: '库存量不能小于原库存量',
          type: 'error'
        })
        return
      }
      function isNumber(val) {
        val = '' + val
        return val.includes('.') || val.includes('-')
      }
      if (this.form.imgUrl === '') {
        this.$message({
          message: '请上传商品图片',
          type: 'error'
        })
        return
      } else if (isNumber(this.form.daysPerMember) || isNumber(this.form.countPerMember)) {
        this.$message({
          message: '限购规则中天数和数量为正整数。',
          type: 'error'
        })
        return
      }
      this.$refs['form'].validate((flag) => {
        if (flag) {
          var params = {}
          params = JSON.parse(JSON.stringify(this.form))
          params.id = this.ids
          distributionService.saveProduct(params).then(res => {
            if (res.code === '10000') {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.replace('/distribution/reservation-product')
            }
          })
        }
      })
    },
    goToSetting() {
      this.$router.push('/distribution/store-reservation-setting')
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
          width: 80px ;
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
  .set-store{
    margin-left: 20px
  }
}
</style>
