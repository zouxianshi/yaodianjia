<template>
  <div>
    <el-form ref="tableForm" class="table-form" :model="tableForm" size="small">
      <el-table
        ref="activityTable"
        :data="tableForm.tableData"
        size="small"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <template v-for="col in cols">
          <el-table-column
            v-if="!col.render"
            :key="col.prop"
            :label="col.label"
            :show-overflow-tooltip="true"
            :prop="col.prop"
            :min-width="col.width"
          />
          <el-table-column
            v-else-if="col.type==='img'"
            :key="col.prop"
            :label="col.label"
            :prop="col.prop"
          >
            <template slot-scope="scope">
              <div
                v-if="scope.row.picUrl && scope.row.picUrl!==''"
                style="width: 60px; height: 60px"
              >
                <div class="x-image__preview">
                  <el-image
                    style="width: 60px; height: 60px"
                    fit="contain"
                    :src="showImg(scope.row.picUrl)"
                    :preview-src-list="[showImg(scope.row.picUrl)]"
                  />
                </div>
              </div>
              <div v-else style="line-height: 32px">暂无上传</div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="换购价" min-width="120px">
          <template slot-scope="scope">
            <el-form-item
              :ref="'tableData.' + scope.$index + '.addPrice'"
              :prop="'tableData.' + scope.$index + '.addPrice'"
              :rules="[{ required: true, validator: check_limit, trigger: 'blur' }]"
            >
              <el-input
                v-model="scope.row.addPrice"
                style="width:92px;text-align:center"
                :disabled="disabled"
                maxlength="8"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="disabled"
              @click.stop="handleDel(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button
          :disabled="!(tableForm && Array.isArray(tableForm.tableData) && tableForm.tableData.length) || disabled"
          @click="selectAllSelection"
        >全选商品</el-button>
        <el-button
          :disabled="!(Array.isArray(multipleSelection) && multipleSelection.length) || disabled"
          @click="handleSetPrice"
        >批量设置换购价</el-button>
      </div>
    </el-form>
    <dialog-set ref="diaglogPriceSet" @on-change="onSetChange" />
  </div>
</template>
<script>
import dialogSet from './dialog-set'
export default {
  components: { dialogSet },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const check_limit = (rule, value, callback) => {
      console.log('rule', rule, value)
      const reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
      if (rule.required && (!value || value === '0')) {
        callback(new Error('请输入数值'))
      }
      if (!reg.test(value)) {
        callback(new Error('必须为大于0.01的正数'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    return {
      tableForm: {
        tableData: []
      },
      multipleSelection: [], // 勾选的列表项
      cols: [
        {
          prop: 'mainPic',
          label: '商品图片',
          type: 'img',
          render: true // 交给后续逻辑渲染
        },
        {
          prop: 'erpCode',
          label: '商品编码'
        },
        {
          prop: 'name',
          label: '商品名称'
        },
        {
          prop: 'mprice',
          label: '参考价(元)'
        },
        {
          prop: 'productName',
          label: '商品规格'
        }
      ],
      check_limit: check_limit
    }
  },
  methods: {
    dataFrom(data) {
      console.log('select-activity-goods-------', data)
      const dataFromSource = []
      if (Array.isArray(data) && data.length) {
        data.forEach(good => {
          const inIndex = this.tableForm.tableData.findIndex(item => {
            return good.specId === item.specId
          })
          if (inIndex === -1) {
            const item = {
              ...good,
              productName: this.formatSkuInfo(good.specSkus || '')
            }
            dataFromSource.push(item)
          } else {
            dataFromSource.push({
              ...good,
              addPrice: this.tableForm.tableData[inIndex].addPrice,
              productName: this.formatSkuInfo(good.specSkus || '')
            })
          }
        })
      }
      this.tableForm.tableData = dataFromSource
      this.multipleSelection = dataFromSource
      this.$refs.activityTable.toggleAllSelection()
    },
    handleSelectionChange(val) {
      console.log('handleSelectionChange----------', val)
      this.multipleSelection = val
    },
    handleSetPrice() {
      this.$refs.diaglogPriceSet.open()
    },
    onSetChange(value) {
      const dataMap = this.tableForm.tableData.map(good => {
        this.multipleSelection.map(item => {
          if (good.id === item.id) {
            good.addPrice = value.value
          }
        })
        return {
          ...good
        }
      })
      this.tableForm.tableData = dataMap
      this.$refs.diaglogPriceSet.close()
    },
    selectAllSelection() {
      console.log('selectAllSelection----------', this.multipleSelection)
      // this.multipleSelection = []
      this.$refs.activityTable.toggleAllSelection()
    },
    handleDel(item, index) {
      // this.tableForm.tableData.splice(index, 1)
      this.$emit('del-item', item, index)
      // this.$set(this.tableForm.tableData)
    },
    formatSkuInfo(skuList) {
      let skuStr = ''
      if (skuList && skuList.length > 0) {
        skuList.forEach(v => {
          skuStr += `${v.skuKeyName}:${v.skuValue}，`
        })
        skuStr = skuStr.substr(0, skuStr.length - 1)
      }
      console.log('skuStr', skuStr)
      return skuStr
    },
    onsubmit() {
      return new Promise((resolve, reject) => {
        this.$refs.tableForm.validate((valid, object) => {
          if (valid) {
            if (
              Array.isArray(this.tableForm.tableData) &&
              this.tableForm.tableData.length
            ) {
              console.log(
                '我准备通过了tableForm----------------------',
                this.tableForm.tableData
              )
              resolve(this.tableForm.tableData)
            } else {
              this.$message({
                message: '请选择换购商品',
                type: 'warning'
              })
              reject()
            }
          } else {
            console.log('error tableForm submit!!', valid)
            for (const i in object) {
              let dom = this.$refs[i]
              if (Object.prototype.toString.call(dom) !== '[object Object]') {
                // 这里是针对遍历的情况（多个输入框），取值为数组
                dom = dom[0]
              } // 第一种方法（包含动画效果）
              dom.$el.scrollIntoView({
                // 滚动到指定节点
                block: 'center', // 值有start,center,end，nearest，当前显示在视图区域中间
                behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
              })
              break // 因为我们只需要检测一项,所以就可以跳出循环了
            }
            reject()
            return false
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.table-form {
  .el-form-item--small.el-form-item {
    margin: 16px 0;
  }
}
</style>
