
import { Message } from 'element-ui'
import { checkNumberdouble, checkZmSZ } from '@/utils/validate'

export const handlerDays = (daysVal) => {
  let days = 0
  let timeTypes = null // 1/2/3 年/月/天
  const d = _.divide(daysVal, 30) // day
  const y = _.divide(daysVal, 365) // year
  if (_.isInteger(y)) {
    timeTypes = 1
    days = y
  } else if (_.isInteger(d)) {
    timeTypes = 2
    days = d
  } else {
    timeTypes = 3
    days = daysVal
  }
  return { timeTypes, days }
}

export const handlerVfErpCode = (specList, specData, erpCode) => {
  const erpCodes = _.compact(_.map([...specList, ...specData], 'erpCode'))
  return !erpCodes.includes(erpCode)
}

export const handlerVfOwner = ({ data, key, keyVal, owner }) => {
  const hData = _.map(data, v => _.pick(v, ['owner', key]))
  return !_.some(hData, v => v.owner === owner && v[key] === keyVal)
}

export const handlerSaveSpecList = (data, specSelect) => {
  const specSelectArr = _.reject(specSelect, ['selected', false])
  const vfData = []
  const vfNode = {
    isPerfect: true,
    isErpCode: true,
    isMprice: true
  }

  // reset handler spec data
  const specArr = _.map(specSelectArr, v => {
    return {
      'id': '',
      'specId': '',
      'skuKeyId': v.id,
      'skuKeyName': v.attributeName,
      'skuValueCode': null,
      'skuValue': ''
    }
  })

  // add increase key-value team
  _.map(specArr, v => {
    const key = `index_${v.skuKeyId}_${v.skuKeyName}`
    _.map(data, v1 => {
      if (!_.has(v1, key)) {
        const { skuValue } = _.find(v1.valueList, { 'skuKeyName': v.skuKeyName })
        v1[key] = skuValue
      }

      if (v1.valueList && !_.some(v1.valueList, { 'skuKeyName': v.skuKeyName })) {
        v1.valueList.push(v)
      }

      vfData.push({
        owner: v1.owner,
        [key]: v1[key]
      })

      if (!v1[key]) {
        vfNode.isPerfect = false
      }
    })
  })

  _.map(data, v => {
    v.valueList = _.compact(_.map(!v.valueList ? specArr : v.valueList, v1 => {
      const key = `index_${v1.skuKeyId}_${v1.skuKeyName}`
      if (_.has(v, key)) {
        return {
          ...v1,
          skuValue: v[key]
        }
      }
    }))

    if (!checkZmSZ(v.erpCode)) {
      vfNode.isErpCode = false
    }

    if (v.mprice > 99999999) {
      vfNode.isMprice = '价格最多只能输入8位数'
    }

    if (!checkNumberdouble(v.mprice)) {
      vfNode.isMprice = '价格只能设置最多两位小数的正数'
    }
  })

  console.log(data)
  console.log('----------------')

  if (!vfNode.isPerfect || !data.length) {
    Message({ message: '请完善规格信息', type: 'error', duration: 3000 })
    return false
  }

  if (!vfNode.isErpCode) {
    Message({ message: '商品编码只能输入数字、英文、字符', type: 'error', duration: 3000 })
    return false
  }

  if (typeof vfNode.isMprice === 'string') {
    Message({ message: vfNode.isMprice, type: 'error', duration: 3000 })
    return false
  }

  if (vfData.length !== _.uniqWith(vfData, _.isEqual).length) {
    Message({ message: '货主和规格值不能重复', type: 'error', duration: 3000 })
    return false
  }

  return data
}
