<template>
  <div class="operation-assembly-model">
    <el-button type="primary" size="small" :loading="isLoading" @click="isHome ? onSubmitHome('save') : onSubmitDm('save')">保存</el-button>
    <el-button v-if="isEdit" type="primary" plain size="small" @click="onPreviousStep">上一步</el-button>
    <el-button type="primary" plain size="small" @click="isHome ? onSubmitHome('preview') : onSubmitDm('preview')">预览</el-button>
    <el-button type="primary" plain size="small" @click="$router.push(isHome ? `/renovation/home/list` : `/marketings/dm/list`)">返回列表</el-button>
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
import { defaultParams } from './../../stepAssembly/default'
import { findComponentsDownward } from '@/utils'

export default {
  name: 'Assembly',
  data() {
    return {
      isPreview: false,
      dimensionId: '',
      isLoading: false,
      isHome: this.$route.name === 'renovation-home-settings'
    }
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setStepVal', 'setStaticDragData']),
    ...mapActions('renovation', ['saveHomeSetting', 'updateHomeSetting', 'saveDMSetting', 'updateDMSetting']),
    onSubmitDm(type) {
      const dragList = _.map(this.dragList, v => { return { ...v, error: verifRequired[v.type](v) } })

      if (!dragList.length) {
        this.$message.error('请添加组件')
        return
      }

      if (_.some(dragList, { error: true })) {
        const instance = findComponentsDownward(this.$root, 'SaPreview')[0]
        instance.$setVifDragData(dragList)
        this.$message.error('请完善组件信息')
        return
      }

      this.onSaveDm(type)
    },
    onSubmitHome(type) {
      const { banner } = this.staticDragData

      if (verifRequired.banner(this.staticDragData.banner)) {
        this.setStaticDragData({
          banner: {
            ...banner,
            ..._.cloneDeep(defaultParams[`banner_first`])
          }
        })
        this.$message.error('请上传banner图')
        return
      }

      const dragList = _.map(this.dragList, v => { return { ...v, error: verifRequired[v.type](v) } })

      if (!dragList.length) {
        this.onSaveHome(type)
        return
      }

      if (_.some(dragList, { error: true })) {
        const instance = findComponentsDownward(this.$root, 'SaPreview')[0]
        instance.$setVifDragData(dragList)
        this.$message.error('请完善组件信息')
        return
      }

      this.onSaveHome(type)
    },
    handlerCk(type, dimensionId) {
      if (type === 'save') {
        setTimeout(() => {
          this.setStepVal(3)
          this.isLoading = false
        }, 1200)
      } else {
        this.dimensionId = dimensionId
        this.isPreview = true
        this.isLoading = false
      }
    },
    onSaveHome(type) {
      this.isLoading = true
      if (!this.isEdit) {
        this.updateHomeSetting().then(() => {
          this.handlerCk(type, this.$route.query.id)
        }).catch(() => {
          this.isLoading = false
        })
      } else {
        this.saveHomeSetting().then(res => {
          this.handlerCk(type, res.data)
        }).catch(() => {
          this.isLoading = false
        })
      }
    },
    onSaveDm(type) {
      this.isLoading = true
      if (!this.isEdit) {
        this.updateDMSetting().then(() => {
          this.handlerCk(type, this.$route.query.id)
        }).catch(() => {
          this.isLoading = false
        })
      } else {
        this.saveDMSetting().then(res => {
          this.handlerCk(type, res.data)
        }).catch(() => {
          this.isLoading = false
        })
      }
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
    ...mapState('renovation', ['staticDragData', 'dragList']),
    isEdit() {
      return _.isEmpty(this.$route.query.id)
    }
  },
  components: { mPreview }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .assembly-model {

  }
</style>
