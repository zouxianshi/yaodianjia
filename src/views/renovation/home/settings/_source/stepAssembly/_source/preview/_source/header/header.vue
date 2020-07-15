<template>
  <div class="sap-header-model" :class="{'is-dm':!isHome}">
    <div class="shm-page-title">
      <span>{{ basics.title }}-aaaaaa</span>
    </div>
    <div v-if="isHome" class="shm-search-name" @click="onSearchHint">
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
    return {
      isHome: this.$route.name === 'renovation-home-settings'
    }
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
    position: relative;
    &.is-dm {
      height: 72px;
    }
    .shm-page-title {
      text-align: center;
      padding-top: 50px;
      span {
        font-size: 18px;
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
