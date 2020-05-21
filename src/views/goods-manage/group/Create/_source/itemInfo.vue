<template>
  <div class="item-info-model">
    <slot name="name" />
    <div class="photo">
      <el-image
        v-if="itemInfo.pic"
        style="width: 30px; height: 30px"
        :src="showImg(itemInfo.pic)"
        fit="cover"
        @click="onLook(itemInfo.pic)"
      />
      <span v-else>{{ itemInfo.is ? '分组图片' : '&nbsp;' }}</span>
    </div>
    <!-- <div class="goods-num">
      <span>{{ itemInfo.is ? '商品数' : '9999' }}</span>
    </div>-->
    <div class="creater">
      <span>{{ itemInfo.is ? '创建人' : itemInfo.createName }}</span>
    </div>
    <div class="create-time">
      <span>{{ itemInfo.is ? '创建时间' : itemInfo.createTime }}</span>
    </div>
    <!-- <div class="modifier"> -->
    <!--<span>{{ itemInfo.is ? '修改人' : itemInfo.modifyName }}</span>-->
    <!-- </div> -->
    <!-- <div class="edit-time"> -->
    <!--<span>{{ itemInfo.is ? '更新时间' : itemInfo.modifyTime }}</span>-->
    <!-- </div> -->
    <slot name="operation" width="180" />
    <el-image-viewer v-if="isShowImg" :on-close="onCloseImg" :url-list="srcList" />
  </div>
</template>
<script>
import ElImageViewer from '@/components/imageViewer/imageViewer'
export default {
  name: 'ItemInfo',
  components: { ElImageViewer },
  props: {
    itemInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isShowImg: false,
      srcList: []
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onLook(url) {
      this.srcList = [`${this.showImg(url)}?x-oss-process=style/w_800`]
      this.isShowImg = true
    },
    onCloseImg() {
      this.isShowImg = false
    }
  }
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
  > .photo {
    text-align: center;
    position: absolute;
    top: -1px;
    font-size: 12px;
    border-left: 1px solid #e8eaec;
    border-bottom: 1px solid #e8eaec;
  }

  > .photo {
    width: 70px;
    right: 660px;
  }

  > .creater {
    width: 150px;
    right: 510px;
  }

  > .create-time {
    width: 180px;
    right: 355px;
    border-right: 1px solid #e8eaec;
  }

  > .modifier {
    width: 150px;
    right: 210px;
  }

  > .edit-time {
    width: 130px;
    right: 80px;
  }

  > .operation {
    width: 120px;
    right: 15px;
  }
  > .operation-content-center {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  > .operation-content-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
