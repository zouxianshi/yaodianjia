<template>
  <div class="tab-model">
    <div class="tm-item" :class="value === 'basics' ? 'act' : ''" @click="onToggle('basics')"><span>基础组件</span><b /></div>
    <div class="tm-item" :class="value === 'marketing' ? 'act' : ''" @click="onToggle('marketing')"><span>营销组件</span><b /></div>
  </div>
</template>
<script>
export default {
  name: 'Tab',
  data() {
    return {}
  },
  model: {
    prop: 'value',
    event: 'valueEvent'
  },
  props: {
    value: {
      type: String,
      default: 'basics'
    }
  },
  methods: {
    onToggle(v) {
      this.$emit('valueEvent', v)
      this.$emit('on-toggle-tab', v)
    }
  },
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
  .tab-model {
    overflow: hidden;
    .tm-item {
      width: 123px;
      float: left;
      padding: 16px 0;
      text-align: center;
      cursor: pointer;
      &:hover {
        span {
          color: #4F88FF;
        }
      }
      span {
        font-size: 14px;
        color: #4A4A4A;
        font-weight:500;
        display: block;
        padding-bottom: 6px;
      }
      b {
        width: 32px;
        height: 2px;
        background: #4F88FF;
        margin: 0 auto;
        display: none;
      }
      &.act {
        span {
          color: #4F88FF;
        }
        b {
          display: block;
        }
      }
    }
  }
</style>
