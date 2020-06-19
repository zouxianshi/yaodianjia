<template>
  <div class="operation-model">
    <component :is="mod" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mBasics from './_source/basics'
import mAssembly from './_source/assembly'
import mState from './_source/state'

export default {
  name: 'Operation',
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
  computed: {
    ...mapState('renovation', ['stepVal']),
    mod() { // eslint-disable-line 
      switch (this.stepVal) {
        case 1:
          return mBasics
        case 2:
          return mAssembly
        case 3:
          return mState
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .operation-model {

  }
</style>
