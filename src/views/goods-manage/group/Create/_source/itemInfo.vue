<template>
  <div class="item-info-model">
    <slot name="name" />
    <div class="photo">
      <el-image
        v-if="itemInfo.pic"
        style="width: 30px; height: 30px"
        :preview-src-list="[itemInfo.pic]"
        :src="itemInfo.pic"
        fit="cover"
      />
      <span v-else>&nbsp;</span>
    </div>
    <div class="goods-num">
      <span>{{ itemInfo.is ? '商品数' : '9999' }}</span>
    </div>
    <div class="creater">
      <span>{{ itemInfo.is ? '创建人' : itemInfo.createName }}</span>
    </div>
    <div class="create-time">
      <span>{{ itemInfo.is ? '创建时间' : itemInfo.createTime }}</span>
    </div>
    <div class="modifier">
      <span>{{ itemInfo.is ? '修改人' : itemInfo.modifyName }}</span>
    </div>
    <div class="edit-time">
      <span>{{ itemInfo.is ? '更新时间' : itemInfo.modifyTime }}</span>
    </div>
    <slot name="operation" />
  </div>
</template>
<script>
export default {
  name: 'ItemInfo',
  components: {},
  props: {
    itemInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
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
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .item-info-model {
    position: relative;
    .iconfont {
      font-weight: normal;
      color: #888;
      vertical-align: middle;
    }
    > .name {
      font-size: 14px;
      font-weight: bold;
    }
    > .create-time,
    > .creater,
    > .edit-time,
    > .operation,
    > .modifier,
    > .goods-num,
    > .photo
    {
      text-align: center;
      position: absolute;
      top: 0;
      font-size: 12px;
      border-left: 1px solid #e8eaec;
      border-bottom: 1px solid #e8eaec;
    }

    > .photo {
      width: 48px;
      right: 650px;
    }

    > .goods-num {
      width: 70px;
      right: 580px;
    }

    > .creater {
      width: 120px;
      right: 460px;
    }

    > .create-time {
      width: 130px;
      right: 330px;
    }

    > .modifier {
      width: 120px;
      right: 210px;
    }

    > .edit-time {
      width: 130px;
      right: 80px;
    }

    > .operation {
      width: 80px;
      right: 0;
    }
  }
</style>
