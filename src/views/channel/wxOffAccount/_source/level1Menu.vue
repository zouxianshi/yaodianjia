<template>
  <div class="level1-menu-model">
    <div class="lmm-item">
      <div class="lmm-nav-box">
        <ul>
          <li class="nb-title"><b>一级菜单</b></li>
          <li class="nb-item" :class="{'active':activeElIndex === -1}" @click="onSelected(-1)">
            <span class="sp-name">{{ item.name }}</span>
            <span class="sp-op">
              <m-edit :name="item.name" :level2-index="activeElIndex" :level1-index="level1Index" />
              <m-delete :level2-index="activeElIndex" :level1-index="level1Index" />
            </span>
          </li>
          <li class="nb-title"><b>二级菜单</b></li>
          <li v-for="(el,$index) in item.sub_button" :key="$index" :class="{'active':activeElIndex === $index}" class="nb-item" @click="onSelected($index)">
            <span class="sp-name">{{ el.name }}</span>
            <span class="sp-op">
              <m-edit :name="el.name" :level2index="activeElIndex" :level1-index="level1Index" />
              <m-delete :level2-index="activeElIndex" :level1-index="level1Index" />
            </span>
          </li>
        </ul>
      </div>
      <div class="lmm-textarea">
        <p>{{ cpdUrl }}</p>
      </div>
      <div class="clearfix" />
      <div class="operation">
        <!--跳转url-->
        <m-to-url />
        <!--跳转小程序-->
        <m-to-mp />
      </div>
    </div>
  </div>
</template>
<script>
import mDelete from './delete'
import mEdit from './edit'
import mToUrl from './toUrl'
import mToMp from './toMp'

export default {
  name: 'Level1Menu',
  components: { mDelete, mEdit, mToUrl, mToMp },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    level1Index: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      activeElIndex: -1
    }
  },
  computed: {
    cpdUrl() {
      const { activeElIndex, item: { url, sub_button }} = this
      return activeElIndex === -1 ? url : sub_button[activeElIndex].url
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
  methods: {
    onSelected(i) {
      this.activeElIndex = i
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .level1-menu-model {
    margin-bottom: 16px;
    .lmm-item {
      border-radius: 4px;
      border: 1px solid #e6ebf5;
      overflow: hidden;
      .lmm-nav-box {
        width: 220px;
        float: left;
        min-height: 180px;
        border-right: 1px solid #e6ebf5 ;
        padding-top: 8px;
        background: #FDFDFD;
        ul {
          width: 180px;
          position: relative;
          left:40px;
          li {
            margin-bottom: 8px;
            &.nb-title {
              font-size: 14px;
              margin: 12px 0;
            }
            &.nb-item {
              height: 32px;
              border: 1px solid #e6ebf5;
              position: relative;
              border-radius: 4px 0 0 4px;
              border-right: 0;
              cursor: pointer;
              &:hover {
                .sp-name {
                  color: #147de8;
                }
              }
              &.active {
                position: relative;
                z-index: 1;
                background: #fff;
                .sp-name {
                  font-weight: bold;
                  color: #147de8;
                }
              }
              .sp-name {
                font-size: 12px;
                line-height: 30px;
                padding-left: 8px;

              }
              .sp-op {
                position: absolute;
                right: 10px;
                top: 5px;
                .el-button--mini.is-circle {
                  padding: 2px;
                  margin-left: 3px;
                }
              }
            }
          }
        }
      }
      .lmm-textarea {
        float: left;
        width: calc(100% - 220px);
        p {
          padding: 20px;
          font-size: 14px;
          color: #444;
        }
        //.el-button--mini.is-circle
      }
      .operation {
        padding: 10px;
        border-top: 1px solid #e6ebf5;
        text-align: right;
      }
    }
  }
</style>
