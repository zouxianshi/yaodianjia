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
    typeName: 'banner轮播图'
  },
  'navigation_first': {
    error: false,
    max: 8,
    typeName: '导航栏',
    name: '一排四个'
  },
  'navigation_second': {
    error: false,
    max: 10,
    typeName: '导航栏',
    name: '一排五个'
  },
  'advertisement_first': {
    error: false,
    max: 1,
    typeName: '广告图',
    name: '单图样式'
  },
  'advertisement_second': {
    error: false,
    max: 3,
    typeName: '广告图',
    name: '多图样式1'
  },
  'advertisement_third': {
    error: false,
    max: 4,
    typeName: '广告图',
    name: '多图样式2'
  },
  'advertisement_four': {
    error: false,
    max: 1,
    typeName: '广告图',
    name: '单图不限高'
  },
  'advertisement_five': {
    error: false,
    max: 10,
    typeName: '广告图',
    name: '多图轮播'
  },
  'commodity_first': {
    error: false,
    max: 10,
    typeName: '商品',
    name: '一排单个'
  },
  'commodity_second': {
    error: false,
    max: 10,
    typeName: '商品',
    name: '一排两个'
  },
  'commodity_third': {
    error: false,
    max: 10,
    typeName: '商品',
    name: '一排三个'
  },
  'commodity_four': {
    error: false,
    max: 10,
    typeName: '商品',
    name: '一排多个'
  },
  'title_first': {
    error: false,
    max: 1,
    typeName: '标题',
    name: '默认样式'
  },
  'title_second': {
    error: false,
    max: 1,
    typeName: '标题',
    name: '样式风格1'
  },
  'title_third': {
    error: false,
    max: 1,
    typeName: '标题',
    name: '样式风格2'
  },
  'title_four': {
    error: false,
    max: 1,
    typeName: '标题',
    name: '样式风格3'
  },
  'title_five': {
    error: false,
    max: 1,
    typeName: '标题',
    name: '样式风格4'
  },
  'title_six': {
    error: false,
    max: 1,
    typeName: '标题',
    name: '样式风格5'
  },
  'title_seven': {
    error: false,
    max: 1,
    typeName: '标题',
    name: '样式风格6'
  },
  'announcement_first': {
    error: false,
    max: 10,
    typeName: '公告',
    name: '默认样式'
  },
  'announcement_second': {
    error: false,
    max: 10,
    typeName: '公告',
    name: '样式风格1'
  },
  'announcement_third': {
    error: false,
    max: 10,
    typeName: '公告',
    name: '样式风格2'
  },
  'announcement_four': {
    error: false,
    max: 10,
    typeName: '公告',
    name: '样式风格3'
  },
  'recommend_first': {
    error: false,
    max: 10,
    typeName: '为你推荐',
    name: '一排两个'
  },
  'recommend_second': {
    error: false,
    max: 10,
    typeName: '为你推荐',
    name: '一排三个'
  },
  'adFrame_first': {
    error: false,
    max: 10,
    typeName: '广告框',
    name: '默认样式'
  },
  'activityAggregate_first': {
    error: false,
    max: 10,
    typeName: '活动集合',
    name: '默认显示全部活动'
  },
  'timeLimitedActivity_first': {
    error: false,
    max: 10,
    color: '#F32526',
    typeName: '限时活动',
    name: '一排单个'
  },
  'timeLimitedActivity_second': {
    error: false,
    max: 10,
    color: '#F32526',
    typeName: '限时活动',
    name: '一排两个'
  },
  'timeLimitedActivity_third': {
    error: false,
    max: 10,
    color: '#F32526',
    typeName: '限时活动',
    name: '一排多个'
  },
  'coupon_first': {
    error: false,
    max: 10,
    typeName: '优惠券',
    name: '一排单个'
  },
  'coupon_second': {
    error: false,
    max: 10,
    typeName: '优惠券',
    name: '一排两个'
  },
  'coupon_third': {
    error: false,
    max: 10,
    typeName: '优惠券',
    name: '一排多个'
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
      const selectList = _.map(_.cloneDeep(store.state.renovation.agaSelectList), vv1 => {
        return {
          ...vv1,
          selected: is(vv1.id)
        }
      })

      v1 = {
        ...v1,
        chooseFlag: _.size(_.reject(selectList, ['selected', false])) === 5 ? 0 : 1,
        selectList: selectList
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
            ..._.pick(v2.couponDetail, ['cname', 'ctype', 'denomination'])
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
            subType: 'first',
            itemList: items(4),
            ..._.cloneDeep(defaultParams[`navigation_first`])
          },
          {
            uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
            type: 'navigation',
            subType: 'second',
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
            subType: 'first',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`advertisement_first`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            subType: 'second',
            itemList: items(3),
            ..._.cloneDeep(defaultParams[`advertisement_second`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            subType: 'third',
            itemList: items(4),
            ..._.cloneDeep(defaultParams[`advertisement_third`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            subType: 'four',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`advertisement_four`])
          },
          {
            uuid: `${uuid('advertisement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'advertisement',
            subType: 'five',
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
            subType: 'first',
            itemList: [],
            ..._.cloneDeep(defaultParams[`commodity_first`])
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            subType: 'second',
            itemList: [],
            ..._.cloneDeep(defaultParams[`commodity_second`])
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            subType: 'third',
            itemList: [],
            ..._.cloneDeep(defaultParams[`commodity_third`])
          },
          {
            uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
            type: 'commodity',
            subType: 'four',
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
            subType: 'first',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_first`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            subType: 'second',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_second`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            subType: 'third',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_third`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            subType: 'four',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_four`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            subType: 'five',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_five`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            subType: 'six',
            itemList: [{ ...items(1)[0], name: '热销商品' }],
            ..._.cloneDeep(defaultParams[`title_six`])
          },
          {
            uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
            type: 'title',
            subType: 'seven',
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
            subType: 'first',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`announcement_first`])
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            subType: 'second',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`announcement_second`])
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            subType: 'third',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`announcement_third`])
          },
          {
            uuid: `${uuid('announcement-')}${uuid()}${uuid()}${uuid()}`,
            type: 'announcement',
            subType: 'four',
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
            subType: 'first',
            itemList: [],
            ..._.cloneDeep(defaultParams[`recommend_first`])
          },
          {
            uuid: `${uuid('recommend-')}${uuid()}${uuid()}${uuid()}`,
            type: 'recommend',
            subType: 'second',
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
            subType: 'first',
            subtitle: '',
            title: '',
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
            subType: 'first',
            itemList: [],
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
            subType: 'first',
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
            subType: 'second',
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
            subType: 'third',
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
            subType: 'first',
            itemList: items(1),
            ..._.cloneDeep(defaultParams[`coupon_first`])
          },
          {
            uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
            type: 'coupon',
            subType: 'second',
            itemList: items(2),
            ..._.cloneDeep(defaultParams[`coupon_second`])
          },
          {
            uuid: `${uuid('coupon-')}${uuid()}${uuid()}${uuid()}`,
            type: 'coupon',
            subType: 'third',
            itemList: items(3),
            ..._.cloneDeep(defaultParams[`coupon_third`])
          }
        ]
      }
    ]
  }
}
