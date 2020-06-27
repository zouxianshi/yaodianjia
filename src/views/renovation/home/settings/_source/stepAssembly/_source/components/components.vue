<template>
  <div class="sa-components-model">
    <m-tab v-model="tabVal" />
    <div class="scm-comps">
      <div class="scm-comps-class">
        <ul>
          <template v-for="(item,$index) in defaultData[tabVal]">
            <li v-if="item.type !== 'activityAggregate'" :key="$index" :class="{'act':selectVal === item.type}" @click="onToggle(item.type)"><span>{{ item.name }}</span></li>
          </template>
        </ul>
      </div>
      <div class="scrollbar scm-comps-list ">
        <div class="scm-item-box">
          <v-draggable v-model="dragData" draggable=".scm-item" v-bind="dragOptions" @start="onStart">
            <div v-for="(item,$index) in dragData" :key="$index" class="scm-item">
              <m-comps-item :item="item" />
            </div>
          </v-draggable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vDraggable from 'vuedraggable'
import mTab from './_source/tab'
import mCompsItem from './_source/compsItem'

import defaultData from './../../default'

export default {
  name: 'SaComponents',
  data() {
    return {
      defaultData: defaultData,
      tabVal: 'basics',
      selectVal: 'navigation',
      dragData: []
    }
  },
  props: {},
  methods: {
    onToggle(v) {
      this.selectVal = v
      this.handlerDragData()
    },
    onStart() {

    },
    handlerDragData() {
      this.dragData = _.find(this.defaultData[this.tabVal], ['type', this.selectVal]).component
    }
  },
  watch: {
    'tabVal': {
      immediate: true,
      handler(v) {
        this.selectVal = v === 'basics' ? 'navigation' : 'adFrame'
        this.handlerDragData()
      }
    }
  },
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
    dragOptions() {
      return {
        animation: 150,
        disabled: false,
        ghostClass: 'ghost',
        group: {
          put: false,
          name: 'shared',
          pull: 'clone'
        }
      }
    }
  },
  components: { mTab, mCompsItem, vDraggable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-components-model {
    width: 246px;
    height:calc(100vh - 265px);
    background: #F2F2F6;
    .scm-comps {
      overflow: hidden;
      .scm-comps-class,.scm-comps-list {
        float: left;
      }
      .scm-comps-class {
        width: 82px;
        height: calc(100vh - 318px);
        background: #E3E3EA;
        ul {
          li {
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            &.act {
              background: #F2F2F6;
              span {
                font-weight: bold;
                color: #4F88FF;
              }
            }
            span {
              font-size: 14px;
              color: #303030;
              padding-left: 12px;
            }
          }
        }
      }
      .scm-comps-list {
        width: 164px;
        height: calc(100vh - 224px);
        .scm-item-box {
          margin-left: 12px;
          .scm-item {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>
