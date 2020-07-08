<template>
  <m-aga-card type="together">
    <div class="together-model">
      <el-row :gutter="0">
        <el-col v-for="(item,$index) in 2" :key="$index" :span="12">
          <m-two-item />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import mAgaCard from './agaCard'
import mTwoItem from './twoItem'

export default {
  name: 'Together',
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
  components: { mAgaCard, mTwoItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .together-model {

  }
</style>
