<template>
  <div class="sap-commodity-four-model">
    <div class="scfm-item-scroll">
      <template v-if="item.itemList.length">
        <div class="scfm-item-box" :style="{width:`${(106 * item.itemList.length) + (basics.borderSize * item.itemList.length)}px`}">
          <template v-for="(el,$index) in item.itemList">
            <m-second-item :key="$index" class="scfm-item" :el="el" img-height="86px" maxlength="14" :enter-type="enterType" />
          </template>
        </div>
      </template>
      <template v-else>
        <div class="scfm-item-box" :style="{width:`${(106 * 6) + (basics.borderSize * 6)}px`}">
          <template v-for="(el,$index) in 6">
            <m-second-item :key="$index" class="scfm-item" :el="itemParams" img-height="86px" maxlength="14" :enter-type="enterType" />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { itemParams } from './.././../../../default'
import mSecondItem from './secondItem'
export default {
  name: 'Four',
  data() {
    return {
      itemParams
    }
  },
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
  computed: {
    ...mapState('renovation', ['basics'])
  },
  components: { mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-commodity-four-model {
    position: relative;
    z-index: 1;
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
