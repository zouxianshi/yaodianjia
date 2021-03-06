import { mapGetters, mapState } from 'vuex'
import CustomerService from '@/api/customer-service'

export default {
  components: {},
  data() {
    return {
      loadingMask: null, // 客服列表loading对象
      isFirstQueryFinished: false,
      delDialogVisible: false, // 删除对话框是否展示
      curDelRow: null, // 当前删除按钮所在的行数据
      checked: true, // 是否选中
      // 表格高度
      tableHeight: document.documentElement.clientHeight - 158 - 38 - 40 - 42,
      // 性别枚举
      sexEnum: {
        0: '男',
        1: '女',
        2: '未知'
      },
      /**
       * 客服列表相关
       */
      // 客服在线状态枚举
      statusMap: [
        {
          symbol: 'all',
          text: '全部',
          onlineStatus: ''
        },
        {
          symbol: 'online',
          text: '在线',
          onlineStatus: 1
        },
        {
          symbol: 'offline',
          text: '离线',
          onlineStatus: 0
        }
      ],

      // 客服列表相关属性
      // 客服列表初始单页条数 注意这里要和merSupportQuery.pageSize保持一致
      merSupportInitialPageSize: 10,
      merSupportQuery: {
        currentPage: 1, // 分页页码 从1开始
        isAll: false, // 是否全选 bool true-全选,不分页 false-不全选
        merCode: this.merCode, // 商户编码 string
        onlineStatus: '', // 客服在线状态 int 1-在线 0-离线
        pageSize: 10, // 每页条数
        status: '', // 客服状态 int 1-已启用 0-未启用
        type: 1 // int 员工类型 1-客服,
      },
      // 客服表格数据相关属性
      merSupportTableData: {
        list: [], // 客服列表数据
        total: 0, // 客服总数
        selectedFilterText: '全部' // 筛选条件文字
      },

      /**
       * 员工列表相关
       */
      // 员工列表弹窗是否可见
      addDialogVisible: false,
      // 员工列表初始单页条数 注意这里要和merStaffQuery.pageSize保持一致
      merStaffInitialPageSize: 10,
      // 员工列表接口请求参数
      merStaffQuery: {
        currentPage: 1, // 分页页码
        empName: '', // 员工名称
        merCode: this.merCode, // 商户编码
        pageSize: 10, // 单页条数
        subOrgName: '' // 组织机构名称
      },
      merStaffTableData: {
        list: [],
        total: 0,
        selectedList: []
      }
    }
  },
  computed: {
    ...mapState({
      webSocketConnected: state => state.customerService.webSocketConnected
    }),
    ...mapGetters(['merCode']),
    ...mapState('customerService', [
      'ryConnected'
    ]),
    merSupportPageSizes() {
      return [
        this.merSupportInitialPageSize,
        this.merSupportInitialPageSize * 2,
        this.merSupportInitialPageSize * 3,
        this.merSupportInitialPageSize * 5
      ]
    },
    merStaffPageSizes() {
      return [
        this.merStaffInitialPageSize,
        this.merStaffInitialPageSize * 2,
        this.merStaffInitialPageSize * 3,
        this.merStaffInitialPageSize * 5
      ]
    }
  },
  methods: {
    // 提取对象属性 返回新对象
    pick(obj, propArr) {
      const newObj = {}
      propArr.forEach((item, index) => {
        newObj[item] = obj[item]
      })
      return newObj
    },

    /**
     * 客服列表相关
     */

    // 重置客服列表数据
    resetData() {
      this.merSupportTableData.list = []
      this.merSupportQuery.currentPage = 1
      this.merSupportQuery.pageSize = 10
    },

    // 进入页面获取客服列表
    querySupportStaffList(createdSign) {
      if (createdSign) {
        console.log('第一次进入页面，融云连接成功，开始客服列表请求')
        this.isFirstQueryFinished = true
      }
      CustomerService.queryMerSupportStaffList(this.merSupportQuery).then(res => {
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
          item.index = formatIndex(index + (this.merSupportQuery.currentPage - 1) * this.merSupportQuery.pageSize + 1)
        })
        this.merSupportTableData = {
          ...this.merSupportTableData,
          total: result.totalCount,
          list: result.data
        }
        this.loadingMask && this.loadingMask.close && this.loadingMask.close()
        console.log('merSupportTableData', this.merSupportTableData)
      })
    },

    // 客服启用停用状态切换
    toggleSupportStaffStatus(row) {
      // 这里请求启用停用接口
      CustomerService.updateSupportStaff({
        avatarPath: 'https://xxx.dfs.com/img.png', // 头像地址
        empName: row.name, // 客服名称
        id: row.id, // 客服id
        merCode: this.merCode, // 商户编码
        status: row.status === 1 ? 0 : 1 // 客服状态，0-未启用，1-已启用
      }).then(res => {
        this.querySupportStaffList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },

    // 客服删除按钮点击
    handleDelBtnClick(row) {
      this.curDelRow = row
      this.delDialogVisible = true
      console.log('删除按钮的当前行', row)
    },

    // 客服删除
    delSupportItem() {
      if (!this.curDelRow) {
        return
      }
      CustomerService.delSupportStaff({
        id: this.curDelRow.id
      }).then(res => {
        this.delDialogVisible = false
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.resetData()
        this.querySupportStaffList()
      })
    },

    // 客服状态下拉框切换
    handleStatusToggle(command) {
      // 更新筛选条件
      const selectedFilter = this.statusMap.find(
        item => item.symbol === command
      )
      console.log('fiter', selectedFilter)
      this.merSupportTableData.selectedFilterText = selectedFilter.text
      this.merSupportQuery.onlineStatus = selectedFilter.onlineStatus
      // 重置客服列表数据并重新发起请求
      this.resetData()
      this.querySupportStaffList()
    },

    // 添加客服按钮点击
    handleAddSupportStaff() {
      this.resetMerStaffData()
      // 获取成功数据后展示弹窗
      this.queryMerStaffList().then(() => {
        this.addDialogVisible = true
      })
    },

    // 客服列表pageSize切换
    handleSizeChange(val) {
      this.merSupportQuery.pageSize = val
      this.querySupportStaffList()
    },

    // 客服列表页码切换
    handleCurrentChange(val) {
      this.merSupportQuery.currentPage = val
      this.querySupportStaffList()
    },

    // 查看消息记录
    viewHistoryMsg(row) {
      this.$router.push({
        path: '/customerService/historyMsg',
        query: {
          id: row.id
        }
      })
    },

    /**
     * 员工查询相关
     */
    // 查询商家所有员工
    queryMerStaffList() {
      // 这里用接口请求替代
      return new Promise((resolve, reject) => {
        const { selectedList } = this.merStaffTableData
        CustomerService.queryMerStaffList({
          ...this.merStaffQuery,
          subOrgName: this.merStaffQuery.subOrgName.replace(/\s*/g, ''),
          empName: this.merStaffQuery.empName.replace(/\s*/g, '')
        }).then(res => {
          const result = res.data
          result.data.forEach(ele => {
            let hasFlag = false
            if (selectedList.findIndex(selEle => selEle.id === ele.id) > -1) {
              hasFlag = true
            }
            ele.checked = hasFlag
          })
          this.merStaffTableData = {
            ...this.merStaffTableData,
            list: result.data,
            total: result.totalCount
          }
          console.error('merStaffTableData', this.merStaffTableData)
          resolve()
        })
      })
    },

    // 员工姓名输入
    handleStaffNameInput(value) {
      this.merStaffQuery.empName = value
    },

    // 员工所属机构输入
    handleStaffDepInput(value) {
      this.merStaffQuery.subOrgName = value
    },

    // 重置商家员工数据
    resetMerStaffData() {
      this.merStaffQuery.currentPage = 1
      this.merStaffQuery.empName = ''
      this.merStaffQuery.pageSize = 10
      this.merStaffQuery.subOrgName = ''
      this.merStaffTableData.list = []
      this.merStaffTableData.total = 0
      this.merStaffTableData.selectedList = []
    },

    // 查询商家员工按钮点击
    handleSearchSubmit() {
      this.merStaffQuery.currentPage = 1
      this.merStaffQuery.pageSize = 10
      this.merStaffTableData.list = []
      this.merStaffTableData.total = 0
      // this.merStaffTableData.selectedList = []
      this.queryMerStaffList()
    },

    // 员工选择复选框是否可选中
    selectable(row, index) {
      return !row.staff
    },

    // 复选框选中
    handleStaffSelect(row) {
      console.log('row', row)
      const { selectedList, list } = this.merStaffTableData
      const existedIndex = selectedList.findIndex(element => {
        return element.id === row.id
      })
      const tempList = [...list]
      tempList.forEach((ele) => {
        if (ele.id === row.id) {
          ele.checked = !ele.checked
        }
      })
      this.merStaffTableData.list = tempList
      if (existedIndex > -1) {
        selectedList.splice(existedIndex, 1)
      } else {
        this.merStaffTableData.selectedList.push({
          avatarPath: 'https://xxx.dfs.com/img.png',
          empName: row.empName,
          empCode: row.empCode,
          id: row.id,
          merCode: this.merCode,
          status: 1
        })
      }
    },

    // 员工列表页码切换
    handleStaffPageChange(val) {
      this.merStaffQuery.currentPage = val
      this.queryMerStaffList()
    },

    // 员工列表pageSize切换
    handleStaffSizeChange(val) {
      this.merStaffQuery.pageSize = val
      this.queryMerStaffList()
    },

    // 员工弹窗确认按钮点击
    staffDialogConfirmBtnClick() {
      const { selectedList } = this.merStaffTableData
      if (selectedList.length <= 0) {
        this.$message({
          type: 'warning',
          message: '请先选择员工！',
          duration: 2000
        })
        return
      }
      const addStaffQuery = []
      // 这里用一个新数组接收 方便后续扩展
      selectedList.forEach((item, index) => {
        addStaffQuery.push(item)
      })
      CustomerService.addSupportStaff(addStaffQuery).then(res => {
        // 这里请求添加客服接口
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.addDialogVisible = false
        this.querySupportStaffList()
      })
    },

    // 关闭员工列表弹窗
    handleAddDialogClose() {
      this.addDialogVisible = false
    }
  },
  created() {
  },
  watch: {
    webSocketConnected(value) {
      console.warn('watch: webSocketConnected change', value)
      this.loadingMask = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        if (value && !this.isFirstQueryFinished) {
          this.querySupportStaffList('first')
        }
      }, 300)
    }
  },
  updated() {
    console.log('udpated: this.ryConnected', this.ryConnected, this.isFirstQueryFinished, this.webSocketConnected)
    if (this.webSocketConnected && !this.isFirstQueryFinished) {
      this.loadingMask = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        this.querySupportStaffList('first')
      }, 300)
    }
  }
}
