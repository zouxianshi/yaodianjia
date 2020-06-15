<template>
  <div class="comment-settings-model">
    <card-item
      img="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      lable="商品评价"
      desc="商品评论开启后用户可在商品后添加评论，同时商户也可以维护评论。"
      create-text="评论管理"
    />
  </div>
</template>
<script>
import CardItem from './CardItem'

export default {
  name: 'MainSetting',
  data() {
    return {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    }
  },
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  computed: {},
  components: {
    CardItem
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.comment-settings-model {
}
</style>
