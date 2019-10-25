const mixin = {
  data() {
    return {
      total: 0,
      loading: false,
      listQuery: {
        currentPage: 1,
        pageSize: 20
      }
    }
  }
}
export default mixin
