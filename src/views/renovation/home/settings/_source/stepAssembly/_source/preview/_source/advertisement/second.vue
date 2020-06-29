<template>
  <div :class="classes">
    <div class="sasm-left" :style="{width:`calc((100% / 2) - 4px)`}" @click="active && onSelect({},0)">
      <div v-if="itemList[0].img" class="sasm-img-0">
        <img :src="itemList[0].img" alt="" style="width:100%;height: 120px;">
      </div>
      <m-item-no-data v-else height="120px" :size="50" :is-border="active === 'advertisement_0'" />
    </div>
    <div class="sasm-right" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="asam-ads" @click="active && onSelect({},1)">
        <div v-if="itemList[1].img" class="sasm-img-1">
          <img :src="itemList[1].img" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data v-else height="56px" :is-border="active === 'advertisement_1'" />
      </div>
      <div class="asam-ads" @click="active && onSelect({},2)">
        <div v-if="itemList[2].img" class="sasm-img-2">
          <img :src="itemList[2].img" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data v-else height="56px" :is-border="active === 'advertisement_2'" />
      </div>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'

const prefixCls = 'sap-advertisement-second-model'

export default {
  data() {
    return {
      itemList: {}
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    active: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSelect(el, i) {
      this.$emit('on-select', { el, i })
    }
  },
  watch: {
    'item.itemList': {
      deep: true,
      immediate: true,
      handler(v) {
        this.itemList = _.cloneDeep(v)
      }
    }
  },
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
    classes() {
      const { active } = this
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-active`]: !!active,
          [`${prefixCls}-active-0`]: active === 'advertisement_0',
          [`${prefixCls}-active-1`]: active === 'advertisement_1',
          [`${prefixCls}-active-2`]: active === 'advertisement_2'
        }
      ]
    }
  },
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $-prefix-cls: "sap-advertisement-second-model";

  .#{$-prefix-cls} {
    overflow: hidden;
    .sasm-left,.sasm-right {
      float: left;
      height: 120px;
    }
    .sasm-left {
      margin-right: 4px;
    }
    .sasm-right {
      margin-left: 4px;
      .asam-ads{
        &:last-child {
          margin-top: 8px;
        }
        .sasm-img-1,.sasm-img-2 {
          height: 56px;
        }
      }
    }
    &-active {
      padding: 0 !important;
      .sasm-img-0,.sasm-img-1,.sasm-img-2 {
        cursor: pointer;
      }
    }
    &-active-0 {
      .sasm-img-0 {
        img {
          border: 1px solid #4F88FF;
          box-sizing: border-box;
        }
      }
    }
    &-active-1 {
      .sasm-img-1 {
        img {
          border: 1px solid #4F88FF;
          box-sizing: border-box;
        }
      }
    }
    &-active-2 {
      .sasm-img-2 {
        img {
          border: 1px solid #4F88FF;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
