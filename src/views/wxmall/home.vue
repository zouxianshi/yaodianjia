<template>
  <div class="dashboard-container">
    <div class="app-container h5-set-container">
      <div class="h5-app">
        <div class="h5-app-title">
          <div class="text">微商城</div>
        </div>
        <div class="h5-home">
          <div class="h5-top-bg" />
          <div class="h5-header">
            <div class="icon-item">
              <i class="icon icon-scan" />
            </div>
            <div class="search-bar">
              <i class="icon icon-search" />
              <div class="input-wrap">
                <input placeholder="搜索药品，症状，品牌">
              </div>
            </div>
            <div class="icon-item">
              <i class="icon icon-msg" />
            </div>
          </div>
          <div class="h5-body">
            <div class="h5-banner">
              <swiper
                ref="mySwiper"
                :options="swiperOption"
                style="height:100%"
                @someSwiperEvent="swiperCallback"
              >
                <!-- slides -->
                <swiper-slide v-for="(item, index) in 5" :key="index" class="slider-item">
                  <div class="img-wrap">
                    <img src="../../assets/image/h5/pic_ac.png">
                  </div>
                </swiper-slide>
                <!-- Optional controls -->
                <div slot="pagination" class="swiper-pagination">
                  <div class="dots">
                    <span v-for="dot in 5" :key="dot" class="dot">1</span>
                  </div>
                </div>
              </swiper>
            </div>
            <div class="h5-module">
              <ul class="module-list">
                <li class="module-item">
                  <i class="icon icon-1" />
                  <div class="text">领券中心</div>
                </li>
                <li class="module-item">
                  <i class="icon icon-2" />
                  <div class="text">积分商城</div>
                </li>
                <li class="module-item">
                  <i class="icon icon-3" />
                  <div class="text">我的优惠券</div>
                </li>
                <li class="module-item">
                  <i class="icon icon-4" />
                  <div class="text">我的订单</div>
                </li>
              </ul>
            </div>
            <div class="h5-notice">
              <i class="icon icon-notice" />
              <div class="text">不注重保养颈椎有哪些危害</div>
            </div>
            <div class="h5-card h5-store">
              <div class="header">
                <div class="title">泉源堂总店</div>
                <div class="distance">
                  <i class="icon icon-addr" />
                  <div class="text">距您1.0km</div>
                </div>
              </div>
              <div class="content">
                <div class="cover-box">
                  <div class="img" />
                </div>
                <div class="info-box">
                  <div class="tags">
                    <div class="tag blue">门店自提免邮</div>
                    <div class="tag yellow">1小时送达</div>
                    <div class="tag green">满88包邮</div>
                  </div>
                  <div class="btn btn-change">
                    <span class="text">换家店看看>></span>
                    <i class="icon-more" />
                  </div>
                </div>
              </div>
            </div>
            <div class="h5-card h5-limit-activity">
              <div class="header">
                <div class="title">
                  限时抢购
                  <div class="countdown">
                    <span class="time-tag">13</span>
                    <span class="split">:</span>
                    <span class="time-tag">36</span>
                    <span class="split">:</span>
                    <span class="time-tag">00</span>
                  </div>
                </div>
                <div class="btn-more">
                  <div class="text">更多</div>
                  <i class="icon icon-more" />
                </div>
              </div>
              <ul class="goods-list">
                <li v-for="(item, index) in 4" :key="index" class="goods-item">
                  <div class="cover-box">
                    <div class="cover" />
                  </div>
                  <div class="caption">修正VE软胶</div>
                  <div class="price">
                    <span class="current">
                      <span class="sign">￥</span>138
                    </span>
                    <span class="original">
                      <span class="sign">￥</span>268
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="h5-card h5-activity">
              <div class="card-header">
                <div class="title">精彩活动</div>
              </div>
              <div class="card-1">
                <div class="card_left">
                  <div class="pos-1" />
                </div>
                <div class="card_right">
                  <div class="pos-2" />
                  <div class="pos-3" />
                  <div class="pos-4" />
                </div>
              </div>
            </div>
            <div class="h5-card h5-activity">
              <div class="card-2">
                <div class="card_top">
                  <div class="pos-1" />
                </div>
                <div class="card_bottom">
                  <swiper
                    key="swiper_2"
                    ref="mySwiper2"
                    class="goods-list2"
                    :options="swiperOption2"
                    style="height:100%"
                    @someSwiperEvent="swiperCallback"
                  >
                    <!-- slides -->
                    <swiper-slide v-for="(item, index) in 10" :key="index" class="goods-item">
                      <div class="cover-box">
                        <div class="cover" />
                      </div>
                      <div class="caption">康恩贝蛋白粉呃呃呃</div>
                      <div class="price">
                        <span class="current">
                          <span class="sign">￥</span>179
                        </span>
                        <span class="original">
                          <span class="sign">￥</span>268
                        </span>
                      </div>
                    </swiper-slide>
                    <div slot="pagination" class="swiper-pagination2" />
                  </swiper>
                </div>
              </div>
            </div>
            <div class="h5-card h5-guess-like">
              <div class="card-header">
                <div class="title">猜你喜欢</div>
              </div>
              <ul class="goods-list3">
                <li v-for="(item, index) in 3" :key="index" class="goods-item">
                  <div class="cover-box">
                    <div class="cover" />
                  </div>
                  <div class="info-box">
                    <div class="title">
                      <span class="tag">活动</span>云南白药气雾剂
                    </div>
                    <div class="desc">【喷雾剂50G+60G 肌肉酸痛消肿跌打损伤关节痛】</div>
                    <div class="store">
                      <span>库存： 126件</span>
                    </div>
                    <div class="price">
                      <span class="current">
                        <span class="sign">￥</span>138
                      </span>
                      <span class="original">
                        <span class="sign">￥</span>268
                      </span>
                    </div>
                    <div class="btn btn-cart">
                      <i class="icon icon-cart" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="h5-copyright">
              <div class="img-wrap" />
            </div>
          </div>
          <div class="h5-footer-nav">
            <div class="nav-item">
              <i class="icon icon-home" />
              <div class="text">首页</div>
            </div>
            <div class="nav-item">
              <i class="icon icon-class" />
              <div class="text">分类</div>
            </div>
            <div class="nav-item">
              <i class="icon icon-consult" />
              <div class="text">咨询</div>
            </div>
            <div class="nav-item">
              <i class="icon icon-cart" />
              <div class="text">购物车</div>
            </div>
            <div class="nav-item">
              <i class="icon icon-user" />
              <div class="text">我的</div>
            </div>
          </div>
        </div>
      </div>
      <div class="h5-settings">
        <div class="set-module module-app-title">
          <div class="m-header">
            <span class="text">主页名称</span>
          </div>
          <div class="m-body">
            <el-form class="form-title">
              <el-form-item label="名称">
                <el-input type="text" size="small" style="width: 292px;" placeholder="请输入主页名称" />
                <p class="form-notes">建议不超过6字</p>
              </el-form-item>
            </el-form>
            <div class="btn-line">
              <el-button
                type="primary"
                class="btn-submit"
                plain
                size="small"
                @click="submitForm('ruleForm')"
              >提交</el-button>
            </div>
          </div>
        </div>
        <div class="set-module module-activity">
          <div class="m-header">
            <span class="text">左主图片</span>
            <!-- <span class="text">右1图片</span> -->
          </div>
          <div class="m-body">
            <el-form class="form-title">
              <el-form-item label="图片" class="upload-item">
                <div class="cover-wrap" :class="'1'== '1'? 'cover-left':'cover-right'">
                  <div class="cover">1</div>
                </div>
                <p class="note-grey">建议尺寸1:1.2</p>
                <el-upload
                  style="height:0"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-button class="btn btn-upload" size="small">本地上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接">
                <el-input type="text" size="small" style="width: 292px;" placeholder="请输入主页名称" />
              </el-form-item>
            </el-form>
            <div class="btn-line">
              <el-button
                type="primary"
                class="btn-submit"
                plain
                size="small"
                @click="submitForm('ruleForm')"
              >提交</el-button>
            </div>
          </div>
        </div>
        <div class="set-module module-activity">
          <div class="m-header">
            <span class="text">分组主图</span>
            <!-- <span class="text">右1图片</span> -->
          </div>
          <div class="m-body">
            <el-form class="form-title">
              <el-form-item label="图片" class="upload-item">
                <div class="cover-wrap cover-top">
                  <div class="cover" />
                </div>
                <p class="note-grey" style="margin-left: 140px;">建议尺寸1:1.2</p>
                <el-upload
                  style="height:10px"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-button
                    class="btn btn-upload"
                    style="position:relative;left: 40px;top: -28px"
                    size="small"
                  >本地上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接">
                <el-input type="text" size="small" style="width: 292px;" placeholder="请输入主页名称" />
              </el-form-item>
            </el-form>
            <div class="btn-line">
              <el-button
                type="primary"
                class="btn-submit"
                plain
                size="small"
                @click="submitForm('ruleForm')"
              >提交</el-button>
            </div>
          </div>
        </div>
        <div class="set-module module-activity">
          <div class="m-header">
            <span class="text">分组主图</span>
            <!-- <span class="text">右1图片</span> -->
          </div>
          <div class="m-body">
            <div style="display: flex">
              <div style="flex: 0 0 auto;">图片</div>
              <div class="flex: 1;margin-left: 10px;">
                <p class="note-grey" style="margin: 0 10px;">( 为视觉效果更佳，建议选择3-10个商品 )</p>
                <p class="note-grey" style="margin: 10px 10px;">建议尺寸1:1.2</p>
                <ul class="m-goods-list">
                  <li v-for="(item, index) in 5" :key="index" class="goods-item">
                    <div class="cover-box">
                      <div class="cover" />
                      <div class="btn-remove" />
                    </div>
                    <div class="caption">修正VE软胶</div>
                    <div class="price">
                      <span class="current">
                        <span class="sign">￥</span>138
                      </span>
                      <span class="original">
                        <span class="sign">￥</span>268
                      </span>
                    </div>
                  </li>
                  <li class="goods-item item-add">
                    <div class="icon-add" @click.stop="toSelectGoods" />
                  </li>
                </ul>
              </div>
            </div>
            <div class="btn-line">
              <el-button
                type="primary"
                class="btn-submit"
                plain
                size="small"
                @click="submitForm('ruleForm')"
              >提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗--上线门店-->
    <dialog-goods
      ref="goodsDialog"
      :list="[]"
      @confirm="goodsSelectChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import dialogGoods from './components/dialog-goods'

