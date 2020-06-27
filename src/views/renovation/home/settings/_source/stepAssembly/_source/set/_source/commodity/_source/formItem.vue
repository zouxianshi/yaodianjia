<template>
  <div class="commodity-form-item-model">
    <div class="cfim-btn-goods">
      <el-button size="mini">选择商品</el-button>
      <span class="cfim-text-1">已选：3</span>
    </div>
    <div class="cfim-item-box">
      <table>
        <tr v-for="(item,$index) in 10" :key="$index">
          <td width="60"><img class="cfim-good-img" src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg"></td>
          <td><span class="cfim-good-name">999感冒灵感冒发烧咳嗽流涕家庭…</span></td>
          <td width="50"><span class="cfim-good-delete">删除</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommodityFormItem',
  data() {
    return {}
  },
  props: {},
  methods: {},
  watch: {},
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .commodity-form-item-model {
    .cfim-btn-goods {
      .cfim-text-1 {
        font-size: 12px;
        color: #4A4A4A;
        margin-left: 20px;
      }
    }
    .cfim-item-box {
      margin-top: 10px;
      table {
        width: 100%;
        tr {
          td {
            height: 52px;
          }
        }
      }
      .cfim-good-img {
        width: 42px;
        height:42px;
        border: 1px solid #F0F0F0;
        padding: 4px;
      }
      .cfim-good-name {
        font-size: 14px;
        color: #4A4A4A;
        line-height: 52px;
      }
      .cfim-good-delete {
        font-size: 14px;
        color: #4F88FF;
        line-height: 52px;
        display: block;
        text-align: center;
      }
    }
  }
</style>
