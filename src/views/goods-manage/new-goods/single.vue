<template>
  <div class="app-container">
    <div class="singleCreate-wrapper">
      <el-alert
        title="商家可自行创建海典标准库没有的商品，创建后由商家内部审核，审核后上架并发布到其他门店使用"
        type="info"
        :closable="false"
      />
      <div class="step-box">
        <el-steps
          :active="1"
          finish-status="success"
          simple
        >
          <el-step
            title="选择分类"
            icon="el-icon-finished"
          />
          <el-step
            title="编辑基本信息"
            icon="el-icon-edit"
          />
        </el-steps>
      </div>
      <div class="step-content">
        <el-cascader-panel v-model="chooseList" :props="defaultProps" :options="groupData" @change="handleChoose" />
        <el-card style="width:600px;margin-top:12px;">
          <span>您当前选择的是：</span> <span v-if="choose.length!==0">{{ choose[0].name }}>{{ choose[1]?choose[1].name:'' }}>{{ choose[2]?choose[2].name:'' }}</span>
        </el-card>
      </div>
      <footer class="footer text-center">
        <el-button type="primary" size="small" @click="handleSubmit">下一步</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
import { getTypeTree } from '@/api/group'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: 0,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      groupData: [],
      chooseList: [],
      choose: []
    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    this.$store
      .dispatch('tagsView/delView', from)
    next()
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this._loadTypeList()
  },
  methods: {
    _loadTypeList() { // 加载数据
      getTypeTree(1).then(res => {
        this.groupData = res.data
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChoose(val) {
      this._filters(val)
    },
    _filters(data) {
      this.choose = []
      this.groupData.map(v => {
        if (v.id === data[0]) {
          this.choose.push({ name: v.name, id: v.id })
        }
        if (v.children) {
          v.children.map(v1 => {
            if (v1.id === data[1]) {
              this.choose.push({ name: v1.name, id: v1.id })
            }
            if (v1.children) {
              v1.children.map(v2 => {
                if (v2.id === data[2]) {
                  this.choose.push({ name: v2.name, id: v2.id })
                }
              })
            }
          })
        }
      })
    },
    handleSubmit() {
      if (this.chooseList.length === 0) {
        this.$message({
          message: '请先选择分类',
          type: 'warning'
        })
        return
      }
      sessionStorage.setItem('types', JSON.stringify(this.choose))
      this.$router.push('/goods-manage/edit')
    }
  }
}
</script>
<style lang="scss" scoped>
.singleCreate-wrapper {
  .step-box {
    width: 730px;
    margin: 30px 0 0;
  }
  .el-cascader-panel {
    width: 730px;
    margin-top: 12px;
  }
  .footer{
      margin-top: 20px;
      width: 600px;
  }
}
</style>
