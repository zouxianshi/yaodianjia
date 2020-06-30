<template>
  <div class="sap-header-model">
    <div class="shm-page-title">
      <span>海典微商城</span>
    </div>
    <div class="shm-search-name" @click="onSearchHint">
      <div class="shm-search-value">{{ basics.searchHint }}</div>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { jumpSelectAss } from './../../utils'
import { searchHintItem } from './../../../../default'

export default {
  name: 'SapHeader',
  data() {
    return {}
  },
  props: {},
  methods: {
    onSearchHint() {
      jumpSelectAss(this.$root, searchHintItem)
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-header-model {
    width: 358px;
    height: 124px;
    background: url('./../../img/header.png') no-repeat;
    .shm-page-title {
      text-align: center;
      padding-top: 48px;
      span {
        font-size: 20px;
      }
    }
    .shm-search-name {
      height: 40px;
      margin-top: 14px;
      cursor: pointer;
      border: 2px dotted transparent;
      .shm-search-value {
        width: 130px;
        height: 40px;
        line-height: 38px;
        margin-left: 168px;
        font-size: 14px;
        color: #999;
      }
      &:hover {
        border: 2px dotted #4F88FF;
        box-shadow: 0px 2px 18px 0 rgba(0,0,0,0.2);
      }
    }
  }
</style>
