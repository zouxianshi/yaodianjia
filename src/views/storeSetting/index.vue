<template>
  <div class="container">
    <div>
      <el-input size="small" style="width: 200px;margin-top: 20px;" placeholder="请输入门店名称" />
      <span style="font-size: 14px">是否上线：</span>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" size="small" style="margin-left: 10px">查询</el-button>
      <el-button type="primary" size="small">导出<i class="el-icon-download el-icon--right" /></el-button>
    </div>
    <section class="table-box">
      <el-table :data="list" style="width: 100%">
        <el-table-column label="门店图片">
          <template>
            <el-image
              style="width: 70px; height: 70px"
            />
          </template>
        </el-table-column>
        <el-table-column label="门店名称" property="stName" />
        <el-table-column label="门店编码" property="stCode" />
        <el-table-column label="电话" property="mobile" />
        <el-table-column label="状态" width="80px">
          <template>
            <el-switch />
          </template>
        </el-table-column>
        <el-table-column label="配送方式" property="name" />
        <el-table-column label="微商城是否上线">
          <template slot-scope="scope">
            <span v-if="scope.row.onlineStatus === 1">上线</span>
            <span v-else>下线</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template>
            <el-button size="small" type="primary" icon="el-icon-edit" circle />
          </template>
        </el-table-column>
      </el-table>
    </section>

  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import {
  queryStore
} from '../../api/chainSetting'
export default {
  name: 'Index',
  data() {
    return {
      options: [{
        value: '全部',
        label: '全部'
      }, {
        value: '上线',
        label: '上线'
      }, {
        value: '下线',
        label: '下线'
      }],
      value: '全部',
      searchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        searchKey: null
      },
      list: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      queryStore({
        merCode: this.merCode,
        currentPage: 1,
        pageSize: 200000
      }).then(res => {
        if (res.code === '10000') {
          this.list = _.cloneDeep(res.data.data)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    }
  }
}
</script>

<style scoped>
  .container{
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 10px;
  }
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    color: #99a9bf;
  }
  .label-name {
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    color: #999999;
    font-size: 14px;
  }
</style>
