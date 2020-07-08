<template>
  <m-aga-card type="together">
    <div class="together-model">
      <el-row :gutter="8">
        <el-col v-for="(item,$index) in 2" :key="$index" :span="12">
          <m-together-item />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import mAgaCard from './agaCard'
import mTogetherItem from './togetherItem'

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
  components: { mAgaCard, mTogetherItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .together-model {
  }
</style>
