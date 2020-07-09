<template>
  <m-aga-card type="fullReduction">
    <div class="full-reduction-model">
      <div class="frm-tip">
        <p>满<strong>100</strong>打<strong>9</strong>折 <span>有赠品，送完即止</span></p>
      </div>
      <el-row :gutter="8">
        <el-col v-for="(item,$index) in 3" :key="$index" :span="8">
          <m-full-reduction-item />
        </el-col>
      </el-row>
    </div>
  </m-aga-card>
</template>
<script>
import mAgaCard from './agaCard'
import mFullReductionItem from './fullReductionItem'

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
