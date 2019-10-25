<template>
  <div class="drag-tree-model" style="position: relative">
    <v-draggable v-model="tree" v-bind="level1_Opt()" @start="_onStartLevel1" @end="_onEndLevel1">
      <div v-for="(item_1,$index_1) in tree" :key="$index_1" class="level-1-group">
        <div class="level-1-box">
          <div v-if="$index_1 === 0" class="title-box">
            <m-item-info :item-info="{is:true}">
              <div slot="name" class="name">分组名称</div>
              <div slot="operation" class="operation">
                操作
              </div>
            </m-item-info>
          </div>
          <div class="title">
            <m-item-info :item-info="{}">
              <div slot="name" class="name">
                <i class="el-icon-caret-bottom" @click="item_1.show = !item_1.show">{{ item_1.show ? '&#xe872;' : '&#xe635;' }}</i>
                {{ item_1.name }}
                <m-subgrouping type="edit" content-type="text" />
              </div>
              <div slot="operation" class="operation">
                <m-subgrouping type="create" content-type="button" level="1" />
                <m-delete />
              </div>
            </m-item-info>
          </div>
        </div>
        <!--level 1-->
        <template v-if="item_1.children.length">
          <v-draggable v-show="item_1.show" v-model="item_1.children" v-bind="level2_Opt()" @start="_onStartLevel1" @end="_onEndLevel1">
            <div v-for="(item_2,$index_2) in item_1.children" :key="$index_2" class="level-2-group">
              <div class="level-2-box">
                <div class="title">
                  <m-item-info :item-info="{}">
                    <div slot="name" class="name" style="padding-left: 17px;">
                      <i
                        class="el-icon-caret-bottom"
                        @click="item_2.show = !item_2.show"
                      >{{ item_2.show ? '&#xe872;' : '&#xe635;' }}</i>
                      {{ item_2.name }}
                      <m-subgrouping type="edit" content-type="text" />
                    </div>
                    <div slot="operation" class="operation">
                      <m-subgrouping type="create" content-type="button" level="2" />
                      <m-delete />
                    </div>
                  </m-item-info>

                </div>
              </div>
              <!--level 2-->
              <template v-if="item_2.children.length">
                <v-draggable
                  v-show="item_2.show"
                  v-model="item_2.children"
                  v-bind="level3_Opt()"
                  @start="_onStartLevel1"
                  @end="_onEndLevel1"
                >
                  <div v-for="(item_3,$index_3) in item_2.children" :key="$index_3" class="level-3-group">
                    <div class="level-3-box">
                      <div class="title">
                        <m-item-info :item-info="{photo:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}">
                          <div slot="name" class="name" style="padding-left: 46px;">
                            {{ item_3.name }}
                            <m-subgrouping type="edit" content-type="text" level="3" />
                          </div>
                          <div slot="operation" class="operation">
                            <m-subgrouping type="create" content-type="button" level="3" />
                            <m-delete />
                          </div>
                        </m-item-info>
                      </div>
                    </div>
                  </div>
                </v-draggable>
              </template>
              <!--level 2-->
            </div>
          </v-draggable>
        </template>
        <!--level 1-->
      </div>
    </v-draggable>
  </div>
</template>
<script>
import mItemInfo from './itemInfo'
import vDraggable from 'vuedraggable'
import mSubgrouping from './subgrouping'
import mDelete from './delete'

export default {
  name: 'DragTree',
  components: { vDraggable, mItemInfo, mSubgrouping, mDelete },
  props: {},
  data() {
    return {
      drag: false,
      tree: [
        {
          id: 1,
          name: '一级（1）',
          show: true,
          children: [
            {
              id: 3,
              name: '二级（1）',
              show: true,
              children: [
                {
                  id: 4,
                  name: '三级（1）'
                },
                {
                  id: 4,
                  name: '三级（2）'
                }
              ]
            },
            {
              name: '二级（2）',
              id: 4,
              show: true,
              children: []
            }
          ]
        },
        {
          id: 2,
          name: '一级（2）',
          show: true,
          children: [

          ]
        }
      ]
    }
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
  methods: {
    _onStartLevel1() {},
    _onEndLevel1() {
      console.log(this.tree)
    },
    level1_Opt() {
      return { animation: 150, filter: '.level-2-group' }
    },
    level2_Opt() {
      return { animation: 150, filter: '.level-3-group' }
    },
    level3_Opt() {
      return { animation: 150 }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .drag-tree-model {
    font-size: 14px;
    .level-1-group {
      transition: all 0.2s ease-out;
      border: 1px solid #e8eaec;
      border-radius: 3px;
      margin-bottom: 12px;
      background: #fff;
      .icon-edit {
        font-size: 13px;
        color: #409EFF;
      }
      .icon-toggle {
        font-size: 12px;
        color: #aaa;
        padding-right: 2px;
        cursor: pointer;
      }
      .level-1-box {
        >.title {
          border-bottom: 1px solid #e8eaec;
        }
      }

      .level-1-box {
        transition: all 0.2s ease-out;
        &:hover {
          transition: all 0.2s ease-out;
          >.title {
            background: #ebeff8;
          }
        }
      }
      .level-2-group {
        cursor: pointer;
        transition: all 0.2s ease-out;
        &:hover {
          .level-2-box {
            .title {
              background: #ebeff8;
            }
          }
          .level-3-group {
            transition: all 0.2s ease-out;
            background: #fff;
          }
        }
      }
      .level-3-group {
        transition: all 0.2s ease-out;
        &:hover {
          transition: all 0.2s ease-out;
          background: #ebeff8;
        }
      }
      .el-button--mini.is-circle {
        padding: 4px;
      }
      .title,.title-box {
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        padding-left: 20px;
      }
      .title-box {
        border-bottom: 1px solid #e8eaec;
      }

      .level-3-box {
        .title {
          height: 40px;
          line-height: 40px;
          .item-info-model {
            .photo {
              height:40px;
              overflow: hidden;
              >.el-image {
                vertical-align: middle;
              }
            }
            transition: all 0.2s ease-out;
            &:hover {
              > .create-time,
              > .creater,
              > .edit-time,
              > .operation,
              > .modifier,
              > .goods-num,
              > .photo
              {
                background: #409EFF;
                color: #fff;
                transition: all 0.2s ease-out;
              }
            }
          }
        }
      }
    }
  }
</style>
