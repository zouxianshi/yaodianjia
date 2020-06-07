<template>
  <div class="dashboard-container" :class="isDcHome ? 'dc' : ''">
    <div v-if="isDcHome" class="dc-home">
      <img src="./_img/home.jpg" alt="" width="1000">
    </div>
    <div v-else class="app-container">
      <img src="../../assets/image/home/hyym.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapState('user', ['merCode']),
    ...mapGetters([
      'roles'
    ]),
    isDcHome() {
      return this.merCode === '123456'
    }
  },
  created() {
    console.log(this.merCode)
  }
}
</script>
<style lang="scss" scoped>
  .dashboard-container {
    &.dc {
      height: calc(100vh - 160px);
      overflow-y: scroll;
      background: #F5F8FB;
      .dc-home {
        width: 1000px;
        margin: 0 auto;
      }
    }
  }
</style>
