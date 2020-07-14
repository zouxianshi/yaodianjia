<template>
  <div class="select-store-model">
    <el-dialog title="" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" :modal-append-to-body="true" :append-to-body="true" :before-close="closeDia">
      <div slot="title" class="dialog-title">选择门店</div>
      <div class="content-body">
        <div class="choose-left">
          <div class="search">
            <el-input v-model="serachWord" size="mini" style="width:70%" placeholder="请输入" />
            <el-button size="mini" type="text" style="width:28%" @click="filterStore">查询</el-button>
          </div>
          <div class="selects-content">
            <mSelectRadio :items-arr="empStoreArr" />
          </div>
        </div>
        <div class="choose-right">
          <div class="tips">已选择</div>
          <div class="has-choosed">
            <div v-for="(items, index) in empStoreArr" :key="index" style="display:inline-block">
              <el-tag v-if="items.selectFlag" type="info" closable size="mini" @close="items.selectFlag=false" style="margin-right: 20px; margin-bottom: 10px ">
                {{ items.stName }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="submitStore">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mSelectRadio from './selectRadio' // 选择组件
import _ from 'lodash'
export default {
  components: {
    mSelectRadio
  },
  data() {
    return {
      serachWord: '',
      dialogVisible: false,
      empStoreArr: []
    }
  },
  methods: {
    closeDia(done) {
      done()
    },
    showDialogVisible(empStore) {
      this.empStoreArr = empStore
      this.dialogVisible = true
      this.filterStore()
    },
    // 筛选门店
    filterStore() {
      _.forEach(this.storeData, item => {
        if (item.stName.indexOf(this.serachWord) < 0) {
          item.show = false
        } else {
          item.show = true
        }
      })
    },
    // 提交推荐门店数据
    submitStore() {
      this.$emit('chooseStore', this.empStoreArr)
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss">
.el-dialog__header{
  padding-bottom: 0;
}
.el-dialog__body{
  padding: 0 20px;border-bottom: 1px solid #E6E6E6;
}
.el-dialog__footer{
  padding: 10px 20px ;
}

.dialog-title{
  font-size: 16px;font-weight: 600;border-bottom: 1px solid #eee;position: relative;
  height: 30px;
}
.content-body{
  display: flex;justify-content: space-between;
  .choose-left{
    flex: 0 0 40%;border-right: 1px solid #E6E6E6;padding: 20px 0;
  }
  .choose-right{
    flex: 0 0 55%;padding: 20px 0;
    .tips{
      line-height: 29px;
    }
    .has-choosed{
      margin-top: 8px;
    }
  }
}
</style>