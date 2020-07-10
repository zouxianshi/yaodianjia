<template>
  <m-aga-card type="together" :start-time="item.startTime" :end-time="item.endTime">
    <div class="together-model">
      <el-row :gutter="8">
        <template v-for="(el,$index) in item.list">
          <el-col v-if="$index < 2" :key="$index" :span="12">
            <m-together-item :el="el" />
          </el-col>
        </template>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import { mapState } from 'vuex'
import mAgaCard from './agaCard'
import mTogetherItem from './togetherItem'

export default {
  name: 'Together',
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
    this.item = this.agaData.group
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
  components: { mAgaCard, mTogetherItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .together-model {
  }
</style>
