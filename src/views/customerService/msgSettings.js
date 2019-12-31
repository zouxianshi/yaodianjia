import { mapGetters } from 'vuex'
import CustomerService from '@/api/customer-service'

export default {
  name: 'MsgSetting',
  data() {
    return {

      // 表格高度
      tableHeight: document.documentElement.clientHeight - 158 - 38 - 40,

      // 消息类型枚举
      msgTypeMap: {
        1: '不在线推送',
        2: '首次进入推送',
        3: '快捷回复'
      },

      /**
       * 消息列表相关
       */
      // 列表请求参数
      listQuery: {
        currentPage: 1, // 当前页
        isAll: true, // 是否全选
        merCode: this.merCode, // 商户编码
        pageSize: 10, // 每页条数
        status: '', // 消息状态，0-未开启，1-已开启
        type: '' // 客服消息类型，1-不在线推送，2-首次进入推送，3-快捷回复
      },
      msgList: [], // 消息列表
      deleteDialogVisible: false, // 删除确认弹窗是否可见

      /**
       * 消息编辑弹窗相关
       */
      editDialogVisible: false, // 编辑弹窗是否展示
      dialogType: 'add', // 弹窗类型 add-新增 edit-编辑
      selectedMsgType: '', // 选中的消息类型 1-不在线推送 2-首次进入推送 3-快捷消息
      dialogSwitch: true, // 消息开关

      // 消息更新请求参数(包括添加和编辑)
      editMsgQuery: {
        id: '', // 消息id 新增不用传
        merCode: '', // 商户编码
        msg: '', // 消息内容
        status: 1, // 是否默认启用 1-启用 0-不启用
        type: '' // 消息类型 1-不在线推送 2-首次进入推送 3-快捷消息
      },
      msgContent: ''
    }
  },
  computed: {
    ...mapGetters(['merCode']),
    // 编辑弹窗开启
    showSwitch() {
      return [1, 2].includes(this.selectedMsgType)
    }
  },
  methods: {
    // 清空编辑弹窗数据
    clearEditDialogData() {
      this.selectedMsgType = ''
      this.editMsgQuery = {
        id: '',
        msg: '',
        status: 1,
        type: '',
        merCode: this.merCode
      }
      this.editDialogVisible = false
    },
    // 进入页面查询消息列表
    queryMsgList() {
      CustomerService.querySupportMsgList(this.listQuery).then(res => {
        const result = res.data
        result.data.forEach((item, index) => {
          const formatIndex = (index) => {
            if (index < 10) {
              return `00${index}`
            } else if (index < 100) {
              return `0${index}`
            } else {
              return index
            }
          }
          item.index = formatIndex(index + (this.listQuery.currentPage - 1) * this.listQuery.pageSize + 1)
        })
        this.msgList = result.data
      })
    },
    addBtnClick() {
      this.dialogType = 'add'
      this.editDialogVisible = true
    },
    handleDel(rowData) {
      this.deleteDialogVisible = true
      this.rowData = rowData
    },
    handleSave(rowData) {
      this.queryMsgList()
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    handleContentInput(val) {
      this.msgContent = val
    },
    // 删除确认弹窗确认按钮点击
    handleConfirmDel() {
      CustomerService.delSupportMsg({
        id: this.rowData.id
      }).then(res => {
        this.deleteDialogVisible = false
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.queryMsgList()
      })
    },
    // 开关切换
    handleSwitch(row) {
      CustomerService.updateSupportMsg({
        id: row.id,
        merCode: this.merCode,
        msg: row.msg,
        status: row.status === 1 ? 0 : 1,
        type: row.type
      }).then(res => {
        this.queryMsgList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    handleClose() {
      this.editDialogVisible = false
    },
    // 快捷消息输入
    handleMsgInput(val) {
      this.editMsgQuery.msg = val
    },
    // 验证请求参数
    validateMsgQuery() {
      const {
        msg,
        type
      } = this.editMsgQuery
      if (!type) {
        this.$message({
          message: '请先选择消息类型',
          type: 'warning'
        })
        return false
      }
      if (!msg) {
        this.$message({
          message: '消息内容不能为空！',
          type: 'warning'
        })
        return false
      }
      return true
    },
    // 确认添加按钮点击
    handleMsgConfirm() {
      if (this.dialogType === 'add') {
        CustomerService.addSupportMsg({
          ...this.editMsgQuery,
          type: 3, // 快捷消息
          msg: this.editMsgQuery.msg.trim()
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.editDialogVisible = false
          this.msgContent = ''
          this.queryMsgList()
        })
      } else {
        CustomerService.updateSupportMsg(this.editMsgQuery).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.editDialogVisible = false
          this.msgContent = ''
          this.queryMsgList()
        })
      }
    },
    // 编辑按钮点击
    handleEdit(row) {
      this.dialogType = 'edit'
      this.editDialogVisible = true
      this.editMsgQuery = {
        merCode: this.merCode,
        msg: row.msg,
        id: row.id,
        type: row.type,
        status: row.status
      }
      this.selectedMsgType = row.type
    },
    // // 消息类型切换
    // handleMsgTypeToggle(command) {
    //   this.selectedMsgType = command
    //   this.editMsgQuery.type = command
    // },
    // 消息开关切换
    handleDialogSwitchToggle(e) {
      this.dialogSwitch = e
      this.editMsgQuery.status = e ? 1 : 0
    }
  },
  created() {
    this.editMsgQuery.merCode = this.merCode
    this.queryMsgList()
  }
}
