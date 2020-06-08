<template>
  <div class="message-model">
    <el-radio-group v-model="radio" size="mini" @change="handleChange">
      <el-radio-button label="卡券提醒" />
      <el-radio-button label="订单提醒" />
      <el-radio-button label="活动消息" />
    </el-radio-group>
    <div class="message-warning">
      <el-alert
        title="模板消息推送功能可以通过微信公众号，给顾客或商家推送交易和物流相关的提醒消息，以提升顾客的购物体验，获得更高的订单转化率和复购率。"
        type="warning"
        :closable="false"
      />
    </div>
    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <!-- <el-table-column prop="date" label="消息模板类型" width="200">
          <template
            slot-scope="scope"
          >{{ scope.row.modelType.toString() ==='1'? '卡券提醒' : '' || scope.row.modelType.toString() ==='2'? '订单提醒' : '' || scope.row.modelType.toString() ==='3'? '模板消息' : '' }}</template>
        </el-table-column> -->
        <el-table-column prop="modelCode" label="模板编号" />
        <el-table-column prop="modelName" label="消息标题" />
        <el-table-column prop="modelTime" label="触发推送" />
        <el-table-column prop="modelUrl" label="页面跳转" />
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.noticeState"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              @change="switchChange(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { searchWxTemp, setTemplate } from '@/api/channelService'
import { mapGetters } from 'vuex'
export default {
  name: 'Message',
  props: {},
  data() {
    return {
      loading: 'false',
      radio: '卡券提醒',
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getDate()
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleChange(val) {
      this.getDate()
    },
    switchChange(val) {
      const params = {
        merCode: this.merCode,
        modelCode: val.modelCode,
        modelHead: val.modelHead,
        modelNote: val.modelNote,
        modelType: val.modelType.toString(),
        operate: val.noticeState === true ? 1 : 0
      }
      setTemplate(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
        this.getDate()
      }).catch(() => {
        this.getDate()
      })
    },
    getDate() {
      let radioValue = ''
      this.loading = true
      if (this.radio === '卡券提醒') {
        radioValue = 'modelType=1'
      } else if (this.radio === '订单提醒') {
        radioValue = 'modelType=2'
      } else if (this.radio === '活动消息') {
        radioValue = 'modelType=3'
      }
      searchWxTemp(radioValue).then(res => {
        const tableData = res.data
        tableData.forEach(element => {
          if (element.noticeState === null) {
            element.noticeState = false
          } else if (element.noticeState.toString() === '1') {
            element.noticeState = true
          } else {
            element.noticeState = false
          }
        })
        this.tableData = tableData
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.message-model {
  height: calc(100vh - 250px);
  overflow-y: scroll;
  .message-warning {
    margin: 20px 0;
  }
}
</style>
