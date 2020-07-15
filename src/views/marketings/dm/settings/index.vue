<template>
  <div v-loading="homeLoading" class="home-settings-model">
    <div v-if="stepVal !== 2" class="hsm-step">
      <m-step />
    </div>
    <div class="scrollbar hsm-main" :style="{height: stepVal === 2 ? 'calc(100vh - 218px)' : 'calc(100vh - 300px)'}">
      <component :is="mod" v-if="isComponent" />
    </div>
    <div class="hsm-operation">
      <m-operation />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import mStep from './../../../renovation/home/settings/_source/step'
import mStepDmBasics from './../../../renovation/home/settings/_source/stepBasics/stepDmBasics'
import mStepAssembly from './../../../renovation/home/settings/_source/stepAssembly/stepAssembly'
import mStepState from './../../../renovation/home/settings/_source/stepState/stepState'
import mOperation from './../../../renovation/home/settings/_source/operation/operation'

export default {
  name: 'HomeSettingsIndex',
  data() {
    return {
      isComponent: false
    }
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setStepVal', 'reset', 'setHomeLoading']),
    ...mapActions('renovation', ['getDMPage', 'getAgaData']),
    ...mapActions('mall', ['getCenterStoreId'])
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.isComponent = false
    this.setHomeLoading(true)
    const { query } = this.$route
    const { merCode } = this.$store.state.user
    this.getCenterStoreId({ merCode }).then(async() => {
      await this.getAgaData()
      if (!_.isEmpty(query)) {
        this.setStepVal(2)
        this.getDMPage({ id: query.id }).then(() => {
          this.isComponent = true
          setTimeout(() => {
            this.setHomeLoading(false)
          }, 800)
        })
      } else {
        this.isComponent = true
        setTimeout(() => {
          this.setHomeLoading(false)
        }, 800)
      }
    }).catch(() => {
      this.isComponent = true
      this.setHomeLoading(false)
    })
  },
  beforeMount() {
  },
  mounted() {
    $('.header-model').css({
      height: '98px'
    })
    $('.app-main-model').find('.mc-copyright-model').hide()
    $('.app-main-model').css({
      height: 'calc(100vh - 88px)'
    })
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
    this.reset()
  },
  destroyed() {
  },
  computed: {
    ...mapState('renovation', ['stepVal', 'homeLoading']),
      mod() { // eslint-disable-line
      switch (this.stepVal) {
        case 1:
          return mStepDmBasics
        case 2:
          return mStepAssembly
        case 3:
          return mStepState
      }
    }
  },
  components: { mStep, mOperation }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .home-settings-model {
    background: #fff;
    border-radius: 4px;
    height: calc(100vh - 207px);
    position: relative;
    .hsm-main {
      overflow-y: scroll;
      height: calc(100vh - 218px);
    }
    .hsm-operation {
      position: absolute;
      bottom: -40px;
      left: -20px;
      z-index: 9999;
      width:calc(100% + 40px);
      padding: 12px;
      text-align: center;
      background: #fff;
      box-shadow:0px -2px 4px 0px rgba(0,0,0,0.1);
    }
  }
</style>
