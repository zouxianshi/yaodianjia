<template>
  <div>
    <el-steps simple>
      <el-step
        title="基本信息"
        icon="el-icon-edit-outline"
        :status="step === 1 ? 'finish': 'process'"
        @click.native="handleGoStep(1)"
      />
      <el-step
        title="规格信息"
        icon="el-icon-set-up"
        :status="step === 2 ? 'finish': 'process'"
        @click.native="handleGoStep(2)"
      />
      <el-step
        title="图文信息"
        icon="el-icon-picture-outline-round"
        :status="step === 3 ? 'finish': 'process'"
        @click.native="handleGoStep(3)"
      />
    </el-steps>

    <div ref="appContaniner" class="app-container" @scroll="onScroll">
      <div v-loading="basicLoading" class="edit-wrapper" element-loading-text="拼命加载中">
        <!-- 第一步 -->
        <div id="step1" class="basic-info-section">
          <section element-loading-text="拼命加载中">
            <!-- 分类信息 -->
            <div class="edit-card">
              <div class="header">
                <span>分类信息</span>
              </div>
              <div class="edit-card-cnt">
                <div class="content">
                  <p class="type-list">
                    商品分类：
                    <el-tag v-if="Array.isArray(chooseTypeList) && chooseTypeList.length">
                      <span v-for="(item, index) in chooseTypeList" :key="index">
                        {{ item.name }}&nbsp;
                        <span v-if="index !== chooseTypeList.length-1 ">>&nbsp;</span>
                      </span>
                    </el-tag>
                    <span
                      v-if="(basicForm.id!==1&&!is_query)"
                      class="link link-btn"
                      @click="typeVisible=true;_loadClassList()"
                    >修改分类</span>
                  </p>
                  <div class="type-list groups">
                    商品分组：
                    <p v-if="Array.isArray(chooseGroup) && chooseGroup.length" class="group-list">
                      <el-tag
                        v-for="(choose_group, index) in chooseGroup"
                        :key="index"
                        style="margin-right:10px"
                        closable
                        @close="handleRemoveGroup(index)"
                      >
                        <span v-for="(item, groupIndex) in choose_group" :key="groupIndex">
                          {{ item && item.name }}&nbsp;
                          <span
                            v-if="groupIndex !== choose_group.length-1 "
                          >>&nbsp;</span>
                        </span>
                      </el-tag>
                    </p>
                    <span v-if="!is_query" class="opreate">
                      <span class="link link-btn" @click="groupVisible=true">选择分组</span>
                      <a href="#/goods-manage/group" target="_blank">
                        <span class="link link-btn">新建分组</span>
                      </a>
                      <span class="link link-btn" @click="handleRefresh">刷新</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 商品信息 -->
            <el-form
              ref="basic"
              :model="basicForm"
              status-icon
              label-width="130px"
              :rules="(basicForm.origin === 2 || $route.name === 'depotEdit' || $route.query.source === 'create') ? basicRules : {}"
              :disabled="is_query"
            >
              <div class="edit-card">
                <div class="header">
                  <span>商品信息</span>
                </div>
                <div class="edit-card-cnt">
                  <div class="content">
                    <el-form-item label="商品名称：" prop="name">
                      <el-input
                        v-model.trim="basicForm.name"
                        maxlength="30"
                        placeholder="请输入商品名称"
                        size="small"
                      />
                    </el-form-item>
                    <el-form-item prop="commonName">
                      <span slot="label">
                        <span
                          v-if="chooseTypeList.length!==0&&chooseTypeList[0].name==='中西药品'"
                          class="tip"
                        >*</span>
                        通用名：
                      </span>
                      <el-input
                        v-model.trim="basicForm.commonName"
                        maxlength="20"
                        :disabled="$route.name === 'additionEdit'"
                        placeholder="请输入通用名"
                        size="small"
                      />
                    </el-form-item>
                    <el-form-item label="所属品牌：" prop="brandId">
                      <el-select
                        v-model="basicForm.brandName"
                        v-loadmore="loadMore"
                        filterable
                        remote
                        clearable
                        :remote-method="remoteMethod"
                        :loading="loading"
                        placeholder="请选择所属品牌"
                        @change="handleBrandChange"
                        @clear="handleBrandClear"
                      >
                        <el-option
                          v-for="item in brandList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="重量：" prop="weight">
                      <el-input
                        v-model="basicForm.weight"
                        maxlength="6"
                        placeholder="请输入重量"
                        size="small"
                        style="width:210px"
                      >
                        <template slot="append">克</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="长宽高：" style="display:inline-block" prop="long">
                      <el-input
                        v-model="basicForm.long"
                        placeholder="长"
                        size="small"
                        style="width:160px"
                      >
                        <template slot="append">m</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label label-width="0px" style="display:inline-block" prop="width">
                      <el-input
                        v-model="basicForm.width"
                        placeholder="宽"
                        size="small"
                        style="width:160px"
                      >
                        <template slot="append">m</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item
                      label
                      label-width="0px"
                      style="display:inline-block"
                      prop="height"
                    >
                      <el-input
                        v-model="basicForm.height"
                        placeholder="高"
                        size="small"
                        style="width:160px"
                      >
                        <template slot="append">m*</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item v-if="unit.length" label="单位：" prop="unit">
                      <el-select v-model="basicForm.unit" placeholder="选择单位">
                        <el-option
                          v-for="item in unit"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                      <!-- {{ basicForm.unit }} -->
                    </el-form-item>
                    <el-form-item label="关键字：" prop="keyWord">
                      <el-input
                        v-model="basicForm.keyWord"
                        maxlength="512"
                        placeholder="请输入关键字"
                        size="small"
                      />&nbsp;用、隔开
                    </el-form-item>
                  </div>
                </div>
              </div>
              <!-- 详细信息 -->
              <div class="edit-card">
                <div class="header">
                  <span>详细信息</span>
                </div>
                <div class="edit-card-cnt">
                  <div class="content">
                    <template v-if="chooseTypeList.length!==0&&chooseTypeList[0].name=='中西药品'">
                      <el-form-item label="药品类型：">
                        <el-select v-model="basicForm.drugType" placeholder="请选择药品类型">
                          <el-option label="甲类OTC" :value="0" />
                          <el-option label="乙类OTC" :value="2" />
                          <el-option label="OTC" :value="4" />
                          <el-option label="处方药" :value="1" />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="剂型：">
                        <el-select v-model="basicForm.dosageForm" placeholder="请选择药品剂型">
                          <el-option
                            v-for="(item,index) in drug"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </template>
                    <el-form-item label="生产企业：" prop="manufacture">
                      <el-input
                        v-model.trim="basicForm.manufacture"
                        maxlength="127"
                        placeholder="请输入生产企业"
                        size="small"
                      />
                    </el-form-item>
                    <el-form-item label="产地：">
                      <el-input
                        v-model.trim="basicForm.produceOrigin"
                        maxlength="50"
                        placeholder="请输入产地"
                        size="small"
                      />
                    </el-form-item>
                    <el-form-item label="批准文号：" prop="approvalNumber">
                      <el-input
                        v-model.trim="basicForm.approvalNumber"
                        :disabled="$route.name === 'additionEdit'"
                        maxlength="24"
                        placeholder="请输入批准文号"
                        size="small"
                      />
                    </el-form-item>
                    <el-form-item label="商品详细信息：">
                      <p>
                        填写商品说明书
                        <el-tag
                          style="margin:0px 0px 5px 10px"
                          type="warning"
                        >请参考说明书。若是药品则必须包含用法用量，不良反应、禁忌、注意事项等。</el-tag>
                      </p>
                      <div class="editorWrap">
                        <Tinymce
                          id="basicInfo"
                          ref="editor"
                          v-model="basicForm.intro"
                          :readonly="is_query"
                          :height="400"
                          :placeholder="'请参考说明书。若是药品则必须包含用法用量，不良反应、禁忌、注意事项等。'"
                          @onload="tinymceLoad"
                        />
                        <div class="wordcount">统计: {{ getContentLength }}字</div>
                      </div>
                      <!-- <div v-show="basicForm.origin===1">
                      <Tinymce
                        ref="editor"
                        v-model="basicForm.intro"
                        :readonly="true"
                        :height="400"
                      />
                    </div>
                    <div v-show="basicForm.origin!==1">
                      <Tinymce
                        id="basicInfo"
                        ref="editor"
                        v-model="basicForm.intro"
                        :readonly="is_query"
                        :height="400"
                        @onload="tinymceLoad"
                      />
                      </div>-->
                    </el-form-item>
                    <el-form-item label="功能/适应症">
                      <el-input
                        v-model.trim="basicForm.keyFeature"
                        type="textarea"
                        maxlength="512"
                        :rows="3"
                        show-word-limit
                        placeholder="请输入功能/适应症"
                        size="small"
                      />
                    </el-form-item>
                    <el-form-item label="有效期：" prop="days">
                      <el-radio v-model="expireDays" :label="-1" size="small">无</el-radio>
                      <el-radio v-model="expireDays" :label="1" size="small">
                        有
                        <template v-if="expireDays === 1">
                          <el-input
                            v-model="basicForm.days"
                            maxlength="8"
                            style="width:80px"
                            size="small"
                            placeholder
                          />
                          <el-select
                            v-model="timeTypes"
                            style="width:100px"
                            size="small"
                            placeholder
                          >
                            <el-option value="1" label="年" />
                            <el-option value="2" label="月" />
                            <el-option value="3" label="天" />
                          </el-select>
                          <span style="color:#999">30天为一个月，365天为一年</span>
                        </template>
                      </el-radio>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <!-- 特殊属性 -->
              <div class="edit-card">
                <div class="header">
                  <span>特殊属性</span>
                </div>
                <div class="edit-card-cnt">
                  <div class="content">
                    <el-form-item label="运输方式：">
                      <el-radio-group v-model="basicForm.freightType">
                        <el-radio :label="0">常温</el-radio>
                        <el-radio :label="1">冷藏</el-radio>
                        <el-radio :label="2">冷冻</el-radio>
                      </el-radio-group>
                      <el-checkbox
                        v-model="basicForm.isEasyBreak"
                        style="margin-left: 25px;"
                        :true-label="1"
                        :false-label="0"
                      >易碎</el-checkbox>
                      <el-checkbox v-model="basicForm.isLiquid" :true-label="1" :false-label="0">液体</el-checkbox>
                    </el-form-item>
                    <el-form-item
                      v-if="chooseTypeList&&chooseTypeList.length!==0&&chooseTypeList[0].name==='中西药品'"
                      label="其他属性："
                    >
                      <template>
                        <el-checkbox
                          v-model="basicForm.hasEphedrine"
                          :true-label="1"
                          :false-label="0"
                        >含麻黄碱</el-checkbox>
                        <el-checkbox
                          v-model="basicForm.needId"
                          :true-label="1"
                          :false-label="0"
                        >需要身份证</el-checkbox>
                      </template>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </section>
        </div>
        <!-- 规格信息 -->
        <div id="step2">
          <div v-if="isSpec" class="mss-box">
            <div class="edit-card">
              <div class="header">
                <span>规格设置</span>
              </div>
              <div class="edit-card-cnt">
                <div class="content">
                  <m-spec-setting
                    ref="specSetting"
                    :is-disabled="is_query"
                    :spec-list="newSpecList"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 图文详情 -->
        <div id="step3">
          <div class="edit-card">
            <div class="header">
              商品橱窗图
              <span class="img-tips">最多6张。</span>
              <span class="img-tipe-noImg">注意：无图片则无法上架到商城！</span>
              <div v-clickoutside="moreImghide" class="img-tipe-moreBtnbox">
                <span class="img-tipe-moreBtn link" @click="moreImg">更多规则>></span>
                <ol v-if="ismoreImg === true" class="img-tips-more">
                  <li>&nbsp;</li>
                  <li>图片上传规则</li>
                  <li>1、药品图片应体现：主商品+商品外包装（包装正面须包括：[药品名称]、 [OTC标识]及[包装详情] ，包装侧面须包括：[成份]、[性状]、[适应症]、[规格]、[用法用量]、[不良反应]、[禁忌]、[注意事项]、[执行标准]、[批准文号]、[生产企业]、[UPC码]）。</li>
                  <li>2、图片单张大小不超过 1M。仅支持 jpg，jpeg，png格式。</li>
                  <li>3、图片质量要聚焦清晰，不能虚化。商品图片必须为白色或无色背景。</li>
                  <li>4、图片内容展示方向，应始终保持文字正向。</li>
                  <li>5、请上传商品正面、侧面、背面不少于3张图片，药品需上传药品说明书图片，器械需上传器械注册证图片</li>
                </ol>
              </div>
            </div>
            <div class="edit-card-cnt">
              <div class="content">
                <vue-upload-img
                  :actions="upLoadUrl"
                  :disable="is_query"
                  :before-upload="beforeUpload"
                  :list="fileList"
                  :headers="headers"
                  :limit="6"
                  @preview="handlePreview"
                  @onsort="handleSortEnd"
                  @onSuccess="handleImgSuccess"
                  @onError="handleImgError"
                  @remove="handleRemove"
                />
                <el-dialog append-to-body :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
                <!-- <div class="text-center">
                <el-button type size="small" @click="step=2">上一步</el-button>
                <el-button
                  v-if="!is_query"
                  type="primary"
                  size="small"
                  :loading="subLoading1"
                  style="width:70px"
                  @click="handleSubImg"
                >保存</el-button>
                </div>-->
              </div>
            </div>
          </div>
          <div class="edit-card">
            <div class="header">图文详情</div>
            <div class="edit-card-cnt">
              <div class="content">
                <section class="goods-details">
                  <div class="left-show">
                    <div class="img" />
                    <div class="basicMsgs">
                      基本信息区
                      <br>固定样式,显示商品主图、价格等信息
                    </div>
                    <div class="editSqu w-e-text" v-html="goodsIntro.content" />
                  </div>
                  <div class="edit-box">
                    <Tinymce
                      ref="details-ty"
                      v-model="goodsIntro.content"
                      :readonly="is_query"
                      :height="400"
                    />
                  </div>
                </section>
                <!-- <div class="text-center">
                <el-button
                  v-if="!is_query"
                  type="primary"
                  size="small"
                  :loading="subLoading2"
                  @click="handleSubInfo"
                >保存</el-button>
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        title="选择分类"
        :visible.sync="typeVisible"
        :close-on-click-modal="false"
        width="600px"
        append-to-body
      >
        <div class="modal-body">
          <el-cascader-panel
            v-model="chooseList"
            v-loading="loading"
            class="cascader"
            :options="typeList"
            :props="defaultProps"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="typeVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="handleSaveType">确 定</el-button>
        </span>
      </el-dialog>
      <edit-group
        :is-show="groupVisible"
        type="1"
        :choose-data="chooseGroup"
        :group-data="groupDataDimens"
        @back="handleSaveGroup"
        @close="groupVisible=false"
      />
      <div class="action-wapper">
        <!-- :loading="subLoading" -->
        <el-button v-if="!is_query" size="small" @click="backStep">取 消</el-button>
        <el-button
          v-if="!is_query && !is_state"
          size="small"
          type="primary"
          :loading="isSaveBtn"
          style="width:70px;margin-right: 10px;"
          @click="nextStep"
        >保 存</el-button>
        <el-button
          v-if="is_state"
          size="small"
          type="primary"
          style="width:70px;margin-right: 10px;"
          @click="handleAudit(1)"
        >通 过</el-button>
        <el-button
          v-if="is_state"
          size="small"
          type="danger"
          style="width:70px;margin-right: 10px;"
          @click="handleAudit(0)"
        >驳 回</el-button>
        <el-button v-if="is_query" size="small" @click="goBackUrl()">关 闭</el-button>
      </div>
      <el-dialog
        title="选择驳回原因"
        append-to-body
        close-on-click-modal
        :visible.sync="rejectVisible"
        width="30%"
      >
        <div class="modal-body">
          <el-form
            ref="rejectForm"
            :model="rejectForm"
            :rules="rules"
            label-width="100px"
            size="small"
          >
            <el-form-item label="选择原因" prop="id">
              <el-select v-model="rejectForm.id" placeholder>
                <el-option label="该商品不适合销售" value="1" />
                <el-option label="商品信息不够规范合格" value="2" />
                <el-option label="其他原因" value="3" />
              </el-select>
            </el-form-item>
            <div v-show="rejectForm.id==='3'">
              <el-form-item label="驳回原因" prop="reason">
                <el-input
                  v-model="rejectForm.reason"
                  maxlength="127"
                  show-word-limit
                  placeholder="输入原因"
                  type="textarea"
                  :rows="2"
                />
                <span v-show="is_err" class="tip">请填写驳回原因</span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer">
          <el-button type="primary" size="small" @click="handleReject">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import vueUploadImg from '@/components/ImgUpload'
