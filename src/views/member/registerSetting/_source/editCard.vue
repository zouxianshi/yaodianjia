<template>
  <div class="Ed-index-model">
    <div class="app-container">
      <el-row>
        <el-col :span="9" class="Ed-content-model">
          <LeftCard :member="memberList" />
        </el-col>
        <!-- 右栏 -->
        <el-col :span="15">
          <RightCard :member="memberList" :colorlist="colorList" />
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
import { getMemberInfo, getColor } from '@/api/memberService'
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
      colorNum: 0
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {
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
  },
  beforeMount() {},
  mounted() {
  },
  beforeUpdate() {},
  updated() {},
  methods: {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.Ed-index-model {
  padding: 5px;
  background: #f5f7fa;
}
</style>
