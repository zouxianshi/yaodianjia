<template>
  <div class="no-data-comp">
    <div class="no-data-inner">
      <div class="no-data-inner-inner">
        <img src="./../../assets/404_images/404.png">
        <div class="no-data-text">暂无相关数据</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
  .no-data-comp {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .no-data-inner {
      width: 100%;
      height: 100%;
      font-size: 16px;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;

      .no-data-inner-inner {
        .no-data-text {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
  }
</style>
