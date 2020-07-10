<template>
  <m-aga-card type="fullReduction" :start-time="item.startTime" :end-time="item.endTime">
    <div class="full-reduction-model">
      <div class="frm-tip">
        <p>{{ item.smallTitle }} <span v-if="item.giftOrNot === 1">有赠品，送完即止</span></p>
      </div>
      <el-row :gutter="8">
        <el-col v-for="(el,$index) in item.list" :key="$index" :span="8">
          <m-full-reduction-item :el="el" />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>

import { mapState } from 'vuex'
import mAgaCard from './agaCard'
import mFullReductionItem from './fullReductionItem'

export default {
  name: 'FullReduction',
  data() {
    return {
      item: {}
    }
  },
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
    this.item = this.agaData.full
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    ...mapState('renovation', ['agaData'])
  },
  components: { mAgaCard, mFullReductionItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .full-reduction-model {
    .frm-tip {
      padding: 4px 0 10px 0;
      p {
        font-size: 12px;
        color: #3E3E3E;
        strong {
          color: #F32525;
          font-weight: bold;
          padding: 0 2px;
          display: inline-block;
        }
        span {
          padding-left: 10px;
          color: #808086;
        }
      }
    }
  }
</style>
