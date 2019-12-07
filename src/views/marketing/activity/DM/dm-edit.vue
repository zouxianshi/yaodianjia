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
              <el-form ref="xForm1" :rules="xRules1" :model="xForm1" label-width="auto">
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
          <div class="set-module app-coupon" :class="{'active': xFormSet.formName==='xForm2'}">
            <div class="m-header">
              <span class="text">优惠券设置</span>
            </div>
            <div class="m-body">
              <el-form ref="xForm2" class="form-title" :rules="xRules2" :model="xForm2" label-width="auto">
                <el-form-item label="设置标题" prop="name">
                  <el-input
                    v-model="xForm2.name"
                    type="text"
                    style="width: 280px;"
                    placeholder="少于5个字"
                    maxlength="5"
                  />
                </el-form-item>
                <el-form-item label="优惠券一" prop="name">
                  <div class="x-item-add">
                    <img src="">
                    <i class="el-icon-plus icon-add" />
                  </div>
                </el-form-item>
                <el-form-item label="优惠券二" prop="name">
                  <div class="x-item-add">
                    <img src="">
                    <i class="el-icon-plus icon-add" />
                  </div>
                </el-form-item>
                <el-form-item label="优惠券三" prop="name">
                  <div class="x-item-add">
                    <img src="">
                    <i class="el-icon-plus icon-add" />
                  </div>
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm2')"
                >提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-goods-recomend" :class="{'active': xFormSet.formName==='xForm3'}">
            <div class="m-header">
              <span class="text">爆款推荐</span>
            </div>
            <div class="m-body">
              <el-form ref="xForm1" class="form-title" :rules="xRules3" :model="xForm3" label-width="auto">
                <el-form-item label="设置标题" prop="name">
                  <el-input
                    v-model="xForm3.name"
                    type="text"
                    style="width: 280px;"
                    placeholder="少于5个字"
                    maxlength="5"
                  />
                </el-form-item>
                <el-form-item label="选取商品" prop="name">
                  <ul class="m-goods-list webkit-scroll">
                    <template v-if="xForm3.selectGoodsList && xForm3.selectGoodsList.length>0">
                      <li v-for="(goods, $index) in xForm3.selectGoodsList" :key="$index" class="goods-item">
                        <div class="cover-box">
                          <div class="cover" :style="`backgroundImage: url('${showImg(goods.mainPic)}')`" />
                          <div class="btn-remove" title="移除" @click.stop="removeGoods($index, 'xForm3')" />
                        </div>
                        <div class="caption" :title="goods.commodityName" v-text="goods.commodityName">修正VE软胶</div>
                        <div class="price">
                          <span class="current">
                            <span class="sign">￥</span>{{ goods.price }}
                          </span>
                          <span v-if="goods.price !== goods.mprice" class="original">
                            <span class="sign">￥</span>{{ goods.mprice }}
                          </span>
                        </div>
                      </li>
                    </template>
                    <li class="goods-item x-item-add" style="width: 88px;height: 88px;" @click.stop="toSelectGoods('xForm3')">
                      <div class="el-icon-plus  icon-add" />
                    </li>
                  </ul>
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm3')"
                >提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-goods-limit" :class="{'active': xFormSet.formName==='xForm4'}">
            <div class="m-header">
              <span class="text">限时购</span>
            </div>
            <div class="m-body">
              <el-form ref="xForm4" class="form-title" :rules="xRules4" :model="xForm4" label-width="auto">
                <el-form-item label="设置标题" prop="name">
                  <el-input
                    v-model="xForm4.name"
                    type="text"
                    style="width: 280px;"
                    placeholder="少于5个字"
                    maxlength="5"
                  />
                  <p class="note-text">注：限时优惠模块，自动实时同步进行中的限时优惠信息。该模块需要先在营销模块设置限时优惠活动，且活动需为进行中，否则会显示空白。</p>
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm4')"
                >提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-goods-topic" :class="{'active': xFormSet.formName==='xForm5'}">
            <div class="m-header">
              <span class="text">新春专享</span>
            </div>
            <div class="m-body">
              <el-form ref="xForm5" class="form-title" :rules="xRules5" :model="xForm5" label-width="auto">
                <el-form-item label="设置标题" prop="name">
                  <el-input
                    v-model="xForm5.name"
                    type="text"
                    style="width: 280px;"
                    placeholder="少于5个字"
                    maxlength="5"
                  />
                </el-form-item>
                <el-form-item label="选取商品" prop="name">
                  <ul class="m-goods-list webkit-scroll">
                    <template v-if="xForm5.selectGoodsList && xForm5.selectGoodsList.length>0">
                      <li v-for="(goods, $index) in xForm5.selectGoodsList" :key="$index" class="goods-item">
                        <div class="cover-box">
                          <div class="cover" :style="`backgroundImage: url('${showImg(goods.mainPic)}')`" />
                          <div class="btn-remove" title="移除" @click.stop="removeGoods($index, 'xForm5')" />
                        </div>
                        <div class="caption" :title="goods.commodityName" v-text="goods.commodityName">修正VE软胶</div>
                        <div class="price">
                          <span class="current">
                            <span class="sign">￥</span>{{ goods.price }}
                          </span>
                          <span v-if="goods.price !== goods.mprice" class="original">
                            <span class="sign">￥</span>{{ goods.mprice }}
                          </span>
                        </div>
                      </li>
                    </template>
                    <li class="goods-item x-item-add" style="width: 88px;height: 88px;" @click.stop="toSelectGoods('xForm5')">
                      <div class="el-icon-plus  icon-add" />
                    </li>
                  </ul>
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button
                  type="primary"
                  class="btn-submit"
                  plain
                  size="small"
                  @click="submitForm('xForm5')"
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
    <!--弹窗--商品选取-->
    <dialog-goods ref="goodsDialog" :list="currentSelectList" @confirm="goodsSelectChange" />
  </div>
