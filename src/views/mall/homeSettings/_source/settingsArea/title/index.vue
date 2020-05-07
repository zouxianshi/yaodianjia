<template>
  <div class="sa-title-model ">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="item.name ? `${assemblyName}（${item.name}）` : assemblyName" :name="assemblyName">
        <m-title v-for="(el,i) in item.itemList" :key="i" :item="el" :item-params="item" @on-update="_onUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mTitle from './title'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SaTitle',
  data() {
    return {
      assemblyName: '标题设置'
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('mall', ['dragGlobal'])
  },
  methods: {
    ...mapActions('mall', ['saveAssembly']),
    _onUpdate(searchParams, fn) {
      const { item: { uuid }, dragGlobal: { id }} = this
      this.saveAssembly({ searchParams: { ...searchParams, dimensionId: id }, uuid }).then((res) => {
        this.$message.success('组件保存成功')
        fn(res.data)
      }).catch(() => {
        fn()
      })
    }
  },
  mounted() {
  },
  watch: {
    'item.type': {
      deep: true,
      immediate: true,
      handler(v) {
        this.assemblyName = v === 'mall-title' ? '微商城名称设置' : '标题设置'
      }
    }
  },
  created() {
  },
  components: { mTitle }
}
</script>
