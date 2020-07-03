<template>
  <div class="announcement-form-item-model">
    <el-form label-width="90px" size="mini">
      <el-form-item label="公告内容">
        <el-input v-model="item.name" maxlength="16" @change="onUploadItem" />
        <div v-if="error.isName" class="sa-assembly-error">
          {{ error.isName }}
        </div>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="item.url" style="width: calc(100% - 101px)" readonly />
        <el-button icon="el-icon-link" @click="dialogVisible = true">选择链接</el-button>
      </el-form-item>
    </el-form>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body size="600px" :visible.sync="dialogVisible">
      <div slot="title">
        选择链接
      </div>
      <m-links-table v-if="dialogVisible" :url="item.url" @on-link="onLink" />
    </el-drawer>
  </div>
</template>
<script>
import mLinksTable from '@/views/mall/homeSettings/_source/settingsArea/_source/linksTable'
export default {
  name: 'AnnouncementFormItem',
  data() {
    return {
      dialogVisible: false,
      item: {},
      error: {
        isName: false,
        isUrl: false
      }
    }
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    $verification() {
      const { name } = this.item
      let flag = true

      this.reset()

      if (!name) {
        this.error.isName = '请输入公告内容'
        flag = false
      }

      return flag
    },
    reset() {
      this.error = _.assign(this.error, {
        isName: false,
        isUrl: false
      })
    },
    onLink({ url }) {
      this.$set(this.item, 'url', url)
      this.onUploadItem()
    },
    onUploadItem() {
      this.$emit('on-el-update', this.item)
      this.$verification()
    }
  },
  watch: {
    'el': {
      deep: true,
      immediate: true,
      handler(v) {
        this.item = _.cloneDeep(v)
      }
    }
  },
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
  components: { mLinksTable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .announcement-form-item-model {
    .afim-st {
      margin-top: 12px;
      .afim-text-1 {
        font-size: 12px;
        color: #303030;
        margin-left: 12px;
        display: inline-block;
      }
    }
  }
</style>
