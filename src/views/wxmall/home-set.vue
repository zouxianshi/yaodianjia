
<template>
  <div class="dashboard-container">
    <div class="app-container h5-set-container">
      <div class="h5-app">
        <div class="h5-app-title set-hover" :class="{'set-active': xFormSet.formName==='xForm1'}" @click.stop="setEdit('xForm1', '')">
          <div v-if="xForm1.detail" class="text" v-text="xForm1.detail.remark">微商城</div>
          <div v-else class="text">微商城</div>
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
            <div class="h5-banner set-hover" :class="{'set-active': xFormSet.formName==='xForm2'}" @click.stop="setEdit('xForm2', '')">
              <swiper
                v-if="xForm2.detail"
                ref="mySwiper"
                :options="swiperOption"
                style="height:100%"
                @someSwiperEvent="swiperCallback"
              >
                <!-- slides -->
                <swiper-slide v-for="item in xForm2.detail" :key="item.id" class="slider-item">
                  <div class="img-wrap">
                    <img :src="item.imageUrl">
                  </div>
                </swiper-slide>
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
            <div class="h5-notice set-hover" :class="{'set-active': xFormSet.formName==='xForm3'}" @click.stop="setEdit('xForm3', '')">
              <div class="icon-box">
                <i class="icon icon-notice" />
              </div>
              <div class="notice-box">
                <swiper
                  v-if="xForm3.detail"
                  ref="mySwiper3"
                  :options="swiperOption3"
                  style="height:100%"
                >
                  <!-- slides -->
                  <swiper-slide v-for="item in xForm3.detail" :key="item.id" class="slider-item">
                    <div class="text-box">
                      <div class="text" v-text="item.announcement" />
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
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
                  <div class="pos-1 set-hover" :class="{'set-active': xFormSet.formName==='xForm4' && xFormSet.position === 1}" @click.stop="setEdit('xForm4', 1)">
                    <img v-if="xForm4.detail" :src="xForm4.detail[0].imageUrl">
                    <!-- <img class="pos-img" src="../../assets/image/h5/pic_aa.png"> -->
                  </div>
                </div>
                <div class="card_right">
                  <div class="pos-2 set-hover" :class="{'set-active': xFormSet.formName==='xForm4' && xFormSet.position === 2}" @click.stop="setEdit('xForm4', 2)">
                    <img v-if="xForm4.detail" :src="xForm4.detail[1].imageUrl" @error="imgLoadErr($event, '../../assets/image/h5/pic_aa.png')">
                  </div>
                  <div class="pos-3 set-hover" :class="{'set-active': xFormSet.formName==='xForm4' && xFormSet.position === 3}" @click.stop="setEdit('xForm4', 3)">
                    <img v-if="xForm4.detail" :src="xForm4.detail[2].imageUrl">
                  </div>
                  <div class="pos-4 set-hover" :class="{'set-active': xFormSet.formName==='xForm4' && xFormSet.position === 4}" @click.stop="setEdit('xForm4', 4)">
                    <img v-if="xForm4.detail" :src="xForm4.detail[3].imageUrl">
                  </div>
                </div>
              </div>
            </div>
            <div class="h5-card h5-activity" style="padding: 0 0">
              <div class="card-2">
                <div class="card_top">
                  <div class="pos-1 set-hover" :class="{'set-active': xFormSet.formName==='xForm5'}" @click.stop="setEdit('xForm5', '')">
                    <img v-if="xForm5.detail" :src="xForm5.detail.imageUrl">
                  </div>
                </div>
                <div class="card_bottom set-hover" :class="{'set-active': xFormSet.formName==='xForm6'}" @click.stop="setEdit('xForm6', '')">
                  <swiper
                    key="swiper_2"
                    ref="mySwiper2"
                    class="goods-list2"
                    :options="swiperOption2"
                    style="height:100%"
                    @someSwiperEvent="swiperCallback"
                  >
                    <!-- slides -->
                    <template v-if="xForm6.detail && xForm6.detail.length>0">
                      <swiper-slide v-for="item in xForm6.detail" :key="item.productId" class="goods-item">
                        <div class="cover-box">
                          <div class="cover" :style="`backgroundImage: url('${showImg(item.imageUrl)}')`" />
                        </div>
                        <div class="caption" :title="item.productName" v-text="item.productName">康恩贝蛋白粉呃呃呃</div>
                        <div class="price">
                          <span class="current">
                            <span class="sign">￥</span>{{ item.price }}
                          </span>
                          <span v-if="item.mprice !== item.price" class="original">
                            <span class="sign">￥</span>{{ item.mprice }}
                          </span>
                        </div>
                      </swiper-slide>
                    </template>
                    <template v-else>
                      <swiper-slide v-for="(item, index) in 6" :key="index" class="goods-item">
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
                    </template>

                    <div slot="pagination" class="swiper-pagination2" />
                  </swiper>
                </div>
              </div>
            </div>
            <div class="h5-card h5-activity" style="padding: 0 0">
              <div class="card-2">
                <div class="card_top">
                  <div class="pos-1 set-hover" :class="{'set-active': xFormSet.formName==='xForm7'}" @click.stop="setEdit('xForm7', '')">
                    <img v-if="xForm7.detail" :src="xForm7.detail.imageUrl">
                  </div>
                </div>
                <div class="card_bottom set-hover" :class="{'set-active': xFormSet.formName==='xForm8'}" @click.stop="setEdit('xForm8', '')">
                  <swiper
                    key="swiper_4"
                    ref="mySwiper4"
                    class="goods-list2"
                    :options="swiperOption2"
                    style="height:100%"
                    @someSwiperEvent="swiperCallback"
                  >
                    <!-- slides -->
                    <template v-if="xForm8.detail && xForm8.detail.length>0">
                      <swiper-slide v-for="item in xForm8.detail" :key="item.productId" class="goods-item">
                        <div class="cover-box">
                          <div class="cover" :style="`backgroundImage: url('${showImg(item.imageUrl)}')`" />
                        </div>
                        <div class="caption" :title="item.productName" v-text="item.productName">康恩贝蛋白粉呃呃呃</div>
                        <div class="price">
                          <span class="current">
                            <span class="sign">￥</span>{{ item.price }}
                          </span>
                          <span v-if="item.price !== item.mprice" class="original">
                            <span class="sign">￥</span>{{ item.mprice }}
                          </span>
                        </div>
                      </swiper-slide>
                    </template>
                    <template v-else>
                      <swiper-slide v-for="(item, index) in 6" :key="index" class="goods-item">
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
                    </template>
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
        <div class="set-module module-app-title" :class="{'active': xFormSet.formName==='xForm1'}">
          <div class="m-header">
            <span class="text">主页名称</span>
          </div>
          <div class="m-body">
            <el-form ref="xForm1" class="form-title" :rules="xRules1" :model="xForm1">
              <el-form-item label="名称" prop="name" style="position: relative; margin-bottom: 50px">
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
        <div class="set-module module-activity" :class="{'active': xFormSet.formName==='xForm4'}" style="top: 738px">
          <div class="m-header">
            <span v-if="xFormSet.position === 1" class="text">左主图片</span>
            <span v-else-if="xFormSet.position === 2" class="text">右1图片</span>
            <span v-else-if="xFormSet.position === 3" class="text">右2图片</span>
            <span v-else-if="xFormSet.position === 4" class="text">右3图片</span>
          </div>
          <div class="m-body">
            <el-form ref="xForm4" :rules="xRules4" :model="xForm4">
              <el-form-item label="图片" class="upload-item" prop="imgUrl">
                <div class="cover-wrap" :class="xFormSet.position === 1 ? 'cover-left':'cover-right'">
                  <div v-if="xForm4.imgUrl==''" class="cover" />
                  <template v-else>
                    <img class="cover" :src="xForm4.imgUrl">
                    <div class="x-img-actions">
                      <i class="icon el-icon-delete" title="删除" @click.stop="handleRemove('xForm4')" />
                    </div>
                  </template>
                </div>
                <p class="note-grey" style="margin: 10px 0 0 52px;">
                  <span v-if="xFormSet.position === 1">建议尺寸 1:1.2 </span>
                  <span v-else>建议尺寸 2.65:1 </span>
                </p>
                <el-upload
                  style="height:0"
                  :headers="headers"
                  :action="upLoadUrl"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-button class="btn btn-upload" size="small">本地上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接" prop="linkUrl">
                <el-input v-model="xForm4.linkUrl" type="text" size="small" style="width: 286px;" :maxlength="500" placeholder="http:// 或 https://" />
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
        <div class="set-module module-activity" :class="{'active': xFormSet.formName==='xForm5'}" style="top: 1020px">
          <div class="m-header">
            <span class="text">分组主图</span>
          </div>
          <div class="m-body">
            <el-form ref="xForm5" :rules="xRules5" :model="xForm5">
              <el-form-item label="图片" class="upload-item" prop="imgUrl">
                <div class="cover-wrap cover-top">
                  <div v-if="xForm5.imgUrl==''" class="cover" />
                  <template v-else>
                    <img class="cover" :src="xForm5.imgUrl">
                    <div class="x-img-actions">
                      <i class="icon el-icon-delete" title="删除" @click.stop="handleRemove('xForm5')" />
                    </div>
                  </template>
                </div>
                <p class="note-grey" style="margin:8px 0 0 140px;">建议尺寸 3.68:1</p>
                <el-upload
                  style="height:20px"
                  :headers="headers"
                  :action="upLoadUrl"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-button
                    class="btn btn-upload"
                    style="position:relative;left: 50px;top: -20px"
                    size="small"
                  >本地上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接" prop="linkUrl">
                <el-input v-model="xForm5.linkUrl" type="text" size="small" style="width: 286px;" placeholder="http:// 或 https://" maxlength="500" />
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
        <div class="set-module module-activity" :class="{'active': xFormSet.formName==='xForm6'}" style="top: 1114px">
          <div class="m-header">
            <span class="text">分组商品列表1</span>
            <!-- <span class="text">右1图片</span> -->
          </div>
          <div class="m-body">
            <div style="display: flex">
              <div style="flex: 0 0 auto;">图片</div>
              <div class="flex: 1;margin-left: 10px;">
                <p class="note-grey" style="margin: 0 10px;">( 为视觉效果更佳，建议选择3-10个商品 )</p>
                <p class="note-grey" style="margin: 10px 10px;">建议尺寸 1:1</p>
                <ul class="m-goods-list webkit-scroll">
                  <template v-if="xForm6.selectGoodsList && xForm6.selectGoodsList.length>0">
                    <li v-for="(goods, $index) in xForm6.selectGoodsList" :key="$index" class="goods-item">
                      <div class="cover-box">
                        <div class="cover" :style="`backgroundImage: url('${showImg(goods.mainPic)}')`" />
                        <div class="btn-remove" @click.stop="removeGoods($index, 'xForm6')" />
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
                  <li class="goods-item item-add" @click.stop="toSelectGoods">
                    <div class="icon-add" />
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
                @click="submitForm('xForm6')"
              >提交</el-button>
            </div>
          </div>
        </div>
        <div class="set-module module-activity" :class="{'active': xFormSet.formName==='xForm7'}" style="top: 1300px">
          <div class="m-header">
            <span class="text">分组主图2</span>
          </div>
          <div class="m-body">
            <el-form ref="xForm7" :rules="xRules7" :model="xForm7">
              <el-form-item label="图片" class="upload-item" prop="imgUrl">
                <div class="cover-wrap cover-top">
                  <div v-if="xForm7.imgUrl==''" class="cover" />
                  <template v-else>
                    <img class="cover" :src="xForm7.imgUrl">
                    <div class="x-img-actions">
                      <i class="icon el-icon-delete" title="删除" @click.stop="handleRemove('xForm7')" />
                    </div>
                  </template>
                </div>
                <p class="note-grey" style="margin:8px 0 0 140px;">建议尺寸 3.68:1</p>
                <el-upload
                  style="height:20px"
                  :headers="headers"
                  :action="upLoadUrl"
                  :show-file-list="false"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-button
                    class="btn btn-upload"
                    style="position:relative;left: 50px;top: -20px"
                    size="small"
                  >本地上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接" prop="linkUrl">
                <el-input v-model="xForm7.linkUrl" type="text" size="small" style="width: 286px;" placeholder="http:// 或 https://" maxlength="500" />
              </el-form-item>
            </el-form>
            <div class="btn-line">
              <el-button
                type="primary"
                class="btn-submit"
                plain
                size="small"
                @click="submitForm('xForm7')"
              >提交</el-button>
            </div>
          </div>
        </div>
        <div class="set-module module-activity" :class="{'active': xFormSet.formName==='xForm8'}" style="top: 1310px">
          <div class="m-header">
            <span class="text">分组商品列表2</span>
            <!-- <span class="text">右1图片</span> -->
          </div>
          <div class="m-body">
            <div style="display: flex">
              <div style="flex: 0 0 auto;">图片</div>
              <div class="flex: 1;margin-left: 10px;">
                <p class="note-grey" style="margin: 0 10px;">( 为视觉效果更佳，建议选择3-10个商品 )</p>
                <p class="note-grey" style="margin: 10px 10px;">建议尺寸 1:1 比列</p>
                <ul class="m-goods-list webkit-scroll">
                  <template v-if="xForm8.selectGoodsList && xForm8.selectGoodsList.length>0">
                    <li v-for="(goods, $index) in xForm8.selectGoodsList" :key="$index" class="goods-item">
                      <div class="cover-box">
                        <div class="cover" :style="`backgroundImage: url('${showImg(goods.mainPic)}')`" />
                        <div class="btn-remove" @click.stop="removeGoods($index, 'xForm8')" />
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
                  <li class="goods-item item-add" @click.stop="toSelectGoods">
                    <div class="icon-add" />
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
                @click="submitForm('xForm8')"
              >提交</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-btns">
        <el-button type="primary" @click.stop="submitSettings()">保存</el-button>
      </div>
    </div>
    <!--弹窗--商品选取-->
    <dialog-goods ref="goodsDialog" :list="currentSelectList" @confirm="goodsSelectChange" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import dialogGoods from '@/components/Dialog/DialogGoods'
