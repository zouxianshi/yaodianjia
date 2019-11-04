import { getSelfSpecsInfo, setSpecsData, getSpecsProductSKU, getSpecs } from '@/api/new-goods'
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
      if (this.basicForm.origin === 1) {
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
          }
        })
        if (is_err) {
          return
        }
        this.subSpecs(data)
      } else {
        data = this.specsForm.specs
        const index = -1
        this.specsForm.specs.map(v => {
          console.log(index + 1)
          const form = 'specsForm' + parseInt(index + 1)
          console.log(form)
          this.$refs[form].validate((valid) => {
            if (valid) {
              this.subSpecs(data)
            } else {
              console.log('error submit!!')
              return false
            }
          })
          v.valueList = []
          v.commodityId = this.basicForm.id
          v.merCode = this.merCode
          for (const key in v) {
            if (v.hasOwnProperty(key)) {
              const val = key.split('_')
              if (val.includes('index')) {
                v.valueList.push({
                  skuKeyId: val[1],
                  skuValue: v[key],
                  skuKeyName: val[2]
                })
              }
            }
          }
        })
      }
    },
    subSpecs(data) {
      if (this.$route.query.id && data.length === 0) {
        this.$message({
          message: '请设置规格',
          type: 'warning'
        })
        return
      }
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
          res.data.map((v, index) => {
            v['index_' + index + '_' + v.attributeName] = ''
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
    }
  }
}
export default mixin
