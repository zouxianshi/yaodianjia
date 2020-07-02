function formatDate(time, flag) {
  const date = new Date(time)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  if (flag) {
    return y + '-' + m + '-' + d + ' ' + '0:00:00'
  } else {
    return y + '-' + m + '-' + d + ' ' + '23:59:59'
  }
}
export function formatAge(minAge, maxAge) {
  const date = new Date()
  var y = date.getFullYear()
  const startyear = y - maxAge
  const endyear = y - minAge
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  const startDay = startyear + '-' + m + '-' + d + ' ' + '0:00:00'
  const endDay = endyear + '-' + m + '-' + d + ' ' + '23:59:59'
  return [startDay, endDay]
}

export function formatLkTime(minLk, maxLk) {
  const now = new Date().getTime()
  const start = now - maxLk * 86400000
  const end = now - minLk * 86400000
  const startDay = formatDate(start, true)
  const endDay = formatDate(end, false)
  return [startDay, endDay]
}
