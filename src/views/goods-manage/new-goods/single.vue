<template>
  <div class="app-container">
    <div class="singleCreate-wrapper">
      <el-alert title="商家可自行创建海典标准库没有的商品，创建后由商家内部审核，审核后上架并发布到其他门店使用" type="info" :closable="false" />
      <div class="step-box">
        <el-steps :active="1" finish-status="success" simple>
          <el-step title="选择分类" icon="el-icon-finished" />
        </el-steps>
      </div>
      <div v-loading="loading" class="step-content">
        <el-cascader-panel
          v-model="chooseList"
          :options="typeList"
          :props="defaultProps"
          @change="handleChoose"
        />
        <el-card style="width:730px;margin-top:12px;">
          <span>您当前选择的是：</span>
          <span
            v-if="chooseTypeList.length!==0"
          >{{ chooseTypeList[0].name }}>{{ chooseTypeList[1]?chooseTypeList[1].name:'' }}>{{ chooseTypeList[2]?chooseTypeList[2].name:'' }}</span>
        </el-card>
      </div>
      <footer class="footer text-center">
        <el-button type="primary" size="small" @click="handleSubmit">下一步</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
import minxis from './_source/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'SingleCreate',
  mixins: [minxis],
  data() {
    const _this = this
    return {
      isToEdit: false,
      active: 0,
      defaultProps: {
        // lazy: true,
        children: 'children',
        label: 'name',
        value: 'id',
        lazyLoad(node, resolve) {
          const { level, data } = node
          // setTimeout(() => {
          //   const nodes = Array.from({ length: level + 1 })
          //     .map(item => ({
          //       value: ++id,
          //       label: `选项${id}`,
          //       leaf: level >= 2
          //     }));
          //   // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          //   resolve(nodes);
          // }, 1000);
          if (level === 0) {
            _this._loadClassList('').then(res => {
              resolve(res.data)
            })
          } else {
            _this._loadClassList(data.id).then(res => {
              resolve(res.data)
            })
          }
        }
      },
      choose: [],
      loading: false
    }
  },
  beforeRouteLeave(to, from, next) {
    // 路由离开关闭标签
    // this.$store
    //   .dispatch('tagsView/delView', from)
    // next()
    if (
      to.name === 'GoodsEdit' &&
      from.name === 'SingleCreate' &&
      this.isToEdit
    ) {
      const hasGoodsEdit = this.$store.state.tagsView.visitedViews.find(
        item => item.name === 'GoodsEdit'
      )
      if (hasGoodsEdit) {
        const answer = window.confirm('你还有数据没有保存，是否确认退出')
        if (answer) {
          this.$store.dispatch('tagsView/delView', to).then(res => {
            this.isToEdit = false
            next()
          })
        } else {
          next()
        }
      } else {
        this.$store.dispatch('tagsView/delView', to).then(res => {
          this.isToEdit = false
          next()
        })
      }
    } else {
      this.isToEdit = false
      next()
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this._loadClassList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChoose(val) {
      this._filtersTypes(val)
    },
    handleSubmit() {
      if (this.chooseList.length === 0) {
        this.$message({
          message: '请先选择分类',
          type: 'warning'
        })
        return
      } else if (this.chooseList.length !== 3) {
        this.$message({
          message: '请选择三级分类',
          type: 'error'
        })
        return
      }
      sessionStorage.setItem('types', JSON.stringify(this.chooseTypeList))
      this.isToEdit = true
      this.$store.dispatch('tagsView/delView', this.$route).then(res => {
        const { name } = this.$route
        if (name === 'SingleCreate') {
          this.$router.replace('/goods-manage/edit-apply?source=create')
        } else {
          this.$router.replace('/goods-manage/apply-record-edit')
        }
      })
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
  .footer {
    margin-top: 20px;
    width: 600px;
  }
}
</style>
