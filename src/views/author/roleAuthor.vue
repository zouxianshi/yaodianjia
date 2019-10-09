<template>
  <div class="app-container">
    <div class="role-author">
      <div class="set-meal-model">
        <div class="item-list">
          <div class="title">
            <span>角色配置</span>
          </div>
          <div class="content">
            <div style="margin: 15px 0;" />
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.id">{{ item.roleName }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button v-if="$route.query.accId" type="primary" :loading="subLoading" size="small" @click="handleSubmit">保存</el-button>
      <el-button type size="small" @click="handleCanle">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getRoles, roleAuthor, getUserRoles } from '@/api/role'
export default {
  data() {
    return {
      roleList: [],
      checkList: [],
      subLoading: false
    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    this.$store
      .dispatch('tagsView/delView', from)
    next()
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getRoles({ currentPage: 1,
        pageSize: 1000 }).then(res => {
        this.roleList = res.data.data
        if (this.$route.query.accId) {
          this._loadUserRole()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _loadUserRole() { // 获取用户的角色
      getUserRoles(this.$route.query.accId).then(res => {
        const { data } = res
        data.forEach((value, index, ary) => {
          this.checkList.push(value.id)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit() {
      if (this.checkList.length === 0) {
        this.$message({
          message: '请选择角色',
          type: 'error'
        })
        return
      }
      roleAuthor({
        accId: this.$route.query.accId,
        roleIds: this.checkList
      }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        setTimeout(() => {
          this.handleCanle()
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    },
    handleCanle() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.titles {
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 15px;
}
.role-author {
  margin-left: 30px;
  margin-top: 20px;
  .role-type {
    font-size: 15px;
  }
  .role-check-list {
    margin: 12px 20px;
  }
}
.footer {
  margin-left: 30px;
  margin-top: 30px;
}
.set-meal-model {
    .item-list {
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      margin-bottom: 16px;
      .title {
        height: 32px;
        line-height: 32px;
        border-radius: 4px 4px 0 0;
        border-bottom: 1px solid #dcdfe6;
        background: #edf2fc;
        span {
          padding-left: 12px;
          font-size: 14px;
          color: #333;
        }
      }
      .content {
        padding: 10px;
        .el-form-item__content {
          .el-form-item--mini {
            margin-bottom: 6px;
          }
        }
      }
    }
  }
</style>

