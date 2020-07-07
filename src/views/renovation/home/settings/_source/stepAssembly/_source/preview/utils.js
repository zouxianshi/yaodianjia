/**
 * @author        quanquan
 * @dateTime      2020-06-28 14:20:51
 * @description   handler preview utils
 */

import { findComponentsDownward } from '@/utils'

export const jumpSelectAss = ($root, item) => {
  const instance = findComponentsDownward($root, 'SaSet')[0]
  instance.selectAss(item)
}
