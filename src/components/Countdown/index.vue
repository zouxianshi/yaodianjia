<template>
  <span style="color: red">{{ timer ? formatTime(timer): '00:00:00' }}</span>
</template>

<script>
export default {
  props: {
    time: {
      type: String, // 传入的结束时间
      default: ''
    }
  },
  data() {
    return {
      timer: null, // 差值
      resId: '' // 回收id
    }
  },
  created() {
    this._CountDownLoop()
  },
  destroyed() {
    // 组件销毁，关闭定时执行
    cancelAnimationFrame(this.resId)
  },
  methods: {
    /**
     * 倒计时循环
     * @private
     */
    _CountDownLoop() {
      const timer_offset = new Date(this.time) - new Date()
      // 如果结束时间戳减去当前时间时间戳小于等于0则设置倒计时结束标识为true
      if (timer_offset <= 0) {
        cancelAnimationFrame(this.resId)
      } else {
        this.timer = timer_offset
        this.resId = requestAnimationFrame(this._CountDownLoop)
      }
    },
    // 格式ihua
    formatTime(leftTime) {
      if (leftTime <= 0) {
        return '00:00:00'
      } else {
        const d = Math.floor(leftTime / 1000 / 60 / 60 / 24) // 总毫秒除以一天的毫秒 得到相差的天数
        let h = Math.floor(leftTime / 1000 / 60 / 60 - 24 * d) // 然后取完天数之后的余下的毫秒数再除以每小时的毫秒数得到小时
        let m = Math.floor(leftTime / 1000 / 60 - 24 * 60 * d - 60 * h) // 减去天数和小时数的毫秒数剩下的毫秒，再除以每分钟的毫秒数，得到分钟数
        let s = Math.floor(
          leftTime / 1000 - 24 * 60 * 60 * d - 60 * 60 * h - 60 * m
        ) // 得到最后剩下的毫秒数除以1000 就是秒数，再剩下的毫秒自动忽略即可
        let hm = Math.floor(
          (leftTime -
            24 * 60 * 60 * 1000 * d -
            60 * 60 * 1000 * h -
            60 * 1000 * m -
            s * 1000) /
            10
        )
        if (hm < 10) {
          hm = '0' + hm
        }
        if (s < 10) {
          s = '0' + s
        }
        if (m < 10) {
          m = '0' + m
        }
        if (h < 10) {
          h = '0' + h
        }
        return `${d ? `${d}天` : ''} ${h}:${m}:${s}:${hm}`
      }
    }
  }
}
</script>

<style>
</style>
