<template>
  <div class="msg-settings-container">
    <div class="app-container">
      <div class="table-header">
        <el-button class="add-btn" type="primary" size="mini" @click="addBtnClick">添加快捷回复</el-button>
      </div>

      <div class="msg-table-comp">
        <el-table
          :data="msgList"
          :style="`width: 100%; max-height:${tableHeight}px`"
          :height="tableHeight"
        >
          <el-table-column prop="id" label="序号" width="180">
            <template slot-scope="scope">
              {{ scope.row.index }}
            </template>
          </el-table-column>
          <el-table-column prop="msgType" label="消息类型" width="180">
            <template slot-scope="scope">{{ msgTypeMap[scope.row.type] }}</template>
          </el-table-column>
          <el-table-column prop="address" label="快捷消息（50字以内）">
            <template slot-scope="scope">
              <div>{{ scope.row.msg }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="actions" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <!-- 快捷消息显示删除按钮 -->
              <template>
                <el-button v-if="scope.row.type===3" type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
                <el-dialog
                  :close-on-click-modal="false"
                  append-to-body
                  title="提示"
                  :visible.sync="deleteDialogVisible"
                  width="30%"
                >
                  <span>确认要删除吗？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleConfirmDel">确 定</el-button>
                  </span>
                </el-dialog>
              </template>
              <!-- 不在线推送和首次进入推送显示开关 -->
              <template v-if="[1,2].includes(scope.row.type)">
                <el-switch
                  :value="scope.row.status===1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="handleSwitch(scope.row)"
                />
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        class="edit-dialog"
        :close-on-click-modal="false"
        append-to-body
        :title="dialogType === 'add' ? '新增' : '编辑'"
        :visible.sync="editDialogVisible"
        :before-close="clearEditDialogData"
        width="45%"
      >
        <!-- 暂时不展示了 -->
        <!-- <el-dropdown @command="handleMsgTypeToggle">
          <span class="el-dropdown-link">
            消息类型：{{ msgTypeMap[selectedMsgType] || '请选择' }}
            <i
              class="el-icon-arrow-down el-icon--right"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="1">不在线推送</el-dropdown-item>
            <el-dropdown-item :command="2">首次进入推送</el-dropdown-item>
            <el-dropdown-item :command="3">快捷回复</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-input
          v-model="editMsgQuery.msg"
          class="msg-input"
          type="text"
          placeholder="请输入消息内容"
          maxlength="50"
          :autosize="true"
          @input="handleMsgInput"
        />
        <div v-if="showSwitch" class="edit-dialog-switch">
          是否开启：
          <el-switch
            :value="dialogSwitch"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleDialogSwitchToggle"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleMsgConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import msgSettings from './msgSettings'
export default msgSettings
</script>

<style scoped lang="scss">
  @import "./msgSettings.scss";
</style>
