<template>
  <el-tabs :value="assemblyName" type="card">
    <el-tab-pane :label="`${assemblyName}`" :name="assemblyName">
      <div class="sa-search-hint-box sam-width">
        <el-form label-width="110px" size="mini">
          <el-form-item label="搜索关键词">
            <el-input v-model="searchHint" placeholder="请输入搜索关键词" maxlength="10" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SaSearchHint',
  data() {
    return {
      assemblyName: '搜索关键词',
      searchHint: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations('mall', ['setDragGlobal']),
    onSubmit() {
      const { searchHint } = this
      this.setDragGlobal({ searchHint })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.searchHint = _.cloneDeep(this.dragGlobal.searchHint)
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
    ...mapState('mall', ['dragGlobal'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-search-hint-box {

  }
</style>
