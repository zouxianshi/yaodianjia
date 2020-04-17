
const itemParams = {
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

export { itemParams }

export default {
  first: _.times(4, () => { return itemParams }),
  second: _.times(5, () => { return itemParams })
}
