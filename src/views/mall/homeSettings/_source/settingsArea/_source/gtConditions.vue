<template>
  <div class="gt-conditions-model">
    <el-cascader placeholder="商品分组" :show-all-levels="false" :props="{children: 'children',label: 'name',value: 'id'}" :options="groupData" size="mini" @change="onChange" />
    <el-input v-model.trim="searchParams.brandName" placeholder="商品品牌" size="mini" style="width: 202px;" />
    <el-input v-model.trim="searchParams.searchKeyWord" placeholder="商品编码/名称" size="mini" style="width: 214px;" />
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
        firstTypeId: '',
        secondTypeId: '',
        threeTypeId: '',
        brandName: '',
        searchKeyWord: ''
      },
      groupData: []
    }
  },
  props: {},
  methods: {
    onChange(v) {
      this.searchParams.firstTypeId = ''
      this.searchParams.secondTypeId = ''
      this.searchParams.threeTypeId = ''

      if (v[0] === 'all') {
        return
      }

      if (_.size(v) === 3) {
        this.searchParams.threeTypeId = v[2]
      }
      if (_.size(v) === 2) {
        this.searchParams.secondTypeId = v[1]
      }
      if (_.size(v) === 1) {
        this.searchParams.firstTypeId = v[0]
      }
    },
    onSubmit() {
      this.$emit('on-conditions', this.searchParams)
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
