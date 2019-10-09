<template>
  <div class="group-content">
    <el-dialog
      title="修改分组"
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
            placeholder=""
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
            <li
              v-for="(item,index) in 5"
              :key="index"
              class="group-item text-center"
              :class="{'active':index===1}"
            >
              <span>为你推荐</span>
            </li>
          </ul>
          <div class="group-details">
            <div
              v-for="(item,index) in 6"
              :key="index"
              class="list"
            >
              <p class="titles">皮肤外科</p>
              <el-checkbox-group
                v-model="modelList"
                style="padding-left:20px"
              >
                <el-checkbox label="复选框 A" />
                <el-checkbox label="复选框 B" />
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="choose-box clearfix">
          <p class="choose-label">已选择：</p>
          <ul class="choose-list clearfix">
            <li v-for="(item,index) in 6" :key="index" class="choose-item">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>家常常备</el-breadcrumb-item>
                <el-breadcrumb-item>皮肤外科</el-breadcrumb-item>
                <el-breadcrumb-item>外伤处理</el-breadcrumb-item>
              </el-breadcrumb>
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
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      groupData: [
        {
          id: 1,
          name: '分组'
        }
      ],
      modelList: [],
      group_id: 1
    }
  },
  methods: {
    handleCanle() {
      this.$emit('close')
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
        line-height: 35px;
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
