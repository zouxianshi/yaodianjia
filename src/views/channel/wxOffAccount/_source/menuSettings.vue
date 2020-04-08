<template>
  <div v-loading="loading" class="menu-settings-model">
    <div v-if="menuData.length" class="msm-list">
      <m-level1-menu v-for="(item,$index) in menuData" :key="$index" :level1-index="$index" :item="item" />
    </div>
    <div v-else class="msm-no-data">
      <p>暂无数据</p>
    </div>
    <div v-if="menuData.length < 3" class="msm-box">
      <m-edit-name v-if="isNew" :level1-index="null" :level2-index="null" @on-update="_onUpdate">
        <el-button type="primary" style="width: 100%;" size="mini"> + 新增一级菜单</el-button>
      </m-edit-name>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mLevel1Menu from './level1Menu'
import mEditName from './editName'
export default {
  name: 'MenuSettings',
  components: { mLevel1Menu, mEditName },
  props: {},
  data() {
    return {
      isNew: true
    }
  },
  computed: {
    ...mapState('channel', ['menuData', 'loading'])
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
  methods: {
    _onUpdate() {
      this.isNew = false
      setTimeout(() => {
        this.isNew = true
      }, 1)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .menu-settings-model {
    .msm-no-data {
      text-align: center;
      font-size: 12px;
      padding: 178px 0;
    }
    .msm-box {
      padding-top: 20px;
    }
  }
</style>
