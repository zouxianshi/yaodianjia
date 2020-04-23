<template>
  <div class="save-dialog-model">
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" size="mini" label-width="80px">
        <el-form-item label="模版名称" prop="name">
          <el-input v-model="ruleForm.name" maxlength="12" />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'SaveDialog',
  data() {
    return {
      loading: false,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入模版名称', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {},
  methods: {
    ...mapActions('mall', ['saveStructure']),
    ...mapMutations('mall', ['setDragGlobal']),
    onClose() {
      this.$emit('on-close')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { name } = this.ruleForm
          this.setDragGlobal({ name })
          setTimeout(() => {
            this.loading = true
            this.saveStructure().then(() => {
              this.$message.success('保存成功！')
              setTimeout(() => {
                this.$router.push(`/mall/home`)
                this.loading = false
              }, 1200)
            })
          })
        } else {
          return false
        }
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.ruleForm.name = _.cloneDeep(this.dragGlobal.name)
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
    ...mapState('mall', ['dragGlobal'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .save-dialog-model {
    margin: 20px 0;
    .dialog-footer {
      padding-top: 20px;
      text-align: right;
    }
  }
</style>
