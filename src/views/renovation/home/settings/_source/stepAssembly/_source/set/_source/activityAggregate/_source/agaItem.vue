<template>
  <div class="aga-item-model">
    <div class="aim-box">
      <div :class="`aim-img aim-img-${item.type}`" />
      <div class="aim-text">{{ item.name }}</div>
    </div>
    <div class="aga-check">
      <el-checkbox v-model="item.selected" :disabled="item.disabled" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AgaItem',
  data() {
    return {
      checked: true
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
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
  .aga-item-model {
    text-align: center;
    .aim-box {
      width: 142px;
      margin: 0 auto;
      border:1px solid rgba(207,207,207,1);
      .aim-img {
        width: 140px;
        height: 50px;
        &-together {
          background: url("./../img/bt_together.png") no-repeat;
        }
        &-markup {
          background: url("./../img/bt_markup.png") no-repeat;
        }
        &-spike {
          background: url("./../img/bt_spike.png") no-repeat;
        }
        &-special {
          background: url("./../img/bt_special.png") no-repeat;
        }
        &-fullReduction {
          background: url("./../img/bt_fullReduction.png") no-repeat;
        }
      }
      .aim-text {
        font-size: 14px;
        color: #4A4A4A;
        padding: 2px 0 10px 0;
      }
    }
    .aga-check {
      padding: 10px 0;
    }
  }
</style>
