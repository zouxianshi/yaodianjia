<template>
  <div class="sa-title-model">
    <strong class="stm-text-1">{{ textName }}</strong>
    <span class="stm-text-2">{{ textDesc }}</span>
  </div>
</template>
<script>
export default {
  name: 'SaTitle',
  data() {
    return {}
  },
  props: {
    textName: {
      type: String,
      default: ''
    },
    textDesc: {
      type: String,
      default: ''
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
  .sa-title-model {
    margin-bottom: 12px;
    .stm-text-1 {
      color: #000;
      font-size: 16px;
    }
    .stm-text-2 {
      color: #9B9B9B;
      font-size: 14px;
      padding-left: 12px;
    }
  }
</style>
