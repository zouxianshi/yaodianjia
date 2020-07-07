
export const handletimeRule = (timeRule, effectTime) => {
  if (timeRule) {
    if (timeRule === 1) {
      return `自领取${effectTime}天有效`
    } else if (timeRule === 2) {
      return `自领取${effectTime.split(',')[0]}天有效,${
        effectTime.split(',')[1]
      }天失效`
    } else {
      return `${effectTime.split(',')[0]} - ${effectTime.split(',')[1]}`
    }
  }
}

export const handleshopRule = (ctype, useRule, denomination, giftName) => {
  if (ctype === 1) {
    if (useRule === 0) {
      return `无门槛，${denomination}折`
    } else {
      return `满${useRule}可用,${denomination}折`
    }
  } else if (ctype === 2) {
    if (useRule === 0) {
      return `无门槛，减${denomination}`
    } else {
      return `满${useRule}可用,减${denomination}元`
    }
  } else {
    if (giftName === 'null' || null) {
      return ''
    } else {
      return giftName
    }
  }
}
