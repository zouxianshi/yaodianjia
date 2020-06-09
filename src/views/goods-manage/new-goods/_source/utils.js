
import { Message } from 'element-ui'

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
  let flag = true

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

  console.log(specArr)

  console.log('------------------specArr')

  // add increase key-value team
  _.map(specArr, v => {
    const key = `index_${v.skuKeyId}_${v.skuKeyName}`
    _.map(data, v1 => {
      if (!_.has(v1, key)) {
        const { skuValue } = _.find(v1.valueList, { 'skuKeyName': v.skuKeyName })
        v1[key] = skuValue
      }

      if (!_.some(v1.valueList, { 'skuKeyName': v.skuKeyName })) {
        v1.valueList.push(v)
      }

      vfData.push({
        owner: v1.owner,
        [key]: v1[key]
      })

      if (!v1[key]) {
        flag = false
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
  })

  console.log(data)
  console.log('----------------')

  if (!flag) {
    Message({ message: '规格不能为空', type: 'error', duration: 3000 })
    return false
  }

  if (vfData.length !== _.uniqWith(vfData, _.isEqual).length) {
    Message({ message: '货主和规格值不能重复', type: 'error', duration: 3000 })
    return false
  }

  return data
}
