<template>
  <div class="style-setting-model">
    <div class="ssm-box">
      <div class="ssm-item">
        <el-radio v-model="radio" label="0">
          <span class="ssm-item-text">气质蓝</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_0.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="radio" label="1">
          <span class="ssm-item-text">中国红</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_1.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="radio" label="2">
          <span class="ssm-item-text">淡雅金</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_2.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="radio" label="3">
          <span class="ssm-item-text">自定义</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_3.png" alt="" width="180"></div>
        </el-radio>
      </div>
    </div>
    <m-custom-setting v-if="radio === '3'" />
  </div>
</template>
<script>
import mCustomSetting from './customSetting'
export default {
  name: 'StyleSetting',
  data() {
    return {
      radio: '0'
    }
  },
  props: {},
  methods: {},
  watch: {
    radio(v) {
      this.$emit('on-toggle-style', v)
    }
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
  computed: {},
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
