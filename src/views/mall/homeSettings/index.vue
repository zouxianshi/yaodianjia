<template>
  <div class="home-settings-model">
    <div class="hsm-cb">
      <el-card class="box-card" :body-style="{padding:'0px'}">
        <m-component-bar />
      </el-card>
    </div>
    <div class="scrollbar hsm-hm">
      <m-home-main />
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import mComponentBar from './_source/componentBar'
import mHomeMain from './_source/homeMain'
import { noDragData, noDragGlobal } from './_source/_source/default'

export default {
  name: 'HomeSettings',
  components: { mComponentBar, mHomeMain },
  props: {},
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState('mall', ['dragGlobal'])
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    const { merCode } = this.$store.state.user
    this.getCenterStoreId({ merCode })
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
    this.setDragData(noDragData)
    this.setDragGlobal(noDragGlobal)
  },
  destroyed() {
  },
  methods: {
    ...mapActions('mall', ['getCenterStoreId']),
    ...mapMutations('mall', ['setDragData', 'setDragGlobal'])
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .home-settings-model {
    .hsm-cb {
      width: calc(100% + 2px);
      margin-left: -1px;
    }
    .hsm-hm {
      height: calc(100vh - 290px);
      overflow-y:scroll;
      margin-top: 12px;
    }
  }
</style>
