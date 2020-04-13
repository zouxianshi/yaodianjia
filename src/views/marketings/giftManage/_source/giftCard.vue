<template>
  <div class="gift-card-modal">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="Info.imgUrl" class="image">
      <div style="padding: 14px;">
        {{ Info.name }}
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
  }
}
</script>
<style scoped>

</style>
