<template>
  <div class="style-setting-model">
    <div class="ssm-box">
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="blue">
          <span class="ssm-item-text">气质蓝</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_0.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="red">
          <span class="ssm-item-text">中国红</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_1.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="gold">
          <span class="ssm-item-text">淡雅金</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_2.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="custome">
          <span class="ssm-item-text">自定义</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_3.png" alt="" width="180"></div>
        </el-radio>
      </div>
    </div>
    <m-custom-setting v-if="basics.styleType === 'custome'" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mCustomSetting from './customSetting'
export default {
  name: 'StyleSetting',
  data() {
    return {
    }
  },
  props: {
  },
  methods: {
    $verification() {
      return true
    }
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    ...mapState('renovation', ['basics'])
  },
  components: { mCustomSetting }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .style-setting-model {
    .ssm-box {
      overflow: hidden;
      padding: 38px 0 38px 76px;
      .ssm-item {
        width: 180px;
        float: left;
        text-align: center;
        margin-right: 92px;
        &:last-child {
          margin-right: 0;
        }
        .ssm-item-img {
          margin-top: 20px;
        }
      }
    }
  }
</style>
