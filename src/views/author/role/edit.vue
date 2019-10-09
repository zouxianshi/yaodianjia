<template>
  <div class="app-container">
    <div class="role-create-model">
      <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item
          label="角色名"
          prop="roleName"
        >
          <el-input v-model.trim="formData.roleName" maxlength="30" />
        </el-form-item>
        <el-form-item
          label="角色描述"
          prop="roleRemark"
        >
          <el-input
            v-model.trim="formData.roleRemark"
            style="width:250px"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="角色设置">
          <div class="remodule">
            <template v-if="treeList[0]">
              <div
                v-for="(moduleItem,$index_mod) in treeList[0].modules"
                :key="$index_mod"
                class="role-box"
              >
                <div
                  class="lint-remodule-text"
                  :style="{borderBottom:moduleItem.toggle ? '' : 'none'}"
                  @click.self="onToggle(moduleItem)"
                >
                  <span class="check-all">
                    <el-checkbox
                      v-model="moduleItem.selected"
                      @change="onSelectAll($event,0,$index_mod)"
                    >{{ moduleItem.reModule }} ({{ moduleItem.num }})</el-checkbox>
                  </span>
                  <span class="icon-tar" @click.stop="onToggle(moduleItem)">
                    <i class="el-icon-arrow-down" />
                  </span>
                </div>
                <div
                  v-if="moduleItem.toggle"
                  class="item-remenu"
                >
                  <div
                    v-for="(menusItem,$index_menus) in moduleItem.menus"
                    :key="$index_menus"
                    class="item-list"
                  >
                    <div class="line-list-text">
                      {{ menusItem.reMenu }}
                      <el-checkbox
                        v-model="menusItem.disabled"
                        @change="onSelectDisabled($event,menusItem,0,$index_mod,moduleItem)"
                      />
                      <i class="icon el-icon-caret-right" />
                    </div>
                    <div class="list">
                      <el-checkbox
                        v-for="(el,i) in menusItem.resList"
                        :key="i"
                        v-model="el.selected"
                        :label="el.reButton"
                        :disabled="el.disabled"
                        @change="onSelectEl($event,moduleItem)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>

          </div>

        </el-form-item>
        <el-form-item style="padding-bottom: 100px;">
          <el-button
            type="primary"
            :loading="subLoading"
            @click="handleSubmit('formData')"
          >保存</el-button>
          <el-button @click="handleCanle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { addRole, getRoleInfo, getResource, updateRole } from '@/api/role'
