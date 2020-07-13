
import _ from 'lodash'

/**
 * provide validation rules
 */
export const verifRequired = {
  banner: ({ itemList }) => _.some(itemList, { img: '', url: '' }),
  navigation: ({ itemList }) => _.some(itemList, { img: '', name: '', url: '' }),
  advertisement: ({ itemList }) => _.some(itemList, { img: '', url: '' }),
  commodity: ({ itemList }) => !_.isEmpty(itemList) ? _.some(itemList, { itemId: '' }) : true,
  title: ({ itemList }) => _.some(itemList, { name: '' }),
  announcement: ({ itemList }) => _.some(itemList, { name: '' }),
  adFrame: ({ itemList }) => _.isEmpty(itemList),
  coupon: ({ itemList }) => _.some(itemList, { cname: '', value: '' }),
  timeLimitedActivity: ({ activityId }) => _.isEmpty(activityId),
  recommend: () => false,
  activityAggregate: ({ value }) => {
    console.log(value)
    return _.isEmpty(value)
  }
}
