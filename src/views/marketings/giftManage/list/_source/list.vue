<template>
  <div class="list">
    <div class="nav-condition">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="优惠券状态">
          <el-select v-model="searchParams.status" placeholder="请选择" size="mini">
            <el-option label="全部" value="0" />
            <el-option label="未开始" value="1" />
            <el-option label="进行中" value="2" />
            <el-option label="已结束" value="3" />
            <el-option label="已删除" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券名称">
          <el-input v-model="searchParams.name" placeholder="请输入关键词" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchParams: {
        status: '',
        name: ''
      }
    }
  },
  methods: {
    searchData() {
      console.log(this.searchParams)
    }
  }
}
</script>
<style scoped>

</style>
