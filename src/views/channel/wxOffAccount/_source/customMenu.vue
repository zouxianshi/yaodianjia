<template>
  <div class="custom-menu-model">
    <div class="cmm-operation">
      <el-button size="small" @click="onCancel">取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-position" :loading="loading" @click="onSave">保存</el-button>
    </div>
    <div class="cmm-view-window">
      <el-card :body-style="{ padding: '0px' }">
        <m-view-window />
      </el-card>
    </div>
    <div class="cmm-menu-settings">
      <el-card>
        <m-menu-settings />
      </el-card>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapMutations, mapState, mapActions } from 'vuex'
import { getMenuData } from '@/api/channelService'
import mViewWindow from './viewWindow'
import mMenuSettings from './menuSettings'
export default {
  name: 'CustomMenu',
  components: { mViewWindow, mMenuSettings },
  props: {},
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('channel', ['VUE_APP_MEMBER_CENTER', 'menuData']),
    ...mapState('user', ['merCode'])
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
  methods: {
    ...mapActions('channel', ['saveCustomMenu']),
    ...mapMutations('channel', ['setMenuData', 'setLoading']),
    onCancel() {
      this.getData()
    },
    onSave() {
      this.loading = true
      // save all params
      this.saveCustomMenu().then(() => {
        this.$message({ message: '保存成功', type: 'success' })
        this.loading = false
      }).catch(async(res) => {
        if (res.code === '40027') {
          this.$message({ message: '跳转地址不能为空', type: 'error' })
        } else {
          await this.getData()
        }
        this.loading = false
      })
    },
    getData() {
      this.setLoading(true)
      getMenuData(this.$store.state.user.merCode).then(async res => {
        const { button } = res.data || { button: [] }
        const VUE_APP_MEMBER_CENTER = this.VUE_APP_MEMBER_CENTER + this.merCode
        if (button.length) {
          const newMenuData = button
          _.map(newMenuData, v => {
            if (v.url === VUE_APP_MEMBER_CENTER) {
              v.type = 'memberCard'
              v.url = ''
            }
            if (v.sub_button.length) {
              _.map(v.sub_button, v1 => {
                if (v1.url === VUE_APP_MEMBER_CENTER) {
                  v1.type = 'memberCard'
                  v1.url = ''
                }
              })
            }
          })
          await this.setMenuData(newMenuData)
        }
        this.setLoading(false)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .custom-menu-model {
    height: calc(100vh - 250px);
    overflow-y: scroll;
    padding-left: 320px;
    .cmm-operation {
      position: absolute;
      right: 20px;
      top: -58px;
      z-index: 1;
    }
    .cmm-view-window {
      width: 320px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .cmm-menu-settings {
      width: calc(100% - 40px);
      margin-left: 20px;
    }
  }
</style>
