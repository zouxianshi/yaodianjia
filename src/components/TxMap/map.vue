<template>
  <div class="map-wrapper">
    <div id="map-container" :style="{ width: width, height: height }" />
  </div>
</template>

<script>
import { TMap } from './TMap'
var mapQQ = null
export default {
  name: 'Txmap',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    zoom: {
      type: Number,
      default: 10
    },
    center: {
      type: Object,
      default: () => {
        return {
          lat: 39.916527,
          lng: 116.397128
        }
      }
    }
  },
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      TMap('QVLBZ-YUULR-OUMW7-WKXFD-4SUWS-UCBIH').then(qq => {
        mapQQ = qq
        const center = new qq.maps.LatLng(this.center.lat, this.center.lng)
        this.map = new qq.maps.Map(document.getElementById('map-container'), {
          // 地图的中心地理坐标。
          center: center,
          zoom: this.zoom
        })
        this.$emit('ready', this.map, qq)
      })
    },
    setCenter(location) {
      console.log('setCenter : ', location)
      this.map.setCenter(location)
    },
    location() {
      // 定位当前位置
      // 获取城市列表接口设置中心点
      const citylocation = new mapQQ.maps.CityService({
        complete: result => {
          this.map.setCenter(result.detail.latLng)
          this.setMarker(result.detail.latLng)
        }
      })
      // 调用searchLocalCity();方法    根据用户IP查询城市信息。
      citylocation.searchLocalCity()
    },
    setMarker(center) {
      this.marker = new mapQQ.maps.Marker({
        position: center,
        map: this.map
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.map-wrapper {
  margin-top: 10px;
}
</style>
