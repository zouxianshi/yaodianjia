
import { uuid } from '@/utils'

export const noDragData = [
  {
    uuid: `${uuid('no-data-')}${uuid()}${uuid()}${uuid()}`,
    name: 'no-data',
    subType: 'no-data',
    type: 'no-data',
    itemList: []
  }
]

export const noDragGlobal = {
  id: '',
  name: '',
  setIds: [],
  title: '',
  userName: ''
}

export const itemParams = {
  className: '',
  id: '',
  img: '',
  mprice: 0,
  name: '',
  price: 0,
  productName: '',
  setId: '',
  sort: 0,
  specId: '',
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

export const commodity = {
  first: items(2),
  second: items(3),
  third: items(4),
  four: items(1)
}

export const handlerDragComp = () => {
  return [
    {
      name: '导航栏',
      component: [
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          subType: 'first',
          name: '一排四个',
          error: false,
          itemList: navigation.first
        },
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          subType: 'second',
          name: '一排五个',
          error: false,
          itemList: navigation.second
        }
      ]
    },
    {
      name: '商品',
      component: [
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'first',
          name: '2个一排',
          error: false,
          itemList: commodity.first
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'second',
          name: '3个一排',
          error: false,
          itemList: commodity.second
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'third',
          name: '多个滚动一排',
          error: false,
          itemList: commodity.third
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'four',
          name: '单个一排',
          error: false,
          itemList: commodity.four
        }
      ]
    },
    {
      name: '标题',
      component: [
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'first',
          name: '单个标题',
          error: false,
          itemList: title
        }
      ]
    },
    {
      name: '广告图',
      component: [
        {
          uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertise',
          subType: 'first',
          name: '轮播图',
          error: false,
          itemList: advertise.first
        },
        {
          uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertise',
          subType: 'second',
          name: '左一右二图',
          error: false,
          itemList: advertise.second
        },
        {
          uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertise',
          subType: 'third',
          name: '三个一排',
          error: false,
          itemList: advertise.third
        },
        {
          uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertise',
          subType: 'four',
          name: '四个两排',
          error: false,
          itemList: advertise.four
        },
        {
          uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertise',
          subType: 'five',
          name: '不限高广告图',
          error: false,
          itemList: advertise.five
        }
      ]
    },
    {
      name: '为你推荐',
      component: [
        {
          uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
          type: 'recommend',
          subType: 'first',
          name: '两个一排',
          error: false,
          itemList: []
        },
        {
          uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
          type: 'recommend',
          subType: 'second',
          name: '单个一排',
          error: false,
          itemList: []
        }
      ]
    }
  ]
}
