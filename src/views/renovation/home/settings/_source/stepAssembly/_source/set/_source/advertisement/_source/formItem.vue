<template>
  <div class="advertisement-form-item-model">
    <div class="afim-img-form">
      <span class="afim-img">
        <m-item-no-data height="87px" />
      </span>
      <span class="afim-upload">
        <m-el-upload>
          <el-button icon="el-icon-position" size="mini">本地上传</el-button>
        </m-el-upload>
      </span>
    </div>
    <div class="afim-form">
      <el-form label-width="80px" size="mini">
        <el-form-item label="导航链接">
          <el-input v-model="name" style="width: calc(100% - 101px)" />
          <el-button icon="el-icon-link">选择链接</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../../itemNoData'
import mElUpload from './../../../../../../elUpload'
export default {
  name: 'FormItem',
  data() {
    return {
      name: ''
    }
  },
  props: {},
  methods: {},
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
  components: { mItemNoData, mElUpload }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .advertisement-form-item-model {
    .afim-img-form {
      overflow: hidden;
      margin-bottom: 20px;
      .afim-img {
        width: 120px;
        height: 87px;
        float: left;
      }
      .afim-upload {
        float: left;
        margin-left: 24px;
        margin-top: 20px;
      }
    }
  }
</style>