export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide,
    dialogGoods
  },
  data() {
    return {
      currentRole: 'adminDashboard',
      dateRange: '',
      statusOptions: [
        { id: 1, name: '使用', value: '1' },
        { id: 0, name: '停用', value: '0' }
      ],
      searchForm: {
        timeBeg: '', // 开始时间
        timeEnd: '', // 结束时间
        status: '', // 使用状态
        notes: '' // 备注
      },
      tableData: [
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 1,
          notes: '品牌XX广告'
        },
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 0,
          notes: '品牌XX广告'
        },
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 0,
          notes: '品牌XX广告'
        },
        {
          img: '../img.png',
          url: 'http://wwww.yaodianjia.com?sid=1111',
          timeBeg: '2016-05-02 00:00:00',
          timeEnd: '2016-05-03 00:00:00',
          status: 1,
          notes: '品牌XX广告'
        }
      ],
      dialogFormVisible: true,
      form: {
        id: '',
        imgUrl: '',
        linkUrl: '',
        dateRange: '',
        dateStart: '',
        dateEnd: '',
        index: false,
        type: [],
        notes: ''
      },
      formLabelWidth: '80px',
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
        // some swiper options...
      },
      swiperOption2: {
        pagination: {
          el: '.swiper-pagination2'
        },
        slidesPerView: 3,
        slidesPerGroup: 3
        // some swiper options...
      }
    }
  },
  computed: {
    ...mapGetters(['roles']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    swiper2() {
      return this.$refs.mySwiper2.swiper
    }
  },
  created() {
    // 发卡机上岛咖啡
  },
  methods: {
    // h5-app
    swiperCallback(event) {
      console.log('event', event)
    },
    // h5-settings
    handleUploadSuccess($event) {
      console.log($event)
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const isType = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isType) {
        this.$message.error('上传图片只支持 JPG,PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isType && isLt2M
    },
    // 选取优惠券
    toSelectGoods() {
      this.$refs.goodsDialog.open()
    },
    goodsSelectChange(list) {
      console.log('list', list)
      // if (!this.couponCheck(list)) {
      //   if (this.xForm2.bestType === '1') {
      //     this.$message({ type: 'warning', duration: 6000, message: '最佳手气获取方式设置随机时，只能选取抵价券或现金券' })
      //     return false
      //   }
      // }
      this.$refs.couponDialog.close()
      // this.xForm2.couponList = list
    }
  }
}
</script>
<style lang="scss">
.h5-set-container {
  position: relative;
  z-index: 0;
  display: flex;
}
.x-dialog-body {
  width: 100%;
  display: flex;
  .form-box {
    flex: 1;
  }
  .preview-box {
    flex: 0 0 300px;
    .prview-pic {
      margin-top: 20px;
      width: 100%;
      height: 500px;
      background: blueviolet;
    }
  }
  .test-1 {
    color: red;
  }
}
.h5-app {
  flex: 0 0 auto;
  width: 375px;
  //height: 712px;
  border: 1px solid #dedede;
  background: #f2f2f2;
  box-sizing: border-box;
  .h5-app-title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    .text {
      text-align: center;
      font-size: 18px;
      color: #333;
    }
  }
  .icon {
    display: block;
  }
}
.h5-home {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  .h5-top-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 354px;
    background: url('../../assets/image/h5/pic_bg.png') no-repeat center/100%
      100%;
  }
  .h5-header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 12px;
    margin: 10px auto;
    .icon-item {
      flex: 0 0 auto;
    }
    .icon-scan {
      width: 19px;
      height: 19px;
      background: url('../../assets/image/h5/sao.png') no-repeat center/100%
        100%;
    }
    .icon-msg {
      width: 20px;
      height: 19px;
      background: url('../../assets/image/h5/message.png') no-repeat center/100%
        100%;
    }
    .search-bar {
      margin: 0 15px;
      flex: 1;
      display: flex;
      align-items: center;
      height: 35px;
      background: white;
      border-radius: 17px;
      .icon-search {
        flex: 0 0 auto;
        margin: 0 10px;
        width: 17px;
        height: 16px;
        background: url('../../assets/image/h5/search.png') no-repeat
          center/100% 100%;
      }
      .input-wrap {
        flex: 1;
        input {
          background: inherit;
          width: 100%;
          height: 100%;
          font-size: 15px;
        }
      }
    }
  }

  .h5-footer-nav {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 444;
    display: flex;
    width: 100%;
    height: 50px;
    background: white;
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        width: 20px;
        height: 20px;
      }
      .text {
        margin-top: 6px;
        font-size: 10px;
        color: #333;
      }
      .icon-home {
        background: url('../../assets/image/h5/shouye.png') no-repeat
          center/100% 100%;
      }
      .icon-class {
        background: url('../../assets/image/h5/fenlei.png') no-repeat
          center/100% 100%;
      }
      .icon-consult {
        background: url('../../assets/image/h5/zixun.png') no-repeat center/100%
          100%;
      }
      .icon-cart {
        background: url('../../assets/image/h5/gouwuche.png') no-repeat
          center/100% 100%;
      }
      .icon-user {
        background: url('../../assets/image/h5/wode.png') no-repeat center/100%
          100%;
      }
    }
  }

  .h5-body {
    position: relative;
    z-index: 10;
    padding: 0 12px;
    .h5-banner {
      width: 100%;
      height: 125px;
      border-radius: 5px;
      overflow: hidden;
      background-color: #f2f2f2;
      .swiper-container {
        width: 100%;
        height: 100%;
        .slider-item {
          width: 100%;
          height: 100%;
          .img-wrap {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .h5-module {
      margin: 10px auto 5px;
      height: 100px;
      .module-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 100px;
        .module-item {
          flex: 0 0 auto;
          width: 25%;
          .text {
            text-align: center;
            font-size: 14px;
            font-family: PingFang SC;
            color: #666666;
            line-height: 28px;
          }
          .icon {
            margin: 0 auto;
          }
          .icon-1 {
            width: 31px;
            height: 28px;
            background: url('../../assets/image/h5/pic_1.png') no-repeat
              center/100% 100%;
          }
          .icon-2 {
            width: 26px;
            height: 30px;
            background: url('../../assets/image/h5/pic_2.png') no-repeat
              center/100% 100%;
          }
          .icon-3 {
            width: 36px;
            height: 31px;
            background: url('../../assets/image/h5/pic_3.png') no-repeat
              center/100% 100%;
          }
          .icon-4 {
            width: 24px;
            height: 28px;
            background: url('../../assets/image/h5/pic_4.png') no-repeat
              center/100% 100%;
          }
        }
      }
    }
    .h5-notice {
      width: 349px;
      height: 35px;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 5px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10px;
      overflow: hidden;
      .icon-notice {
        flex: 0 0 atuo;
        width: 45px;
        height: 20px;
        background: url('../../assets/image/h5/pic_a.png') no-repeat center/100%
          100%;
      }
      .text {
        flex: 1;
        margin-left: 10px;
        box-sizing: border-box;
        padding-left: 10px;
        height: 14px;
        font-size: 14px;
        border-left: 1px solid rgba(19, 116, 159, 0.2);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .h5-store {
      margin-top: 24px;
      .header {
        display: flex;
        height: 30px;
        align-items: center;
        border-bottom: 1px dashed #e8e8e8;
        .title {
          flex: 1;
          font-size: 15px;
          font-weight: 800;
          color: #333;
        }
        .distance {
          flex: 0 0 auto;
          margin-left: 10px;
          display: flex;
          .icon-addr {
            width: 10px;
            height: 12px;
            background: url('../../assets/image/h5/pic_address.png') no-repeat
              center/100% 100%;
          }
          .text {
            margin-left: 4px;
            height: 12px;
            font-size: 13px;
            color: rgba(254, 80, 77, 1);
          }
        }
      }
      .content {
        margin-top: 10px;
        display: flex;
        .cover-box {
          flex: 0 0 auto;
          height: 65px;
          border-radius: 5px;
          overflow: hidden;
          background-color: #f2f2f2;
          .img {
            width: 65px;
            height: 65px;
            background: url('../../assets/image/h5/pic_sh.png') no-repeat
              center/100% 100%;
          }
        }
        .info-box {
          flex: 1;
          margin-left: 10px;
          position: relative;
          .tags {
            display: flex;
            flex-wrap: wrap;
            .tag {
              flex: 0 0 auto;
              box-sizing: border-box;
              padding: 0 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 16px;
              font-size: 12px;
              border-radius: 3px;
              margin-left: 5px;
              &:first-child {
                margin-left: 0;
              }
              &.blue {
                color: #4d7ccc;
                background: rgba(77, 124, 204, 0.1);
                border: 1px solid #4d7ccc;
              }
              &.yellow {
                color: #fa7342;
                background: rgba(250, 115, 66, 0.1);
                border: 1px solid #fa7342;
              }
              &.green {
                color: #03bb75;
                background: rgba(3, 187, 117, 0.1);
                border: 1px solid #03bb75;
              }
            }
          }
          .btn-change {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 90px;
            height: 25px;
            background: linear-gradient(
              141deg,
              rgba(255, 123, 117, 1),
              rgba(254, 80, 77, 1)
            );
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            .text {
              font-size: 13px;
              color: white;
            }
          }
        }
      }
    }
    .h5-limit-activity {
      .header {
        display: flex;
        height: 30px;
        align-items: center;
        .title {
          flex: 1;
          font-size: 15px;
          color: #333;
          display: flex;
          .countdown {
            margin-left: 10px;
            display: flex;
            color: #fe504d;
            .time-tag {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 20px;
              height: 14px;
              background: linear-gradient(
                141deg,
                rgba(255, 123, 117, 1),
                rgba(254, 80, 77, 1)
              );
              font-size: 12px;
              color: white;
              border-radius: 3px;
            }
            .split {
              display: flex;
              align-items: center;
              margin: 0 2px;
            }
          }
        }
        .btn-more {
          flex: 0 0 auto;
          display: flex;
          .text {
            font-size: 12px;
            color: #666666;
          }
          .icon-more {
            margin-left: 4px;
            width: 6px;
            height: 11px;
            background: url('../../assets/image/h5/you.png') no-repeat
              center/100% 100%;
          }
        }
      }
      .goods-list {
        margin-top: 2px;
        display: flex;
        overflow-x: hidden;
        overflow-y: hidden;
        .goods-item {
          margin-left: 6px;
          flex: 0 0 auto;
          width: 100px;
          height: 147px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(232, 232, 232, 1);
          border-radius: 5px;
          box-sizing: border-box;
          padding: 10px;
          &:first-child {
            margin-left: 0;
          }
          .cover-box {
            width: 80px;
            height: 82px;
            background-color: #f2f2f2;
            .cover {
              width: 100%;
              height: 100%;
              background: url('../../assets/image/h5/pic_xian_a.png') no-repeat
                center/100% 100%;
            }
          }
          .caption {
            margin-top: 10px;
            width: 100%;
            height: 12px;
            font-size: 13px;
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
              color: #f32521;
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
    .h5-activity {
      .card-1 {
        display: flex;
        .card_left,
        .card_right {
          flex: 0 0 auto;
          width: 160px;
          height: 200px;
          border-radius: 5px;
        }
        .card_right {
          margin-left: 10px;
        }
        .pos-1 {
          width: 100%;
          height: 100%;
          background: url('../../assets/image/h5/pic_aa.png') no-repeat
            center/100% 100%;
        }
        .pos-2,
        .pos-3,
        .pos-4 {
          width: 100%;
          height: 60px;
          border-radius: 5px;
        }
        .pos-2 {
          background: url('../../assets/image/h5/pic_ab.png') no-repeat
            center/100% 100%;
        }
        .pos-3 {
          margin-top: 10px;
          background: url('../../assets/image/h5/pic_ac.png') no-repeat
            center/100% 100%;
        }
        .pos-4 {
          margin-top: 10px;
          background: url('../../assets/image/h5/pic_ad.png') no-repeat
            center/100% 100%;
        }
      }
      .card-2 {
        .card_top {
          width: 100%;
          height: 95px;
          background: url('../../assets/image/h5/pic_zhu_a.png') no-repeat
            center/100% 100%;
        }
        .card_bottom {
          position: relative;
        }
        .goods-list2 {
          margin-top: 6px;
          overflow-x: hidden;
          overflow-y: hidden;
          .goods-item {
            box-sizing: border-box;
            padding: 0 3px;
            &:first-child {
              margin-left: 0;
            }
            .cover-box {
              width: 100%;
              height: 108px;
              // background: rgba(249, 249, 249, 1);
              background: burlywood;
              border-radius: 5px;
              border-radius: 5px;
              .cover {
                width: 100%;
                height: 100%;
                background: url('../../assets/image/h5/pic_sb.png') no-repeat
                  center/100% 100%;
              }
            }
            .caption {
              margin-top: 10px;
              width: 100%;
              height: 12px;
              font-size: 13px;
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
                color: #f32521;
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
    }
    .h5-guess-like {
      .goods-list3 {
        .goods-item {
          display: flex;
          box-sizing: border-box;
          border-top: 1px solid #e8e8e8;
          padding: 10px 0;
          &:first-child {
            border: none;
            padding-top: 0;
          }
          .cover-box {
            flex: 0 0 auto;
            width: 155px;
            height: 120px;
            border-radius: 3px;
            background: #f2f2f2;
            overflow: hidden;
            .cover {
              width: 100%;
              height: 100%;
              background: url('../../assets/image/h5/pic_sh.png') no-repeat
                center/100% 100%;
            }
          }
          .info-box {
            position: relative;
            flex: 1;
            margin-left: 10px;
            .title {
              display: flex;
              height: 16px;
              font-size: 14px;
              line-height: 16px;
              color: #333;
              .tag {
                margin-right: 4px;
                padding: 0 2px;
                height: 16px;
                background: linear-gradient(
                  -42deg,
                  rgba(250, 115, 66, 1),
                  rgba(250, 163, 99, 1)
                );
                border-radius: 3px;
                font-size: 12px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            .desc {
              margin-top: 6px;
              width: 153px;
              font-size: 12px;
              color: rgba(153, 153, 153, 1);
              line-height: 16px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
            }
            .store {
              margin-top: 10px;
              font-size: 12px;
              color: #999999;
            }
            .price {
              position: absolute;
              left: 0;
              bottom: 4px;
              .current {
                font-size: 14px;
                color: #f32521;
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
            .btn-cart {
              position: absolute;
              right: 0;
              bottom: 0;
              .icon-cart {
                width: 24px;
                height: 24px;
                background: url('../../assets/image/h5/buy.png') no-repeat
                  center/100% 100%;
              }
            }
          }
        }
      }
    }
    .h5-copyright {
      .img-wrap {
        margin: 20px auto 60px;
        width: 142px;
        height: 73px;
        background: url('../../assets/image/h5/foot.png') no-repeat center/100%
          100%;
      }
    }
  }

  .h5-card {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 0 10px 12px;
    background-color: white;
    border-radius: 5px;
    .card-header {
      display: flex;
      height: 60px;
      .title {
        margin: auto;
        width: 95px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        background: url('../../assets/image/h5/pic_title.png') no-repeat
          center/100% 100%;
      }
    }
  }
  .swiper-pagination2 {
    text-align: center;
    bottom: 0;
  }
}
.h5-settings {
  margin-left: 20px;
  flex: 1;
  font-size: 14px;
  .set-module {
    border-radius: 3px;
    border: 1px solid rgba(220, 223, 230, 1);
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
      margin-top: 2px;
      display: flex;
      flex-wrap: wrap;
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
            background: url('../../assets/image/h5/pic_xian_a.png') no-repeat
              center/100% 100%;
          }
          .btn-remove {
            position: absolute;
            top: -7px;
            right: -7px;
            z-index: 20;
            width: 14px;
            height: 14px;
            background: url('../../assets/image/h5/close.png') no-repeat
              center/100% 100%;
          }
        }
        .caption {
          margin-top: 10px;
          width: 100%;
          height: 12px;
          font-size: 13px;
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
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,223,230,1);
        border-radius:5px;
        cursor: pointer;
        .icon-add {
          margin: auto;
          width: 31px;
          height: 31px;
          background: url('../../assets/image/h5/add.png') no-repeat
            center/100% 100%;
        }
      }
    }
  }
  .form-title {
    .form-notes {
      font-size: 14px;
      color: #999;
      text-align: right;
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

.upload-item {
  position: relative;
  .btn-upload {
    position: absolute;
    top: 0;
    right: 0;
  }
  .cover-wrap {
    width: 120px;
    height: 120px;
    border-radius: 5px;
    overflow: hidden;
    .cover {
      width: 100%;
      height: 100%;
      border: 1px solid #dedede;
      background: url('../../assets/image/h5/pic_b.png') no-repeat center/100%
        100%;
    }
    &.cover-left {
      width: 168px;
      height: 88px;
      .cover {
        background: url('../../assets/image/h5/pic_d.png') no-repeat center/100%
          100%;
      }
    }
    &.cover-right {
      width: 139px;
      height: 166px;
      .cover {
        background: url('../../assets/image/h5/pic_c.png') no-repeat center/100%
          100%;
      }
    }
    &.cover-top {
      width: 291px;
      height: 108px;
      .cover {
        background: url('../../assets/image/h5/pic_e.png') no-repeat center/100%
          100%;
      }
    }
  }
}
.note-grey {
  font-size: 14px;
  color: #999999;
}
</style>
