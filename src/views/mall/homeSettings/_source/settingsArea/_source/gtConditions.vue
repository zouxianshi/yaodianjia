<template>
  <div class="gt-conditions-model">
    <el-cascader placeholder="商品分组" :props="{children: 'children',label: 'name',value: 'id'}" :options="groupData" size="mini" @change="onChange" />
    <el-input v-model.trim="searchParams.brandName" placeholder="商品品牌" size="mini" style="width: 154px;" />
    <el-input v-model.trim="searchParams.erpOrName" placeholder="商品编码/名称" size="mini" style="width: 165px;" />
    <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { getTypeTree } from '@/api/group'
export default {
  name: 'GtConditions',
  data() {
    return {
      searchParams: {
        brandName: '',
        erpOrName: '',
        groupId: ''
      },
      groupData: []
    }
  },
  props: {},
  methods: {
    onChange(v) {
      const isAll = v.includes('all')
      if (isAll) {
        this.searchParams.groupId = ''
      } else {
        this.searchParams.groupId = _.last(v)
      }
    },
    onSubmit() {
      this.$emit('on-conditions', { ...this.searchParams, currentPage: 1 })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    const { merCode } = this
    getTypeTree({ merCode, type: 2, use: true }).then(res => {
      this.groupData = [{ name: '全部', id: 'all' }, ...res.data]
    })
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
    ...mapGetters(['merCode'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .gt-conditions-model {

  }
</style>
