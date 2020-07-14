<template>
  <m-aga-card type="spike" :start-time="item.startTime" :end-time="item.endTime">
    <div class="spike-model">
      <el-row :gutter="8">
        <template v-for="(el,$index) in item.list">
          <el-col v-if="$index < 2" :key="$index" :span="12">
            <m-spike-item :el="el" />
          </el-col>
        </template>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import { mapState } from 'vuex'
import mAgaCard from './agaCard'
import mSpikeItem from './spikeItem'

export default {
  name: 'Spike',
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
    this.item = this.agaData.amount
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
  components: { mAgaCard, mSpikeItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spike-model {
  }
</style>
