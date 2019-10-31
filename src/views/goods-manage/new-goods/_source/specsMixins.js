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
      if (this.basicForm.origin === 1) {
        data = this.chooseTableSpec
      } else {
        data = this.specsForm.specs
      }
      this.specsForm.specs.map(v => {
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
      if (this.basicForm.origin === 1) {
        getSpecsProductSKU(this.$route.query.id).then(res => {
          this.specsForm.specs = res.data
          if (this.$route.query.id) {
            this._loadSpecsInfo()
          }
        })
      } else {
        getSpecs(this.chooseTypeList[0].id).then(res => {
          if (res.data) {
            res.data.map((v, index) => {
              v['index_' + index + '_' + v.attributeName] = ''
            })
            this.specsList = res.data
          }
          if (this.$route.query.id) {
            this._loadSpecsInfo()
          }
        })
      }
    },
    _loadSpecsInfo() { // 加载规格信息
      getSelfSpecsInfo(this.$route.query.id).then(res => {
        const { specList } = res.data
        this.chooseSpecsAry = []
        if (specList.length > 0) {
          if (this.basicForm.origin === 2) { // 上架自建
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
          } else {
            const data = specList
            specList.productSpecSkuDTOs = data.specSkuList
          }
        }
      })
    }
  }
}
export default mixin
