<template>
  <div v-loading="isLoading" class="home-main-model">
    <div class="hmm-view-area">
      <m-view-area v-if="is" />
    </div>
    <div class="hmm-settings">
      <m-settings-area v-if="is" />
    </div>
    <div class="clearfix" />
  </div>
</template>
<script>
import { uuid } from '@/utils'
import { mapMutations, mapState } from 'vuex'
import mViewArea from './viewArea/viewArea'
import mSettingsArea from './settingsArea/settingsArea'
import { getStructure } from '@/api/mallService'
import { handlerDragComp } from './../_source/_source/default'
export default {
  name: 'HomeMain',
  components: { mViewArea, mSettingsArea },
  props: {
  },
  data() {
    return {
      is: false,
      isLoading: true
    }
  },
  computed: {
    ...mapState('mall', ['vaLoading', 'saLoading'])
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    const dimensionId = this.$route.params.id || null

    if (dimensionId) {
      getStructure({ dimensionId }).then(res => {
        const { id, name, setIds, title, setList } = res.data

        this.setDragGlobal({ ...this.dragGlobal, id, name, setIds, title })
        const list = _.map(setList, v => {
          return {
            id: v.id,
            uuid: `${uuid(`${v.type}-`)}${uuid()}${uuid()}${uuid()}`,
            type: v.type,
            subType: v.subType,
            name: _.find(_(handlerDragComp()).map('component').filter().flatMap().value(), { type: v.type, subType: v.subType })['name'],
            error: false,
            itemList: _.map(v.itemList, v1 => { return { ...v1, dimensionId: id } })
          }
        })
        this.setDragData(list)

        this.is = true

        setTimeout(() => {
          this.isLoading = false
        }, 800)
      })
    } else {
      this.is = true

      setTimeout(() => {
        this.isLoading = false
      }, 800)
    }
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  methods: {
    ...mapMutations('mall', ['setDragData', 'setDragGlobal', 'setLoading'])
  },
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .home-main-model {
    padding: 0 20px 20px 20px;
    min-height: 460px;
    .hmm-view-area {
      width: 422px;
      float: left;
      position: relative;
      z-index: 1;
    }
    .hmm-settings {
      float: left;
      margin-left: 20px;
      width: calc(100% - 442px);
    }
  }
</style>
