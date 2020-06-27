<template>
  <div class="set-item-card-model">
    <div class="sicm-item-box">
      <div class="sicm-title">
        <strong>{{ title }}</strong>
        <div v-if="isDelete" class="sicm-delete" @click="$emit('on-ass-delete')">删除</div>
      </div>
      <div class="sicm-content">
        <slot />
      </div>
    </div>
    <div class="sicm-item-submit">
      <el-button type="primary" plain @click="$emit('on-ass-submit')">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SetItemCard',
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-item-card-model {
    .sicm-item-box {
      border: 1px solid #F0F0F0;
      border-radius:2px;
      .sicm-title {
        height: 32px;
        line-height: 30px;
        background: #F0F0F0;
        position: relative;
        strong {
          font-size: 14px;
          color: #4A4A4A;
          padding-left: 12px;
        }
        .sicm-delete {
          font-size: 12px;
          color: #4F88FF;
          position: absolute;
          right: 10px;
          top: 1px;
          cursor: pointer;
        }
      }
      .sicm-content {
        padding: 20px;
      }
    }
    .sicm-item-submit {
      text-align: center;
      padding: 30px 0;
      .el-button {
        padding-left: 30px;
        padding-right: 30px;
      }
    }
  }
</style>
