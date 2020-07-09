<template>
  <div class="app-container">
    <exportHistory type="match" />
  </div>
</template>
<script>
// import download from '@hydee/download'
import exportHistory from '@/components/exportHistory'
import mixins from '@/utils/mixin'
// import { getImportRecode } from '@/api/depot'
import { mapGetters } from 'vuex'
export default {
  components: { exportHistory },
  mixins: [mixins],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.product {
  color: #9999;
}
</style>
