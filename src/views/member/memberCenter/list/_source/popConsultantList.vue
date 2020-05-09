<template>
  <div class="pop-consultant">
    <!-- <div class="header">最近添加</div> -->
    <div class="body-content">
      <div v-for="(items, index) in datas" :key="index" class="content-items">
        <div class="left">
          {{ items.emName }}
        </div>
        <div class="right">
          {{ items.storeName }}
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="text" size="small" @click="toTails(userId)">查看全部</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    datas: {
      type: Array,
      default() {
        return []
      }
    },
    userId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    toTails(ids) {
      this.$router.push(`/member/member-center/details?userId=${ids}`)
    }
  }
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
    height: 100px;overflow: auto;
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
