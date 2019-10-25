<script>
export default {
  name: 'Operation',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
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
  methods: {},
  render() {
    return (
      <el-popover placement='top' width='160' >
        <p>确定删除吗 ？</p>
        <div style='text-align: right; margin: 0'>
          <el-button size='mini' type='text' >取消</el-button>
          <el-button type='primary' size='mini' >确定</el-button>
        </div>
        <el-tooltip slot='reference' class='item' effect='dark' content='删除' placement='top'>
          <el-button type='danger' icon='el-icon-delete' circle size='mini' />
        </el-tooltip>
      </el-popover>
    )
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
