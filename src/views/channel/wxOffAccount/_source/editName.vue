<template>
  <el-popover v-model="visible" placement="top" popper-class="plx-edit-model">
    <p class="p-input">
      <el-input v-model="nName" size="mini" placeholder="请输入内容" style="width: 180px" />
    </p>
    <p v-if="errorText" class="p-error">{{ errorText }}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onSave">确定</el-button>
    </div>
    <slot v-if="isSlots" slot="reference" />
    <el-button v-else slot="reference" type="primary" icon="el-icon-edit-outline" size="mini" circle />
  </el-popover>
</template>
<script>
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Edit',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    level1Index: {
      type: Number,
      default: 0
    },
    level2Index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      visible: false,
      nName: '',
      errorText: ''
    }
  },
  computed: {
    ...mapState('channel', ['menuData', 'VUE_APP_MEMBER_CENTER']),
    isSlots() {
      return !_.isEmpty(this.$slots.default)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.nName = _.cloneDeep(this.name)
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
    ...mapMutations('channel', ['editMenu', 'addMenuLevel1']),
    verification() {
      const { nName, level2Index } = this
      this.errorText = ''
      if (!nName) {
        this.errorText = '菜单名称不能为空！'
        return false
      }
      if (level2Index === -1 && _.size(nName) > 4) {
        this.errorText = '一级菜单名称不能大于4位！'
        return false
      }
      if (level2Index > -1 && _.size(nName) > 8) {
        this.errorText = '二级菜单名称不能大于8位！'
        return false
      }

      return true
    },
    async onSave() {
      if (this.verification()) {
        const { nName, level1Index, level2Index, menuData, VUE_APP_MEMBER_CENTER } = this
        if (level2Index > menuData.length || !menuData.length || _.isNull(level1Index)) {
          await this.addMenuLevel1({
            name: nName,
            sub_button: [],
            type: 'view',
            url: VUE_APP_MEMBER_CENTER
          })
        } else {
          await this.editMenu({ item: { name: nName }, level1Index, level2Index })
        }
        this.$emit('on-update')
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .plx-edit-model {
    .p-input,.p-error {
      margin-bottom: 10px;
    }
    .p-error {
      font-size: 12px;
      color: #ff0000;
    }
  }
</style>
