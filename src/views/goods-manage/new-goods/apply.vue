<template>
  <div class="app-container">
    <div class="apply-wrapper">
      <h5 class="titles">新品申请</h5>
      <el-alert
        title="如海典标库未找到您想要的商品，您可以自行新建商品上架"
        type="info"
        style="margin-top:20px"
        :closable="false"
      />
      <div class="mclist">
        <li class="dpc">
          <div class="m">
            <div class="bg"><i class="el-icon-document" /></div>
            <div class="name">单品创建</div>
            <div class="det">按流程填写详细的产品资料，经过人工审核后，审核成功的产品将被导入我的产品库。</div>
            <p class="text-center">
              <a href="#/goods-manage/single-create">
                <button
                  type="button"
                  class="el-button btn el-button--default"
                >立即创建</button>
              </a>
            </p>
          </div>
        </li>
        <li class="plc">
          <div class="m">
            <div class="bg"><i class="el-icon-menu" /></div>
            <div class="name">批量创建</div>
            <div class="det">通过指定格式的excel表格数据批量创建新产品，审核成功的产品将被导入我的产品库。</div>
            <p class="text-center">
              <a href="#/goods-manage/batch-create">
                <button
                  type="button"
                  class="el-button btn el-button--default"
                > 立即创建</button>
              </a>
            </p>
          </div>
        </li>
        <!-- <li class="xpc">
          <div class="m">
            <div class="bg"><i class="el-icon-tickets" /></div>
            <div class="name">新品申请记录</div>
            <div class="det">申请的新品将会记录在这里，可以查看新品申请进度，完善产品信息，重新申请新品。</div>
            <p class="text-center">
              <a href="#/goods-manage/apply-record">
                <button
                  type="button"
                  class="el-button btn el-button--default"
                >立即查看</button>
              </a></p>
          </div>
        </li> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.apply-wrapper {
  .titiles {
    color: #333;
  }
  .mclist {
    display: flex;
    width: 100%;
    margin-top: 15px;
    li {
      width: 33.3%;
      flex-grow: 1;
      height: 320px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-right: 10px;
      .m {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 2px;
        .bg {
          width: 100%;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          i{
            font-size: 40px;
            color: #fff
          }
        }
        .name {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0 15px;
          font-size: 14px;
          color: #303133;
          margin-top: 10px;
          text-align: center;
        }
        .det {
          height: 60px;
          font-size: 12px;
          color: #606266;
          line-height: 20px;
          margin-top: 10px;
          padding: 0 18px;
        }
      }
      &.dpc {
        .bg {
          background: linear-gradient(45deg, #ed3ac0, #e580e1);
        }
      }
      &.plc {
        .bg {
          background: linear-gradient(45deg, #94dc23, #c7e14d);
        }
      }
      &.xpc {
        .bg {
          background: linear-gradient(45deg, #2695db, #83aae0);
        }
      }
    }
  }
}
</style>
