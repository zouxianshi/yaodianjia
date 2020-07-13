/**
 * @author        quanquan
 * @dateTime      2020-06-29 10:54:40
 * @description   default params and assembly uitls
 */

/**
 * 前列谴责需求周期太短，怼一个文件处理。
 * 极度愤怒！
 */

import _ from 'lodash'
import Vue from 'vue'
import store from '@/store'
import { mapState } from 'vuex'
import { uuid, findComponentsDownward } from '@/utils'

// front-end custom parameters
export const defaultParams = {
  'banner_first': {
    error: false,
    max: 10,
    imgSize: {
      0: '1060*326px',
      1: '1060*326px',
      2: '1060*326px',
      3: '1060*326px',
      4: '1060*326px',
      5: '1060*326px',
      6: '1060*326px',
      7: '1060*326px',
      8: '1060*326px',
      9: '1060*326px'
    }
  },
  'navigation_first': {
    error: false,
    max: 8,
    imgSize: {
      0: '160*160px',
      1: '160*160px',
      2: '160*160px',
      3: '160*160px',
      4: '160*160px',
      5: '160*160px',
      6: '160*160px',
      7: '160*160px'
    }
  },
  'navigation_second': {
    error: false,
    max: 10,
    imgSize: {
      0: '160*160px',
      1: '160*160px',
      2: '160*160px',
      3: '160*160px',
      4: '160*160px',
      5: '160*160px',
      6: '160*160px',
      7: '160*160px',
      8: '160*160px',
      9: '160*160px'
    }
  },
  'advertisement_first': {
    error: false,
    max: 1,
    imgSize: {
      0: '1060*326px'
    }
  },
  'advertisement_second': {
    error: false,
    max: 3,
    imgSize: {
      0: '436*376px',
      1: '610*180px',
      2: '610*180px'
    }
  },
  'advertisement_third': {
    error: false,
    max: 4,
    imgSize: {
      0: '522*180px',
      1: '522*180px',
      2: '522*180px',
      3: '522*180px'
    }
  },
  'advertisement_four': {
    error: false,
    max: 1,
    imgSize: {
      0: '750*不限制高度'
    }
  },
  'advertisement_five': {
    error: false,
    max: 10,
    imgSize: {
      0: '1060*326px',
      1: '1060*326px',
      2: '1060*326px',
      3: '1060*326px',
      4: '1060*326px',
      5: '1060*326px',
      6: '1060*326px',
      7: '1060*326px',
      8: '1060*326px',
      9: '1060*326px'
    }
  },
  'commodity_first': {
    error: false,
    max: 10
  },
  'commodity_second': {
    error: false,
    max: 10
  },
  'commodity_third': {
    error: false,
    max: 10
  },
  'commodity_four': {
    error: false,
    max: 10
  },
  'title_first': {
    error: false,
    max: 1
  },
  'title_second': {
    error: false,
    max: 1
  },
  'title_third': {
    error: false,
    max: 1
  },
  'title_four': {
    error: false,
    max: 1
  },
  'title_five': {
    error: false,
    max: 1
  },
  'title_six': {
    error: false,
    max: 1
  },
  'title_seven': {
    error: false,
    max: 1
  },
  'announcement_first': {
    error: false,
    max: 10
  },
  'announcement_second': {
    error: false,
    max: 10
  },
  'announcement_third': {
    error: false,
    max: 10
  },
  'announcement_four': {
    error: false,
    max: 10
  },
  'recommend_first': {
    error: false,
    max: 10
  },
  'recommend_second': {
    error: false,
    max: 10
  },
  'adFrame_first': {
    error: false,
    max: 10
  },
  'activityAggregate_first': {
    error: false,
    max: 10
  },
  'timeLimitedActivity_first': {
    error: false,
    max: 10
  },
  'timeLimitedActivity_second': {
    error: false,
    max: 10
  },
  'coupon_first': {
    error: false,
    max: 10
  },
  'coupon_second': {
    error: false,
    max: 10
  },
  'coupon_third': {
    error: false,
    max: 10
  }
}

export const agaSelectList = [
  {
    type: 'together',
    key: 'group',
    name: '拼团',
    id: '13'
  },
  {
    type: 'markup',
    key: 'add',
    name: '加价购',
    id: '15'
  },
  {
    type: 'spike',
    key: 'amount',
    name: '秒杀',
    id: '12'
  },
  {
    type: 'special',
    key: 'preference',
    name: '特惠',
    id: '11'
  },
  {
    type: 'fullReduction',
    key: 'full',
    name: '满减',
    id: '14'
  }
]

export const handlerBackfill = data => {
  const newList = []

  _.map(_.reject(data.list, ['type', 'banner']), v => {
    let v1 = {
      ...v,
      uuid: `${uuid(`${v.type}-`)}${uuid()}${uuid()}${uuid()}`,
      ..._.cloneDeep(defaultParams[`${v.type}_${v.subType}`])
    }
    if (v.type === 'activityAggregate') {
      const is = id => _.split(v.value, ',').includes(id)
      v1 = {
        ...v1,
        selectList: _.map(_.cloneDeep(store.state.renovation.agaSelectList), vv1 => {
          return {
            ...vv1,
            selected: is(vv1.id)
          }
        })
      }
    }
    if (v.type === 'timeLimitedActivity') {
      v1 = {
        ...v1,
        ...v1.limitedAct
      }
    }
    if (v.type === 'commodity') {
      v1 = {
        ...v1,
        itemList: _.map(v1.itemList, v2 => {
          return {
            ...v2,
            price: v2.mprice
          }
        })
      }
    }
    if (v.type === 'coupon') {
      v1 = {
        ...v1,
        itemList: _.map(v1.itemList, v2 => {
          return {
            ...v2,
            ..._.pick(v2.couponDetail, ['cname', 'ctype', 'denomination', 'timeRule', 'effectTime', 'sceneRule', 'productRule', 'shopRule'])
          }
        })
      }
    }
    newList.push(v1)
  })

  return newList
}

