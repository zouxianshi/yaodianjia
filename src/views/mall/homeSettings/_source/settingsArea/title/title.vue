<template>
  <div v-loading="saLoading" class="sa-title-box sam-width">
    <el-form label-width="90px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="name" placeholder="请输入标题" @change="() => isName = !name" />
        <div v-if="isName" class="sa-error">
          {{ searchParams.type === 'mall-title' ? '请填写微商城标题' : '请填写标题' }}
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
    itemParams: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapMutations('mall', ['setHomeName']),
    onSubmit() {
      const { name, searchParams, searchParams: { type }, item } = this
      this.isName = false
      if (!name) {
        this.isName = true
        return false
      }
      // handler title two operation
      if (type === 'mall-title') {
        // 保存全局接口
        this.setHomeName(name)
      } else {
        this.$emit('on-update', { ...searchParams, itemList: [{ ...item, name }] }, () => {
          this.loading = false
        })
      }
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.searchParams = this.itemParams
    this.name = _.cloneDeep(this.searchParams.type === 'mall-title' ? this.dragGlobal.title : this.item.name)
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
    ...mapState('mall', ['saLoading', 'dragGlobal'])
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
