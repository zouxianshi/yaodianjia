<template>
  <div class="basics-setting-model">
    <el-form ref="basics" :model="basics" label-width="142px">
      <el-form-item label="模板名称">
        <el-input v-model="basics.name" style="width: 320px;" maxlength="12" placeholder="请输入最多不超过12个汉字" @change="onChange" />
        <span class="bsm-text">当前模板名称用于辨识此模板</span>
        <div v-if="error.isName" class="bm-basics-error">
          {{ error.isName }}
        </div>
      </el-form-item>
      <el-form-item label="页面标题">
        <el-input v-model="basics.title" style="width: 320px;" maxlength="12" placeholder="请输入最多不超过12个汉字" @change="onChange" />
        <span class="bsm-text">当前页面标题用于页面展示及页面微信分享标题</span>
        <div v-if="error.isTitle" class="bm-basics-error">
          {{ error.isTitle }}
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'BasicsSetting',
  data() {
    return {
      error: {
        isName: false,
        isTitle: false
      }
    }
  },
  props: {
  },
  methods: {
    $verification() {
      const { name, title } = this.basics
      let flag = true

      this.reset()

      if (!name) {
        this.error.isName = '请输入模板名称'
        flag = false
      }

      if (!title) {
        this.error.isTitle = '请输入页面标题'
        flag = false
      }

      return flag
    },
    reset() {
      this.error = _.assign(this.error, {
        isName: false,
        isTitle: false
      })
    },
    onChange() {
      this.$verification()
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
  computed: {
    ...mapState('renovation', ['basics'])
  },
  components: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .basics-setting-model {
    .bsm-text {
      font-size: 14px;
      color: #9B9B9B;
      margin-left: 20px;
    }
  }
</style>
