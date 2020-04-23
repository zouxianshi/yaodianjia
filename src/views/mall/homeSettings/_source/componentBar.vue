<template>
  <div class="component-bar-model">
    <div class="cbm-title">
      <b>组件选择</b>
    </div>
    <div class="cbm-operation">
      <el-button size="small" icon="el-icon-share" @click="onPreview">预览</el-button>
      <el-button type="primary" size="small" icon="el-icon-upload" :loading="loading" @click="onSubmit">保存</el-button>
    </div>
    <div class="cbm-nav-box">
      <el-tabs v-model="activeName" type="card" size="small">
        <el-tab-pane v-for="(item,$index) in dragComponent" :key="$index" :name="item.name" :label="item.name">
          <div class="cbm-draggable">
            <v-draggable v-model="item.component" draggable=".item" v-bind="dragOptions" @start="onStart">
              <span v-for="(el,i) in item.component" :key="i" class="item">
                <el-button size="small">{{ el.name }}</el-button>
              </span>
            </v-draggable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="效果预览" append-to-body :visible.sync="isPreview" width="710px">
      <m-preview v-if="isPreview" @on-close="() => isPreview = false" />
    </el-dialog>
  </div>
</template>
<script>

import { findComponentsDownward } from '@/utils'
import vDraggable from 'vuedraggable'
import { handlerDragComp } from './_source/default'
import mPreview from './_source/preview'

export default {
  name: 'ComponentBar',
  components: { vDraggable, mPreview },
  props: {},
  data() {
    return {
      dragComponent: handlerDragComp(),
      activeName: '导航栏',
      loading: false,
      isPreview: false
    }
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
  methods: {
    onVerif(type) {
      return new Promise((resolve, reject) => {
        const instance = findComponentsDownward(this.$root, 'ViewArea')[0]
        instance.handlerVerifDragData(type, (is) => {
          resolve(is)
        })
      })
    },
    onPreview() {
      this.onVerif('preview').then((is = true) => {
        if (is) {
          this.isPreview = true
        }
      })
    },
    onSubmit() {
      this.loading = true
      this.onVerif().then(() => {
        this.loading = false
      })
    },
    onStart() {
      this.dragComponent = handlerDragComp()
    }
  },
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .component-bar-model {
    height: 116px;
    position: relative;
    .cbm-operation {
      position: absolute;
      right: 20px;
      top: 9px;
      z-index: 1;
    }
    .cbm-nav-box {
      .el-tabs__nav-scroll {
        padding: 14px 0 0 110px;
        .el-tabs__item {
          height: 36px;
          line-height: 36px;
        }
      }
    }
    .cbm-title {
      position: absolute;
      left: 27px;
      top: 21px;
      b {
        font-size: 14px;
      }
    }
    .cbm-draggable {
      padding-left: 110px;
      .item {
        margin-right: 10px;
      }
    }
  }
</style>
