import { getSelfSpecsInfo, setSpecsData, getSpecsProductSKU, getSpecs } from '@/api/new-goods'
import { checkNumberdouble, checkZmSZ } from '@/utils/validate'
import { findArray } from '@/utils/index'
const mixin = {
  data() {
    return {
      editSpecsData: [], //  编辑时，用户储存规格回显的数据
      specSkuList: [],
      specsForm: { // 商家自建商品的规格表单
        specsData: [],
        specs: []
      },
      chooseTableSpec: [], // 标库选择数据事件
      standardSpecs: [], // 标库选中的历史数据
      dynamicProp: [], // 表格的动态字段
      chooseSpec: [], // 选中的规格参数
      specsList: [], // 规格
      mprice_err: false,
      erpCode_err: false,
      barCode_err: false,
      limit_err: false
    }
  },
  watch: {
    step(val) {
      if (val === 2) {
        // 获取规格
        this.specsForm.specs = []
        try {
          this._loadSpces() // 获取规格
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  methods: {
    handleEditTabSpecs(row, keys, index) { // 编辑已有的规格 编码 价格
      if (this.basicForm.origin === 1) {
        if (keys === 'erpCode') {
          const findIndex = findArray(this.editSpecsData, { erpCode: row[keys] })
          if (findIndex > -1 && this.editSpecsData[findIndex].id !== row.id) {
            this.$message({
              message: '已存在相同的商品编码,请重新编辑输入',
              type: 'error'
            })
            return
          }
        }
        this.$set(this.editSpecsData, index, row)
        const findIndex = findArray(this.chooseTableSpec, { id: row.id })
        if (findIndex) {
          this.chooseTableSpec.splice(findIndex, 1)
          if (!row.disabled) {
            this.$refs.multipleTable.toggleRowSelection(row)
          }
        }
      } else {
        const findIndex = findArray(this.editSpecsData, { erpCode: row[keys] })
        if (keys === 'erpCode') {
          if (findIndex > -1 && this.editSpecsData[findIndex].id !== row.id) {
            this.$message({
              message: '已存在相同的商品编码,请重新编辑输入',
              type: 'error'
            })
            return
          }
        // eslint-disable-next-line no-undef
        } else if (keys === 'barCode') {
          // const findIndex = findArray(this.editSpecsData, { barCode: row[keys] })
          if (findIndex > -1 && this.editSpecsData[findIndex].id !== row.id) {
            this.$message({
              message: '已存在相同的条形码,请重新编辑输入',
              type: 'error'
            })
            return
          }
        }
        this.$set(this.editSpecsData, index, row)
      }
    },
    handleSelectionChange(row) {
      this.chooseTableSpec = row
    },
    handleSubmitSpec() { // 规格保存操作
      let data = []
      if (this.basicForm.origin === 1) { // 标库商品
        //  获取一种选中的值
        this.specsForm.specs.map(v => {
          if (v.isCheck) {
            data.push(v)
          }
        })
        data = [...this.chooseTableSpec, ...data]
        if (data.length === 0) {
          this.$message({
            message: '请选择规格信息',
            type: 'error'
          })
          return
        }
        let is_err = false
        data.forEach((v, index) => {
          if (!v.erpCode && !is_err) {
            this.$message({
              message: `请完善已勾选的规格，商品编码未填写`,
              type: 'error'
            })
            is_err = true
          } else if (!v.mprice && !is_err) {
            this.$message({
              message: `请完善已勾选的规格，商品价格未填写`,
              type: 'error'
            })
            is_err = true
          } else if (!v.picUrl && !is_err) {
            this.$message({
              message: `请完善已勾选的规格，图片未上传`,
              type: 'error'
            })
            is_err = true
          } else {
            v.merCode = this.merCode
            v.valueList = v.productSpecSkuDTOs
            v.commodityId = this.$route.query.id
          }
        })
        if (is_err) {
          return
        }
        this.subSpecs(this.format())
      } else {
        this.format()
      }
    },
    format() { // 格式数据处理
      let data = []
      let checkNum = 0
      if (this.specsForm.specs.length === 0 && this.editSpecsData.length === 0) {
        if (data.length === 0) {
          this.$message({
            message: '请设置规格',
            type: 'warning'
          })
          return
        }
      }

      this.specsForm.specsData.map(v => {
        if (v.isCheck) {
          checkNum = +1
        }
      })

      if (checkNum === 0 && this.dynamicProp.length === 0) {
        this.$message({
          message: '请勾选规格参数',
          type: 'warning'
        })
        return
      }
      data = this.specsForm.specs
      let index = 0
      let flag = true
      this.specsForm.specs.map(v => {
        index++
        v.valueList = []
        v.commodityId = this.basicForm.id
        v.merCode = this.merCode
        // 限购数据处理
        if (v.limitType === 0) {
          v.limitNum = 0
        }
        if (v.limitType === 2) {
          v.limitNum = v.limit
        }
        for (const key in v) {
          if (v.hasOwnProperty(key)) {
            const val = key.split('_')
            if (val.includes('index') && this.chooseSpec.includes(val[1])) {
              if (v[key]) {
                v.valueList.push({
                  skuKeyId: val[1],
                  skuValue: v[key],
                  skuKeyName: val[2]
                })
              } else {
                if (flag) {
                  this.$message({
                    message: `请输入规格${index}中的${val[2]}`,
                    type: 'error'
                  })
                  flag = false
                }
              }
            }
          }
        }
        if (flag && !v.barCode) {
          this.$message({
            message: `请输入规格${index}中的条码`,
            type: 'error'
          })
          flag = false
        }
        if (flag && !v.erpCode) {
          this.$message({
            message: `请输入规格${index}中的商品编码`,
            type: 'error'
          })
          flag = false
        }
        if (flag && !v.mprice) {
          this.$message({
            message: `请输入规格${index}中的价格`,
            type: 'error'
          })
          flag = false
        }
        if (flag && v.limitType === 1 && !v.limitNum) {
          this.$message({
            message: '请输入限购值',
            type: 'error'
          })
          flag = false
        }
        if (flag && v.limitType === 2 && !v.limit) {
          this.$message({
            message: '请输入限购值',
            type: 'error'
          })
          flag = false
        }
      })
      if (flag) {
        // return
        if (this.basicForm.id) {
          this.editSpecsData.map(v => {
            v.valueList = []
            v.commodityId = this.basicForm.id
            v.merCode = this.merCode
            for (const key in v) {
              if (v.hasOwnProperty(key)) {
                const val = key.split('_')
                if (val.includes('index')) {
                  if (v[key]) {
                    v.valueList.push({
                      skuKeyId: val[1],
                      skuValue: v[key],
                      skuKeyName: val[2]
                    })
                  }
                }
              }
            }
          })
          data = [...data, ...this.editSpecsData]
        }
        if (this.mprice_err) {
          this.$message({
            message: '规格中存在价格输入非法值，请输入正确的值',
            type: 'error'
          })
          return
        }
        if (this.erpCode_err) {
          this.$message({
            message: '规格中存在商品编码输入非法值，请输入正确的值',
            type: 'error'
          })
          return
        }
        if (this.barCode_err) {
          this.$message({
            message: '规格中存在条码输入非法值，请输入正确的值',
            type: 'error'
          })
          return
        }
        if (this.limit_err) {
          this.$message({
            message: '规格中存在限购输入非法制，请输入正确的值',
            type: 'error'
          })
          return
        }
        if (this.basicForm.origin === 1) {
          return data
        } else {
          this.subSpecs(data)
        }
      }
    },
    subSpecs(data) {
      this.subLoading = true
      setSpecsData({ list: data }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.subLoading = false
        this.step = 3
      }).catch(_ => {
        this.subLoading = false
      })
    },
    _loadSpces() { // 根据一级分类加载规格
      getSpecs(this.chooseTypeList[0].id).then(res => {
        if (res.data) {
          res.data.map((v) => {
            v['index_' + v.id + '_' + v.attributeName] = ''
            if (this.basicForm.origin === 1) {
              v.isCheck = true
            } else {
              v.isCheck = false
            }
          })
          this.specsList = res.data
          this.specsForm.specsData = []
          console.log('--根据一级分类查找规格----')
          this.handleAddSpec()
        }
        if (this.basicForm.id) {
          this._loadSpecsInfo()
        }
      })
    },
    _loadSpecsInfo() { // 加载规格信息
      if (this.basicForm.origin === 1) { // 标库
        getSpecsProductSKU(this.basicForm.platformCode).then(res => {
          res.data.map(v => {
            v.disabled = false
            // 标库数据回显 规格处理
            if (v.productSpecSkuDTOs) {
              if (this.dynamicProp.length === 0) {
                v.productSpecSkuDTOs.map(vs => {
                  this.dynamicProp.push({
                    name: vs.skuKeyName,
                    id: vs.skuKeyId,
                    keys: `index_${vs.skuKeyId}_${vs.skuKeyName}`,
                    checked: true
                  })
                  this.chooseSpec.push(vs.skuKeyId) // 标库选中的规格存入chooseSpec  修改日期2020-03-25  标库需要添加规格使用
                })
              }
              v.productSpecSkuDTOs.map(vs => {
                v[`index_${vs.skuKeyId}_${vs.skuKeyName}`] = vs.skuValue
              })
            }
          })
          this.editSpecsData = res.data
          if (this.$route.query.type === 'query') {
            $('.el-table__header').find('thead tr').eq(0).find('th').eq(0).find('.el-checkbox__input').addClass('is-disabled') // 设置全选disabeld
            res.data.forEach((value, index) => {
              $('.el-table__body').find('tbody tr').eq(index).find('td').eq(0).find('.el-checkbox__input').addClass('is-disabled') // 设置该条数据不可选择
            })
          }

          this._loadSpecs()
        })
      } else {
        this._loadSpecs()
      }
    },
    _loadSpecs() { // 请求回显数据
      getSelfSpecsInfo(this.basicForm.id).then(res => {
        if (res.data) {
          const { specList } = res.data
          /**
           * 自建商品
           */
          if (this.basicForm.origin === 2) {
            if (res.data && specList.length > 0) {
              if (specList) {
                this.specsForm.specs = []
              }
              // 取出 sku的规格动态数据
              for (let index = 0; index < specList.length; index++) {
                const element = specList[index]
                if (element.specSkuList) {
                  if (this.dynamicProp.length === 0) {
                    const data = []
                    element.specSkuList.map(v => {
                      this.dynamicProp.push({
                        name: v.skuKeyName,
                        id: v.skuKeyId,
                        keys: `index_${v.skuKeyId}_${v.skuKeyName}`
                      })
                      data.push(v.skuKeyId)
                      // 设置默认选择
                      this.chooseSpec.push(v.skuKeyId)
                    })
                  }
                }
              }
              specList.map(v => {
                if (v.specSkuList) {
                  v.specSkuList.map(vs => {
                    v[`index_${vs.skuKeyId}_${vs.skuKeyName}`] = vs.skuValue
                  })
                }
              })
              this.editSpecsData = specList
            } else {
              this.handleAddSpec()
            }
          } else {
            /** *
             * 标库商品
             */
            console.log('-----标库商品------',)
            this.specsForm.specs = []
            const findInput = $('.el-table__header').find('thead tr').eq(0).find('th').eq(0).find('.el-checkbox__input')
            findInput.remove() // 设置全选disabeld
            specList.map((v, index) => {
              const findIndex = findArray(this.editSpecsData, { barCode: v.barCode })
              if (findIndex > -1) {
                this.standardSpecs.push(v) // 把数据添加进标库历史数据数组中
                const row = this.editSpecsData[findIndex]
                row.disabled = true
                row.id = v.id
                row.mprice = v.mprice
                row.erpCode = v.erpCode
                row.isCheck = true // 数据做标识  选中
                row.picUrl = v.picUrl
                row.limitNum = v.limitNum
                row.type = v.type || 2
                this.$set(this.editSpecsData, findIndex, row)
              } else {
                v.disabled = true
                if (v.specSkuList) {
                  v.specSkuList.map(vs => {
                    v[`index_${vs.skuKeyId}_${vs.skuKeyName}`] = vs.skuValue
                  })
                  v.productSpecSkuDTOs = v.specSkuList
                }
                this.editSpecsData.push(v)
              }
            })
            setTimeout(res => {
              this.editSpecsData.map((v, index) => {
                if (v.disabled) {
                  this.chooseTableSpec.push(v)
                  $('.el-table__body').find('tbody tr').eq(index).find('td').eq(0).find('.el-checkbox__input').addClass('is-disabled is-checked') // 设置该条数据不可选择
                }
              })
            }, 500)
          }
        } else {
          this.specsForm.specs = []
        }
      })
    },
    selectable(row) { // 是否可以选择
      if (row.disabled) {
        return false
      }
      return true
    },
    shows(row) {
      const findIndex = findArray(this.dynamicProp, { id: row.id })
      return findIndex > -1
    },
    handleAddSpec() { // 增加 规格
      const data = { picUrl: '', mprice: '', erpCode: '', barCode: '', limitType: 0, limitNum: '', limit: '', type: 2 }
      this.specsList.map(v => {
        const keys = 'index_' + v.id + '_' + v.attributeName
        data[keys] = ''
      })
      this.specsForm.specs.push(data)
      /** **
       *
       * 这里新增的时候判断是为编辑且已有编辑的规格数据了，有的话默认点击新增就自动吧规格参数添加到表单中
       */
      if (this.basicForm.id && this.editSpecsData.length > 0) {
        if (this.specsForm.specsData.length === 0) {
          this.specsList.map(v => {
            /** *
             * 标库商品，sku设置的规格存在dynamicProp字段中，添加的是可以直接在这里判断有哪些SKU
             *
             */
            if (this.basicForm.origin === 1) { // 标库
              const findIndex = this.dynamicProp.findIndex(item => {
                return item.id === v.id
              })
              if (findIndex > -1) {
                v.isCheck = true
                this.specsForm.specsData.push(v)
              }
            } else {
              if (this.chooseSpec.includes(v.id)) {
                v.isCheck = true
                this.specsForm.specsData.push(v)
              }
            }
          })
        }
      }
    },
    handleDeleteSpec(index) { // 删除规格
      this.specsForm.specs.splice(index, 1)
    },
    handleSpecsChange(row) { // 规格勾选
      const findIndex = findArray(this.specsForm.specsData, { id: row.id })
      if (row.isCheck) {
        if (findIndex < 0) {
          this.specsForm.specsData.push(row)
        }
        if (!this.chooseSpec.includes(row.id)) { // 是否在勾选的规格参数中是否存在
          this.chooseSpec.push(row.id)
        }
      } else {
        if (this.chooseSpec.includes(row.id)) { // 取消 就删除
          const index = this.chooseSpec.indexOf(row.id)
          this.chooseSpec.splice(index, 1)
        }
        if (findIndex > -1) {
          const items = this.specsForm.specsData[findIndex]
          const keys = 'index_' + items.id + '_' + items.attributeName
          this.specsForm.specs.map(vl => {
            if (vl[keys]) {
              vl[keys] = '' // 删除this.specsForm.specs 已存在的值
            }
          })
          this.specsForm.specsData.splice(findIndex, 1)
        }
      }
    },
    handleLimitChange(row, index) { // 设置
      if (row.limitType === 0) {
        this.limit_err = false
      } else if (row.limitType === 1) {
        var value = row.limitNum
        if (value && value !== '0') {
          this.input_checkLimit(row, index)
        }
      }
    },
    input_checkLimit(row, index) {
      var value
      if (row.limitType === 2) {
        value = row.limit
      } else if (row.limitType === 1) {
        value = row.limitNum
      }
      console.log('-----', value)
      if (row.limitType === 1 || row.limitType === 2) {
        if (isNaN(value)) {
          this.$message({
            message: '请输入数字',
            type: 'error'
          })
          this.limit_err = true
          return
        }
        if (value > 0 && value % 1 !== 0) {
          this.$message({
            message: '请输入大于0的整数',
            type: 'error'
          })
          this.limit_err = true
          return
        } else {
          if (value <= 0) {
            this.$message({
              message: '请输入大于0的整数',
              type: 'error'
            })
            this.limit_err = true
            return
          }
        }
      }
      this.limit_err = false
    },
    input_checkMprice(row, index) { // 校验价格
      var value = row.mprice
      if (value > 99999999) {
        this.$message({
          message: '价格最多只能输入8位数',
          type: 'error'
        })
        this.mprice_err = true
        return
      }
      if (value && !checkNumberdouble(value)) {
        this.$message({
          message: '价格只能设置最多两位小数的正数',
          type: 'error'
        })
        this.mprice_err = true
        return
      }
      if (!/^([1-9]\d*|0)(\.\d*[1-9])?$/.exec(value)) {
        row.mprice = ~~value
        this.$set(this.specsForm.specs, index, row)
      }
      this.mprice_err = false
    },
    input_checkErpcode(value) {
      if (value && !/^[0-9]+$/.test(value)) {
        this.$message({
          message: '商品编码只能为纯数字',
          type: 'error'
        })
        this.erpCode_err = true
        return
      }
      this.erpCode_err = false
    },
    input_checkBarCode(value) {
      if (value && !checkZmSZ(value)) {
        this.$message({
          message: '规格只能输入数字、英文、字符',
          type: 'error'
        })
        this.barCode_err = true
        return
      }
      this.barCode_err = false
    }
  }
}
export default mixin
