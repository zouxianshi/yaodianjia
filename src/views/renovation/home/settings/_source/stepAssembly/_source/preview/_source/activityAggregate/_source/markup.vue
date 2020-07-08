<template>
  <m-aga-card type="markup">
    <div class="markup-model">
      <el-row :gutter="8">
        <el-col v-for="(item,$index) in 2" :key="$index" :span="12">
          <m-markup-item />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import mAgaCard from './agaCard'
import mMarkupItem from './markupItem'

export default {
  name: 'Markup',
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
  components: { mAgaCard, mMarkupItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .markup-model {
  }
</style>