import { setAuditGoods } from '@/api/examine'
import { getTypeTree, getPreGroupList, getTypeDimensionList } from '@/api/group'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
import {
  getUnit,
  getMetering,
  setGoodsAddALL,
  updateBasicInfo,
  getBrandList,
  saveImg,
  saveGoodsDetails,
  getGoodsAddALL,
  getGoodsInfo
} from '@/api/new-goods'
import mixins from './_source/mixin'
import specsMixin from './_source/specsMixins'
import editGroup from '../components/grouping'
import { findArray, directives } from '@/utils/index'
import { checkNumberdouble } from '@/utils/validate'
import { handlerDays } from './_source/utils'
import mSpecSetting from './_source/specSetting'

export default {
  name: 'GoodsEdit',
  components: { Tinymce, vueUploadImg, editGroup, mSpecSetting },
  mixins: [mixins, specsMixin],
  directives: { Clickoutside: directives.Clickoutside },
  data() {
    const _checkName = (rule, value, callback) => {
      if (!value) {
        if (
          this.basicForm.origin !== 1 &&
          this.chooseTypeList.length !== 0 &&
          this.chooseTypeList[0].name === '中西药品'
        ) {
          callback(new Error('请输入通用名'))
        } else {
          callback()
        }
        // return callback(new Error('请输入内容'))
      } else {
        callback()
      }
    }
    const _checkFloat = (rule, value, callback) => {
      if (!value) {
        if (rule.field === 'weight') {
          return callback(new Error('请输入重量'))
        }
        // return callback(new Error('请输入数值'))
      }
      if (value && !checkNumberdouble(value)) {
        callback(new Error('只能设置最多两位小数的正数'))
      } else {
        if (rule.field === 'weight') {
          if (value <= 0 || value % 1 !== 0) {
            return callback(new Error('必须大于0的整数'))
          }
          // if (value > 99000000) {
          //   return callback(new Error('重量不能大于99000000克'))
          // }
        }
        if (
          rule.field === 'long' ||
          rule.field === 'height' ||
          rule.field === 'width'
        ) {
          if ((value && value <= 0) || value >= 100) {
            return callback(new Error('长宽高必须大于0 小于100'))
          }
        }
        callback()
      }
    }
    const _checkDays = (rule, value, callback) => {
      if (value) {
        if (value % 1 !== 0) {
          callback(new Error('请输入大于0的整数'))
        } else {
          if (value <= 0) {
            return callback(new Error('请输入大于0的整数'))
          }
          callback()
        }
      } else {
        callback()
      }
    }
    const _checkKeyWord = (rule, value, callback) => {
      const reg = /[^A-Za-z0-9\u4e00-\u9fa5、]/g
      if (value !== '' && reg.test(value)) {
        callback(new Error('仅支持输入英文、汉字、数字或顿号'))
      } else {
        callback()
      }
    }
    return {
      isSpec: true,
      ismoreImg: false, // 判断是否显示图片上传规则
      specLoading: false,
      rejectVisible: false, // 驳回弹框
      rejectForm: {
        id: '',
        reason: ''
      },
      rules: {
        id: [{ required: true, message: '请选择驳回原因', trigger: 'blur' }]
      },
      is_err: false,
      step: 1,
      chooseTypeList: [], // 选中的分类
      chooseGroup: [], // 选中的分组
      groupVisible: false,
      chooseArray: [],
      brandList: [], // 品牌列表
      brandListM: [], // 品牌列表
      timeTypes: '3', // 2为月 1为年
      expireDays: -1,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      loading: false,
      basicLoading: false,
      basicForm: {
        weight: '', // 商品总量，单位g
        approvalNumber: '', // 批准文号
        brandId: '', // 商品品牌id
        brandName: '', // 品牌名称
        commonName: '', // 药品通用名，国际非专有名称
        drugType: '', // drugType 药品类型
        freightType: 0, // 运输属性运输属性（0常温，1冷藏，2冰冻）
        hasEphedrine: 0, // 包含麻黄碱，0-不包含，1-包含
        needId: 0, // 是否需要身份证，0-不需要，1-需要
        intro: '', // 商品说明
        isEasyBreak: 0, // 是否易碎，0-否，1-是
        isInsurance: 0, // 是否医保支持,0-不支持，1-支持
        isLiquid: 0, // 是否液体,0-否，1-是
        keyFeature: '', // 功能主治
        keyWord: '', // 关键字
        manufacture: '', // 生产企业
        name: '', // 商品名
        produceOrigin: '', // 产地
        unit: '', // 规格
        typeId: '', // 所属分类ID
        long: '',
        height: '',
        width: '',
        days: '',
        origin: '', // 商品来源，1-海典标准库，2-商家自定义
        packStandard: '', // 长宽高
        groupIds: [], // 分组id
        brandNanme: '',
        brandNanme_currentPage: 1,
        brandNanme_pageSize: 30,
        brandLoading: false
      },
      basicRules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        commonName: [{ validator: _checkName, trigger: 'blur' }],
        unit: [
          { required: true, message: '请输入选择单位', trigger: 'change' }
        ],
        brandId: [
          { required: true, message: '请选择所属品牌', trigger: 'change' }
        ],
        weight: [{ required: true, validator: _checkFloat, trigger: 'blur' }],
        manufacture: [
          { required: true, message: '请输入生成企业', trigger: 'blur' }
        ],
        produceOrigin: [
          { required: true, message: '请输入生产地', trigger: 'blur' }
        ],
        approvalNumber: [
          { required: true, message: '请输入批准文号', trigger: 'blur' }
        ],
        long: [{ validator: _checkFloat, trigger: 'blur' }],
        height: [{ validator: _checkFloat, trigger: 'blur' }],
        width: [{ validator: _checkFloat, trigger: 'blur' }],
        days: [{ validator: _checkDays, trigger: 'blur' }],
        keyWord: [{ validator: _checkKeyWord, trigger: 'blur' }]
      },
      dialogVisible: false,
      unit: [],
      value: '',
      dialogImageUrl: '',
      fileList: [],
      groupData: [], // 分组
      groupDataDimens: [],
      goodsIntro: {
        // 商品信息
        content: ''
      },
      drug: [], // 剂型
      uploadIndex: 0,
      is_query: false, // 是否为查看
      is_state: false, // 是否为审批
      backUrl: '',
      subLoading: false,
      subLoading2: false,
      subLoading1: false, // 加载
      pageLoading: false, // 加载
      leaveAction: false, // 离开页面动作，true为保存离开  false异常离开
      isHasImg: false,
      isLoadStep3: false,
      isLoadStep2: false,

      // todo
      newSpecList: [],
      isSaveBtn: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    },
    getContentLength: function() {
      if (this.basicForm.intro) {
        const text = this.basicForm.intro
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, '')
        const count = text.trim().length
        return count
      }
      return ''
    },
    // 计算是否需要下一步
    setp3show() {
      if (this.is_query && this.step === 3) {
        return false
      }
      return true
    },
    // 获取listView,判断tagsView是否关闭当前标签
    ...mapGetters(['visitedViews'])
  },
  watch: {
    // step(val) {
    //   if (val === 3 && !this.isLoadStep3) {
    //     this.isLoadStep3 = true
    //     this._loadGoodsDetails()
    //     this._loadGoodsImgAry()
    //   }
    // }
  },
  beforeRouteLeave(to, from, next) {
    next()
    // 路由离开关闭标签
    if (this.is_query && this.pageLoading) {
      this.pageLoading.close()
    }

    if (!this.leaveAction) {
      const answer = window.confirm('你还有数据没有保存，是否确认退出')
      if (answer) {
        if (this.pageLoading) {
          this.pageLoading.close()
        }
        this.$store.dispatch('tagsView/delView', from)
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  mounted() {},
  created() {
    this.basicLoading = true
    this._loadTypeList() // 获取分组
    this._loadBrandList({
      pageSize: 30,
      currentPage: 1
    }) // 获取所属品牌
    this._loadUnit() // 加载单位
    // chooseTypeList不为空且第一个为中西药品才有必要加载
    this._loadMetering() // 加载剂型
    this._loadSpces() // 获取规格
    if (!this.$route.query.id) {
      // 新建
      const data = sessionStorage.getItem('types') // 取出从选择分类存取的数据
      this.chooseTypeList = JSON.parse(data)
      this.basicLoading = false
    } else {
      this.basicForm.id = this.$route.query.id
      this.getDataAll()
      // 基本信息
      //   this.getTypeListData()
      //   .then(res => {
      //     this._loadBasicInfo()
      //   })
      //   .catch(_ => {
      //     this._loadBasicInfo()
      //   })
      //   setTimeout(() => {
      //   this.$nextTick(() => {
      //     // 加载商品说明
      //     this._loadGoodsDetails()
      //      // 加载商品图片
      //     this._loadGoodsImgAry()
      //   })
      // }, 1200)
    }
    this.is_query = this.$route.query.type === 'query'
    this.is_state = this.$route.query.state === 'check'
    this.backUrl = this.$route.query.backUrl
    // this.basicLoading = false
    // if (this.is_query) {
    //   sessionStorage.setItem('editId', '')
    //   sessionStorage.setItem('editIsQuery', this.is_query)
    // } else {
    //   sessionStorage.setItem('editIsQuery', '')
    //   sessionStorage.setItem('editId', this.$route.query.id)
    // }
    // this.pageLoading = this.$loading({
    //   lock: true,
    //   text: '数据初始化中...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })
  },
  methods: {
    // 一键获取信息
    async getDataAll() {
      const params = {
        commodityId: this.$route.query.id,
        merCode: this.merCode
      }
      // if (this.$route.query.type) {
      //   commodityNew(params)
      //     .then(res => {
      //       this.basicLoading = false
      //       this._loadGoodsImgAry(res.data.imgList)
      //       this._loadSpecs(res.data.specList)
      //       console.log('++++++++++++++++')
      //       console.log(res.data.commDTO)
      //       if (res.data.commDTO && res.data.commDTO.drugType === 3) {
      //         res.data.commDTO.drugType = ''
      //       }
      //       this._loadBasicInfo(res.data.commDTO)
      //       this._loadGoodsDetails(res.data.detailDTO.content)
      //       this.basicLoading = false
      //     })
      // } else {
      this.isSpec = false

      const handlerInit = res => {
        this.basicLoading = false
        this._loadGoodsImgAry(res.data.imgList)
        this._loadSpecs(res.data.specList)
        this.newSpecList = res.data.specList
        if (res.data.commDTO && res.data.commDTO.drugType === 3) {
          res.data.commDTO.drugType = ''
        }
        this._loadBasicInfo(res.data.commDTO)
        this._loadGoodsDetails(
          (res.data.detailDTO && res.data.detailDTO.content) || ''
        )
        this.basicLoading = false
        this.isSpec = true
      }

      if (this.$route.query.type === '添加该商品') {
        await getGoodsInfo(params).then(handlerInit)
        this.basicForm.origin = 2
      } else {
        getGoodsAddALL(params).then(handlerInit)
      }
      // }
    },
    // 驳回原因
    handleReject() {
      let reason = ''
      if (!this.rejectForm.id) {
        this.$message({
          message: '请选择驳回原因',
          type: 'error'
        })
        return
      }
      if (this.rejectForm.id === '1') {
        reason = '该商品不适合销售'
      } else if (this.rejectForm.id === '2') {
        reason = '商品信息不够规范合格'
      } else {
        reason = this.rejectForm.reason
      }
      const data = {
        auditReason: reason,
        auditStatus: '0',
        ids: [this.$route.query.id],
        userName: this.name
      }
      if (this.rejectForm.id === '3') {
        if (!data.auditReason) {
          this.is_err = true
          return
        } else {
          this.is_err = false
          this._AuditRequest(data, false, 'reject')
        }
      } else {
        this.rejectForm.id = ''
        this._AuditRequest(data, false, 'reject')
      }
    },
    // 通过 或 驳回
    handleAudit(type) {
      if (type === 1) {
        const data = {
          auditReason: '',
          auditStatus: type,
          ids: [this.$route.query.id],
          userName: this.name
        }
        this._AuditRequest(data)
      } else {
        this.rejectVisible = true
      }
    },
    // 审核
    _AuditRequest(data, state, type) {
      // 审核请求
      setAuditGoods(data)
        .then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.rejectVisible = false
          this.rejectForm.id = ''
          this.rejectForm.reason = ''
          // this.$router.go(-1)
          if (!data.auditReason) {
            this.$router.replace(
              `/goods-manage/${this.backUrl}?source=${
                type === 'reject' ? 0 : 1
              }&type=1`
            )
          } else {
            this.$router.replace(
              `/goods-manage/${this.backUrl}?source=${
                type === 'reject' ? 0 : 1
              }&type=0`
            )
          }
        })
        .catch(_ => {})
    },
    // 定位
    onScroll() {
      if (this.$refs.appContaniner && this.$refs.appContaniner.scrollTop) {
        const { scrollTop } = this.$refs.appContaniner
        const s1 = $('#step1').height()
        const s2 = $('#step2').height()
        const s3 = $('#step3').height()
        if (scrollTop < s1) {
          this.step = 1
        } else if (scrollTop < s2 + s1 + 40) {
          this.step = 2
        } else if (scrollTop < s2 + s1 + s3) {
          this.step = 3
        }
      }
    },
    // 富文本渲染染成
    tinymceLoad() {
      // 富文本渲染染成
      if (this.pageLoading) {
        this.pageLoading.close()
      }
    },
    // 锁定定位楼梯
    handleGoStep(val) {
      this.step = val
      this.jump('#step' + val)
    },
    // 滚动到指定节点
    jump(domId) {
      this.$el.querySelector(domId).scrollIntoView({
        // 滚动到指定节点
        block: 'start', // 值有start,center,end，nearest，当前显示在视图区域中间
        behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
      })
    },
    // 请选择所属品牌
    handleBrandChange(val) {
      const index = this.brandList.findIndex(item => {
        return item.id === val
      })
      if (index > -1) {
        this.basicForm.brandName = this.brandList[index].name
        this.basicForm.brandId = val
      }
    },
    // 清楚选择所属品牌
    handleBrandClear(val) {
      this.basicForm.brandName = ''
      this.basicForm.brandId = ''
      this._loadBrandList({
        pageSize: 30,
        currentPage: 1
      })
    },
    // 加载单位
    _loadUnit() {
      getUnit().then(res => {
        const { data } = res
        if (data) {
          this.unit = data.map(v => {
            return {
              label: v,
              value: v
            }
          })
        }
      })
    },
    // 加载剂型
    _loadMetering() {
      getMetering().then(res => {
        const { data } = res
        if (data) {
          data.map(v => {
            this.drug.push({
              label: v,
              value: v
            })
          })
        }
      })
    },
    // 查询分类和分组的父类
    _loadgroupGather(type, ids) {
      const data = {
        ids: ids,
        type: type,
        merCode: type === '1' ? 'hydee' : this.merCode
      }
      getPreGroupList(data).then(res => {
        if (type === '1') {
          // 分类
          const datas = res.data[ids[0]]
          if (datas) {
            this.chooseTypeList = [
              { name: datas.name, id: datas.id },
              { name: datas.child.name, id: datas.child.id },
              { name: datas.child.child.name, id: datas.child.child.id }
            ]
          }
        } else {
          // 分组
          const datas = res.data
          ids.map(v => {
            const dat = datas[v]
            if (dat) {
              if (dat.child.child) {
                this.chooseGroup.push([
                  { name: dat.name, id: dat.id },
                  { name: dat.child.name, id: dat.child.id },
                  {
                    name: dat.child.child.name,
                    id: dat.child.child.id
                  }
                ])
              } else {
                this.chooseGroup.push([
                  { name: dat.name, id: dat.id },
                  { name: dat.child.name, id: dat.child.id }
                ])
              }
            }
          })
        }
      })
    },
    // 加载基本信息
    _loadBasicInfo(val) {
      // 分组处理
      this._loadgroupGather('1', [val.typeId])
      if (val.groupIds && val.groupIds.length > 0) {
        this._loadgroupGather('2', val.groupIds)
      }
      const data = val
      if (!data.typeId) {
        const findIndex = findArray(this.typeList, { id: data.firstTypeId })
        if (findIndex > -1) {
          this.chooseTypeList = [
            {
              id: this.typeList[findIndex].id,
              name: this.typeList[findIndex].name
            }
          ]
          if (data.secondTypeId) {
            const row = this.typeList[findIndex].children
            const findSecIndex = findArray(row, { id: data.secondTypeId })
            if (findSecIndex > -1) {
              this.chooseTypeList.push({
                id: row[findSecIndex].id,
                name: row[findSecIndex].name
              })
            }
          }
        }
      }
      // // 药品类型处理 如果默认为3直接设置为空
      // if (data.drugType && data.drugType > 2) {
      //   data.drugType = ''
      // }
      // 有限期处理
      if (data.expireDays === -1) {
        this.expireDays = -1
      } else {
        this.expireDays = 1
        data.days = data.expireDays
        this.timeTypes = '3'
      }

      // todo 处理回填日期
      if (data.days) {
        const { days, timeTypes } = handlerDays(data.days)
        data.days = days
        this.timeTypes = `${timeTypes}`
      }

      const findUnitIndex = findArray(this.unit, { value: data.unit }) // 查找数组里面有咩有
      const findDrugIndex = findArray(this.drug, { value: data.dosageForm })
      if (this.basicForm.origin === 2) {
        // 自建商品
        // 处理批量自建的问题
        if (findUnitIndex === -1) {
          data.unit = ''
        }
        if (findDrugIndex === -1) {
          data.dosageForm = ''
        }
      }

      // 长宽高处理
      if (data.packStandard) {
        const packStandard = data.packStandard.split('*')
        data.long = packStandard[0] === 'undefined' ? '' : packStandard[0]
        data.width = packStandard[1] === 'undefined' ? '' : packStandard[1]
        data.height = packStandard[2] === 'undefined' ? '' : packStandard[2]
      }
      // 赋值值
      this.basicForm = data
      if (this.basicForm.intro === null) {
        this.basicForm.intro === ''
      }
      this.$refs.editor.setContent(this.basicForm.intro)
    },
    // 加载商品图片
    _loadGoodsImgAry(val) {
      if (val) {
        const fileList = []
        val.forEach((v, index) => {
          const item = {
            imgUrl: this.showImg(v.picUrl),
            picUrl: v.picUrl
          }
          fileList.push(item)
        })
        this.fileList = fileList
        this.isHasImg = fileList.length > 0
      }
    },
    // 加载商品详情
    _loadGoodsDetails(val) {
      this.goodsIntro.content = val
      this.$refs['details-ty'].setContent(val)
      // this.$refs['details-ty'].destroyTinymce() // 先销毁
      // getGoodsDetails(id)
      //   .then(res => {
      //     if (res.data) {
      //       this.goodsIntro.content = res.data.content
      //     }
      //     this.$refs['details-ty'].init() // 再初始化
      //   })
      //   .catch(_ => {
      //     this.$refs['details-ty'].init()
      //   })
    },
    // 图片排序
    handleSortEnd(val) {
      this.fileList = val
    },
    // 上传橱窗图片
    handleImgSuccess(res, fileList, index) {
      if (res.code === '10000') {
        if (!this.fileList[index]) {
          this.fileList.push({
            imgUrl: this.showImg(res.data),
            picUrl: res.data
          })
        } else {
          this.fileList[index].imgUrl = this.showImg(res.data)
          this.fileList[index].picUrl = res.data
        }
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
    // 上传商品图片
    handleAvatarSuccessEdit(res, fileList, index) {
      if (res.code === '10000') {
        this.editSpecsData[this.uploadIndex].picUrl = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
    // 上传失败
    handleImgError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        location.reload()
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
        this.pageLoading.close()
      }
    },
    // 删除图片
    handleRemove(index) {
      if (this.isHasImg && this.fileList.length === 1) {
        this.$message({
          message: '删除失败，请至少保留一张图片',
          type: 'error'
        })
        return false
      }
      this.fileList.splice(index, 1)
    },
    // 图片
    handlePreview(file) {
      this.dialogImageUrl = file.imgUrl
      this.dialogVisible = true
    },
    // 图片
    beforeUpload(file) {
      const size = file.size / 1024
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      if (!isImg) {
        this.$message({
          message: '只能上传格式为 jpg、jpeg、png的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return
      }
      if (size > 1024) {
        this.$message({
          message: '最大只能上传1MB的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return false
      }
      this.pageLoading = this.$loading({
        lock: true,
        text: '图片上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return true
    },
    handleUploadIndex(index) {
      this.uploadIndex = index
    },
    handleAvatarSuccess(res, file) {
      // 规格图片上传成功
      if (res.code === '10000') {
        this.specsForm.specs[this.uploadIndex].picUrl = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
    // 获取分组
    _loadTypeList(isRefresh) {
      getTypeTree({ merCode: this.merCode, type: 2 }).then(res => {
        this.groupData = res.data
        if (isRefresh) {
          this.$message({
            message: '刷新成功',
            type: 'success'
          })
        }
      })
      // 获取分类
      getTypeDimensionList(this.$store.state.user.merCode).then(res => {
        this.groupDataDimens = res.data
      })
    },
    handleSaveGroup(row) {
      // 保存数据
      this.chooseArray = row
      this.chooseGroup = []
      this._filters(this.chooseArray)
      this.groupVisible = false
    },
    handleRefresh() {
      // 刷新分组
      this._loadTypeList(true)
    },
    handleRemoveGroup(index) {
      // 删除选择的分组
      this.chooseGroup.splice(index, 1)
    },
    loadMore: function() {
      this._loadBrandList({
        brandName: this.brandNanme,
        pageSize: 30,
        currentPage: this.brandNanme_currentPage
      })
    },
    remoteMethod(query) {
      this.brandNanme = query
      this._loadBrandList({
        brandName: query,
        pageSize: 30,
        currentPage: 1
      })
    },
    _loadBrandList(params) {
      // 获取品牌
      // this.brandLoading = true
      getBrandList(params).then(res => {
        const { data, currentPage } = res.data
        if (currentPage === 1) {
          this.brandList = Array.isArray(data) ? data : []
        } else {
          const arr = Array.isArray(data) ? data : []
          this.brandList = [...this.brandList, ...arr]
        }
        this.brandNanme_currentPage = currentPage + 1
        // this.brandLoading = false
      })
    },
    _filters(data) {
      data.forEach((val, index1) => {
        const findIndex = findArray(this.groupData, { id: val[0] })
        if (findIndex > -1) {
          // console.table(this.groupData)
          // 找一级
          if (!this.chooseGroup[index1]) {
            this.chooseGroup.push([])
          }
          const row = this.groupData[findIndex]
          this.chooseGroup[index1].push({ name: row.name, id: row.id })
          if (row.children) {
            // 找二级
            const findIndex_child = findArray(row.children, { id: val[1] })
            if (findIndex_child > -1) {
              const child = row.children[findIndex_child]
              this.chooseGroup[index1].push({ name: child.name, id: child.id })
              if (child.children) {
                // 找三级
                const findIndex_children = findArray(child.children, {
                  id: val[2]
                })
                if (findIndex_children > -1) {
                  const children = child.children[findIndex_children]
                  this.chooseGroup[index1].push({
                    name: children.name,
                    id: children.id
                  })
                }
              }
            }
          }
        }
      })
    },
    _CreateBasicInfo(data) {
      this.leaveAction = true
      this.isSaveBtn = true
      // this.subLoading = true
      // 创建基本信息

      let msgText = '保存成功'
      if (this.$route.name === 'editApply') {
        msgText = `已提交审核，可在「新品申请记录」-${
          this.$route.query.source === 'create' ? '「待提交审核」' : '「全部」'
        }页面查看`
      }

      if (this.$route.query.type === '添加该商品') {
        data.origin = 1
      }

      setGoodsAddALL(data)
        .then(res => {
          this.isSaveBtn = false
          this.$message({
            message: msgText,
            type: 'success'
          })
          this.basicForm.id = res.data

          const { name, query } = this.$route
          let url = '/goods-manage/constitute-goods'

          if (name === 'additionEdit') {
            url = '/goods-manage/depot'
          } else if (name === 'applyRecordEdit' || name === 'editApply') {
            const type = query.source === 'create' ? 3 : query.type
            url = `/goods-manage/apply-record?type=${type}`
          } else if (name === 'depotEdit') {
            url = '/goods-manage/depot'
          }

          this.$store
            .dispatch('tagsView/delView', this.$route)
            .then(({ visitedViews }) => {
              this.$router.push(url)
            })
          // this.subLoading = false
        })
        .catch(_ => {
          this.isSaveBtn = false
          // this.subLoading = false
        })
    },
    _UpdateBasicInfo(data) {
      // 更新基本信息
      updateBasicInfo(data)
        .then(res => {
          // this.$message({
          //   message: '保存成功',
          //   type: 'success'
          // })
        })
        .catch(_ => {})
    },
    nextStep() {
      this.handleSubmitForm()
    },
    backStep() {
      setTimeout(() => {
        this.$confirm('该操作将导致所编辑内容丢失。确认操作吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.goBackUrl(3)
          })
          .catch(() => {})
      }, 1000)
    },
    goBackUrl(type = 2) {
      let t = this.$route.query.type === 'query' ? 1 : type
      t = this.$route.query.state === 'check' ? 2 : t
      this.$store.dispatch('tagsView/delView', this.$route).then(res => {
        this.$router.replace(`/goods-manage/${this.backUrl}?source=2&type=${t}`)
      })
    },
    // 保存
    handleSubmitForm() {
      // todo submit

      // 保存基本信息操作
      this.$refs['basic'].validate(valid => {
        if (valid) {
          if (valid) {
            if (this.chooseTypeList.length === 0) {
              this.$message({
                message: '请选择分类',
                type: 'warning'
              })
              return
            }
            this.basicForm.typeId = this.chooseTypeList[
              this.chooseTypeList.length - 1
            ].id // 分类id
            if (
              this.chooseTypeList &&
              (this.chooseTypeList[0].name === '医疗器械' ||
                this.chooseTypeList[0].name === '营养保健')
            ) {
              this.basicForm.hasEphedrine = 0
              this.basicForm.needId = 0
            }
            const data = JSON.parse(JSON.stringify(this.basicForm))
            data.packStandard = `${data.long || ''}*${data.width ||
              ''}*${data.height || ''}`
            if (this.expireDays === -1) {
              data.expireDays = -1
            } else {
              if (this.timeTypes === '2') {
                // 月
                data.expireDays = parseInt(this.basicForm.days) * 30
              } else if (this.timeTypes === '1') {
                data.expireDays = parseInt(this.basicForm.days) * 365
              } else {
                data.expireDays = parseInt(this.basicForm.days)
              }
            }
            // if (this.chooseGroup.length === 0) {
            //   this.$message({
            //     message: '请设置商品分组',
            //     type: 'error'
            //   })
            //   return
            // }
            data.groupIds = []
            this.chooseGroup.map(v => {
              v[2] && v[2].id
                ? data.groupIds.push(v[2].id)
                : data.groupIds.push(v[1].id)
            })
            if (this.chooseTypeList.length !== 3) {
              this.$message({
                message: '分类选择不完整，分类必须三级',
                type: 'error'
              })
              return
            }
            if (
              this.chooseTypeList &&
              this.chooseTypeList[0].name !== '中西药品'
            ) {
              data.drugType = ''
              data.dosageForm = ''
              data.hasEphedrine = ''
              this.basicForm.needId = ''
            }

            // todo 规格
            const valueList = this.$refs['specSetting'].$verification()

            if (!_.isObject(valueList)) {
              console.log('有错误')
              return
            }

            if (this.fileList.length === 0) {
              this.$confirm(
                '橱窗图为空，保存后无法上架。请确认是否返回编辑？',
                '提示',
                {
                  confirmButtonText: '继续保存',
                  cancelButtonText: '返回编辑',
                  type: 'warning'
                }
              )
                .then(() => {
                  // if (this.basicForm.id) {
                  //   data.firstTypeId = this.chooseTypeList[0].id
                  //   data.secondTypeId = this.chooseTypeList[1].id
                  //   data.commodityId = data.id
                  //   this._UpdateBasicInfo(data)
                  // } else {
                  this.handleSubmitSpec()
                  data.firstTypeId = this.chooseTypeList[0].id
                  data.secondTypeId = this.chooseTypeList[1].id
                  const params = {}
                  params.commDTO = data
                  // todo new valueList save
                  params.specList = valueList
                  params.imgList = this.fileList
                  params.detailDTO = {
                    content: this.goodsIntro.content,
                    id: this.basicForm.id
                  }

                  // todo handler params
                  const { query } = this.$route
                  if (query.origin) {
                    params.commDTO.origin = parseInt(query.origin)
                  }

                  if (this.$route.query.source === 'create') {
                    params.commDTO.origin = 2
                  }

                  this._CreateBasicInfo(params)
                  // }
                  // 需修改

                  // this.handleSubIntro()
                })
                .catch(() => {})
            } else {
              // if (this.basicForm.id) {
              //   data.firstTypeId = this.chooseTypeList[0].id
              //   data.secondTypeId = this.chooseTypeList[1].id
              //   data.commodityId = data.id
              //   this._UpdateBasicInfo(data)
              // } else {
              this.handleSubmitSpec()
              data.firstTypeId = this.chooseTypeList[0].id
              data.secondTypeId = this.chooseTypeList[1].id
              const params = {}
              // 基础信息
              params.commDTO = data
              // 规格
              // todo new valueList save
              params.specList = valueList
              params.imgList = this.fileList
              params.detailDTO = {
                content: this.goodsIntro.content,
                id: this.basicForm.id
              }

              // todo handler params
              const { query } = this.$route
              if (query.origin) {
                params.commDTO.origin = parseInt(query.origin)
              }

              if (this.$route.query.source === 'create') {
                params.commDTO.origin = 2
              }

              this._CreateBasicInfo(params)
              // }
            }
          }
        } else {
          this.$message({
            message: '存在必填字段未填写',
            type: 'error'
          })
          // if (this.basicForm.name === '') {
          //   this.$message({
          //     message: '请输入商品名称',
          //     type: 'error'
          //   })
          //   return
          // }
          // if (this.basicForm.brandName === '') {
          //   this.$message({
          //     message: '请选择所属品牌',
          //     type: 'error'
          //   })
          //   return
          // }
          // if (this.basicForm.weight === '') {
          //   this.$message({
          //     message: '请输入重量',
          //     type: 'error'
          //   })
          //   return
          // }
          // if (this.basicForm.unit === '') {
          //   this.$message({
          //     message: '请输入选择单位',
          //     type: 'error'
          //   })
          //   return
          // }
          // if (this.basicForm.manufacture === '') {
          //   this.$message({
          //     message: '请输入生产企业',
          //     type: 'error'
          //   })
          //   return
          // }
          // if (this.basicForm.approvalNumber === '') {
          //   this.$message({
          //     message: '请输入批准文号',
          //     type: 'error'
          //   })
          //   return
          // }
        }
      })
    },
    moreImg() {
      if (this.ismoreImg === true) {
        this.ismoreImg = false
      } else {
        this.ismoreImg = true
      }
    },
    moreImghide() {
      this.ismoreImg = false
    },
    handleSubImg() {
      // 保存图片
      if (this.fileList.length === 0) {
        if (this.isHasImg) {
          // 判断之前是否有图片
          this.$message({
            message: '保存失败，请至少保留一张图片',
            type: 'error'
          })
        } else {
          this.$message({
            message: '无图片则无法上架到商城',
            type: 'warning'
          })
        }
        return
      }
      this.subLoading1 = true
      const data = {
        commodityId: this.basicForm.id,
        imgs: this.fileList
      }
      // this.fileList.map(v => {
      //   data.imgs.push({ picUrl: v.imgUrl })
      // })

      saveImg(data)
        .then(_ => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.subLoading1 = false
        })
        .catch(_ => {
          this.subLoading1 = false
        })
    },
    handleSubInfo() {
      // 保存商品详情
      this.subLoading2 = true
      const data = {
        content: this.goodsIntro.content,
        id: this.basicForm.id
      }
      saveGoodsDetails(data)
        .then(res => {
          this.subLoading2 = false
          this.$message({
            message: '商品详情保存成功',
            type: 'success'
          })
          this.subLoading2 = false
        })
        .catch(_ => {
          this.subLoading2 = false
        })
    }
  }
}
</script>
<style lang="scss">
.specs-img-table {
  .avatar-uploader-icon {
    width: 60px;
    height: 60px;
    line-height: 60px !important;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
.tox .tox-statusbar {
  display: none !important;
}
.basic-info-section {
  .el-loading-spinner {
    top: 10%;
  }
}
</style>
<style lang="scss" scoped>
.app-container {
  height: calc(100vh - 204px);
}
.edit-wrapper {
  color: #333;
  margin-bottom: 80px;

  .img-tips {
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: #e6a23c;
    li {
      margin-bottom: 5px;
    }
  }
  .img-tipe-noImg {
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: red;
  }
  .img-tips-more {
    width: 500px;
    font-size: 12px;
    background-color: #ffffdd;
    padding: 5px;
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    left: 82px;
    li {
      line-height: normal;
      margin-bottom: 5px;
    }
    li:nth-child(1) {
      width: 0;
      height: 0;
      border-width: 15px;
      border-style: solid;
      border-color:transparent #ffffdd transparent transparent;
      position: absolute;
      left: -30px;
      top: 5px;
    }
    li:nth-child(2) {
      color: red;
      font-size: 16px;
    }
  }
  .img-tipe-moreBtnbox {
    position: absolute;
    top: 0px;
    left: 335px;
    z-index: 110;
  }
  .img-tipe-moreBtn {
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: #147de8;
    -ms-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    user-select:none;
  }
  .specs-box {
    margin-top: 20px;
    .el-table {
      width: auto;
    }
  }

  .edit-card {
    margin-top: 10px;
    .el-input {
      width: 300px;
    }
    .el-textarea {
      @extend .el-input;
    }
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .header {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      font-size: 16px;
      position: relative;
    }
    .edit-card-cnt {
      padding: 10px;
      color: #333;
      .content {
        padding: 20px 30px;
        background: #f6f7fb;
      }
      .type-list {
        margin-bottom: 10px;
        &:last-child {
          margin: 0;
        }
        &.groups {
          display: flex;
          align-items: center;
        }
        .group-list {
          display: inline-block;
          // max-width: 600px;
          margin-right: 5px;
          .tag {
            margin-right: 10px;
          }
        }
        .link {
          cursor: pointer;
        }
      }
    }
    .editorWrap {
      position: relative;
      .wordcount {
        position: absolute;
        // bottom: -5px;
        height: 18px;
        line-height: 18px;
        // right: 10px;
        text-align: right;
        font-size: 12px;
        width: 100%;
        background: #fff;
        border: 1px solid #ccc;
        border-top: 0 none;
        padding-right: 10px;
        color: rgba(34, 47, 62, 0.7);
      }
    }
  }
  .next-btn {
    margin-top: 20px;
  }
  .goods-details {
    display: flex;
    margin-bottom: 10px;
    .left-show {
      width: 320px;
      height: auto;
      border: 1px solid #e0e0e0;
      .img {
        width: 320px;
        height: 64px;
        background: url('../../../assets/image/sprite_dm.png') -2px -86px;
      }
      .basicMsgs {
        width: 100%;
        height: 100px;
        color: #666;
        line-height: 25px;
        text-align: center;
        padding-top: 20px;
        background: #f2f2f2;
      }
      .editSqu {
        height: 376px;
        border: 1px dashed red;
        img {
          max-width: 100% !important;
        }
        >>> img {
          display: block;
        }
      }
      .w-e-text {
        padding: 5px 10px;
        overflow-y: scroll;
      }
    }
    .edit-box {
      margin-left: 20px;
      padding: 10px;
      background: #f8f8f8;
      border: 1px solid #d1d1d1;
      position: relative;
    }
  }
  .spec-list {
    width: 550px;
    border-radius: 5px;
    border: 1px solid #c9c9cc;
    margin-left: 80px;
    margin-bottom: 10px;
    .header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      border-bottom: 1px solid #c9c9cc;
      i {
        cursor: pointer;
      }
    }
    .spec-content {
      padding: 12px;
      .el-input {
        width: 250px;
      }
      .specs-img {
        .avatar-uploader-icon {
          width: 100px;
          height: 100px;
          line-height: 100px !important;
        }
        .avatar {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
  .add-spec {
    margin-left: 80px;
  }
}
.action-wapper {
  position: fixed !important;
  padding: 12px;
  bottom: 0;
  left: 255px;
  right: 0;
  z-index: 3000;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: right;
  width:calc(100% - 255px);
}
.link-btn {
  font-size: 14px;
}
.modal-body {
  .cascader {
    .el-input {
      width: 300px !important;
    }
  }
}
</style>