import _ from 'lodash'
export default {
  data() {
    return {
      checkList: [],
      formData: {
        roleName: '',
        roleRemark: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trgger: 'blur' }
        ],
        roleRemark: [
          { required: true, message: '请输入角色描述', trgger: 'blur' }
        ]
      },
      treeList: [],
      checkAll: false,
      isIndeterminate: true,
      subLoading: false
    }
  },
  created() {
    if (this.$route.query.id) {
      this._loadInfo()
      this.formData.id = this.$route.query.id
    } else {
      this._loadResource()
    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    if (from.meta.isEdit) {
      this.$store
        .dispatch('tagsView/delView', from)
    }
    next()
  },
  methods: {
    handleSubmit(formName) { // 保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.subLoading = true
          this.formData.resIds = this.getTreeIds()
          if (this.$route.query.id) {
            updateRole(this.formData).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              setTimeout(() => {
                this.handleCanle()
              }, 1000)
            }).catch(err => {
              console.log(err)
              this.subLoading = false
            })
          } else {
            addRole(this.formData).then(res => {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              setTimeout(() => {
                this.handleCanle()
              }, 1000)
              this.subLoading = false
            }).catch(err => {
              console.log(err)
              this.subLoading = false
            })
          }
        } else {
          console.log('error submit')
        }
      })
    },
    _loadInfo() { // 获取角色信息
      this._loadResource().then(data => {
        getRoleInfo({ id: this.$route.query.id }).then(res => {
          this.formData = res.data
          // 解析resIds数据结构
          this.handlerBackfillTreeList()
        })
      }).catch(err => {
        console.log(err)
      })
    },
    _loadResource() { // 获取资源及数据处理
      return new Promise((resolve, reject) => {
        getResource().then(res => {
          const { data } = res.data[0]
          // 资源列表
          this.treeList = _.forEach(res.data, v => {
            this.handlerList(v)
          })
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
       * 处理格式初始化
       */
    handlerList(v) {
      return new Promise((resolve) => {
        v.show = false
        _.map(v.modules, (v1, i) => {
          v1.num = 0
          v1.toggle = i <= 0
          v1.selected = false
          _.map(v1.menus, v2 => {
            v2.disabled = false
            _.map(v2.resList, v3 => {
              v3.selected = false
              v3.disabled = true
            })
            const leg = v2.resList || []
            v1.num = parseInt(v1.num + leg.length)
          })
        })
        resolve(v)
      })
    },
    /**
       * selected all list
       */
    onSelectAll(event, sysIndex, modIndex) {
      const modules = this.treeList[sysIndex]['modules'][modIndex]
      modules['toggle'] = true
      _.map(modules['menus'], v => {
        v.disabled = event
        _.map(v.resList, v1 => {
          v1.selected = event
          v1.disabled = !event
        })
      })
    },
    /**
       * selected item list
       */
    onSelectEl(e, el) {
      let num = 0
      _.map(el.menus, v1 => {
        _.map(v1.resList, v2 => {
          if (v2.selected) {
            num = num + 1
          }
        })
      })
      el.selected = num === el.num
    },
    /**
       * getIds
       */
    getTreeIds() {
      const arr = []
      _.map(this.treeList, v => {
        _.map(v.modules, v1 => {
          _.map(v1.menus, v2 => {
            if (v2.disabled) {
              arr.push(v2.id)
              _.map(v2.resList, v3 => {
                if (v3.selected) {
                  arr.push(v3.id)
                }
              })
            }
          })
        })
      })
      return arr
    },
    onSelectDisabled(e, menusItem, sysIndex, modIndex, moduleItem) {
      let is = false
      _.map(moduleItem.menus, v => { is = v.resList })
      _.map(menusItem.resList, v1 => { v1.disabled = !e })
      if (!is) {
        this.treeList[sysIndex]['modules'][modIndex].selected = true
      }
      if (!e) {
        this.treeList[sysIndex]['modules'][modIndex].selected = e
      }
      if (!menusItem.disabled) {
        _.map(menusItem.resList, v => { v.selected = false })
      }
    },
    /**
       * toggle hide show
       */
    onToggle(moduleItem) {
      moduleItem.toggle = !moduleItem.toggle
    },
    /**
       * 解析resIds数据格式
       */
    handlerBackfillTreeList() {
      const { resIds } = this.formData
      const treeList = _.cloneDeep(this.treeList)
      _.map(treeList, v => {
        let isVselect = false
        _.map(v.modules, v1 => {
          let num = 0
          let v1Select = false
          _.map(v1.menus, v2 => {
            const resList = v2.resList || []
            const v2Select = resIds.includes(v2.id)
            if (v2Select) {
              v2.disabled = true
              isVselect = true
            }
            if (!resList.length && v2Select) {
              v1Select = true
            }
            if (resList.length > 0) {
              _.map(resList, v3 => {
                if (resIds.includes(v3.id)) {
                  v3.selected = true
                  v3.disabled = false
                  isVselect = true
                  num = num + 1
                }
                if (v2Select) {
                  v3.disabled = false
                }
              })
            }
          })
          if (v1.num && v1.num === num) {
            v1.selected = true
          }
          if (v1Select) {
            v1.selected = true
          }
        })
        if (isVselect) {
          v.show = true
        }
      })
      setTimeout(() => {
        this.treeList = treeList
      })
    },

    handleCanle() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.role-create-model {
  .el-input {
    width: 250px;
  }
  .remodule {
    width: 850px;
    border: 1px solid #dcdfe6;
    padding: 12px;
    .role-box {
      border: 1px solid #dcdfe6;
      border-radius: 4px 4px 0 0;
      margin-bottom: 16px;
      .lint-remodule-text {
        line-height: 32px;
        border-bottom: 1px solid #dcdfe6;
        position: relative;
        cursor: pointer;
        transition: all 0.2s;
        .check-all {
          padding-left: 12px;
        }
        .icon-tar {
          position: absolute;
          right: 12px;
          top: 0;
          color: #666;
          font-size: 14px;
        }
      }
      .item-remenu {
        margin: 16px;
        .item-list {
          position: relative;
          margin-bottom: 6px;
          overflow: hidden;
          .line-list-text {
            width: 100px;
            text-align: right;
            float: left;
            margin-right: 10px;
            .icon {
              color: #999;
            }
          }
          .list {
            width: calc(100% - 200px);
            float: left;
          }
        }
      }
    }
  }
}
</style>

