<template>
  <div>
    <div class="table-header">
      <!-- <el-checkbox class="check-box" /> -->
      <div class="table-column flex-3">商品</div>
      <!-- <div class="table-column flex-2">商品编号</div> -->
      <div class="table-column flex-1">单价</div>
      <div class="table-column flex-1">数量</div>
      <div class="table-column flex-2">预约人</div>
      <div class="table-column flex-2">预约时间</div>
      <div class="table-column flex-1">总价</div>
      <div class="table-column flex-1">订单状态</div>
      <div class="table-column flex-2">提货门店/地址</div>
    </div>
    <div v-if="tableData.length > 0" class="table-container">
      <div v-for="item in tableData" :key="item.id" class="table-content">
        <div class="header">
          <div class="left">
            <!-- <el-checkbox class="check-box" /> -->
            <div class="gray">预约单编号：{{ item.id }}</div>
          </div>
          <!-- <div class="blue" @click="toDetails(item.id)">订单详情</div> -->
        </div>
        <div class="row">
          <div class="table-column content-container flex-3">
            <div class="image-box">
              <img :src="showImgHandler(item.productImgUrl)" class="pic">
              <div class="box">暂无图片</div>
            </div>
            <div class="content-box">
              <div class="desc">
                {{ item.productName }}
              </div>
              <!-- <div class="order">
                {{ item.productId }}
              </div> -->
            </div>
          </div>
          <div class="table-column content-center flex-1">
            ¥ {{ item.productPrice }}
          </div>
          <div class="table-column content-center flex-1">
            {{ item.productCount }}
          </div>
          <div
            class="table-column content-center flex-2 content-column flex-start"
          >
            姓名:{{ item.personName }}<br><br>
            手机号:{{ item.mobilePhone }}<br><br>
            身份证:<br>{{ item.personId }}
          </div>
          <div class="table-column content-center flex-2">
            预约时间:{{ item.createTime }}<br><br>
            {{
              item.status === 'COMPLETE'
                ? `领取时间:${item.updateTime || ''}`
                : ''
            }}
            <!-- 领取时间:{{ item.updateTime || '' }} -->
          </div>
          <div
            class="table-column content-center flex-1"
            style="color:#D0021B;"
          >
            ¥
            {{
              (Number(item.productPrice) * Number(item.productCount))
                .toFixed(2)
                .replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
            }}
          </div>
          <div class="table-column content-column content-center flex-1">
            <span>{{
              item.status === 'SUCCESS'
                ? '待到货'
                : item.status === 'ARRIVED'
                  ? '待核销'
                  : item.status === 'COMPLETE'
                    ? '已完成'
                    : item.status === 'CANCEL'
                      ? '取消预约'
                      : '其他'
            }}</span><el-button
              v-if="item.status === 'SUCCESS'"
              style="margin-top:10px;"
              type="primary"
              @click="emitClickHandler(item)"
            >确认收货</el-button>
            <el-button
              v-if="item.status === 'ARRIVED'"
              style="margin-top:10px;"
              type="primary"
              @click="emitClickHandler(item)"
            >确认核销</el-button>
          </div>
          <div class="table-column content-center flex-2">
            {{ item.storeName }} / {{ item.address }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="table-empty">暂无数据</div>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    emitClickHandler(obj) {
      this.$emit('button-click', obj)
    },
    toDetails(id) {
      this.$router.push(`/distribution/order-details?id=${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container {
}
.table-empty {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 14px;
  color: #9b9b9b;
  border: 1px solid #dfe6ec;
  border-top: none;
}
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
      cursor: pointer;
      color: #1890ff;
    }
    .left {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
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

  &.flex-start {
    justify-content: flex-start;
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
        z-index: 2;
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
        z-index: 1;
      }
    }
  }
  &.content-center {
    justify-content: center;
  }
  &.text-center {
    text-align: center;
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
