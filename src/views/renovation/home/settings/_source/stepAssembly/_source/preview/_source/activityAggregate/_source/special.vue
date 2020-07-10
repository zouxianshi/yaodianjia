<template>
  <m-aga-card type="special" :start-time="item.startTime" :end-time="item.endTime">
    <div class="special-model">
      <el-row :gutter="8">
        <el-col v-for="(el,$index) in item.list" :key="$index" :span="12">
          <m-special-item :el="el" />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import { mapState } from 'vuex'
import mAgaCard from './agaCard'
import mSpecialItem from './specialItem'

export default {
  name: 'Special',
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
    this.item = this.agaData.preference
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
  components: { mAgaCard, mSpecialItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .special-model {
  }
</style>
