<template>
  <div class="select-radio-model">
    <div v-for="(items, index) in itemsArr" :key="index">
      <div v-if="items.show" class="items">
        <span class="items-name">{{ items.empName?items.empName:items.storeName }}</span>
        <i v-if="items.selectFlag" class="el-icon-circle-check" @click="choosed(items)" />
        <span v-else class="before-choose" @click="unchoosed(items)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemsArr: { // 门店数据
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    choosed(data) {
      data.selectFlag = false
    },
    unchoosed(data) {
      data.selectFlag = true
    }
  }
}
</script>
<style lang="scss" scoped>
.items{
  height: 30px;line-height: 30px;
  .items-name{
    width: 80%;display: inline-block;
  }
  .before-choose{
    display: inline-block;width: 15px;height: 15px;border: 1px solid #979797;border-radius: 50%;
    vertical-align: text-top;cursor: pointer;
    &:hover{
      border-color: #409EFF;
    }
  }
  .el-icon-circle-check{
    font-size: 16px;color: #409EFF;
  }
}
</style>
