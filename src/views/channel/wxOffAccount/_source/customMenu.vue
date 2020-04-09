<template>
  <div class="custom-menu-model">
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
import { mapMutations, mapState } from 'vuex'
import { getMenuData } from '@/api/channelService'
import mViewWindow from './viewWindow'
import mMenuSettings from './menuSettings'
export default {
  name: 'CustomMenu',
  components: { mViewWindow, mMenuSettings },
  props: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapState('channel', ['VUE_APP_MEMBER_CENTER'])
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
    ...mapMutations('channel', ['setMenuData', 'setLoading']),
    getData() {
      this.setLoading(true)
      getMenuData(this.$store.state.user.merCode).then(async res => {
        const { button } = res.data || { button: [] }
        const { VUE_APP_MEMBER_CENTER } = this
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
