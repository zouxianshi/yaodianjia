<template>
  <div class="va-edit-model" @click="onSettings">
    <i slot="reference" class="el-icon-edit" />
  </div>
</template>
<script>
import { uuid } from '@/utils'
import { itemParams } from './../../_source/default'
import { findComponentsDownward } from '@/utils'
export default {
  name: 'VaEdit',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onSettings() {
      const { item, item: { code }} = this
      const instance = findComponentsDownward(this.$root, 'SettingsArea')[0]
      const setItem = item
      if (setItem.code === 'mall-title') {
        setItem.itemList = [itemParams]
      }
      // No caching update uuid.
      instance.setSelected(_.assign(setItem, {
        uuid: `${uuid(`${code}-`)}${uuid()}${uuid()}${uuid()}`
      }))
    }
  },
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-edit-model {
    width: 40px;
    height: 30px;
    background: #1888fc;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    margin-bottom: 4px;
    .el-icon-edit    {
      color: #fff;
    }
  }
</style>
