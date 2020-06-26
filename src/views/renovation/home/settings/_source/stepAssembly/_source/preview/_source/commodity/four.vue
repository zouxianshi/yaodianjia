<template>
  <div class="sap-commodity-four-model" :style="stylees">
    <div class="scfm-item-scroll">
      <div class="scfm-item-box" :style="{width:`${106 * item.itemList.length}px`}">
        <template v-for="(el,$index) in item.itemList">
          <m-second-item :key="$index" class="scfm-item" :el="el" img-height="86px" :enter-type="enterType" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
import mSecondItem from './secondItem'
export default {
  name: 'Four',
  data() {
    return {}
  },
  mixins: [globalBinding],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    enterType: {
      type: String,
      default: 'icon'
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
  components: { mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-commodity-four-model {
    .scfm-item-scroll {
      width: 100%;
      overflow-x: scroll;
      .scfm-item-box {
        .scfm-item {
          width: 98px;
          display: inline-block;
          margin-right: 8px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
