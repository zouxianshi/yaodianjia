
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

export const handlerConsignorSpecVal = (editSpecsData, specs, specsList) => {
  const isCheckArr = _.reject(specsList, v => !_.has(v, 'isCheck'))
  const keyArr = _.map(isCheckArr, v => `index_${v.id}_${v.attributeName}`)
  const keysArr = ['owner', ...keyArr]
  const vfKeysArr = _.map(editSpecsData, v => _.pick(v, ['owner', ...keyArr]))
  const specsVf = _.map(specs, v => _.pick(v, ['owner', ...keyArr]))

  const catVfArr = [...vfKeysArr, ...specsVf]

  let flag = false

  // complete key identification as a verification
  _.map(keysArr, v => {
    _.map(catVfArr, v1 => {
      if (!_.has(v1, v)) {
        v1[v] = ''
      }
    })
  })

  _.map(catVfArr, v => {
    _.map(keyArr, v1 => {
      if (_.has(v, v1) && _.isEmpty(v[v1])) {
        flag = true
      }
    })
  })

  if (flag) {
    Message({ message: '请完善规格信息', type: 'error', duration: 3000 })
    return false
  }

  if (catVfArr.length !== _.uniqWith(catVfArr, _.isEqual).length) {
    Message({ message: '货主和规格值不能重复', type: 'error', duration: 3000 })
    return false
  }

  return true
}
