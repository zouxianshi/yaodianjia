export const itemParams = {
  className: '',
  id: '',
  img: '',
  mprice: 0,
  name: '请填写',
  price: 0,
  productName: '',
  setId: '',
  sort: 0,
  specId: 0,
  typeId: '',
  url: ''
}

const items = (n = 1) => {
  return _.times(n, () => { return itemParams })
}

export const navigation = {
  first: items(4),
  second: items(5)
}

export const title = [
  ...items()
]

export const advertise = {
  first: items(1),
  second: items(3),
  third: items(3),
  four: items(4),
  five: items(1)
}
