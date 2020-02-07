<template>
  <div class="add">
    <div class="product-info">
      <h4>提货门店信息</h4>
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="提货门店名称:" prop="storeName">
          <el-input v-model="form.storeName" maxlength="100" />
        </el-form-item>
        <el-form-item label="门店编码:" prop="storeCode">
          <el-input v-model="form.storeCode" maxlength="50" />
        </el-form-item>
        <el-form-item label="门店地址:" style="padding-right:20%">
          <el-input v-model="form.storeAddress" maxlength="1000" />
          <el-button type="primary" class="position-btn" @click="getLocation()">定位</el-button>
        </el-form-item>
        <div class="map-box">
          <tx-map ref="mapRef" :zoom="15" @ready="handlerLocation" @click="clickHandler()" />
        </div>
        <el-form-item label="电话号码:" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" maxlength="11" />
        </el-form-item>
      </el-form>
    </div>
    <div class="submit-box">
      <el-button type="primary" @click="submitData()">完成添加</el-button>
    </div>
  </div>
</template>
<script>
import distributionService from '@/api/distributionService'
import txMap from '@/components/TxMap/map'
var mapQQ
export default {
  components: { txMap },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('联系方式不能为空'))
      } else if (!(/^1[3456789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback() // 添加成功回调
      }
    }
    return {
      TxMap: null,
      oldAddress: '',
      idTrueAddress: false,
      form: {
        'latitude': '123.454353453453',
        'longitude': '130.656464564',
        'phoneNumber': '',
        'status': '0',
        'storeAddress': '',
        'storeCode': '',
        'storeName': ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      rules: {
        storeName: [
          { required: true, message: '请输入门店名称', trigger: 'blur' }
        ],
        storeCode: [
          { required: true, message: '请输入门店编码', trigger: 'blur' }
        ],
        phoneNumber: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.oldAddress = this.form.storeAddress
  },
  methods: {
    submitData() { // 提交数据
      if (!this.idTrueAddress) {
        this.$message({
          message: '请填写正确的地址并点击定位',
          type: 'error'
        })
        return
      } else if (this.oldAddress !== this.form.storeAddress) {
        this.$message({
          message: '请点击定位获取地址！',
          type: 'error'
        })
        return
      }
      this.$refs['form'].validate((flag) => {
        if (flag) {
          var params = {}
          params = JSON.parse(JSON.stringify(this.form))
          distributionService.savePointer(params).then(res => {
            if (res.code === '10000') {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.replace('/distribution/pickup-point')
            }
          })
        }
      })
    },
    handlerLocation(map, qq) {
      mapQQ = qq
      this.txMap = map
    },
    // 定位
    getLocation() {
      this.oldAddress = this.form.storeAddress
      const geocoder = new mapQQ.maps.Geocoder({
        complete: (result) => {
          const location = result.detail.location
          this.$refs.mapRef.setCenter(location)
          this.form.latitude = location.lat
          this.form.longitude = location.lng
          this.$refs.mapRef.setMarker(location)
          this.idTrueAddress = true
        },
        error: () => {
          this.idTrueAddress = false
          this.$message({
            message: '未匹配到地址',
            type: 'error'
          })
        }
      })
      // 通过getLocation();方法获取位置信息值
      geocoder.getLocation(this.form.storeAddress)
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
      padding-left: 15%; width:80%;
      .position-btn{
        position: absolute;right: 0;transform: translateX(110%)
      }
      .map-box{
        width: calc(100% - 110px);
        margin: 20px 0;
        margin-left: 110px;
        height: 300px;
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
