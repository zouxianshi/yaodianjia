<template>
  <div class="dashboard-container">
    <div v-loading="pageLoading" class="app-container" element-loading-text="加载中">
      <section class="x-header">
        <!-- 标题 -->
        <el-tabs v-model="activeNav" @tab-click="navTabChange">
          <el-tab-pane label="DM单设置" name="1" />
          <el-tab-pane label="分享设置" name="2" />
        </el-tabs>
      </section>
      <!-- 设置dm单 -->
      <section v-if="activeNav === '1'" class="x-body dm-container">
        <section class="h5-templates">
          <!-- <h5-template1 :data="detailData" /> -->
        </section>
        <section class="h5-settings">
          <div class="set-module app-title" :class="{'active': xFormSet.formName==='xForm1'}">
            <div class="m-body">
              <el-form ref="xForm1" :rules="xRules1" :model="xForm1" label-width="auto">
                <el-form-item label="设置标题" prop="title">
                  <el-input v-model="xForm1.title" type="text" style="width: 280px;" placeholder="少于5个字" maxlength="5" />
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button type="primary" class="btn-submit" plain size="small" @click="submitForm('xForm1')">提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-coupon" :class="{'active': xFormSet.formName==='xForm2'}">
            <div class="m-body">
              <el-form ref="xForm2" class="form-title" :rules="xRules2" :model="xForm2" label-width="auto">
                <el-form-item label="设置标题" prop="title">
                  <el-input v-model="xForm2.title" type="text" style="width: 280px;" placeholder="少于5个字" maxlength="5" />
                </el-form-item>
                <el-form-item label="优惠券一">
                  <div class="x-item-add">
                    <img src="">
                    <i class="el-icon-plus icon-add" />
                  </div>
                </el-form-item>
                <el-form-item label="优惠券二">
                  <div class="x-item-add">
                    <img src="">
                    <i class="el-icon-plus icon-add" />
                  </div>
                </el-form-item>
                <el-form-item label="优惠券三">
                  <div class="x-item-add">
                    <img src="">
                    <i class="el-icon-plus icon-add" />
                  </div>
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button type="primary" class="btn-submit" plain size="small" @click="submitForm('xForm2')">提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-goods-recomend" :class="{'active': xFormSet.formName==='xForm3'}">
            <div class="m-body">
              <el-form ref="xForm1" class="form-title" :rules="xRules3" :model="xForm3" label-width="auto">
                <el-form-item label="设置标题" prop="title">
                  <el-input v-model="xForm3.title" type="text" style="width: 280px;" placeholder="少于5个字" maxlength="5" />
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
                <el-button type="primary" class="btn-submit" plain size="small" @click="submitForm('xForm3')">提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-goods-limit" :class="{'active': xFormSet.formName==='xForm4'}">
            <div class="m-body">
              <el-form ref="xForm4" class="form-title" :rules="xRules4" :model="xForm4" label-width="auto">
                <el-form-item label="设置标题" prop="title">
                  <el-input v-model="xForm4.title" type="text" style="width: 280px;" placeholder="少于5个字" maxlength="5" />
                  <p class="note-text">注：限时优惠模块，自动实时同步进行中的限时优惠信息。该模块需要先在营销模块设置限时优惠活动，且活动需为进行中，否则会显示空白。</p>
                </el-form-item>
              </el-form>
              <div class="btn-line">
                <el-button type="primary" class="btn-submit" plain size="small" @click="submitForm('xForm4')">提交</el-button>
              </div>
            </div>
          </div>
          <div class="set-module app-goods-topic" :class="{'active': xFormSet.formName==='xForm5'}">
            <div class="m-body">
              <el-form ref="xForm5" class="form-title" :rules="xRules5" :model="xForm5" label-width="auto">
                <el-form-item label="设置标题" prop="title">
                  <el-input v-model="xForm5.title" type="text" style="width: 280px;" placeholder="少于5个字" maxlength="5" />
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
                <el-button type="primary" class="btn-submit" plain size="small" @click="submitForm('xForm5')">提交</el-button>
              </div>
            </div>
          </div>
        </section>
      </section>
      <!-- 设置分享样式 -->
      <section v-if="activeNav === '2'" v-loading="uploadLoading" class="x-body" element-loading-text="图片上传中">
        <section class="h5-share">
          <div class="text-label">设置分享样式</div>
          <div class="text-desc">这里设置的是该页面分享给微信好友或者分享到微信朋友圈的展示样式</div>
          <div class="text-label-2">举例说明，一下是某个页面分享时展示的样式</div>
          <ul class="card-list">
            <li class="card-item card-1">
              <div class="label">
                <span class="text">分享微信好友</span>
              </div>
              <div class="content">
                <div class="share-card">
                  <div class="x3-right" />
                  <div class="share-title">
                    <span v-if="shareForm.title && shareForm.title!==''" v-text="shareForm.title" />
                    <span v-else>2019新版-新商业大会正式启动！ 拥抱“后流量”短视频、</span>
                  </div>
                  <div class="share-caption">
                    <div class="share-desc">
                      <span v-if="shareForm.desc && shareForm.desc!==''" v-text="shareForm.desc" />
                      <span v-else>新版内容大会将至！拥抱“后流量”时代</span>
                    </div>
                    <div class="share-logo">
                      <img v-if="shareForm.logo && shareForm.logo!==''" :src="shareForm.logo" alt="">
                    </div>
                  </div>
                </div>
                <div class="user-avatar">
                  <img src="@/assets/image/wx_logo.jpg" alt="头像">
                </div>
              </div>
            </li>
            <li class="card-item card-2">
              <div class="label">
                <span class="text">分享到微信朋友圈</span>
              </div>
              <div class="content">
                <div class="user-avatar">
                  <img src="@/assets/image/wx_logo.jpg" alt="头像">
                </div>
                <div class="right-info">
                  <div class="nickname">腾</div>
                  <div class="share-card">
                    <div class="share-logo">
                      <img v-if="shareForm.logo && shareForm.logo!==''" :src="shareForm.logo" alt="">
                    </div>
                    <div class="share-title">
                      <span v-if="shareForm.title && shareForm.title!==''" v-text="shareForm.title" />
                      <span v-else>2019新版-新商业大会正式启动！ 拥抱“后流量”短视频、</span>
                    </div>
                  </div>
                  <div class="other">
                    <span class="time">1分钟前</span>
                    <span class="del">删除</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <el-form ref="shareForm" :rules="shareRules" :model="shareForm" label-width="auto" style="margin-top: 50px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="shareForm.title" type="text" style="width: 280px;" placeholder="建议15字以内" maxlength="30" />
            </el-form-item>
            <el-form-item label="摘要" prop="desc">
              <el-input v-model="shareForm.desc" type="text" style="width: 280px;" placeholder="建议15字以内" maxlength="30" />
            </el-form-item>
            <el-form-item label="图片" prop="logo">
              <el-upload
                class="avatar-uploader x-uploader"
                :headers="headers"
                :action="upLoadUrl"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :before-upload="beforeUpload"
              >
                <div v-if="shareForm.logo" class="el-img-box" style="width: 80px;height: 80px;">
                  <img :src="shareForm.logo" class="image">
                  <div class="img-actions" @click.stop>
                    <i class="icon el-icon-upload2" title="上传" @click.stop="handleUpload" />
                    <i class="icon el-icon-delete" title="删除" @click.stop="handleRemove" />
                  </div>
                </div>
                <i v-else class="el-icon-plus icon-add" />
              </el-upload>
              <p class="note-grey">建议尺寸80*80像素的图片</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.stop="saveShareInfo">确 认</el-button>
            </el-form-item>
          </el-form>
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
import { mapGetters } from 'vuex'
import config from '@/utils/config'
export default {
  name: 'DmEdit',
  components: {
    dialogGoods
  },
  data() {
    return {
      pageLoading: false,
      activeNav: '2', // 1.DM单 2.分享设置
      detailData: null,
      uploadLoading: false,
      xFormSet: {
        formName: '',
        posTop: 0 // top位置
      },
      xForm1: { // 页面标题
        title: ''
      },
      xForm2: { // 优惠券
        title: '',
        selectCouponList: []
      },
      xForm3: { // 推荐商品
        title: '',
        selectGoodsList: []
      },
      xForm4: { // 限时商品
        title: ''
      },
      xForm5: { // 专题商品
        title: '',
        selectGoodsList: []
      },
      xRules1: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules2: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules3: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules4: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      xRules5: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      },
      // 分享设置数据
      shareForm: {
        title: '',
        desc: '',
        logo: ''
      },
      shareRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode']),
    currentSelectList() {
      let ret = []
      if (this[this.xFormSet.formName] && this[this.xFormSet.formName].selectGoodsList && this[this.xFormSet.formName].selectGoodsList.length > 0) {
        ret = this[this.xFormSet.formName].selectGoodsList
      }
      return ret
    },
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return { 'Authorization': this.$store.getters.token }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    }
  },
  created() {
  },
  methods: {
    // nav 切换
    navTabChange(data) {
      this.activeNav = data.name
    },
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
    },
    submitForm(formName) {
      const submitForm = this[formName]
      console.log('submitForm', submitForm)
    },
    // 分享设置
    handleUpload() {
      $('.el-img-box').click()
    },
    handleRemove() {
      this.shareForm.logo = ''
    },
    handleUploadError() {
      this.uploadLoading = false
    },
    handleUploadSuccess(res, file) {
      if (res.code === '10000') {
        this.shareForm.logo = res.data || ''
        this.$refs.shareForm.clearValidate('logo')
      } else {
        this.$message.error(res.msg)
      }
      this.uploadLoading = false
    },
    beforeUpload(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isType) {
        this.$message.warning('请上传 JPG、JPEG、PNG 格式的图片！')
        return false
      }
      if (!isLt2M) {
        this.$message.warning('请上传不超过 2M 的图片！')
        return false
      }
      this.uploadLoading = true
      return isType && isLt2M
    },
    // 分享设置信息保存
    saveShareInfo() {
      this.$refs.shareForm.validate(valid => {
        if (valid) {
          console.log('shareform', this.shareForm)
        } else {
          console.log('shareform valid error')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dm-container{
  display: flex
}
.h5-templates {
  flex: 0 0 auto;
  width: 375px;
}
.h5-settings {
  margin-left: 20px;
  flex: 1;
  font-size: 14px;
  .set-module {
    position: relative;
    border-radius: 3px;
    border: 1px solid rgba(220, 223, 230, 1);
    box-shadow: 0 0 5px #dedede;
    width: 520px;
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

.h5-share{
  .text-label{
    font-size: 28px;
    line-height: 42px;
    color: #333;
  }
  .text-desc{
    margin: 10px 0 30px;
    font-size: 18px;
    color: #333;
  }
  .text-label-2 {
    font-size: 15px;
    color: #666;
  }
  .note-grey{
    font-size: 14px;
    color: #999999;
    line-height: 1.3;
  }
  .card-list{
    display: flex;
    .card-item {
      margin: 15px 40px 0 0;
      flex: 0 0 486px;
    }
    .card-1{
      .label {
        width: 110px;
        height: 34px;
        display: flex;
        background: url('../../../../assets/image/icon_bg_label1.png') no-repeat center/100% 100%;
        .text {
          margin: auto;
          font-size: 14px;
          color: white;
        }
      }
      .content {
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box;
        padding: 7px 15px;
        margin-top: 20px;
        height: 155px;
        border: 1px solid #dedede;
        border-radius: 2px;
        font-size: 14px;
        background: #f0f0f0;
        .share-card{
          position: relative;
          box-sizing: border-box;
          padding: 12px 15px;
          width: 300px;
          height: 100%;
          background-color: white;
          border-radius: 5px;
          .x3-right{
            position: absolute;
            top: 20px;
            right: -16px;
            z-index: 10px;
            width: 0;
            height: 0;
            border-width: 6px 8px;
            border-style: solid;
            border-color: transparent transparent transparent white;
            }
          .share-title {
            max-height: 50px;
            font-size:20px;
            color: #111;
            line-height: 25px;
            display: -webkit-box;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .share-caption {
            margin-top: 5px;
            display: flex;
            overflow: hidden;
          }
          .share-desc{
            flex: 1;
            height: 64px;
            font-size: 15px;
            line-height: 21px;
            color: #888;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .share-logo{
            flex: 0 0 auto;
            margin-left: 12px;
            width: 55px;
            height: 55px;
            background-color: #f5f5f5;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .user-avatar{
          width: 52px;
          height: 52px;
          border-radius: 5px;
          background: #fdfdfd;
          margin-left: 15px;
          img{
            border-radius: 5px;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .card-2{
      .label {
        width: 140px;
        height: 34px;
        display: flex;
        background: url('../../../../assets/image/icon_bg_label2.png') no-repeat center/100% 100%;
        .text {
          margin: auto;
          font-size: 14px;
          color: white;
        }
      }
      .content {
        display: flex;
        box-sizing: border-box;
        padding: 15px 15px;
        margin-top: 20px;
        height: 152px;
        border: 1px solid #dedede;
        border-radius: 2px;
        font-size: 14px;
        .user-avatar{
          flex: 0 0 auto;
          width: 52px;
          height: 52px;
          border-radius: 5px;
          background: #f5f5f5;
          margin-right: 15px;
          img{
            border-radius: 5px;
            width: 100%;
            height: 100%;
          }
        }
        .right-info{
          flex: 1;
          .nickname {
            font-size: 18px;
            color: #4f6491;
          }
        }
        .share-card{
          margin: 8px 0;
          padding: 0 7px;
          position: relative;
          box-sizing: border-box;
          background-color: #f5f5f5;
          border-radius: 2px;
          display: flex;
          height: 72px;
          align-items: center;
          overflow: hidden;
          .share-title {
            margin-left: 7px;
            flex: 1;
            max-height: 50px;
            font-size: 18px;
            color: #111;
            line-height: 24px;
            display: -webkit-box;
            word-break: break-all;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .share-logo{
            flex: 0 0 auto;
            width: 55px;
            height: 55px;
            background-color: white;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .other{
          font-size: 15px;
          .time{
            color: #777;
          }
          .del{
            margin-left: 20px;
            color: #4f6491;
          }
        }
      }
    }
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
