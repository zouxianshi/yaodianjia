<template>
  <div class="Ed-index-model">
    <div class="app-container">
      <el-row>
        <el-col :span="9" class="Ed-content-model">
          <LeftCard />
        </el-col>
        <!-- 右栏 -->
        <el-col :span="15">
          <RightCard />
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
export default {
  name: 'EditCard',
  components: {
    RightCard,
    LeftCard
  },
  props: {},
  data() {
    return {
      form: {
        name: '海典智慧医药店',
        img: '',
        radio: 3,
        title: '',
        mechanism: '',
        privilege: '',
        use: '',
        num: ''
      },
      edform: {
        meun: '',
        lang: '',
        link: ''
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
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
