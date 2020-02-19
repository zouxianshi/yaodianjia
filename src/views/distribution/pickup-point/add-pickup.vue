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
        <el-form-item label="门店地址:" style="padding-right:20%;width:100%;">
          <div class="line">
            <el-select
              v-model="provinceObj.name"
              placeholder="请选择省"
              class="select"
              @change="selectProvince"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="{ name: item.name, id: item.id }"
              />
            </el-select>
            <el-select
              v-model="cityObj.name"
              placeholder="请选择市"
              class="select"
              @change="selectCity"
            >
              <el-option
                v-for="item in city"
                :key="item.id"
                :label="item.name"
                :value="{ name: item.name, id: item.id }"
              />
            </el-select>
            <el-select
              v-model="districtObj.name"
              placeholder="请选择区"
              class="select"
              @change="selectDistrict"
            >
              <el-option
                v-for="item in district"
                :key="item.id"
                :label="item.name"
                :value="{ name: item.name, id: item.id }"
              />
            </el-select>
          </div>
          <div class="line" style="margin-top:20px;">
            <el-input
              v-model="form.storeAddress"
              maxlength="1000"
              placeholder="请输入详细地址"
            />
            <!-- <el-button
              type="primary"
              class="position-btn"
              @click="getLocation()"
              >定位</el-button
            > -->
            <el-button
              type="primary"
              class="position-btn"
              @click="queryTxLocation"
            >定位</el-button>
          </div>
        </el-form-item>
        <div class="map-container">
          <div class="list">
            <div v-if="addressList.length === 0" class="empty">
              <!-- 暂无数据 -->
            </div>
            <div v-else>
              <div
                v-for="item in addressList"
                :key="item.id"
                class="items"
                @click="selectLocation(item)"
              >
                {{ item.address }}{{ item.title }}
              </div>
            </div>
          </div>
          <div class="map-box">
            <tx-map
              ref="mapRef"
              :zoom="15"
              @ready="handlerLocation"
              @click="clickHandler()"
            />
          </div>
        </div>
        <el-form-item label="电话号码:" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" maxlength="18" />
        </el-form-item>
      </el-form>
    </div>
    <div class="product-info">
      <h4>门店流量设置</h4>
      <div class="row-panel">
        <div class="txt">每日最大到店领取人数：</div>
        <div class="column">
          <div class="input-line">
            <el-input v-model="form.limitNumber" class="input" maxlength="10" />
            <div class="default">人</div>
          </div>
          <div class="tips">
            为避免疫情期间人流同时段在门店拥挤造成疫情危机，因此同一预约时段（日）可设置最大到店人数
            同一预约时段由商品预计到货时间进行判断
          </div>
        </div>
      </div>
    </div>
    <div class="product-info">
      <h4>门店账号设置</h4>
      <el-form>
        <el-form-item label="门店账号:" label-width="110px">
          <el-input
            v-model="form.accountNumber"
            placeholder="请输入"
            maxlength="100"
          />
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
import { getAddress, getLocation } from '@/api/address'
import { throttle } from '@/utils/throttle'
// var mapQQ
export default {
  components: { txMap },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('联系方式不能为空'))
      } else if (!/^[0-9]*-*[0-9]*$/.test(value)) {
        callback(new Error('请输入正确的联系方式'))
      } else {
        callback() // 添加成功回调
      }
    }
    return {
      TxMap: null,
      oldAddress: '',
      idTrueAddress: false,
      form: {
        latitude: '123.454353453453',
        longitude: '130.656464564',
        phoneNumber: '',
        status: '0',
        storeAddress: '',
        storeCode: '',
        storeName: '',
        limitNumber: 0,
        accountNumber: ''
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
        phoneNumber: [{ validator: checkPhone, trigger: 'blur' }]
      },
      province: [],
      provinceObj: {},
      city: [],
      cityObj: { name: '', id: '' },
      district: [],
      districtObj: { name: '', id: '' },
      addressList: []
    }
  },
  watch: {
    'form.limitNumber'(newValue) {
      if (!/^[0-9]*$/.test(newValue)) this.form.limitNumber = 0
    }
  },
  created() {
    this.oldAddress = this.form.storeAddress
  },
  mounted() {
    getAddress({ areaType: 2, parentId: '' }).then(res => {
      this.province = res.data
    })
  },
  methods: {
    selectProvince(e) {
      this.provinceObj = e
      getAddress({ areaType: 3, parentId: e.id }).then(res => {
        this.city = res.data
      })
    },
    selectCity(e) {
      this.cityObj = e
      getAddress({ areaType: 4, parentId: e.id }).then(res => {
        this.district = res.data
      })
    },
    selectDistrict(e) {
      this.districtObj = e
    },
    queryTxLocation() {
      getLocation({
        keyword: this.form.storeAddress,
        region: this.districtObj.name,
        key: 'QVLBZ-YUULR-OUMW7-WKXFD-4SUWS-UCBIH',
        pageIndex: 1,
        pageSize: 200,
        addressFormat: 'short',
        location: ''
      }).then(res => {
        if (res.data.data.length > 0) {
          this.addressList = res.data.data
        } else {
          this.$message({
            message: '未搜索到相关位置信息',
            type: 'error'
          })
        }
      })
    },
    selectLocation(obj) {
      this.form.storeAddress = `${obj.province}${obj.city}${
        obj.district ? obj.district : ''
      }${obj.address ? obj.address : ''}${obj.title ? obj.title : ''}`
      console.log('location _________________________________ : ', obj.location)
      this.getLocation(obj.location)
    },

    submitData: throttle(function() {
      // 提交数据
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
      // if (!this.form.accountNumber.replace(/\s+/g, '')) {
      //   this.$message({
      //     message: '请输入门店账号！',
      //     type: 'error'
      //   })
      //   return
      // }
      this.$refs['form'].validate(flag => {
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
    }, 3000),
    handlerLocation(map, qq) {
      // mapQQ = qq
      this.txMap = map
    },
    // 定位
    getLocation(_location) {
      this.oldAddress = this.form.storeAddress
      // console.log('mapQQ', mapQQ)
      this.$refs.mapRef.setCenter(_location)
      this.form.latitude = _location.lat
      this.form.longitude = _location.lng
      this.idTrueAddress = true
      // this.$refs.mapRef.setMarker(location)

      // const geocoder = new mapQQ.maps.Geocoder({
      //   complete: result => {
      //     console.log('res : ', result)
      //     const location = _location
      //     this.$refs.mapRef.setCenter(_location)
      //     this.form.latitude = _location.lat
      //     this.form.longitude = _location.lng
      //     this.$refs.mapRef.setMarker(_location)
      //     this.idTrueAddress = true
      //   },
      //   error: () => {
      //     this.idTrueAddress = false
      //     this.$message({
      //       message: '未匹配到地址',
      //       type: 'error'
      //     })
      //   }
      // })
      // // 通过getLocation();方法获取位置信息值
      // geocoder.getLocation(this.form.storeAddress)
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  padding: 10px 61px;
  height: calc(100vh - 158px);
  overflow-y: scroll;
  .product-img,
  .product-info,
  .product-rules {
    padding: 20px 0;
    .row-panel {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      .txt {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        margin-top: 12px;
      }
      .column {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 500px;
        .input-line {
          display: flex;
          flex-direction: row;
          align-items: center;
          .default {
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
            margin-left: 18px;
          }
        }
        .tips {
          font-size: 12px;
          color: rgba(245, 166, 35, 1);
        }
      }
    }
    h4 {
      height: 30px;
      line-height: 30px;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 21px;
      .tips-yuyue {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    form {
      padding-left: 15%;
      width: 80%;
      .position-btn {
        position: absolute;
        right: 0;
        transform: translateX(110%);
      }
      .line {
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        .select {
          width: 820px;
          margin-right: 10px;
        }
      }
      .map-container {
        display: flex;
        flex-direction: row;
        border: 1px solid #ebebeb;
        margin-bottom: 20px;
        .map-wrapper {
          margin: 0 !important;
        }
        .list {
          width: 150px;
          height: 300px;
          overflow-y: scroll;
          .items {
            padding: 20px 0 20px 10px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
            border: 1px solid #ebebeb;
            cursor: pointer;
          }
        }

        .list:last-child {
          border: 0;
        }
        .map-box {
          width: calc(100% - 110px);
          height: 300px;
          border: 1px solid #eee;
        }
      }
    }
    .tips {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      line-height: 20px;
      margin-top: 10px;
    }
  }
  .product-rules {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .submit-box {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
