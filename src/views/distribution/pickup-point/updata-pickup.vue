<template>
  <div class="add">
    <div class="product-info">
      <h4>提货门店信息</h4>
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="提货门店名称:">
          <el-input v-model="form.storeName" />
        </el-form-item>
        <el-form-item label="门店编码:">
          <el-input v-model="form.storeCode" />
        </el-form-item>
        <el-form-item label="门店地址:" style="padding-right:20%">
          <el-input v-model="form.storeAddress" />
          <el-button type="primary" class="position-btn" @click="getLocation()">定位</el-button>
        </el-form-item>
        <div class="map-box">
          <tx-map ref="mapRef" :zoom="15" @ready="handlerLocation" />
        </div>
        <el-form-item label="电话号码:">
          <el-input v-model="form.phoneNumber" />
        </el-form-item>
      </el-form>
    </div>
    <div class="product-img">
      <h4>门店账号</h4>
      <el-form ref="form" :model="form" label-width="110px">
        <el-form-item label="账号设置:">
          <el-input v-model="form.accountNumber" />
        </el-form-item>
        <el-form-item label="密码设置:">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-form>
    </div>
    <div class="submit-box">
      <el-button type="primary" @click="submitData()">保存</el-button>
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
    return {
      TxMap: null,
      form: {
        'accountNumber': '',
        'latitude': '123.454353453453',
        'longitude': '130.656464564',
        'password': '',
        'phoneNumber': '',
        'status': '0',
        'storeAddress': '',
        'storeCode': '',
        'storeName': ''
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    ids() {
      return this.$route.query.id
    }
  },
  mounted() {
    distributionService.getPointer(this.ids).then(res => {
      var data = res.data
      console.log(res)
      this.form = {
        'accountNumber': data.accountNumber,
        'latitude': data.latitude,
        'longitude': data.longitude,
        'password': data.password,
        'phoneNumber': data.phoneNumber,
        'status': data.status,
        'storeAddress': data.storeAddress,
        'storeCode': data.storeCode,
        'storeName': data.storeName
      }
      const center = new mapQQ.maps.LatLng(this.form.latitude, this.form.longitude)
      this.$refs.mapRef.setCenter(center)
      this.$refs.mapRef.setMarker(center)
    })
  },
  methods: {
    submitData() { // 提交数据
      var params = {}
      params = JSON.parse(JSON.stringify(this.form))
      params.id = this.ids
      distributionService.savePointer(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$router.replace('/distribution/pickup-point')
        }
      })
    },
    handlerLocation(map, qq) {
      mapQQ = qq
      // this.txMap = map
      // if (this.$route.query.id && this.storeService) {
      //   this.getInfo()
      // }
    },
    // 定位
    getLocation() {
      const geocoder = new mapQQ.maps.Geocoder({
        complete: (result) => {
          const location = result.detail.location
          this.$refs.mapRef.setCenter(location)
          this.form.latitude = location.lat
          this.form.longitude = location.lng
          this.$refs.mapRef.setMarker(location)
        },
        error: () => {
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
