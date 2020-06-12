<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="20%"
    append-to-body
    :close-on-click-modal="false"
    @closed="$emit('closed')"
  >
    <p>{{ content }}</p>
  </el-dialog>
</template>
<script>
export default {
  name: 'NotAsyncDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '未同步过来的商品编码'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
