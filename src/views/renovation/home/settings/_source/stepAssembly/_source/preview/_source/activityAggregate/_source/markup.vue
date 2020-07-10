<template>
  <m-aga-card type="markup">
    <div class="markup-model">
      <el-row :gutter="8">
        <el-col v-for="(item,$index) in 3" :key="$index" :span="8">
          <m-full-reduction-item />
        </el-col>
      </el-row>
      <div class="mm-tip">
        <p>加购<strong>N</strong>元可以换以下商品</p>
      </div>
      <el-row :gutter="8">
        <el-col v-for="(item,$index) in 3" :key="$index" :span="8">
          <m-full-reduction-item type="white" :is-no-data="true" />
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
  name: 'Markup',
  data() {
    return {}
  },
  props: {},
  methods: {},
  watch: {
  },
  beforeCreate() {
  },
  created() {
    this.agaData()
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
  .markup-model {
    .mm-tip {
      padding: 12px 0;
      p {
        font-size: 12px;
        color: #3E3E3E;
        strong {
          color: #F32525;
          font-weight: bold;
          padding: 0 2px;
          display: inline-block;
        }
      }
    }
  }
</style>
