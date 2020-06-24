<template>
  <div class="comps-item-model">
    <img class="cim-img" :src="rtImg()" alt="">
    <p class="cim-text">{{ item.name }}</p>
  </div>
</template>
<script>
export default {
  name: 'CompsItem',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    rtImg() {
      const { type, subType } = this.item
      return require(`./../img/${type}_${subType}.png`)
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
  .comps-item-model {
    width:140px;
    height:76px;
    background: #fff;
    border:1px solid rgba(207,207,207,1);
    cursor: pointer;
    .cim-img {
      width: 140px;
      height: 50px;
      display: block;
    }
    .cim-text {
      text-align: center;
      font-size: 14px;
      color: #4A4A4A;
      padding-top: 2px;
    }
  }
</style>
