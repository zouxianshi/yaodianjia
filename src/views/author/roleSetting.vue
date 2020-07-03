<template>
  <div class="app-container">
    <div class="institution-wrappe clearfix">
      <section class="institution-list">
        <el-card class="tree-card">
          <div class="tree-box">
            <p class="role-h">
              <span class>全部角色</span>
              <el-divider />
            </p>
          </div>
        </el-card>
      </section>
      <section class="role-setting">
        <el-card>
          <div class="role-setting_header">
            <p class="role-name">某某管理员</p>
            <span>海典健康微商城管理员预设所有菜单的查看和修改权限</span>
          </div>
          <p class="lin-title">菜单权限</p>
          <div class="role-setting_content">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
            <div style="margin: 15px 0;" />
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </section>
    </div>
  </div>
</template>
<script>
import {
  getTreeList,
  setCreateOrg,
  setDeleteOrg,
  setEditOrg,
  setCheckStatus
} from '@/api/institution'
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data() {
    return {
      keyword: '',
      searchTxt: '',
      treeData: [],
      props: {
        label: 'orName',
        children: 'children',
        isLeaf: 'leaf'
      },
      loading: false,
      tableData: [],
      dialogVisible: false,
      chooseRow: {},
      chooseNode: null,
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      rootId: '',
      treeRootId: ''
    }
  },
  created() {},
  methods: {
    _loadTreeList() {
      // 加载树结构
      return new Promise((resolve, reject) => {
        const query = {
          orType: '',
          orgName: this.keyword,
          rootId: this.rootId
        }
        getTreeList(query)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            this.$message({
              message: err.msg,
              type: 'error'
            })
            reject(err)
          })
      })
    },
    _loadOrgList() {
      // 组织机构
      this.loading = true
      const query = {
        orType: '',
        orgName: this.keyword,
        rootId: this.treeRootId
      }
      getTreeList(query)
        .then(res => {
          this.tableData = res.data
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    handleCommand({ type, data }) {
      // 表格下拉菜单按钮点击事件
      if (type === 0) {
        this.handleRemove(data)
      } else {
        const status = data.status === 1 ? 0 : 1
        setCheckStatus({ id: data.id, status: status })
          .then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this._loadOrgList()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    loadNode(node, resolve) {
      // 树机构懒加载
      if (node.level === 0) {
        const query = {
          orType: '',
          orgName: this.keyword,
          rootId: 'first'
        }
        getTreeList(query)
          .then(res => {
            const data = res.data
            if (data) {
              this.treeData = data
              this.rootId = res.data[0].id
              this.treeRootId = res.data[0].id
              this._loadOrgList()
              resolve(data)
            } else {
              resolve([])
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const query = {
          orType: '',
          orgName: this.keyword,
          rootId: node.data.id
        }
        getTreeList(query)
          .then(res => {
            const data = res.data || []
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            resolve([])
          })
      }
    },
    handleTreeappend(node, row) {
      this.dialogVisible = true
      this.chooseRow = row
      this.chooseNode = node
      this.$nextTick(() => {
        this.$refs.modalForm.resetFields()
      })
      this.modalForm.orParent = row.id
    },
    handleTreeEdit(row) {
      // 树编辑
      this.chooseRow = row
      this.dialogVisible = true
      this.modalForm = row
    },
    handleTreeClick(row) {
      // 节点被点击时
      this.treeRootId = row.id
      this._loadOrgList()
    },
    handleRemove(row) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setDeleteOrg({ id: row.id })
            .then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$refs.tree.remove(row)
              this._loadOrgList()
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          console.log('错误')
        })
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    handleSub(formName) {
      // 保存操作
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.modalForm.id) {
            this.editOr()
          } else {
            this.createOr()
          }
        } else {
          console.log('error submit')
        }
      })
    },
    createOr() {
      // 新增
      setCreateOrg(this.modalForm)
        .then(res => {
          this.dialogVisible = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$refs.tree.append(this.modalForm, this.chooseNode)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editOr() {
      // 编辑
      setEditOrg(this.modalForm)
        .then(res => {
          this.dialogVisible = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  i {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>

<style lang="scss" scoped>
.institution-list {
  float: left;
  width: 300px;
  .tree-card {
    .select-organize {
      float: right;
    }
    .tree {
      margin-top: 10px;
    }
  }
  .search {
    margin: 10px 0;
  }
}

.role-setting {
  margin-left: 320px;
  margin-top: 32px;
  .table {
    margin-top: 20px;
  }
  .role-setting_header {
    .role-name {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }
  .lin-title {
    border-bottom: 1px solid #dcdfe6;
    margin-top: 30px;
    padding-bottom: 10px;
  }
  .role-setting_content{
      padding-top: 20px;
  }
}
</style>

