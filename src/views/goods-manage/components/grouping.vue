<template>
  <div class="group-content">
    <el-dialog
      :title="`修改分组(已选${goodsData.length}个商品)`"
      :visible.sync="isShow"
      append-to-body
      :show-close="false"
      width="700px"
      custom-class="custom-body"
      :close-on-click-modal="false"
    >
      <div class="modal-body-group">
        <div class="header">
          <el-select
            v-model="group_id"
            placeholder="选择商品分类"
            @change="handleChooseGroup"
          >
            <el-option
              v-for="(item,index) in groupData"
              :key="index"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </div>
        <div class="group-cnt">
          <ul class="group-list">
            <template v-if="groups1.length!==0">
              <li
                v-for="(item,index) in groups1"
                :key="index"
                class="group-item text-center"
                :class="{'active':active_row.id===item.id}"
                @click="handleLeftGroup(item)"
              >
                <span v-text="item.name" />
              </li>
            </template>
            <template v-else>
              <li class="group-item text-center">暂无数据</li>
            </template>
          </ul>
          <div class="group-details">
            <template v-if="groups2.length>0">
              <div
                v-for="(item,index) in groups2"
                :key="index"
                class="list"
              >
                <p class="titles" v-text="item.name" />
                <el-checkbox-group
                  v-model="modelList"
                  style="padding-left:20px"
                >
                  <el-checkbox v-for="(items,index1) in item.children" :key="index1" :label="items.id" @change="handleCheckClk(items)">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
              </div>
            </template>
            <template v-else>
              <p class="text-center">暂无数据</p>
            </template>
          </div>
        </div>
        <div class="choose-box clearfix">
          <p class="choose-label">已选择：</p>
          <ul class="choose-list clearfix">
            <li v-for="(item,index) in chooseGroup" :key="index" class="choose-item">
              <el-tag type="" closable @close="handleRemove(index)">
                <span>{{ item[0].name }}&nbsp;>&nbsp;{{ item[1].name }}&nbsp;>&nbsp;{{ item[2].name }}</span>
              </el-tag>
            </li>
          </ul>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="handleCanle"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="subLoading"
          @click="handleSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setBatchGroup } from '@/api/depot'
import { mapGetters } from 'vuex'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    groupData: {
      type: Array,
      default: () => {
        return []
      }
    },
    goodsData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      modelList: [],
      group_id: '',
      groups1: [],
      groups2: [],
      active_row: '',
      subLoading: false,
      chooseGroup: []// 选中的分组
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  watch: {
    isShow(val) {
      if (this.groupData.length > 0) {
        this.group_id = this.groupData[0].id
        this.modelList = []
      }
    }
  },
  methods: {
    handleCanle() {
      this.$emit('close')
    },
    handleChooseGroup(val) { // 第一阶分组
      this.groupData.map(res => {
        if (res.id === val) {
          this.groups1 = res.children
          if (res.children.length > 0) {
            this.active_row = res.children[0]
            this.groups2 = res.children[0].children
          }
        }
      })
    },
    handleLeftGroup(row) { // 左侧分组点击事件
      this.active_row = row
      this.groups2 = row.children
    },
    handleCheckClk(row) { // 单个checkbox选择触发
      if (this.modelList.includes(row.id)) {
        this.active_row.children.map(res => {
          if (row.parentId === res.id) {
            this.chooseGroup.push([this.active_row, res, row, row.id])
          }
        })
      } else {
        let findIndex = 0
        for (let index = 0; index < this.chooseGroup.length; index++) {
          const element = this.chooseGroup[index]
          if (element.includes(row.id)) {
            findIndex = index
          }
        }
        this.chooseGroup.splice(findIndex, 1)
      }
    },
    handleRemove(index) { // 移出选择的数据
      const id = this.chooseGroup[index][3]
      if (this.modelList.includes(id)) {
        const index = this.modelList.indexOf(id)
        this.modelList.splice(index, 1)
      }
      this.chooseGroup.splice(index, 1)
    },
    handleSubmit() {
      const params = {
        userName: this.name,
        typeIds: this.modelList,
        ids: this.goodsData
      }
      this.subLoading = true
      setBatchGroup(params).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.subLoading = false
        this.$emit('close')
      }).catch(() => {
        this.subLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
.custom-body {
  .el-dialog__body {
    padding: 10px;
  }
}
</style>
<style lang="scss" scoped>
$divider: #dcdfe6;
.modal-body-group {
  margin: -10px;
  .header {
    padding: 10px 12px;
  }
  .group-cnt {
    border-top: 1px solid $divider;
    border-bottom: 1px solid $divider;
    display: flex;
    .group-list {
      height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      width: 150px;
      border-right: 1px solid $divider;
      .group-item {
        line-height: 40px;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: default;
        &.active {
          background: $divider;
        }
      }
    }
    .group-details {
      flex: 1;
      padding: 10px;
      height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      .list {
        margin-bottom: 10px;
        .titles {
          margin-bottom: 10px;
        }
      }
    }
  }
  .choose-box {
      padding: 10px;
    .choose-label {
      float: left;
      color: red;
      width: 80px;
    }
    .choose-list {
      margin-left: 80px;
      .choose-item{
          display: inline-block;
          margin-right: 15px;
          margin-bottom: 5px;
          list-style-type: disc;
      }
    }
  }
}
</style>
