export function formartTime(seconds) {
  if (seconds === null) {
    return ''
  }
  const h = parseInt(seconds / 3600) + ''
  const m = (parseInt((seconds % 3600) / 60) + '').padStart(2, '0')
  const s = (parseInt((seconds % 3600) % 60) + '').padStart(2, '0')
  return `${h}:${m}:${s}`
}
export function formartStatus(status) {
  if (status === 0) {
    return '草稿'
  } else if (status === 1) {
    return '待审核'
  } else if (status === 2) {
    return '审核通过'
  } else if (status === 3) {
    return '审核不通过'
  } else {
    return '未知状态'
  }
}
