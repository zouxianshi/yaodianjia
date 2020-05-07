<template>
  <div class="image-wapper">
    <i class="el-icon-error delete-icon" @click.stop="deletePic" />
    <el-image :src="picUrl" @click="selectPic" />
  </div>
</template>

<script>
export default {
  props: {
    picUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    deletePic() {
      console.log('掉了删除方法')
    },
    selectPic() {
      console.log('选中了图片')
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-wapper {
    position: relative;
    margin-bottom: 5px;
    .delete-icon {
      position: absolute;
      right: -5px;
      top: -8px;
      font-size: 20px;
      z-index: 10;
      color: #afafaf;
      cursor: pointer;
    }
  }
</style>
