<template>
  <div v-loading="saLoading" class="sa-title-box">
    <el-form label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="name" placeholder="请输入标题" @change="() => isName = !name" />
        <div v-if="isName" class="sa-error">
          {{ type === 'mall-title' ? '请填写微商城标题' : '请填写标题' }}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" :loading="loading" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { itemParams } from './../../_source/default'

export default {
  name: 'SaTitleBox',
  data() {
    return {
      name: '',
      isName: false,
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: [],
        subType: 'first',
        title: '',
        type: 'title'
      },
      loading: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapMutations('mall', ['setHomeName']),
    onSubmit() {
      const { name, searchParams } = this
      this.isName = false
      if (!name) {
        this.isName = true
        return false
      }
      // handler title two operation
      if (this.type === 'mall-title') {
        // 保存全局接口
        this.setHomeName(name)
      } else {
        this.$emit('on-update', { ...searchParams, itemList: [{ ...itemParams, name }] }, () => {
          this.loading = false
        })
      }
    }

  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.name = _.cloneDeep(this.item.name)
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
    ...mapState('mall', ['saLoading'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import './../../../../../../assets/scss/helpers/mixins';
  .sa-title-box {
    padding: 20px;
    @include mixinFadeInUp()
  }
</style>
