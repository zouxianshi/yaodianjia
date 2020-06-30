/**
 * @author        quanquan
 * @dateTime      2020-06-29 10:54:40
 * @description   default params and assembly uitls
 */

/**
 * 前列谴责需求周期太短，怼一个文件处理。
 */

import _ from 'lodash'
import { mapState } from 'vuex'
import { uuid, findComponentsDownward } from '@/utils'

export const saveDragItem = ($root, item) => {
  const $item = item
  $item.error = false
  const instance = findComponentsDownward($root, 'SaPreview')[0]
  instance.$saveDragItem(_.cloneDeep($item))
}

export const minxisCommonStyle = {
  computed: {
    ...mapState('renovation', ['basics']),
    commonStyleEs() {
      const { borderStyle, borderSize, borderColor } = this.basics
      return {
        borderRadius: `${borderStyle === 0 ? 0 : 4}px`,
        border: `${borderSize}px solid ${borderColor}`
      }
    }
  }
}

export const itemParams = {
  'className': '',
  'cname': '',
  'commodityId': '',
  'id': '',
  'img': '',
  'indications': '',
  'itemId': '', // 优惠券id
  'keyFeature': '',
  'mprice': 0,
  'name': '',
  'price': 0,
  'productName': '',
  'promoteType': 0,
  'setId': '',
  'sort': null,
  'url': '',
  'value': ''// 优惠券数量
}

export const items = (n = 1) => _.times(n, () => itemParams)

export const searchHintItem = {
  type: 'searchHint',
  typeName: '搜索',
  name: '快捷设置搜索关键字'
}

export const bannerItem = {
  uuid: `banner-uuid-uuid`,
  type: 'banner',
  typeName: '广告轮播图',
  subType: 'first',
  name: '3张轮播图',
  error: false,
  itemList: items(1),
  max: 10
}

export default () => {
  return {
    basics: [
      {
        name: '导航栏',
        type: 'navigation',
        component: [
          {
            uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
            type: 'navigation',
            typeName: '导航栏',
            subType: 'first',
            name: '一排四个',
            error: false,
            itemList: items(4),
            max: 8
          },
          {
            uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
            type: 'navigation',
            typeName: '导航栏',
            subType: 'second',
            name: '一排五个',
            error: false,
            itemList: items(5),
            max: 10
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
            typeName: '广告图',
            subType: 'first',
            name: '单图样式',
            error: false,
            itemList: items(1),
            max: 1
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'second',
            name: '多图样式1',
            error: false,
            itemList: items(3),
            max: 3
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'third',
            name: '多图样式2',
            error: false,
            itemList: items(4),
            max: 4
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'four',
            name: '单图不限高',
            error: false,
            itemList: items(1),
            max: 1
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'five',
            name: '多图轮播',
            error: false,
            itemList: items(1), // todo 不确定最大长度,
            max: 10
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
            typeName: '商品',
            subType: 'first',
            name: '一排单个',
            error: false,
            itemList: [],
            max: 10
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'second',
            name: '一排两个',
            error: false,
            itemList: [],
            max: 10
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'third',
            name: '一排三个',
            error: false,
            itemList: [],
            max: 10
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'four',
            name: '一排多个',
            error: false,
            itemList: [], // todo 不确定最大长度
            max: 10
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
            typeName: '标题',
            subType: 'first',
            name: '默认样式',
            error: false,
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            max: 1
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'second',
            name: '样式风格1',
            error: false,
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            max: 1
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'third',
            name: '样式风格2',
            error: false,
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            max: 1
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'four',
            name: '样式风格3',
            error: false,
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            max: 1
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'five',
            name: '样式风格4',
            error: false,
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            max: 1
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'six',
            name: '样式风格5',
            error: false,
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            max: 1
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'seven',
            name: '样式风格6',
            error: false,
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            max: 1
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
            typeName: '公告',
            subType: 'first',
            name: '默认样式',
            error: false,
            itemList: items(1),
            max: 10
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            typeName: '公告',
            subType: 'second',
            name: '样式风格1',
            error: false,
            itemList: items(1),
            max: 10
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            typeName: '公告',
            subType: 'third',
            name: '样式风格2',
            error: false,
            itemList: items(1),
            max: 10
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            typeName: '公告',
            subType: 'four',
            name: '样式风格3',
            error: false,
            itemList: items(1),
            max: 10
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
            typeName: '为你推荐',
            subType: 'first',
            name: '一排两个',
            error: false,
            itemList: []
          },
          {
            uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
            type: 'recommend',
            typeName: '为你推荐',
            subType: 'second',
            name: '一排三个',
            error: false,
            itemList: []
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
            typeName: '广告框',
            subType: 'first',
            subTitle: '',
            title: '',
            name: '默认样式',
            error: false,
            itemList: [] // todo 不确定数量
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
            typeName: '活动商品',
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
            typeName: '限时活动',
            subType: 'first',
            name: '一排单个',
            error: false,
            chooseFlag: 0,
            startTime: '',
            endTime: '',
            itemCount: 1,
            itemList: []
          },
          {
            uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'timeLimitedActivity',
            typeName: '限时活动',
            subType: 'second',
            name: '一排两个',
            error: false,
            chooseFlag: 0,
            startTime: '',
            endTime: '',
            itemCount: 2,
            itemList: []
          },
          {
            uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'timeLimitedActivity',
            typeName: '限时活动',
            subType: 'third',
            name: '一排多个',
            error: false,
            chooseFlag: 0,
            startTime: '',
            endTime: '',
            itemCount: 6,
            itemList: []
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
            typeName: '优惠券',
            subType: 'first',
            name: '一排单个',
            error: false,
            itemList: items(1),
            max: 10
          },
          {
            uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
            type: 'coupon',
            typeName: '优惠券',
            subType: 'second',
            name: '一排两个',
            error: false,
            itemList: items(2),
            max: 10
          },
          {
            uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
            type: 'coupon',
            typeName: '优惠券',
            subType: 'third',
            name: '一排多个',
            error: false,
            itemList: items(6),
            max: 10
          }
        ]
      }
    ]
  }
}
