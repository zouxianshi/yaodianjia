<template>
  <div class="live-active app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="自主直播" name="first">
        <merchanLive />
      </el-tab-pane>
      <el-tab-pane label="厂家直播" name="second">
        <factoryLive />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import merchanLive from './list'
import factoryLive from './factory-live-list'
export default {
  components: {
    merchanLive, factoryLive
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss">
</style>