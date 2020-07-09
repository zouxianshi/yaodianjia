<template>
  <m-aga-card type="special">
    <div class="special-model">
      <el-row :gutter="8">
        <el-col v-for="(item,$index) in 2" :key="$index" :span="12">
          <m-special-item />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import mAgaCard from './agaCard'
import mSpecialItem from './specialItem'

export default {
  name: 'Special',
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
  components: { mAgaCard, mSpecialItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .special-model {
  }
</style>
