<template>
  <div class="select-link-model">
    <div class="slm-page-type">
      <el-radio-group v-model="pageType" size="small" @change="onChangePageType">
        <el-radio-button v-for="item in pageTypeList" :key="item.code" :label="item.name" />
      </el-radio-group>
    </div>
    <div class="slm-page-content">
      <el-table :data="list" style="width: 100%" size="mini" class="scrollbar" height="calc(100vh - 208px)" @row-click="onRowClick">
        <el-table-column label="" width="50">
          <template slot-scope="scope">
            <el-radio v-model="linkUrl" :label="scope.row.linkAddress">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="pageName" label="跳转页面" show-overflow-tooltip width="100" />
        <el-table-column prop="linkAddress" label="链接" show-overflow-tooltip />
      </el-table>
    </div>
    <div class="slm-page-ope">
      <el-button size="small" type="text" @click="$parent.closeDrawer()">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
import { getInternalLink } from '@/api/mallService'
import { pageTypeList } from './utils'

export default {
  name: 'SelectLink',
  data() {
    return {
      pageTypeList,
      pageType: '活动页面',
      list: [],
      linkUrl: ''
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    getPageTypeId() {
      return _.find(pageTypeList, ['name', this.pageType])['code']
    },
    getLinkUrl() {
      return _.find(this.list, ['linkAddress', this.linkUrl])['linkAddress']
    },
    onChangePageType() {
      this.getData(this.getPageTypeId())
    },
    onRowClick({ linkAddress }) {
      this.linkUrl = linkAddress
    },
    getData(pageType = 2) {
      this.linkUrl = ''
      getInternalLink({ pageType }).then((res) => {
        this.list = res.data
        this.linkUrl = _.cloneDeep(this.url)
      })
    },
    async onSubmit() {
      await this.$emit('on-link', { url: this.getLinkUrl() })
      this.$parent.closeDrawer()
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getData()
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
  .select-link-model {
    .slm-page-type,.slm-page-content {
      padding: 0 20px;
    }
    .slm-page-content{
      overflow-y: scroll;
      margin: 20px 0;
      padding-right: 16px;
      .el-table thead th {
        height: 36px;
      }
    }
    .slm-page-ope {
      padding: 12px 20px;
      border-top: 1px solid #E5E5E5;
      text-align: right;
    }
  }
</style>
