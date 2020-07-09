<template>
  <div v-loading="uploadLoading" class="Ed-index-model">
    <div class="app-container">
      <el-row>
        <el-col :span="9" class="Ed-content-model">
          <el-card class="box-card">
            <LeftCard :member="memberList" />
          </el-card>
        </el-col>
        <!-- 右栏 -->
        <el-col :span="15">
          <el-card class="box-card">
            <RightCard :storelist="storeList" :member="memberList" :colorlist="colorList" :geturl="geturl" @changeloading="changeloading($event)" @getlist="getlist" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
// 微信小程序注册组件导入
import RightCard from './rightCard'
// 会员卡
import LeftCard from './leftCard'
import { getMemberInfo, getColor, getQrcode, queryStore } from '@/api/memberService'
import { mapGetters } from 'vuex'
export default {
  name: 'EditCard',
  components: {
    RightCard,
    LeftCard
  },
  props: {},
  data() {
    return {
      uploadLoading: false,
      memberList: {},
      colorList: {},
      colorNum: 0,
      geturl: '',
      storeList: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.getlist()
  },
  beforeMount() {},
  mounted() {
  },
  beforeUpdate() {},
  updated() {},
  methods: {
    getlist() {
      this.uploadLoading = true
      queryStore({ excelFlag: true, merCode: this.merCode }).then(res => {
        this.storeList = res.data.data
      })
      getQrcode({ merCode: this.merCode }).then(res => {
        this.geturl = res.data[0]
      })
      getMemberInfo(this.merCode)
        .then(res => {
          console.log(res)
          if (res.data && !!res.data.customCells) {
            var data = res.data.customCells
            if (data) {
              for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].name === '' && data[i].tips === '' && data[i].url === '' && i > 0) {
                  data.splice(i, 1)
                  len--
                  i--
                }
              }
              this.memberList = res.data
            }
          }

          this.uploadLoading = false

          this.memberList = res.data
          if (this.$route.query.edit === '1') {
            this.memberList.cardBgType = 1
            this.memberList.cardBgContent = 'Color102'
            this.memberList.isPay = 0
          }
          getColor().then(res => {
            this.colorList = res.data
            this.uploadLoading = false
            if (this.memberList.cardBgType === 1) {
              for (const i in this.colorList) {
                if (i.toLowerCase() === this.memberList.cardBgContent.toLowerCase()) {
                  this.memberList.cardBgContent = this.colorList[i]
                }
              }
            }
          }).catch(() => {
            this.uploadLoading = false
          })
        })
    },
    changeloading(val) {
      this.uploadLoading = val
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.Ed-index-model {
  padding: 5px;
  background: #f5f7fa;
  .Ed-content-model{
    padding-right: 5px;
  }
}
</style>
