<template>
  <div class="gift-card-modal" @click="gotoUrl(info.url,info.query)">
    <el-card :body-style="{ padding: '10px 10px' }">
      <img :src="info.imgUrl" class="image">
      <div style="padding: 10px 0 0;">
        {{ info.activityTemplateName }}
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
    gotoUrl(url, querycode) {
      if (querycode) {
        this.$router.push({ path: url, query: querycode })
      } else {
        this.$router.push({ path: url })
      }
    }
  }
}
</script>
<style scoped>

</style>
