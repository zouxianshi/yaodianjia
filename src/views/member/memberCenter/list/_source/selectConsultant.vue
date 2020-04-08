<template>
  <div class="select-con-model">
    <el-dialog title="" :visible.sync="dialogVisible" width="50%" :modal-append-to-body="true" :append-to-body="true" :before-close="closeDia">
      <div slot="title" class="dialog-title">选择顾问</div>
      <div class="content-body">
        <div class="choose-left">
          <div class="search">
            <el-input size="mini" style="width:70%" placeholder="请输入" />
            <el-button size="mini" type="text" style="width:28%">查询</el-button>
          </div>
          <div class="selects-content">
            <div v-for="(items, index) in conData" :key="index" class="store-list">
              <div class="store-name" @click="items.foldFlag =! items.foldFlag">
                {{ items.storeName }} <i class="el-icon-arrow-down" />
              </div>
              <div v-if="items.foldFlag" class="con-list">
                <mSelectRadio :items-arr="items.employees" />
              </div>
            </div>
          </div>
        </div>
        <div class="choose-right">
          <div class="tips">已选择名单</div>
          <div class="has-choosed">
            <div v-for="(items, index) in conData" :key="index" style="display:inline-block">
              <span v-for="(items2, index2) in items.employees" :key="index2" class="span-box">
                <el-tag v-if="items2.selectFlag" type="info" closable size="mini" @close="items2.selectFlag=false">
                  {{ items2.empName }}
                </el-tag>
              </span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mSelectRadio from './selectRadio' // 选择组件
export default {
  components: {
    mSelectRadio
  },
  props: {
    conData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    closeDia(done) {
      done()
    },
    showDialogVisible() {
      this.dialogVisible = true
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
    .selects-content{
      max-height:300px;overflow: auto;
      .store-list{
        color: #000;
        .store-name{
          line-height: 40px;cursor: pointer;
        }
        .con-list{
          .select-radio-model{
            padding-left: 20px;
          }
        }
      }
    }
  }
  .choose-right{
    flex: 0 0 55%;padding: 20px 0;
    .tips{
      line-height: 29px;
    }
    .has-choosed{
      margin-top: 8px;line-height:36px;
      span{
        margin-right: 5px;
      }
      .span-box{
        margin-right: 0;
      }
    }
  }
}
</style>
