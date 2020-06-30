<template>
  <div class="sap-commodity-first-model">
    <div class="scfm-item-box">
      <template v-if="item.itemList.length">
        <template v-for="(el,$index) in item.itemList">
          <m-first-item :key="$index" class="scfm-item" :el="el" />
        </template>
      </template>
      <template v-else>
        <m-first-item :el="itemParams" />
      </template>
    </div>
  </div>
</template>
<script>
import { itemParams } from './.././../../../default'
import mFirstItem from './firstItem'
export default {
  name: 'SapCommodityFirst',
  data() {
    return {
      itemParams
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
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
  components: { mFirstItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-commodity-first-model {
    .scfm-item {
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
