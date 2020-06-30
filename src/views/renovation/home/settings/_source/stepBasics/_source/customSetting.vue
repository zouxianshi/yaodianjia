<template>
  <div class="custom-model">
    <el-form ref="basicsModel" :model="basicsModel" label-width="142px">
      <el-form-item label="背景颜色">
        <span class="cm-color">
          <el-color-picker v-model="basics.backgroundColor" />
          <span class="cm-color-text">{{ basics.backgroundColor }}</span>
        </span>
        <span class="cm-text" style="position: relative;top:-6px;">设置当前页面整体背景色，默认#FFFFFF</span>
      </el-form-item>
      <el-form-item label="组件边框">
        <el-select v-model="basics.borderFlag" placeholder="请选择">
          <el-option v-for="item in [{value:0,label:'无边框'},{value:1,label:'有边框'},]" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span class="cm-text">此选项为联动选项</span>
      </el-form-item>
      <div v-if="basics.borderFlag === 1">
        <el-form-item label="边框样式">
          <el-select v-model="basics.borderStyle" placeholder="请选择">
            <el-option v-for="item in [{value:0,label:'直角'},{value:1,label:'圆角'},]" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="边框大小">
          <el-input-number v-model="basics.borderSize" controls-position="right" :min="1" :max="10" style="width: 192px;" />
        </el-form-item>
        <el-form-item label="边框颜色">
          <span class="cm-color">
            <el-color-picker v-model="basics.borderColor" />
            <span class="cm-color-text">{{ basics.borderColor }}</span>
          </span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'StepBasicsCustom',
  data() {
    return {
      basicsModel: {}
    }
  },
  props: {
  },
  methods: {
    ...mapMutations('renovation', ['setBasics'])
  },
  watch: {
    'basics.borderFlag': {
      handler(v) {
        if (v === 0) {
          this.setBasics({
            borderStyle: 0,
            borderSize: 0,
            borderColor: '#FFFFFF'
          })
        }
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
  computed: {
    ...mapState('renovation', ['basics'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .custom-model {
    .cm-color {
      height: 36px;
      line-height: 36px;
      border: 1px solid #DCDFE6;
      display: inline-block;
      border-radius:4px;
      padding: 0 8px;
      .cm-color-text {
        font-size: 16px;
        color: #303030;
        margin-left: 8px;
        position: relative;
        top: -12px;
      }
      .el-color-picker__trigger {
        border: none;
        margin-top: -1px;
      }
    }
    .cm-text {
      font-size: 14px;
      color: #9B9B9B;
      margin-left: 16px;
    }
  }
</style>
