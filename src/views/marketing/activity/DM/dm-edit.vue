<template>
  <div class="dashboard-container">
    <div v-loading="pageLoading" class="app-container" element-loading-text="加载中">
      <section class="x-header">
        <!-- 标题 -->
        <h5>编辑DM单</h5>
      </section>
      <section class="x-body">
        <section class="h5-template">
          <!-- <h5-template1 :data="detailData" /> -->
        </section>
        <section class="h5-settings">
          <div class="set-module app-title" :class="{'active': xFormSet.formName==='xForm1'}">
            <div class="m-header">
              <span class="text">主页名称</span>
            </div>
            <div class="m-body">
              <el-form ref="xForm1" :rules="xRules1" :model="xForm1">
                <el-form-item label="名称" prop="name">
                  <el-input
                    v-model="xForm1.name"
                    type="text"
                    style="width: 280px;"
                    placeholder="少于5个字"
                  />
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm1')"
                >提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-title" :class="{'active': xFormSet.formName==='xForm1'}">
            <div class="m-header">
              <span class="text">优惠券设置</span>
            </div>
            <div class="m-body">
              <el-form ref="xForm1" class="form-title" :rules="xRules1" :model="xForm1">
                <el-form-item label="设置标题" prop="name" style="position: relative; margin-bottom: 50px">
                  <el-input
                    v-model="xForm1.name"
                    type="text"
                    size="small"
                    style="width: 280px;"
                    placeholder="请输入主页名称"
                    maxlength="20"
                  />
                  <p class="form-notes">建议不超过20字</p>
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm1')"
                >提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-title" :class="{'active': xFormSet.formName==='xForm1'}">
            <div class="m-header">
              <span class="text">爆款推荐</span>
            </div>
            <div class="m-body">
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm1')"
                >提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-title" :class="{'active': xFormSet.formName==='xForm1'}">
            <div class="m-header">
              <span class="text">限时购</span>
            </div>
            <div class="m-body">
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm1')"
                >提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-title" :class="{'active': xFormSet.formName==='xForm1'}">
            <div class="m-header">
              <span class="text">新春专享</span>
            </div>
            <div class="m-body">
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm1')"
                >提交</el-button>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section class="x-footer">
        <!-- 分页器 -->
      </section>
    </div>
  </div>
</template>

<script>
// import h5Template1 from './_source/h5Template/template-1'
export default {
  data() {
    return {
      pageLoading: false,
      name: '',
      detailData: null,
      xFormSet: {
        formName: '',
        posTop: 0 // top位置
      },
      xForm1: {
        name: ''
      },
      xRules1: {
        name: [
          { required: true, message: '请输入主页名称', trigger: 'blur' }
        ]
      },
      xRules4: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
      xRules5: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
      xRules7: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.h5-settings {
  margin-left: 20px;
  flex: 1;
  font-size: 14px;
  .set-module {
    position: relative;
    border-radius: 3px;
    border: 1px solid rgba(220, 223, 230, 1);
    &.active{
      display: block;
    }
    .m-header {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      background-color: #efefef;
      .text {
        font-size: 14px;
        color: #333;
        font-weight: bold;
      }
    }
    .m-body {
      box-sizing: border-box;
      padding: 20px;
      background-color: white;
      .btn-line {
        text-align: right;
      }
    }
    .m-goods-list {
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 5px 0;
      display: flex;
      flex-wrap: wrap;
      max-height: 420px;
      overflow-y: auto;
      .goods-item {
        line-height: 1.1;
        margin-right: 6px;
        flex: 0 0 auto;
        width: 88px;
        margin-bottom: 10px;
        &:nth-child(3) {
          margin-right: 0;
        }
        .cover-box {
          position: relative;
          width: 80px;
          height: 82px;
          background-color: #f2f2f2;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(232, 232, 232, 1);
          border-radius: 5px;
          box-sizing: border-box;
          .cover {
            width: 100%;
            height: 100%;
            // background: url('../../assets/image/h5/pic_goods_1.png') no-repeat center/100% 100%;
          }
          .btn-remove {
            position: absolute;
            top: -7px;
            right: -7px;
            z-index: 20;
            width: 14px;
            height: 14px;
            // background: url('../../assets/image/h5/close.png') no-repeat center/100% 100%;
          }
        }
        .caption {
          margin-top: 10px;
          width: 100%;
          font-size: 13px;
          line-height: 1.1;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .price {
          margin-top: 7px;
          .current {
            font-size: 14px;
            color: #333;
            .sign {
              font-size: 12px;
              letter-spacing: 0;
            }
          }
          .original {
            font-size: 11px;
            color: #999999;
            text-decoration: line-through;
            .sign {
              font-size: 9px;
              letter-spacing: 0;
            }
          }
        }
      }
      .item-add {
        display: flex;
        margin-right: 0;
        width: 88px;
        height: 88px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(220, 223, 230, 1);
        border-radius: 5px;
        cursor: pointer;
        .icon-add {
          margin: auto;
          width: 31px;
          height: 31px;
          // background: url('../../assets/image/h5/add.png') no-repeat center/100% 100%;
        }
      }
    }
  }
  .form-title {
    .form-notes {
      position: absolute;
      top: 30px;
      right: 10px;
      font-size: 14px;
      color: #999;
    }
  }
  .module-app-title {
    width: 382px;
  }
  .module-activity,
  .module-activity2 {
    width: 382px;
  }
}
</style>
