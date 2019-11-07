import { getTypeTree } from '@/api/group'
const mixin = {
  data() {
    return {
      typeList: [],
      chooseTypeList: [],
      typeVisible: false,
      chooseList: []
    }
  },
  methods: {
    _loadClassList() { // 加载数据
      this.loading = true
      getTypeTree({ merCode: 'hydee', type: 1 }).then(res => {
        if (this.basicForm && this.basicForm.origin === 1) {
          res.data.map(v => {
            if (this.chooseTypeList[0].id !== v.id) {
              v.disabled = true
            }
          })
        }
        this.typeList = res.data
        this.loading = false
      }).catch(_ => {
        this.loading = false
      })
    },
    handleSaveType() { // 保存
      this._filtersTypes(this.chooseList)
      this.typeVisible = false
      this.$refs.basic.validateField('weight')
    },
    _filtersTypes(data) {
      this.chooseTypeList = []
      this.typeList.map(v => {
        if (v.id === data[0]) {
          this.chooseTypeList.push({ name: v.name, id: v.id })
        }
        if (v.children) {
          v.children.map(v1 => {
            if (v1.id === data[1]) {
              this.chooseTypeList.push({ name: v1.name, id: v1.id })
            }
            if (v1.children) {
              v1.children.map(v2 => {
                if (v2.id === data[2]) {
                  this.chooseTypeList.push({ name: v2.name, id: v2.id })
                }
              })
            }
          })
        }
      })
    }
  }

}
export default mixin

