<template>
  <div class="group-content">
    <el-dialog
      :title="titles"
      :visible.sync="isShow"
      append-to-body
      :close-on-press-escape="false"
      :show-close="false"
      width="700px"
      custom-class="custom-body"
      :close-on-click-modal="false"
    >
      <div class="modal-body-group">
        <div class="header">
          <el-select v-model="group_id" placeholder="选择商品分类" @change="handleChooseGroup">
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
            <template v-if="groups1&&groups1.length!==0">
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
            <template v-if="groups1&&groups1.length!==0&&groups2&&groups2.length>0">
              <div v-for="(item,index) in groups2" :key="index" class="list">
                <p v-if="item.children&&item.children.length>0" class="titles" v-text="item.name" />
                <el-checkbox-group
                  v-model="modelList"
                  :style="!item.children||item.children.length===0?'':'padding-left:20px'"
                >
                  <el-checkbox
                    v-if="!item.children||item.children.length===0"
                    :key="index"
                    :label="item.id"
                    @change="handleCheckClk(item)"
                  >{{ item.name }}</el-checkbox>
                  <el-checkbox
                    v-for="(items,index1) in rtSort(item.children)"
                    v-else
                    :key="index1"
                    :label="items.id"
                    @change="handleCheckClk(items)"
                  >{{ items.name }}</el-checkbox>
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
              <el-tag type closable @close="handleRemove(index)">
                <span>
                  {{ item[0].name }}&nbsp;>&nbsp;{{ item[1].name }}
                  <span
                    v-if="item[2]&&item[2].name"
                  >&nbsp;>&nbsp;{{ item[2].name }}</span>
                </span>
              </el-tag>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCanle">取 消</el-button>
        <el-button type="primary" size="small" :loading="subLoading" @click="handleSubmit">确 定</el-button>
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
    },
    chooseData: {
      type: Array,
      default: () => {
        return []
      }
    },
    type: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      chooseGroup: [],
      modelList: [],
      group_id: '',
      groups1: [],
      groups2: [],
      active_row: '',
      subLoading: false
    }
  },
  computed: {
    ...mapGetters(['name']),
    titles(val) {
      if (this.type === '0') {
        return `修改分组(已选${this.goodsData.length}个商品)`
      } else {
        return `修改分组`
      }
    }
  },
  watch: {
    isShow(val) {
      if (this.groupData.length > 0) {
        this.group_id = this.groupData[0].id
        this.handleChooseGroup(this.group_id)
        if (this.chooseData.length > 0) {
          this.chooseGroup = [...this.chooseData]
          this.modelList = []
          this.chooseGroup.map(cg => {
            this.modelList.push(cg[cg.length - 1].id)
          })
        } else {
          this.modelList = []
          this.chooseGroup = []
        }
      }
    }
  },
  methods: {
    rtSort(arr) {
      return _.sortBy(arr, ['name'])
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    handleCanle() {
      this.$emit('close')
    },
    handleChooseGroup(val) {
      console.log('---groupData---', this.groupData)
      // 第一阶分组
      this.groupData.map(res => {
        if (res.id === val) {
          this.groups1 = res.children.sort(this.compare('sort'))
          // this.groups1 = _.sortBy(res.children, v => v.name)
          if (res.children && res.children.length > 0) {
            this.active_row = res.children[0]
            this.groups2 = res.children[0].children.sort(this.compare('sort'))
            // this.groups2 = _.sortBy(res.children[0].children, v => v.name)
            this.groups2.map(item => {
              item.children = item.children
                ? item.children.sort(this.compare('sort'))
                // ? _.sortBy(item.children, v => v.name)
                : null

              console.log(item.children)
            })
          }
        }
      })

      console.log(this.groupData)
      console.log('-----this.groupData')
    },
    handleLeftGroup(row) {
      // 左侧分组点击事件
      this.active_row = row
      this.groups2 = row.children
    },
    handleCheckClk(row) {
      // 单个checkbox选择触发
      if (this.modelList.includes(row.id)) {
        this.active_row.children.map(res => {
          if (res.children && res.children.length > 0) {
            if (row.parentId === res.id) {
              this.chooseGroup.push([this.active_row, res, row, row.id])
            }
          } else {
            if (row.id === res.id) {
              this.chooseGroup.push([this.active_row, res, '', row.id])
            }
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
    handleRemove(index) {
      // 移出选择的数据
      let id = this.chooseGroup[index][3]
      if (!id) {
        id = this.chooseGroup[index][1].id
      }
      if (this.modelList.includes(id)) {
        const index = this.modelList.indexOf(id)
        this.modelList.splice(index, 1)
      }
      this.chooseGroup.splice(index, 1)
    },
    handleSubmit() {
      if (this.type === '0') {
        // 商品库批量修改商品
        const params = {
          userName: this.name,
          typeIds: this.modelList,
          ids: this.goodsData
        }
        this.subLoading = true
        setBatchGroup(params)
          .then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.subLoading = false
            this.$emit('complete')
          })
          .catch(() => {
            this.subLoading = false
          })
      } else {
        // 修改分组
        const data = []
        if (this.chooseGroup.length === 0) {
          this.$message({
            message: '请选择至少一个分组',
            type: 'error'
          })
          return
        }
        console.log('chooseGroup===========', this.chooseGroup)
        this.chooseGroup.map(v => {
          if (v[2] && v[2].id) {
            data.push([v[0].id, v[1].id, v[2].id])
          } else {
            data.push([v[0].id, v[1].id])
          }
        })
        console.log('chooseGroup===========data', data)
        this.$emit('back', data)
      }
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
@import './group.scss';
</style>
