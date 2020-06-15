<template>
  <section class="app-container">
    <div v-if="$route.name === 'commentSettings'" class="comment-settings-model">
      <MainSetting />
    </div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
<script>
import MainSetting from '@/views/comment-settings/components/MainSetting'

export default {
  name: 'Index',
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
    MainSetting
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.comment-settings-model {
}
</style>
