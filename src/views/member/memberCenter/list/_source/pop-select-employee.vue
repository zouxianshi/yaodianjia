<template>
  <div class="select-store-model">
    <el-dialog
      title
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :modal-append-to-body="true"
      :append-to-body="true"
      :before-close="closeDia"
    >
      <div slot="title" class="dialog-title">选择员工</div>
      <div class="content-body">
        <div class="choose-left">
          <div class="search">
            <el-input v-model="serachWord" size="mini" style="width:70%" placeholder="请输入" />
            <el-button size="mini" type="text" style="width:28%" @click="filterStore">查询</el-button>
          </div>
          <div class="selects-content">
            <div class="select-radio-model">
              <div v-for="(items, index) in empLoyeeArr" :key="index">
                <div class="items" v-if="items.show">
                  <span class="items-name">{{ items.empName }}</span>
                  <i v-if="items.selectFlag" class="el-icon-circle-check" @click="choosed(items)" />
                  <span v-else class="before-choose" @click="unchoosed(items)" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="choose-right">
          <div class="tips">已选择名单</div>
          <div class="has-choosed">
            <div v-for="(items, index) in empLoyeeArr" :key="index" style="display:inline-block">
              <el-tag
                v-if="items.selectFlag"
                type="info"
                closable
                size="mini"
                @close="items.selectFlag=false"
                style="margin-right: 20px; margin-bottom: 10px "
              >{{ items.empName }}</el-tag>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="submitSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      serachWord: '',
      dialogVisible: false,
      empLoyeeArr: []
    }
  },
  methods: {
    closeDia(done) {
      done()
    },
    showDialogVisible(empLoyee) {
      this.empLoyeeArr = empLoyee
      this.serachWord = ''
      this.dialogVisible = true
      this.filterStore()
    },
    // 筛选会员
    filterStore() {
      _.forEach(this.empLoyeeArr, item => {
        if (item.empName.indexOf(this.serachWord) < 0) {
          item.show = false
        } else {
          item.show = true
        }
      })
    },
    choosed(data) {
      data.selectFlag = false
    },
    unchoosed(data) {
      data.selectFlag = true
    },
    submitSelect() {
      this.$emit('chooseEmp', this.empLoyeeArr)
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss">
.el-dialog__header {
  padding-bottom: 0;
}
.el-dialog__body {
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
}
.el-dialog__footer {
  padding: 10px 20px;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  position: relative;
  height: 30px;
}
.content-body {
  display: flex;
  justify-content: space-between;
  .choose-left {
    flex: 0 0 40%;
    border-right: 1px solid #e6e6e6;
    padding: 20px 0;
    .selects-content{
        max-height: calc(100vh - 400px);
        overflow: auto;
    }
  }
  .choose-right {
    flex: 0 0 55%;
    padding: 20px 0;
    .tips {
      line-height: 29px;
    }
    .has-choosed {
      margin-top: 8px;
    }
  }
  .items {
    height: 30px;
    line-height: 30px;
    .items-name {
      width: 80%;
      display: inline-block;
    }
    .before-choose {
      display: inline-block;
      width: 15px;
      height: 15px;
      border: 1px solid #979797;
      border-radius: 50%;
      vertical-align: text-top;
      cursor: pointer;
      &:hover {
        border-color: #409eff;
      }
    }
    .el-icon-circle-check {
      font-size: 16px;
      color: #409eff;
    }
  }
}
</style>