/**
 * @author        quanquan
 * @dateTime      2020-06-26 10:16:40
 * @description   mixins { borderFlag,... }
 */
import { mapState } from 'vuex'

export const globalBinding = {
  data() {
    return {}
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
  computed: {
    ...mapState('renovation', ['borderFlag']),
    stylees() {
      return [
        {
          padding: `0 ${this.borderFlag}px`
        }
      ]
    }
  },
  components: {}
}
