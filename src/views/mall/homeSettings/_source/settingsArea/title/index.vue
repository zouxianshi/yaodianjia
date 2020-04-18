<template>
  <div class="sa-title-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <m-title v-for="(el,i) in item.itemList" :key="i" :item="el" :type="item.type" @on-update="_onUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mTitle from './title'
import { mapState, mapMutations } from 'vuex'
import { saveAssembly } from '@/api/mallService'
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

  methods: {
    ...mapMutations('mall', ['setUUidDragData']),
    _onUpdate(p, fn) {
      saveAssembly(p).then(res => {
        const { uuid } = this.item
        this.setUUidDragData({ uuid, ...p, ...res.data })
        setTimeout(() => {
          this.$message.success('保存成功')
          fn()
        }, 1200)
      }).catch(() => {
        fn()
      })
    }
  },
  mounted() {

  },
  ...mapState('mall', ['dragData']),
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
