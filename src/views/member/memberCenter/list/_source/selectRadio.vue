<template>
  <div class="select-radio-model">
    <div v-for="(items, index) in itemsArr" v-show="showing" :key="index" class="items">
      <span class="items-name">{{ items }}</span>
      <i v-if="choosedItems['key'+index]" class="el-icon-circle-check" @click="unchoosed(index)" />
      <span v-else class="before-choose" @click="choosed(index)" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemsArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showing: true,
      choosedItems: {
        key0: true
      }
    }
  },
  methods: {
    choosed(index) {
      this.showing = false
      this.choosedItems['key' + index] = true
      this.showing = true
    },
    unchoosed(index) {
      this.showing = false
      this.choosedItems['key' + index] = undefined
      this.showing = true
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
