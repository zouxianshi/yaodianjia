<template>
  <div class="operation-assembly-model">
    <el-button type="primary" size="small" :loading="isLoading" @click="onSubmit('save')">保存</el-button>
    <el-button type="primary" plain size="small" @click="onPreviousStep">上一步</el-button>
    <el-button type="primary" plain size="small" @click="onSubmit('preview')">预览</el-button>
    <div>
      <el-dialog title="效果预览" append-to-body width="500px" :visible.sync="isPreview">
        <m-preview v-if="isPreview" :dimension-id="dimensionId" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
import mPreview from './../../../../list/_source/preview'
import { mapState, mapActions, mapMutations } from 'vuex'
import { verifRequired } from './utils'
import { findComponentsDownward } from '@/utils'

export default {
  name: 'Assembly',
  data() {
    return {
      isPreview: false,
      dimensionId: '',
      isLoading: false
    }
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setStepVal', 'setStaticDragData']),
    ...mapActions('renovation', ['saveHomeSetting']),
    onSubmit(type) {
      const { banner } = this.staticDragData

      if (verifRequired.banner(this.staticDragData.banner)) {
        this.setStaticDragData({
          banner: {
            ...banner,
            error: true
          }
        })
        return
      }

      const dragList = _.map(this.dragList, v => { return { ...v, error: verifRequired[v.type](v) } })

      if (!dragList.length) {
        this.onSave(type)
        return
      }

      if (_.some(dragList, { error: true })) {
        const instance = findComponentsDownward(this.$root, 'SaPreview')[0]
        instance.$setVifDragData(dragList)
        this.onSave(type)
      }
    },
    onSave(type) {
      this.isLoading = true
      this.saveHomeSetting().then(res => {
        if (type === 'save') {
          setTimeout(() => {
            this.setStepVal(3)
            this.isLoading = false
          }, 1200)
        } else {
          this.dimensionId = res.data
          this.isPreview = true
          this.isLoading = false
        }
      })
    },
    onPreviousStep() {
      this.setStepVal(1)
    }
  },
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
    ...mapState('renovation', ['staticDragData', 'dragList'])
  },
  components: { mPreview }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .assembly-model {

  }
</style>
