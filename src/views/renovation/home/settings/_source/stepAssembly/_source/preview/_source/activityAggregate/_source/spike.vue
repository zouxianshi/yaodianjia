<template>
  <m-aga-card type="spike">
    <div class="spike-model">
      <el-row :gutter="8">
        <el-col v-for="(item,$index) in 2" :key="$index" :span="12">
          <m-spike-item />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import mAgaCard from './agaCard'
import mSpikeItem from './spikeItem'

export default {
  name: 'Spike',
  data() {
    return {}
  },
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
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
  computed: {},
  components: { mAgaCard, mSpikeItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spike-model {
  }
</style>
