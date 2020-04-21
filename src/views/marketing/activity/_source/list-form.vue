<template>
  <section @keydown.enter="search()">
    <div class="search-form" style="margin-top:20px;margin-bottom:10px">
      <div class="search-item">
        <span class="label-name" style="width: 80px">活动名称</span>
        <el-input
          v-model.trim="searchForm.pmtName"
          clearable
          size="small"
          style="width: 200px"
          placeholder="请输入活动名称"
        />
      </div>
      <div class="search-item">
        <span class="label-name" style="width: 80px">活动店铺</span>
        <el-select
          v-model="searchForm.storeId"
          style="width: 200px"
          size="small"
          clearable
          filterable
          placeholder="全部"
          @change="search()"
        >
          <el-option
            v-for="(item,index) in storeList"
            :key="index"
            :label="item.stName"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="search-item">
        <span class="label-name" style="width: 80px">活动状态</span>
        <el-select v-model="searchForm.validStatus" style="width: 200px" size="small" placeholder="全部" @change="search()">
          <el-option label="全部" value />
          <el-option label="进行中" :value="1" />
          <el-option label="未开始" :value="0" />
          <el-option label="已结束" :value="2" />
        </el-select>
      </div>
      <div class="search-item">
        <el-button size="small" type="primary" @click="search()">查 询</el-button>
      </div>
    </div>
  </section>
</template>

<script>
import { getStoreList } from '@/api/depot'
export default {
  data() {
    return {
      searchForm: {
        name: '',
        storeId: '',
        validStatus: '' // 活动.时间状态 int (-1: 未开始, 1: 进行中, 0: 已结束)
        // 活动状态 0 未开始、1 正在进行、2已结束，根据时间判定
      },
      storeList: [] // 门店列表
    }
  },
  created() {
    this._loadStoreList()
  },
  methods: {
    search() {
      console.log('准备触发更新了', this.searchForm)
      this.$emit('form-search', this.searchForm)
    },
    _loadStoreList() {
      // 加载门店列表
      const data = {
        searchKey: '',
        currentPage: 1,
        onlineStatus: 1,
        status: 1,
        pageSize: 9000
      }
      getStoreList(data)
        .then(res => {
          const { data } = res.data
          this.storeList = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
  .app-container .search-form .search-item .el-input {
    width: 200px;
  }
</style>
