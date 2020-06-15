<template>
  <div>1</div>
</template>
<script>
export default {
  name: 'Manager',
  data() {
    return {
      APP_ID: '',
      PAGE_LINK: '',
      QR_CODE: '',
      isLoading: true
    }
  },
  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.weapp-container {
  height: 76vh;
  padding: 0 40px;
}
.panel {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    .title {
      width: 120px;
    }
    .content {
    }
    ._image {
      width: 200px;
      height: 200px;
    }
  }
  .right {
    .download {
      padding: 10px 20px;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #147de8;
      border-color: #147de8;
    }
  }
}
</style>
