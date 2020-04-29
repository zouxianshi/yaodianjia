
export const pageTypeList = [
  {
    name: '商城页面',
    code: 1
  },
  {
    name: '活动页面',
    code: 2
  },
  {
    name: '商品列表',
    code: 3
  }
  // {
  //   name: '商品详情',
  //   code: 4
  // }
]

export const saIsId = (data, specId) => _.map(data, v => v.specId).includes(specId)

