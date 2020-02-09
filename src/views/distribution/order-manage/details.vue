<template>
  <div>details</div>
</template>

<style lang="scss" scoped></style>
<script>
import DistributionService from '@/api/distributionService'
export default {
  data: () => {
    return {
      details: {}
    }
  },
  mounted() {
    const { id } = this.$route.query
    this.queryDetailsService(id)
  },
  methods: {
    async queryDetailsService(id) {
      const { data, code } = await DistributionService.queryOrderDetailsById(id)
      console.log('data ______________________ : ', data)
      console.log('code ______________________ : ', code)
    }
  }
}
</script>
