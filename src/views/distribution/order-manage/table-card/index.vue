<template>
  <div>
    <div class="table-header">
      <!-- <el-checkbox class="check-box" /> -->
      <div class="table-column flex-1">商品</div>
      <div class="table-column flex-2">商品编号</div>
      <div class="table-column flex-1">单价</div>
      <div class="table-column flex-1">数量</div>
      <div class="table-column flex-1">预约人</div>
      <div class="table-column flex-1">预约时间</div>
      <div class="table-column flex-1">订单状态</div>
      <div class="table-column flex-2">提货门店</div>
    </div>
    <div class="table-content">
      <div class="header">
        <div class="gray">
          预约单编号：12452904985048
        </div>
        <div class="blue">订单详情</div>
      </div>
      <div class="row">
        <div class="table-column content-container flex-3">
          <div class="image-box">
            <img src="" class="pic">
            <div class="box">暂无图片</div>
          </div>
          <div class="content-box">
            <div class="desc">
              预约单编号：12452904985048预约单编号：12452904985048预约单编号：12452904985048预约单编号：12452904985048
            </div>
            <div class="order">
              预约单编号：12452904985048
              预约单编号：12452904985048预约单编号：12452904985048预约单编
            </div>
          </div>
        </div>
        <div class="table-column content-center flex-1">单价</div>
        <div class="table-column content-center flex-1">数量</div>
        <div class="table-column content-center flex-1">预约人</div>
        <div class="table-column content-center flex-1">预约时间</div>
        <div class="table-column content-column content-center flex-1">
          <span>订单状态</span><el-button
            style="margin-top:10px;"
            type="primary"
            @click="emitClickHandler"
          >确认收货</el-button>
        </div>
        <div class="table-column content-center flex-2">
          长沙市岳麓区麓山南路店 NO.1234长沙市岳麓区麓山南路店
          NO.1234长沙市岳麓区麓山南路店 NO.1234
        </div>
      </div>
    </div>
    <div class="table-empty" />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    emitClickHandler() {
      this.$emit('button-click')
    }
  }
}
</script>
<style lang="scss" scoped>
.table-content {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .header {
    height: 32px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #e8e8e8;
    div {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
    .gray {
      color: #4a4a4a;
    }
    .blue {
      color: #1890ff;
    }
  }
  .row {
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    border: 1px solid #ebebeb;
  }
}
.table-header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 42px;
  background-color: #ebebeb;
  padding-left: 20px;
  align-items: center;
}
.table-column {
  color: #9b9b9b;
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;
  &.content-column {
    flex-direction: column;
  }
  &.content-container {
    display: flex;
    flex-direction: row;
    .content-box {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      flex: 1;
      margin-left: 10px;
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 40px;
        margin-bottom: 20px;
      }
      .order {
      }
    }
    .image-box {
      position: relative;
      width: 72px;
      height: 72px;
      .pic {
        position: absolute;
        width: 72px;
        height: 72px;
      }
      .box {
        position: absolute;
        width: 72px;
        height: 72px;
        text-align: center;
        line-height: 72px;
        font-size: 14px;
        color: #9b9b9b;
        background-color: #ebebeb;
      }
    }
  }
  &.content-center {
    justify-content: center;
  }
}
.check-box {
  margin-right: 10px;
}
.flex-1 {
  flex: 1;
}
.flex-2 {
  flex: 2;
}
.flex-3 {
  flex: 3;
}
.flex-4 {
  flex: 4;
}
.flex-5 {
  flex: 5;
}
.flex-6 {
  flex: 6;
}
</style>
