import { getSelfSpecsInfo, setSpecsData, getSpecsProductSKU, getSpecs } from '@/api/new-goods'
import { findArray } from '@/utils/index'
const mixin = {
  data() {
    return {
      editSpecsData: [],
      specSkuList: [],
      specsForm: { // 商家自建商品的规格表单
        specsData: [],
        specs: []
      },
      standardSpecs: [], // 标库选中的历史数据
      dynamicProp: [], // 表格的动态字段
      chooseSpec: [], // 选中的规格参数
      specsList: [] // 规格
    }
  },
  watch: {
    step(val) {
      if (val === 2 && this.basicForm.id) {
        // 获取规格
        try {
          this._loadSpces() // 获取规格
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  methods: {
    handleSubmitSpec() { // 规格保存操作
      let data = []
      if (this.is_query) { // 如果是查看
        this.step = 3
        return
      }
      if (this.basicForm.origin === 1) { // 标库商品
        data = this.chooseTableSpec
        if (this.standardSpecs.length !== 0) { // 为选择任何东西直接跳过
          this.step = 3
          return
        } else if (this.standardSpecs.length === 0 && data.length === 0) {
          this.$message({
            message: '请选择规格信息',
            type: 'error'
          })
          return
        }
        let is_err = false
        data.forEach((v, index) => {
          if (!v.erpCode) {
            this.$message({
              message: `你勾选的规格中第${index + 1}个商品编码不能为空`,
              type: 'error'
            })
            is_err = true
          } else if (!v.mprice) {
            this.$message({
              message: `你勾选的规格中第${index + 1}个商品价格不能为空`,
              type: 'error'
            })
            is_err = true
          } else if (!v.barCode) {
            this.$message({
              message: `你勾选的规格中第${index + 1}个商品条码不能为空`,
              type: 'error'
            })
            is_err = true
          } else if (!v.picUrl) {
            this.$message({
              message: `你勾选的规格中第${index + 1}个图片不能为空`,
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
        this.subSpecs(data)
      } else {
        let checkNum = 0
        this.specsForm.specsData.map(v => {
          if (v.isCheck) {
            checkNum = +1
          }
        })
        if (this.specsForm.specs.length !== 0) {
          if (checkNum === 0) {
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
            index = +1
            v.valueList = []
            v.commodityId = this.basicForm.id
            v.merCode = this.merCode
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
              console.log(456)
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
            if (flag && !v.picUrl) {
              this.$message({
                message: `请上传规格${index}中的图片`,
                type: 'error'
              })
              flag = false
            }
          })
          if (flag) {
            // return
            this.subSpecs(data)
          }
        } else {
          if (this.$route.query.id) { // 如果是编辑 且已存在sku规格数据  未点击添加规格是直接进入下一步
            this.step = 3
          } else {
            if (data.length === 0) {
              this.$message({
                message: '请设置规格',
                type: 'warning'
              })
              return
            }
          }
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
        this._loadGoodsImgAry()
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
          })
          this.specsForm.specs = res.data
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
                        id: v.skuKeyId
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
                    v[vs.skuKeyName] = vs.skuValue
                  })
                }
              })
              this.editSpecsData = specList
            } else {
              this.handleAddSpec()
            }
          } else {
            $('.el-table__header').find('thead tr').eq(0).find('th').eq(0).find('.el-checkbox__input').addClass('is-disabled is-checked') // 设置全选disabeld
            specList.forEach((v, index) => {
              const findIndex = findArray(this.specsForm.specs, { barCode: v.barCode })
              if (findIndex > -1) {
                this.standardSpecs.push(v) // 把数据添加进标库历史数据数组中
                const row = this.specsForm.specs[findIndex]
                row.disabled = true
                row.mprice = v.mprice
                row.erpCode = v.erpCode
                $('.el-table__body').find('tbody tr').eq(findIndex).find('td').eq(0).find('.el-checkbox__input').addClass('is-disabled is-checked') // 设置该条数据不可选择
              }
            })
          }
        }
      })
    },
    shows(row) {
      const findIndex = findArray(this.dynamicProp, { id: row.id })
      return findIndex > -1
    },
    handleAddSpec() { // 增加 规格
      const data = { picUrl: '', mprice: '', erpCode: '', barCode: '' }
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
            if (this.chooseSpec.includes(v.id)) {
              v.isCheck = true
              this.specsForm.specsData.push(v)
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
    }
  }
}
export default mixin
