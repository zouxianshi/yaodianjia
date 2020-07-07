<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="海贝成长" name="complimentary">
        <el-row :gutter="20">
          <el-col
            v-for="o in complimentary"
            :key="o.value"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import cardItem from './_sourse/card-item'
import { mapGetters } from 'vuex'
import exChange from '@/assets/image/acvity/ex-change.png'
import exGet from '@/assets/image/acvity/ex-get.png'

export default {
  name: 'Exchange',
  props: {},
  components: { cardItem },
  data() {
    return {
      activeName: 'complimentary',
      complimentary: [
        {
          value: 'haibeiExchangeSetting',
          lable: '积分兑换',
          name: 'haibeiExchangeSetting',
          img: exChange,
          createText: '规则设置',
          linkUrl: '/marketing/settings-equity/ex-set',
          desc:
            '线下积分可以兑换成海贝，海贝可以在兑换商城用来兑换商品，商品多多，权益多多'
        },
        {
          value: 'getHaibeiSetting',
          lable: '消费奖励',
          name: 'getHaibeiSetting',
          img: exGet,
          createText: '规则设置',
          linkUrl: '/marketing/settings-equity/ex-get',
          desc:
            '在商城购物可以赠送海贝，海贝可以用来兑换商品，激励用户在上商城消费'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    submitActivit() {
      this.active = 2
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.exchange-model {
  padding: 20px;
  background: #f5f7fa;
}
</style>
