import { getSelfSpecsInfo, setSpecsData, getSpecsProductSKU, getSpecs } from '@/api/new-goods'
import { findArray } from '@/utils/index'
const mixin = {
  data() {
    return {
      editSpecsData: [],
      specSkuList: [],
      specsForm: { // 商家自建商品的规格表单
        specsData: [],
        specs: [{ picUrl: '', mprice: '', erpCode: '', barCode: '' }]
      },
      specsList: [] // 规格
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
          debugger
          data = this.specsForm.specs
          let index = 0
          this.specsForm.specs.map(v => {
            index = +1
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
                  } else {
                    this.$message({
                      message: `请输入规格${index}中的${val[2]}`,
                      type: 'error'
                    })
                    return
                  }
                }
              }
            }
            if (!v.barCode) {
              this.$message({
                message: `请输入规格${index}中的条码`,
                type: 'error'
              })
              return
            }
            if (!v.erpCode) {
              this.$message({
                message: `请输入规格${index}中的商品编码`,
                type: 'error'
              })
              return
            }
            if (!v.mprice) {
              this.$message({
                message: `请输入规格${index}中的价格`,
                type: 'error'
              })
              return
            }
            if (!v.picUrl) {
              this.$message({
                message: `请上传规格${index}中的图片`,
                type: 'error'
              })
              return
            }
          })
          this.subSpecs(data)
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
        }
        if (this.$route.query.id) {
          this._loadSpecsInfo()
        }
      })
    },
    _loadSpecsInfo() { // 加载规格信息
      if (this.basicForm.origin === 1) { // 标库
        getSpecsProductSKU(this.basicForm.platformCode).then(res => {
          this.specsForm.specs = res.data
        })
      } else {
        getSelfSpecsInfo(this.$route.query.id).then(res => {
          if (res.data) {
            const { specList } = res.data
            this.chooseSpecsAry = []
            if (specList.length > 0) {
              if (specList) {
                this.specsForm.specs = []
              }
              this.editSpecsData = specList
              //     // 处理数据，把单选框选中
              //     specList[0].specSkuList.map(v => {
              //       this.chooseSpecsAry.push(v.skuKeyId)
              //     })
              //     // 设置动态表单的值
              //     this.specsList.forEach((v, index) => {
              //       console.log(this.chooseSpecsAry[index], v.id)
              //       if (this.chooseSpecsAry.includes(v.id)) {
              //         this.specsForm.specsData.push(v)
              //       }
              //     })
              //     const data = []
              //     specList.forEach((v, index) => {
              //       data.push({
              //         'picUrl': v.picUrl,
              //         'mprice': v.mprice,
              //         'erpCode': v.erpCode,
              //         'barCode': v.barCode
              //       })
              //       v.specSkuList.forEach((val, index1) => {
              //         const name = 'index_' + val.skuKeyId + '_' + val.skuKeyName + ''
              //         data[index][name] = val.skuValue
              //       })
              //     })
              //     this.specsForm.specs = data
            }
          }
        })
      }
    },
    handleAddSpec() { // 增加 规格
      this.specsForm.specs.push({ picUrl: '', mprice: '', erpCode: '', barCode: '' })
    },
    handleDeleteSpec(index) { // 删除规格
      this.specsForm.specs.splice(index, 1)
    },
    handleSpecsChange(row) { // 规格勾选
      // const formData = this.specsForm.specs.slice()
      this.specsList.map(v => {
        const findIndex = findArray(this.specsForm.specsData, { id: v.id })
        if (v.isCheck) {
          if (findIndex < 0) {
            this.specsForm.specsData.push(v)
            // const keys = 'index_' + v.id + '_' + v.attributeName
            // formData.map(vl => {
            //   if (!vl[keys]) {
            //     vl[keys] = ''
            //   }
            // })
            // this.specsForm.specs = formData
          }
        } else {
          if (findIndex > -1) {
            const items = this.specsForm.specsData[findIndex]
            const keys = 'index_' + items.id + '_' + items.attributeName
            this.specsForm.specs.map(vl => {
              if (vl[keys]) {
                delete vl[keys] // 删除this.specsForm.specs 已存在的值
              }
            })
            this.specsForm.specsData.splice(findIndex, 1)
          }
        }
      })
    }
  }
}
export default mixin
