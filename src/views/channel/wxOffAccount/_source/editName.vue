<template>
  <el-popover v-model="visible" placement="top" popper-class="plx-edit-model">
    <p class="p-input">
      <el-input v-model="nName" size="mini" placeholder="请输入菜单名称" style="width: 180px" />
    </p>
    <p v-if="errorText" class="p-error">{{ errorText }}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" :loading="!visible" @click="onSave">保存</el-button>
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
    /**
     *  名称
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * 层级1
     */
    level1Index: {
      type: Number,
      default: 0
    },
    /**
     * 层级2
     */
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
    ...mapState('channel', ['menuData']),
    isSlots() {
      return !_.isEmpty(this.$slots.default)
    }
  },
  watch: {
    visible() {
      this.nName = _.cloneDeep(this.name)
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
  methods: {
    ...mapMutations('channel', ['editMenu', 'addMenuLevel1', 'addMenuLevel2']),
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
        const { nName, level1Index, level2Index } = this
        const item = {
          name: nName,
          sub_button: [],
          type: 'view',
          url: ''
        }

        if (_.isNull(level1Index) && _.isNull(level2Index)) {
          await this.addMenuLevel1({
            item
          })
        } else if (!_.isNull(level1Index) && _.isNull(level2Index)) {
          await this.addMenuLevel2({
            item,
            level1Index
          })
        } else {
          await this.editMenu({
            item: {
              name: nName
            },
            level1Index,
            level2Index
          })
        }
        this.visible = false
        this.$emit('on-update')
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
