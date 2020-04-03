<template>
  <div class="pop-consultant">
    <!-- <div class="header">最近添加</div> -->
    <div class="body-content">
      <div v-for="items in 2" :key="items" class="content-items">
        <div class="left">
          张三
        </div>
        <div class="right">
          李四11111111
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="text" size="small">查看全部</el-button>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.pop-consultant{
  padding: 5px;
  .header{
    font-size:14px;font-weight:500;color:rgba(0,0,0,1);border-bottom: 1px solid #eee;margin-bottom: 10px;
    height: 20px;line-height: 10px;
  }
  .body-content{
    .content-items{
      display: flex;justify-content: space-between;font-size:12px;line-height:24px;
      .left{
        flex: 0 0 40%;
      }
      .right{
        flex: 0 0 60%;
      }
    }
  }
  .footer{
    text-align: right;position: relative;top: 15px;
  }
}
</style>
