<template>
  <div class="gift-card-modal" @click="gotoUrl(info.url,info.query)">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="info.imgUrl" class="image">
      <div style="padding: 10px;">
        <div class="text-box"><span>{{ info.activityTemplateName }}</span><el-button type="text" size="mini" class="button">新增</el-button></div>
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
<style lang="scss">
.text-box{
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
}
</style>