export const saveDragItem = ($root, item) => {
  const $item = item
  $item.error = false
  const instance = findComponentsDownward($root, 'SaPreview')[0]
  Vue.prototype.$message.success('设置成功')
  instance.$saveDragItem(_.cloneDeep($item))
}

export const mixinsCommonStyle = {
  computed: {
    ...mapState('renovation', ['basics']),
    commonStyleEs() {
      const { borderStyle, borderSize, borderColor } = this.basics
      return {
        borderRadius: `${borderStyle === 0 ? 0 : 4}px`,
        border: `${borderSize}px solid ${borderColor}`
      }
    },
    commonStyleBackgr() {
      const { backgroundColor } = this.basics
      return {
        background: `${backgroundColor}`
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
  itemList: items(1),
  ..._.cloneDeep(defaultParams[`banner_first`])
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
            itemList: items(4),
            ..._.cloneDeep(defaultParams[`navigation_first`])
          },
          {
            uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
            type: 'navigation',
            typeName: '导航栏',
            subType: 'second',
            name: '一排五个',
            itemList: items(5),
            ..._.cloneDeep(defaultParams[`navigation_second`])
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
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`advertisement_first`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'second',
            name: '多图样式1',
            itemList: items(3),
            ..._.cloneDeep(defaultParams[`advertisement_second`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'third',
            name: '多图样式2',
            itemList: items(4),
            ..._.cloneDeep(defaultParams[`advertisement_third`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'four',
            name: '单图不限高',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`advertisement_four`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            typeName: '广告图',
            subType: 'five',
            name: '多图轮播',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`advertisement_five`])
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
            itemList: [],
            ..._.cloneDeep(defaultParams[`commodity_first`])
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'second',
            name: '一排两个',
            itemList: [],
            ..._.cloneDeep(defaultParams[`commodity_second`])
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'third',
            name: '一排三个',
            itemList: [],
            ..._.cloneDeep(defaultParams[`commodity_third`])
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            typeName: '商品',
            subType: 'four',
            name: '一排多个',
            itemList: [],
            ..._.cloneDeep(defaultParams[`commodity_four`])
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
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_first`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'second',
            name: '样式风格1',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_second`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'third',
            name: '样式风格2',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_third`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'four',
            name: '样式风格3',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_four`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'five',
            name: '样式风格4',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_five`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'six',
            name: '样式风格5',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_six`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            typeName: '标题',
            subType: 'seven',
            name: '样式风格6',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_seven`])
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
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`announcement_first`])
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            typeName: '公告',
            subType: 'second',
            name: '样式风格1',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`announcement_second`])
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            typeName: '公告',
            subType: 'third',
            name: '样式风格2',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`announcement_third`])
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            typeName: '公告',
            subType: 'four',
            name: '样式风格3',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`announcement_four`])
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
            itemList: [],
            ..._.cloneDeep(defaultParams[`recommend_first`])
          },
          {
            uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
            type: 'recommend',
            typeName: '为你推荐',
            subType: 'second',
            name: '一排三个',
            itemList: [],
            ..._.cloneDeep(defaultParams[`recommend_second`])
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
            subtitle: '',
            title: '',
            name: '默认样式',
            itemList: [],
            ..._.cloneDeep(defaultParams[`adFrame_first`])
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
            typeName: '活动集合',
            subType: 'first',
            name: '默认显示全部活动',
            itemList: items(1),
            selectList: (() => {
              return store.state.renovation.agaSelectList || []
            })(),
            ..._.cloneDeep(defaultParams[`activityAggregate_first`])
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
            chooseFlag: 0,
            startTime: '',
            endTime: '',
            itemCount: 1,
            itemList: [],
            ..._.cloneDeep(defaultParams[`timeLimitedActivity_first`])
          },
          {
            uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'timeLimitedActivity',
            typeName: '限时活动',
            subType: 'second',
            name: '一排两个',
            chooseFlag: 0,
            startTime: '',
            endTime: '',
            itemCount: 2,
            itemList: [],
            ..._.cloneDeep(defaultParams[`timeLimitedActivity_second`])
          },
          {
            uuid: `${uuid('timeLimitedActivity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'timeLimitedActivity',
            typeName: '限时活动',
            subType: 'third',
            name: '一排多个',
            chooseFlag: 0,
            startTime: '',
            endTime: '',
            itemCount: 6,
            itemList: [],
            ..._.cloneDeep(defaultParams[`timeLimitedActivity_third`])
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
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`coupon_first`])
          },
          {
            uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
            type: 'coupon',
            typeName: '优惠券',
            subType: 'second',
            name: '一排两个',
            itemList: items(2),
            ..._.cloneDeep(defaultParams[`coupon_second`])
          },
          {
            uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
            type: 'coupon',
            typeName: '优惠券',
            subType: 'third',
            name: '一排多个',
            itemList: items(3),
            ..._.cloneDeep(defaultParams[`coupon_third`])
          }
        ]
      }
    ]
  }
}