import { getPageSets, mutilAddPageSet, queryCenterStore } from '@/api/wxmall'
import config from '../../utils/config'

export default {
  name: 'HomeSet',
  components: {
    swiper,
    swiperSlide,
    dialogGoods
  },
  data() {
    const checkWebsite = (rule, value, callback) => {
      if (value === '') {
        // callback(new Error('请输入链接地址'))
        callback()
      }
      if (!/(http|https):\/\/([\w.]+\/?)\S*/.test(value)) {
        callback(new Error('链接格式不正确，例：http://111.com'))
      }
      callback()
    }
    return {
      hasCenterStore: false,
      currentRole: 'adminDashboard',
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: {
          delay: 5000 // 1秒切换一次
        }
      },
      swiperOption2: {
        pagination: {
          el: '.swiper-pagination2'
        },
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      swiperOption3: {
        // 公告
        direction: 'vertical',
        loop: true,
        autoplay: {
          delay: 5000 // 1秒切换一次
        }
      },
      // setting form
      xFormSet: {
        formName: '',
        position: ''
      },
      xRules1: {
        name: [
          { required: true, message: '请输入主页名称', trigger: 'blur' }
        ]
      },
      xRules4: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        linkUrl: [
          { validator: checkWebsite, trigger: 'blur' }
        ]
      },
      xRules5: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        linkUrl: [
          { validator: checkWebsite, trigger: 'blur' }
        ]
      },
      xRules7: {
        imgUrl: [
          { message: '请上传图片', trigger: 'blur' }
        ],
        linkUrl: [
          { validator: checkWebsite, trigger: 'blur' }
        ]
      },
      // 主页名称
      xForm1: {
        detail: null,
        name: ''
      },
      // 轮播
      xForm2: {
        detail: null
      },
      // 公告
      xForm3: {
        detail: null
      },
      // 活动(1+3)
      xForm4: {
        detail: null,
        imgUrl: '',
        linkUrl: ''
      },
      // 活动top广告
      xForm5: {
        detail: null,
        imgUrl: '',
        linkUrl: ''
      },
      // 活动分组商品
      xForm6: {
        detail: null,
        selectGoodsList: []
      },
      // 活动top广告
      xForm7: {
        detail: null,
        imgUrl: '',
        linkUrl: ''
      },
      // 活动分组商品2
      xForm8: {
        detail: null,
        selectGoodsList: []
      }
    }
  },
  computed: {
    ...mapGetters(['roles']),
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    swiper2() {
      return this.$refs.mySwiper2.swiper
    },
    swiper4() {
      return this.$refs.mySwiper4.swiper
    },
    swiper3() {
      return this.$refs.mySwiper3.swiper
    },
    currentTime() {
      return this.getNowFormatDate()
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { 'Authorization': this.$store.getters.token }
    },
    currentSelectList() {
      if (this.xFormSet.formName === 'xForm6') {
        return this.xForm6.selectGoodsList
      }
      if (this.xFormSet.formName === 'xForm8') {
        return this.xForm8.selectGoodsList
      }
      return []
    }
  },
  created() {
    // 获取数据
    this.fetchData()
  },
  methods: {
    imgLoadErr(e, url) {
      console.log('eeeeee', e)
      console.log('url', url)
      // e.target.src = url
    },
    toSetCenterStore() {
      this.$confirm('还未设置旗舰店，请先维护旗舰店, 去设置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/chainSetting')
      })
    },
    fetchData() {
      // I-00	主页名称
      // I-01	轮播图
      // I-02	公告
      // I-03	精彩活动一加三广告位
      // I-F1-1	精彩活动单张广告位
      // I-F1-2	精彩活动商品广告位
      // I-F2-1	精彩活动单张广告位
      // I-F2-2	精彩活动商品广告位
      // C-01	分类广告位
      queryCenterStore({ merCode: this.merCode }).then(res => {
        if (res.code === '10000') {
          if (res.data) {
            this.hasCenterStore = true
            this._getAppSetDetail('I-00') // 主页标题
            this._getAppSetDetail('I-01') // 轮播图
            this._getAppSetDetail('I-02') // 公告
            this._getAppSetDetail('I-03') // 活动(1+3)
            this._getAppSetDetail('I-F1-1') // 活动top广告
            this._getAppSetDetail('I-F1-2') // 活动分组商品
            this._getAppSetDetail('I-F2-1') // 活动top广告
            this._getAppSetDetail('I-F2-2') // 活动分组商品
          } else {
            this.toSetCenterStore()
          }
        } else {
          this.$message.error(res.msg)
        }
      })
        .catch(err => {
          this.$message.error(err)
        })
    },
    setEdit(formName, position) {
      if (!this.hasCenterStore) {
        this.toSetCenterStore()
        return
      }
      const eidtForm = this[formName]
      if (formName === 'xForm2') {
        this.$confirm('去设置轮播图')
          .then(_ => {
            this.$router.push('/wxmall/banner')
          })
      } else if (formName === 'xForm3') {
        this.$confirm('去设置公告')
          .then(_ => {
            this.$router.push('/wxmall/notice')
          })
      } else if (formName === this.xFormSet.formName && position === this.xFormSet.position) {
        console.log('同一位置')
        return
      } else {
        // reset 表单验证
        if (formName === 'xForm1' || formName === 'xForm4' || formName === 'xForm5' || formName === 'xForm7') {
          // 检测数据是否正常
          if (eidtForm.detail === null) { // 即获取初始数据失败{
            this.$message.warning('数据异常，请稍后重试')
            return
          }
          this.$refs[formName].resetFields()
          // 显示详情
          if (formName === 'xForm1') {
            console.log('eidtForm.detail------------', eidtForm.detail.remark)
            this.xForm1.name = eidtForm.detail && eidtForm.detail.remark ? eidtForm.detail.remark : '微商城'
          }
          if (formName === 'xForm4') {
            eidtForm.imgUrl = eidtForm.detail[position - 1].imageUrl || ''
            eidtForm.linkUrl = eidtForm.detail[position - 1].url || ''
          }
          if (formName === 'xForm5' || formName === 'xForm7') {
            eidtForm.imgUrl = eidtForm.detail.imageUrl || ''
            eidtForm.linkUrl = eidtForm.detail.url || ''
          }
        } else if (formName === 'xForm6' || formName === 'xForm8') {
          eidtForm.selectGoodsList = this.formatToSelectGoods(eidtForm.detail)
        }
      }
      this.xFormSet = {
        formName: formName,
        position: position
      }
      console.log('this.xFormSet', this.xFormSet)
      console.log('eidtForm', this[formName])
    },
    submitForm(formName) {
      if (!this.hasCenterStore) {
        this.toSetCenterStore()
        return
      }
      const submitForm = this[formName]
      if (formName === 'xForm6' || formName === 'xForm8') {
        console.log(this.selectGoodsList)
        if (submitForm.selectGoodsList.length === 0) {
          this.$message.warning('请选取分组商品')
        }
        let positionCode = 'I-F1-2'
        if (formName === 'xForm8') {
          positionCode = 'I-F2-2'
        }
        submitForm.detail = this.formatGoodsData(submitForm.selectGoodsList, positionCode)
        console.log('submitForm.detail', submitForm.detail)
        // 重置选中
        this.xFormSet = {
          formName: '',
          position: ''
        }
      } else {
        // 表单验证
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'xForm1') {
              // 表单验证..
              submitForm.detail.remark = submitForm.name
            }
            if (formName === 'xForm4') {
              // 表单验证..
              submitForm.detail[this.xFormSet.position - 1].imageUrl = submitForm.imgUrl
              submitForm.detail[this.xFormSet.position - 1].url = submitForm.linkUrl
            }
            if (formName === 'xForm5' || formName === 'xForm7') {
              // 表单验证..
              submitForm.detail.imageUrl = submitForm.imgUrl
              submitForm.detail.url = submitForm.linkUrl
            }
            // 重置选中
            this.xFormSet = {
              formName: '',
              position: ''
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    // 保存所有设置
    submitSettings() {
      if (!this.hasCenterStore) {
        this.toSetCenterStore()
        return
      }
      let ret = []
      // 剔除空数据
      if (this.xForm1.detail && this.xForm1.detail.remark !== '') {
        ret.push(this.xForm1.detail.trim())
      }
      // 剔除空数据
      if (this.xForm4.detail && this.xForm4.detail.length > 0) {
        const mdata = this.xForm4.detail.filter(item => {
          return item.imageUrl && item.url
        })
        ret = ret.concat(mdata)
      }
      if (this.xForm5.detail && this.xForm5.detail.imageUrl !== '') {
        ret.push(this.xForm5.detail)
      }
      if (this.xForm7.detail && this.xForm7.detail.imageUrl !== '') {
        ret.push(this.xForm7.detail)
      }
      if (this.xForm6.detail && this.xForm6.detail.length > 0) {
        // 剔除空数据
        if (this.xForm6.detail && this.xForm6.detail.length > 0) {
          ret = ret.concat(this.xForm6.detail)
        }
      }
      if (this.xForm8.detail && this.xForm8.detail.length > 0) {
        // 剔除空数据
        if (this.xForm8.detail && this.xForm8.detail.length > 0) {
          ret = ret.concat(this.xForm8.detail)
        }
      }
      // 提交数据
      this._mutilAddPageSet(ret)
    },
    formatGoodsData(list, positionCode) {
      const detailList = list.map((v, i) => {
        const goodItem = {
          announcement: '',
          classId: '',
          createName: '',
          endTime: '',
          id: '',
          imageUrl: v.mainPic,
          merCode: this.merCode,
          positionCode: positionCode,
          productId: v.commodityId,
          remark: v.commodityName,
          sortNumber: i + 1,
          startTime: '',
          status: 0,
          url: '',
          productName: v.commodityName,
          mprice: v.mprice,
          price: v.price
        }
        return goodItem
      })
      return detailList
    },
    formatToSelectGoods(list, positionCode) {
      if (!list) {
        return false
      }
      const selectList = list.map((v, i) => {
        const selectItem = {
          barCode: '',
          commodityId: v.productId,
          commodityName: v.productName,
          erpCode: '',
          id: '',
          lockFlag: 0,
          mainPic: v.imageUrl,
          matchStatus: null,
          mprice: v.mprice,
          packStandard: '',
          picUrl: v.imageUrl,
          price: v.price,
          specId: null,
          specSkuList: null,
          status: 1,
          stock: '0',
          unlockTime: null,
          unlockType: 0
        }
        return selectItem
      })
      return selectList
    },
    formatData(data, positionCode, sortNumber) {
      if (data) {
        return data
      } else {
        const detail = {
          'announcement': '',
          'classId': '',
          'createName': '',
          'endTime': '',
          'id': '',
          'imageUrl': '',
          'merCode': this.merCode,
          'positionCode': positionCode,
          'productId': null,
          'remark': positionCode === 'I-00' ? '微商城' : '',
          'sortNumber': sortNumber,
          'startTime': '',
          'status': 0,
          'url': ''
        }
        return detail
      }
    },
    // h5-app
    swiperCallback(event) {
      console.log('event', event)
    },
    // h5-settings
    handleRemove(formName) {
      this[formName].imgUrl = ''
    },
    handleUploadSuccess(res, file) {
      console.log('res', res)
      console.log('file', file)
      if (this.xFormSet.formName === 'xForm4') {
        this.xForm4.imgUrl = res.data
        this.$refs[this.xFormSet.formName ].validate()
      } else if (this.xFormSet.formName === 'xForm5' || this.xFormSet.formName === 'xForm7') {
        this[this.xFormSet.formName].imgUrl = res.data
        this.$refs[this.xFormSet.formName ].validate()
      }
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 获取当前时间
    getNowFormatDate() {
      const date = new Date()
      const seperator1 = '-'
      const seperator2 = ':'
      let month = date.getMonth() + 1
      const strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      const currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        this.padNum(strDate) +
        ' ' +
        this.padNum(date.getHours()) +
        seperator2 +
        this.padNum(date.getMinutes()) +
        seperator2 +
        this.padNum(date.getSeconds())
      console.log('currentdate', currentdate)
      return currentdate
    },
    padNum(val) {
      if (val <= 9) {
        return '0' + val
      }
      return val
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
    // 选取商品
    toSelectGoods() {
      this.$refs.goodsDialog.open()
    },
    // 移除商品
    removeGoods(index, formName) {
      this[formName].selectGoodsList.splice(index, 1)
    },
    goodsSelectChange(list) {
      console.log('list', list)
      // const currentForm = this[this.xFormSet.formName]
      this[this.xFormSet.formName].selectGoodsList = list
      console.log('this[this.xFormSet.formName].selectGoodsList', this[this.xFormSet.formName].selectGoodsList)
      console.log('this[this.xFormSet.formName].selectGoodsList', this['xForm8'].selectGoodsList)
      this.$refs.goodsDialog.close()
      // this.xForm2.couponList = list
    },
    _getAppSetDetail(positonCode) {
      console.log('positonCode')
      const params = {
        classId: '',
        displayTime: this.currentTime,
        startTime: '',
        endTime: '',
        positionCode: positonCode,
        remark: '',
        sortOrder: '',
        status: 1 // integer($int32)状态0停用1启用
      }
      getPageSets(params).then(res => {
        if (res.code === '10000') {
          const resData = res.data ? res.data.data || '' : res.data
          // positionCode:
          // I-00.主页名称, I-01.轮播图 I-02.公告
          // I-03	精彩活动一加三广告位
          // I-F1-1	精彩活动单张广告位
          // I-F1-2	精彩活动商品广告位
          // I-F2-1	精彩活动单张广告位
          // I-F2-2	精彩活动商品广告位
          // C-01	分类广告位
          if (positonCode === 'I-00') {
            // 主页标题
            this.xForm1.detail = this.formatData(resData ? resData[0] : null, positonCode, 1)
            console.log('res-标题', this.xForm1.detail)
          } else if (positonCode === 'I-01') {
            // 轮播
            if (resData && resData.length > 0) {
              this.xForm2.detail = resData
            }
          } else if (positonCode === 'I-02') {
            // 公告
            this.xForm3.detail = resData
          } else if (positonCode === 'I-03') {
            console.log('res公告---', resData)
            // 活动(1+3)
            let ret = []
            if (resData && resData.length > 4) { // 大于4个
              ret = resData.splice(0, 4)
            } else {
              for (let i = 0; i < 4; i++) {
                if (resData) {
                  ret[i] = this.formatData(resData[i] || null, positonCode, i + 1)
                } else {
                  ret[i] = this.formatData(null, positonCode, i + 1)
                }
                console.log('i---', i)
              }
            }
            // for (let i = 0; i < 4; i++) {
            //   ret[i] = this.formatData(ret[i] || null, '2-01', i + 1)
            //   console.log('i---', i)
            // }
            console.log('ret 活动(1+3)', ret)
            this.xForm4.detail = ret
            console.log('this.xForm4', this.xForm4.detail)
          } else if (positonCode === 'I-F1-1' || positonCode === 'I-F2-1') {
            // 活动top广告
            console.log('res 活动top广告---', resData)
            if (positonCode === 'I-F1-1') {
              this.xForm5.detail = this.formatData(resData ? resData[0] : null, positonCode, 1)
            } else {
              this.xForm7.detail = this.formatData(resData ? resData[0] : null, positonCode, 1)
            }
          } else if (positonCode === 'I-F1-2' || positonCode === 'I-F2-2') {
            // 活动分组商品
            let ret = []
            if (resData && resData.length > 0) { // 有商品
              ret = resData
            } else {
              ret = []
            }
            console.log('ret 商品', ret)
            if (positonCode === 'I-F1-2') {
              this.xForm6.detail = ret
            } else {
              this.xForm8.detail = ret
            }
          }
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    _mutilAddPageSet(ret) {
      if (ret.length === 0) {
        this.$message.warning('请提交修改数据')
        return
      }
      console.log('ret', ret)
      const params = {
        createPageSetDTOS: ret
      }
      console.log('mutil add params', params)
      mutilAddPageSet(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          // this.dialogFormVisible = false
          // 更新table
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.h5-set-container {
  position: relative;
  z-index: 0;
  display: flex;
  box-sizing: border-box;
  padding-bottom: 100px;
  .footer-btns{
    position: fixed;
    bottom: 0;
    left:0;
    z-index: 555;
    background: white;
    box-shadow:0px 2px 3px 0px rgba(35,24,21,0.2);
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
  height: 2218px;
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
      border-radius: 10px;
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
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      .icon-box {
        flex: 0 0 atuo;
        box-sizing: border-box;
        padding-right: 10px;
        border-right: 1px solid rgba(19, 116, 159, 0.2);
        .icon-notice {
          width: 45px;
          height: 20px;
          background: url('../../assets/image/h5/pic_notice.png') no-repeat
            center/100% 100%;
        }
      }
      .notice-box {
        flex: 1;
        height: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        overflow: hidden;
        .text-box {
          display: flex;
          height: 100%;
          align-items: center;
          .text {
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
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
            background: url('../../assets/image/h5/pic_sh.png') no-repeat 100% 100%;
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
              background: url('../../assets/image/h5/pic_xian_a.png') no-repeat 100% 100%;
            }
          }
          .caption {
            margin-top: 10px;
            width: 100%;
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
    $bg-cover: #f9f9f9;
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
        .pos-img{
          width: 100%;
          height:100%;
        }
        .pos-1 {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          background: $bg-cover;
        }
        .pos-2,
        .pos-3,
        .pos-4 {
          width: 100%;
          height: 60px;
          border-radius: 5px;
          background: $bg-cover;
        }
        .pos-3 {
          margin-top: 10px;
        }
        .pos-4 {
          margin-top: 10px;
        }
      }
      .card-2 {
        .card_top {
          width: 100%;
          height: 95px;
            .pos-1{
              width: 100%;
              height: 100%;
              background: $bg-cover;
            }
        }
        .card_bottom {
          position: relative;
          box-sizing: border-box;
          padding: 0 3px;
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
              background: $bg-cover;
              border-radius: 5px;
              border-radius: 5px;
              .cover {
                width: 100%;
                height: 100%;
                background-color: $bg-cover;
                background: no-repeat center/100% 100%;
              }
            }
            .caption {
              margin-top: 10px;
              width: 100%;
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
              background: url('../../assets/image/h5/pic_sh.png') no-repeat 100% 100%;
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
    img{
      width: 100%;
      height: 100%;
    }
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
    position: relative;
    border-radius: 3px;
    border: 1px solid rgba(220, 223, 230, 1);
    display: none;
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
            background: url('../../assets/image/h5/pic_xian_a.png') no-repeat center/100% 100%;
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
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(220, 223, 230, 1);
        border-radius: 5px;
        cursor: pointer;
        .icon-add {
          margin: auto;
          width: 31px;
          height: 31px;
          background: url('../../assets/image/h5/add.png') no-repeat center/100%
            100%;
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

.upload-item {
  position: relative;
  .btn-upload {
    position: absolute;
    top: 0;
    right: 0;
  }
  .cover-wrap {
    position: relative;
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
    &:hover{
      .x-img-actions{
        display: flex;
      }
    }
    &.cover-left {
      width: 139px;
      height: 166px;
      .cover {
        background: url('../../assets/image/h5/pic_d.png') no-repeat center/100%
          100%;
      }
    }
    &.cover-right {
      width: 168px;
      height: 88px;
      .cover {
        background: url('../../assets/image/h5/pic_c.png') no-repeat center/100%
          100%;
      }
    }
    &.cover-top {
      width: 286px;
      height: 100px;
      .cover {
        background: url('../../assets/image/h5/pic_e.png') no-repeat center/100%
          100%;
      }
    }
  }
}
.note-grey {
  font-size: 14px;
  line-height: 1.1;
  color: #999999;
}

.set-hover:hover {
  box-sizing: border-box;
  border: 1px solid red;
  border-radius: 0 !important;
  cursor: pointer;
}
.set-active {
  border-radius: 0 !important;
  border: 1px solid red !important;
}
</style>
