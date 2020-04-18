<template>
  <div class="sa-title-box">
    <el-form label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="name" placeholder="请输入标题" @change="() => isName = !name" />
        <div v-if="isName" class="sa-error">
          {{ code === 'mall-title' ? '请填写微商城标题' : '请填写标题' }}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SaTitleBox',
  data() {
    return {
      name: '',
      isName: false,
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: '',
        subType: 'first',
        title: '',
        type: 'navigation'
      },
      loading: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    code: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions('mall', ['saveStructure']),
    onSubmit() {
      const { name } = this
      this.isName = false
      if (!name) {
        this.isName = true
        return false
      }
      // handler title two operation
      if (this.code === 'mall-title') {
        // 保存全局接口
        this.saveStructure({
          'id': 'string',
          'merCode': 'string',
          'name': 'string',
          'setIds': [],
          'title': 'string',
          'userName': 'string'
        }).then(() => {

        })
      } else {
        this.$emit('on-update', this.searchParams, () => {
          this.loading = false
        })
      }
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
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-title-box {
    padding: 20px;
  }
</style>
