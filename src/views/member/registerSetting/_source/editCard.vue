<template>
  <div class="Ed-index-model">
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
            <RightCard :storelist="storeList" :member="memberList" :colorlist="colorList" :geturl="geturl" @getlist="getlist" />
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
      queryStore({ excelFlag: true, merCode: this.merCode }).then(res => {
        this.storeList = res.data.data
      })
      getQrcode({ merCode: this.merCode }).then(res => {
        this.geturl = res.data[0]
      })
      getMemberInfo(this.merCode)
        .then(res => {
          this.memberList = res.data
          getColor().then(res => {
            this.colorList = res.data
            if (this.memberList.cardBgType === 1) {
              for (const i in this.colorList) {
                if (i.toLowerCase() === this.memberList.cardBgContent.toLowerCase()) {
                  this.memberList.cardBgContent = this.colorList[i]
                }
              }
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.Ed-index-model {
  padding: 5px;
  background: #f5f7fa;
}
</style>