</template>

<script>
// import h5Template1 from './_source/h5Template/template-1'
import dialogGoods from '@/components/Dialog/DialogGoods'
export default {
  name: 'DmEdit',
  components: {
    dialogGoods
  },
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
      xForm2: {
        name: '',
        couponList: ''
      },
      xForm3: {
        name: '',
        selectGoodsList: []
      },
      xForm4: {
        name: ''
      },
      xForm5: {
        name: '',
        selectGoodsList: []
      },
      xRules1: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules2: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules3: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules4: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules5: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    currentSelectList() {
      let ret = []
      if (this[this.xFormSet.formName] && this[this.xFormSet.formName].selectGoodsList && this[this.xFormSet.formName].selectGoodsList.length > 0) {
        ret = this[this.xFormSet.formName].selectGoodsList
      }
      return ret
    }
  },
  created() {
  },
  methods: {
    // 选取商品
    toSelectGoods(formName) {
      this.xFormSet.formName = formName
      console.log('this.currentSelectList', this.currentSelectList)
      this.$nextTick(_ => {
        this.$refs.goodsDialog.open()
      })
    },
    // 移除商品
    removeGoods(index, formName) {
      this[formName].selectGoodsList.splice(index, 1)
    },
    goodsSelectChange(list) {
      console.log('list', list)
      // const currentForm = this[this.xFormSet.formName]
      this[this.xFormSet.formName].selectGoodsList = list
      this.$refs.goodsDialog.close()
      // this.xForm2.couponList = list
    }
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
            background: no-repeat center/100% 100%;
          }
          .btn-remove {
            position: absolute;
            top: -7px;
            right: -7px;
            z-index: 20;
            width: 14px;
            height: 14px;
            background: url('../../../../assets/image/h5/close.png') no-repeat center/100% 100%;
            cursor: pointer;
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
  .note-text{
    margin-top: 10px;
    font-size: 14px;
    color: #999999;
    line-height: 1.3;
  }
}

.x-item-add {
  display: flex;
  width: 60px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover{
    border-color: #409eff;
  }
  .icon-add {
    margin: auto;
    font-size: 20px;
    color: #8c939d;
  }
}
</style>
