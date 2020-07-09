<template>
  <div class="select-goods">
    <el-form ref="tableForm" :model="tableForm" size="small">
      <el-table
        :data="tableForm.tableData.slice((pager.current - 1) * pager.size, pager.size * pager.current)"
        size="small"
        style="width: 100%"
        max-height="500"
      >
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
                v-if="scope.row.mainPic && scope.row.mainPic!==''"
                style="width: 60px; height: 60px"
              >
                <div class="x-image__preview">
                  <el-image
                    style="width: 60px; height: 60px"
                    fit="contain"
                    :src="showImg(scope.row.mainPic)"
                    :preview-src-list="[showImg(scope.row.mainPic)]"
                  />
                </div>
              </div>
              <div v-else style="line-height: 32px">暂无上传</div>
            </template>
          </el-table-column>
        </template>
        <!-- <slot :pager="pager" /> -->
        <el-table-column>
          <template slot="header">
            <span>数量</span>
          </template>
          <template slot-scope="scope">
            <t-colument-form title="数量" :item="scope.row" item-key="number" :index="scope.$index" :is-disabled="disabled" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <span>组合单价</span>
          </template>
          <template slot-scope="scope">
            <t-colument-form title="组合单价" :item="scope.row" item-key="price" :index="scope.$index" :is-disabled="disabled" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="disabled"
              @click.stop="handleDel(scope.row, (pager.size * (pager.current-1))+scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <section class="c-footer">
      <el-pagination
        background
        :current-page="pager.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pager.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>
<script>
// import noData from '@/components/NoData'
import { checkNumberdouble } from '@/utils/validate'
import tColumentForm from './columenFrom'
export default {
  components: { tColumentForm },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    'tableForm.tableData': {
      handler(newVal) {
        console.log('watch---tableForm.tableData', newVal)
        this.handleComputer(newVal)
      },
      deep: true
    }
  },
  data() {
    const _check_price = (rule, value, callback) => {
      console.log('111check_price0------', rule, value, callback)
      console.log(
        '111check_price0------storeSelectGoods',
        this.storeSelectGoods
      )
      if (rule.required && value <= 0) {
        callback(new Error('请输入最多2位小数的正数'))
      }
      if (value !== '') {
        if (!checkNumberdouble(value)) {
          callback(new Error('请输入最多2位小数的正数'))
        }
      }
      if (value < 0) {
        callback(new Error('最小值必须大于等于0'))
      }
      if (value > 99999) {
        callback(new Error('最大值不能超过99999'))
      }
      callback()
    }
    const _check_num = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if ((value !== '' && reg.test(value)) || value === '0') {
        callback(new Error('请输入正整数'))
      }
      if (value > 99) {
        callback(new Error('最大值不能超过99'))
      }
      callback()
    }
    return {
      check_price: _check_price,
      check_num: _check_num,
      tableForm: {
        tableData: [], // 数据源table
        cutData: []
      },
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
          prop: 'commodityName',
          label: '商品名称'
        },

        {
          prop: 'mprice',
          label: '参考价(元)'
        },
        {
          prop: 'standard',
          label: '商品规格'
        }
      ],
      pager: {
        current: 1,
        size: 10,
        total: 0
      },
      show: false
    }
  },
  methods: {
    dataFrom(data) {
      console.log('111111111111111111111', data)
      const dataFromSource = []
      if (Array.isArray(data) && data.length) {
        data.forEach(good => {
          const inIndex = this.tableForm.tableData.findIndex(item => {
            return good.specId === item.specId
          })
          if (inIndex === -1) {
            const item = {
              ...good,
              standard: good.standard || good.specStr,
              commodityId: good.commodityId || good.id,
              commodityName: good.commodityName || good.name,
              number: good.number || 1,
              price: good.price || good.mprice
            }
            dataFromSource.push(item)
          } else {
            dataFromSource.push({
              ...good,
              ...this.tableForm.tableData[inIndex]
            })
          }
        })
      }
      this.tableForm.tableData = dataFromSource
      this.pager = {
        ...this.pager,
        total: this.tableForm.tableData.length
      }
    },
    // 格式化规格信息
    formatSkuInfo(skuList) {
      let skuStr = ''
      if (skuList && skuList.length > 0) {
        skuList.forEach(v => {
          skuStr += `${v.skuKeyName}:${v.skuValue}，`
        })
        skuStr = skuStr.substr(0, skuStr.length - 1)
      }
      return skuStr
    },
    // 计算组合计算值
    handleComputer(newVal) {
      let mprice = 0
      let soulePrice = 0
      let weight = 0
      newVal.forEach(item => {
        mprice += item.mprice * (item.number * 1 || 0) // 参考价
        soulePrice += item.price * (item.number * 1 || 0) // 组合单价
        weight += (item.weight || 0) * (item.number * 1 || 0)
      })
      this.$store.commit('activity/SET_TABLE_FORM_VALUE', {
        mprice,
        soulePrice,
        weight
      })
    },
    handleDel(item, index) {
      this.$emit('del-item', item, index)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager = {
        ...this.pager,
        size: val,
        current: 1
      }
      // this.handleCutData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager = {
        ...this.pager,
        current: val
      }
      // 清除页面的校验结果重新校验
      this.$refs.tableForm.clearValidate()
      this.$nextTick(function() {
        this.$refs.tableForm.validate().then(res => {
          console.log('22222222222', res)
        })
      })
    },
    // 父容器调用此方法校验此表格的表单
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
                message: '请选择相关商品',
                type: 'warning'
              })
              reject()
            }
          } else {
            console.log('error tableForm submit!!', valid, object)
            for (const i in object) {
              console.log(
                'error tableForm submit!!----this.$refs',
                this,
                this.$refs,
                i
              )
              let dom = this.$refs[i]
              console.log('error tableForm submit!!----dom', dom)
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
.select-goods {
  .c-footer {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
