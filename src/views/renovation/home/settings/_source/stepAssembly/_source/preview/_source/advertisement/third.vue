<template>
  <div class="sap-advertisement-third-model" :class="classes">
    <div class="satm-item-box" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="satm-ads" @click="active && onSelect({},0)">
        <div v-if="itemList[0].img" class="satm-img-0">
          <img :src="itemList[0].img" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data v-else height="56px" :is-border="active === 'advertisement_0'" />
      </div>
      <div class="satm-ads" @click="active && onSelect({},1)">
        <div v-if="itemList[1].img" class="satm-img-1">
          <img :src="itemList[1].img" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data v-else height="56px" :is-border="active === 'advertisement_1'" />
      </div>
    </div>
    <div class="satm-item-box" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="satm-ads" @click="active && onSelect({},2)">
        <div v-if="itemList[2].img" class="satm-img-2">
          <img :src="itemList[2].img" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data v-else height="56px" :is-border="active === 'advertisement_2'" />
      </div>
      <div class="satm-ads" @click="active && onSelect({},3)">
        <div v-if="itemList[3].img" class="satm-img-3">
          <img :src="itemList[3].img" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data v-else height="56px" :is-border="active === 'advertisement_3'" />
      </div>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'
const prefixCls = 'sap-advertisement-third-model'

export default {
  name: 'Third',
  data() {
    return {
      itemList: []
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
          [`${prefixCls}-active-2`]: active === 'advertisement_2',
          [`${prefixCls}-active-3`]: active === 'advertisement_3'
        }
      ]
    }
  },
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $-prefix-cls: "sap-advertisement-third-model";
  .#{$-prefix-cls} {
    overflow: hidden;
    .satm-item-box {
      float: left;
      &:last-child {
        margin-left: 8px;
      }
      .satm-ads {
        height: 56px;
        &:last-child {
          margin-top: 8px;
        }
      }
    }
    &-active {
      padding: 0 !important;
    }
    @for $i from 0 through 3 {
      &-active-#{$i} {
        .satm-img-#{$i} {
          img {
            border: 1px solid #4F88FF;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
