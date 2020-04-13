<template>
  <div class="gift-card-modal" @click="gotoUrl(info.url)">
    <el-card :body-style="{ padding: '10px 10px' }">
      <img :src="info.imgUrl" class="image">
      <div style="padding: 10px 0 0;">
        {{ info.name }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'GiftCard',
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    gotoUrl(url) {
      this.$router.push({ path: url })
    }
  }
}
</script>
<style scoped>

</style>
