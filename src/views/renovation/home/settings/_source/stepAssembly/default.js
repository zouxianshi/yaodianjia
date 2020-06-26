
import { uuid } from '@/utils'

export const itemParams = {
  'className': '',
  'cname': '',
  'commodityId': '',
  'id': '',
  'img': '',
  'indications': '',
  'itemId': '',
  'keyFeature': '',
  'mprice': 0,
  'name': '',
  'price': 0,
  'productName': '',
  'promoteType': 0,
  'setId': '',
  'sort': null,
  'url': '',
  'value': ''
}

export const items = (n = 1) => _.times(n, () => itemParams)

export default {
  basics: [
    {
      name: '导航栏',
      type: 'navigation',
      component: [
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          subType: 'first',
          name: '一排四个',
          error: false,
          itemList: items(4)
        },
        {
          uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
          type: 'navigation',
          subType: 'second',
          name: '一排五个',
          error: false,
          itemList: items(5)
        }
      ]
    },
    {
      name: '广告图',
      type: 'advertisement',
      component: [
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'first',
          name: '单图样式',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'second',
          name: '多图样式1',
          error: false,
          itemList: items(3)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'third',
          name: '多图样式2',
          error: false,
          itemList: items(4)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'four',
          name: '单图不限高',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'advertisement',
          subType: 'five',
          name: '多图轮播',
          error: false,
          itemList: items(1) // todo 不确定最大长度
        }
      ]
    },
    {
      name: '商品',
      type: 'commodity',
      component: [
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'first',
          name: '一排单个',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'second',
          name: '一排两个',
          error: false,
          itemList: items(2)
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'third',
          name: '一排三个',
          error: false,
          itemList: items(3)
        },
        {
          uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'commodity',
          subType: 'four',
          name: '一排多个',
          error: false,
          itemList: items(8) // todo 不确定最大长度
        }
      ]
    },
    {
      name: '标题',
      type: 'title',
      component: [
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'first',
          name: '默认样式',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'second',
          name: '样式风格1',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'third',
          name: '样式风格2',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'four',
          name: '样式风格3',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'five',
          name: '样式风格4',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'six',
          name: '样式风格5',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
          type: 'title',
          subType: 'seven',
          name: '样式风格6',
          error: false,
          itemList: items(1)
        }
      ]
    },
    {
      name: '公告',
      type: 'announcement',
      component: [
        {
          uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'announcement',
          subType: 'first',
          name: '默认样式',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'announcement',
          subType: 'second',
          name: '样式风格1',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'announcement',
          subType: 'third',
          name: '样式风格2',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
          type: 'announcement',
          subType: 'four',
          name: '样式风格3',
          error: false,
          itemList: items(1)
        }
      ]
    },
    {
      name: '为你推荐',
      type: 'recommend',
      component: [
        {
          uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
          type: 'recommend',
          subType: 'first',
          name: '一排两个',
          error: false,
          itemList: items(10) // todo 不确定长度
        },
        {
          uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
          type: 'recommend',
          subType: 'second',
          name: '一排三个',
          error: false,
          itemList: items(10) // todo 不确定长度
        }
      ]
    }
  ],
  marketing: [
    {
      name: '广告框',
      type: 'adFrame',
      component: [
        {
          uuid: `${uuid('adFrame-')}${uuid()}${uuid()}${uuid()}`,
          type: 'adFrame',
          subType: 'first',
          name: '默认样式',
          error: false,
          itemList: items(8) // todo 不确定数量
        }
      ]
    },
    {
      name: '活动商品',
      type: 'activityAggregate',
      component: [
        {
          uuid: `${uuid('activityAggregate-')}${uuid()}${uuid()}${uuid()}`,
          type: 'activityAggregate',
          subType: 'first',
          name: '默认样式',
          error: false,
          itemList: items(1)
        }
      ]
    },
    {
      name: '限时活动',
      type: 'timeLimitedActivity',
      component: [
        {
          uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'timeLimitedActivity',
          subType: 'first',
          name: '一排单个',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'timeLimitedActivity',
          subType: 'second',
          name: '一排两个',
          error: false,
          itemList: items(2)
        },
        {
          uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
          type: 'timeLimitedActivity',
          subType: 'third',
          name: '一排多个',
          error: false,
          itemList: items(6) // todo 不确定数量
        }
      ]
    },
    {
      name: '优惠券',
      type: 'coupon',
      component: [
        {
          uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
          type: 'coupon',
          subType: 'first',
          name: '一排单个',
          error: false,
          itemList: items(1)
        },
        {
          uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
          type: 'coupon',
          subType: 'second',
          name: '一排两个',
          error: false,
          itemList: items(2)
        },
        {
          uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
          type: 'coupon',
          subType: 'second',
          name: '一排多个',
          error: false,
          itemList: items(6) // todo 不确定数量
        }
      ]
    }
  ]
}
