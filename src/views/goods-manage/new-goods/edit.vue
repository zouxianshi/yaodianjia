<template>
  <div class="app-container">
    <div class="edit-wrapper">
      <el-steps :active="step" simple style="margin-top: 20px">
        <el-step title="基本信息" icon="el-icon-edit-outline" @click="handleGoStep(1)" />
        <el-step title="规格信息" icon="el-icon-set-up" @click="handleGoStep(2)" />
        <el-step title="图文信息" icon="el-icon-picture-outline-round" @click="handleGoStep(3)" />
      </el-steps>
      <!-- 第一步 -->
      <div v-show="step===1">
        <!-- 分类信息 -->
        <div class="edit-card">
          <div class="header">
            <span>分类信息</span>
          </div>
          <div class="edit-card-cnt">
            <div class="content">
              <p class="type-list">商品分类：
                <el-tag v-if="chooseTypeList.length">
                  <span v-if="chooseTypeList.length">{{ chooseTypeList[0].name }}&nbsp;>&nbsp;
                    {{ chooseTypeList[1].name }}&nbsp;>&nbsp;{{ chooseTypeList[2].name }}</span>
                </el-tag>
                <span v-if="(basicForm.id!==1||!is_query)&&basicForm.origin!==1" class="link link-btn" @click="typeVisible=true;_loadClassList()">修改分类</span></p>
              <div class="type-list groups">商品分组：
                <p class="group-list">
                  <el-tag v-for="(item,index) in chooseGroup" :key="index" style="margin-right:10px" closable @close="handleRemoveGroup(index)">
                    <span class="tag">{{ item[0].name }}&nbsp;>&nbsp;{{ item[1].name }}&nbsp;>&nbsp;{{ item[2].name }}</span>
                  </el-tag>
                </p>
                <span v-if="!is_query" class="opreate">
                  <span class="link link-btn" @click="groupVisible=true">选择分组</span>
                  <a href="#/goods-manage/group" target="_blank"><span class="link link-btn">新建分组</span></a>
                  <span class="link link-btn" @click="handleRefresh">刷新</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <el-form ref="basic" :model="basicForm" status-icon label-width="130px" :rules="basicRules">
          <div class="edit-card">
            <div class="header">
              <span>商品信息</span>
            </div>
            <div class="edit-card-cnt">
              <div class="content">
                <el-form-item label="商品名称：" prop="name">
                  <el-input v-model="basicForm.name" :disabled="basicForm.origin===1||is_query" placeholder="请输入商品名称" size="small" />
                </el-form-item>
                <el-form-item v-if="chooseTypeList.length!==0&&(chooseTypeList[0].name!=='医疗器械'||chooseTypeList[0].name!=='营养保健')" prop="commonName" label="通用名：">
                  <el-input v-model="basicForm.commonName" :disabled="basicForm.origin===1||is_query" placeholder="请输入通用名" size="small" />
                </el-form-item>
                <el-form-item label="所属品牌：" prop="brandId">
                  <el-select
                    v-model="basicForm.brandId"
                    :disabled="basicForm.origin===1||is_query"
                    filterable
                    remote
                    :remote-method="remoteMethod"
                    :loading="loading"
                    placeholder="请选择所属品牌"
                  >
                    <el-option
                      v-for="item in brandList"
                      :key="item.id"
                      :label="item.engName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="重量" prop="weight">
                  <el-input v-model="basicForm.weight" :disabled="basicForm.origin===1||is_query" placeholder="请输入重量" size="small" style="width:193px">
                    <template slot="append">公斤</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="长宽高：" style="display:inline-block" prop="long">
                  <el-input v-model="basicForm.long" :disabled="basicForm.origin===1||is_query" placeholder="长" size="small" style="width:160px">
                    <template slot="append">m*</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="" label-width="0px" style="display:inline-block" prop="long">
                  <el-input v-model="basicForm.width" :disabled="basicForm.origin===1||is_query" placeholder="宽" size="small" style="width:160px">
                    <template slot="append">m*</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="" label-width="0px" style="display:inline-block" prop="long">
                  <el-input v-model="basicForm.height" :disabled="basicForm.origin===1||is_query" placeholder="宽" size="small" style="width:160px">  <template slot="append">m*</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="单位：" prop="unit">
                  <el-select v-model="basicForm.unit" :disabled="basicForm.origin===1||is_query" placeholder="选择单位">
                    <el-option
                      v-for="item in unit"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="关键字：">
                  <el-input v-model="basicForm.keyWord" :disabled="basicForm.origin===1||is_query" placeholder="请输入关键字" size="small" /> &nbsp;用、隔开
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
                    <el-select v-model="basicForm.drugType" :disabled="basicForm.origin===1||is_query" placeholder="请选择药品类型">
                      <el-option label="甲类OTC" value="0" />
                      <el-option label="处方药" value="1" />
                      <el-option label="乙类OTC" value="2" />
                      <el-option label="非处方药" value="3" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="剂型：">
                    <el-select v-model="basicForm.dosageForm" :disabled="basicForm.origin===1||is_query" placeholder="请选择药品类型">
                      <el-option v-for="(item,index) in drug" :key="index" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </template>
                <el-form-item label="生产企业：" prop="manufacture">
                  <el-input v-model="basicForm.manufacture" :disabled="basicForm.origin===1||is_query" placeholder="请输入生产企业" size="small" />
                </el-form-item>
                <el-form-item label="产地：" prop="produceOrigin">
                  <el-input v-model="basicForm.produceOrigin" :disabled="basicForm.origin===1||is_query" placeholder="请输入产地" size="small" />
                </el-form-item>
                <el-form-item label="批准文号：" prop="approvalNumber">
                  <el-input v-model="basicForm.approvalNumber" :disabled="basicForm.origin===1||is_query" placeholder="请输入批准文号" size="small" />
                </el-form-item>
                <el-form-item v-if="chooseTypeList.length!==0&&chooseTypeList[0].name==='中西药品'" label="是否含有麻黄碱">
                  <el-checkbox v-model="basicForm.hasEphedrine" :disabled="basicForm.origin===1||is_query" :true-label="1" :false-label="0">含麻黄碱</el-checkbox>
                </el-form-item>
                <el-form-item label="商品详细信息：">
                  <p>填写商品说明书</p>
                  <div v-show="basicForm.origin===1">
                    <Tinymce ref="editor" v-model="basicForm.intro" :readonly="true" :height="400" />
                  </div>
                  <div v-show="basicForm.origin!==1">
                    <Tinymce ref="editor" v-model="basicForm.intro" :readonly="is_query" :height="400" />
                  </div>
                </el-form-item>
                <el-form-item label="功能主治/适应症：">
                  <el-input
                    v-model="basicForm.keyFeature"
                    type="textarea"
                    :disabled="basicForm.origin===1||is_query"
                    :rows="2"
                    placeholder="请输入功能主治/适应症"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="有效期：">
                  <el-radio v-model="expireDays" :disabled="basicForm.origin===1||is_query" :label="-1" size="small">无</el-radio>
                  <el-radio v-model="expireDays" :disabled="basicForm.origin===1||is_query" :label="1" size="small">
                    <el-input v-model="days" :disabled="basicForm.origin===1||is_query" style="width:80px" size="small" placeholder="" />
                    <el-select v-model="timeTypes" :disabled="basicForm.origin===1||is_query" style="width:100px" size="small" placeholder="">
                      <el-option value="1" label="年" />
                      <el-option value="2" label="月" />
                    </el-select>
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
                  <el-radio-group v-model="basicForm.freightType" :disabled="basicForm.origin===1||is_query">
                    <el-radio :label="0">常温</el-radio>
                    <el-radio :label="1">冷藏</el-radio>
                    <el-radio :label="2">冷冻</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="其他属性：">
                  <el-checkbox v-model="basicForm.isEasyBreak" :disabled="basicForm.origin===1||is_query" :true-label="1" :false-label="0">易碎</el-checkbox>
                  <el-checkbox v-model="basicForm.isLiquid" :disabled="basicForm.origin===1||is_query" :true-label="1" :false-label="0">液体</el-checkbox>
                </el-form-item>
                <el-form-item label="" label-width="100px">
                  <el-button type="primary" size="small" :loading="subLoading" @click="handleSubmitForm">下一步</el-button>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 规格信息 -->
      <div v-show="step===2">
        <div class="specs-box">
          <p class="text-right" style="font-size:13px">商品来源：{{ basicForm.origin===2?'商家自定义':'海典商品标准库' }}</p>
          <el-form>
            <el-form-item label="规格设置：">
              <template v-if="basicForm.origin===2&&basicForm.id&&editSpecsData.length>0">
                <template v-if="dynamicProp.length>0">
                  <span v-for="(item,index) in specsList" :key="index" style="display:inline-block;margin-right:10px;">
                    <el-checkbox v-if="shows(item)" :key="index" checked :disabled="true||is_query" @change="handleSpecsChange(item)"> {{ item.attributeName }}</el-checkbox>
                  </span>
                </template>
              </template>
              <template v-else>
                <el-checkbox v-for="(item,index) in specsList" :key="index" v-model="item.isCheck" :disabled="basicForm.origin===1||is_query" @change="handleSpecsChange(item)"> {{ item.attributeName }}</el-checkbox>
              </template>
            </el-form-item>
            <el-form-item label="规格信息：">
              <template v-if="basicForm.origin===1">
                <el-table :data="specsForm.specs" @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <span v-for="(item,index) in specsForm.specs" :key="index">
                    <el-table-column v-for="(items,index1) in item.productSpecSkuDTOs" :key="index1" :label="items.skuKeyName">
                      <template>
                        <span v-text="items.skuValue" />
                      </template>
                    </el-table-column>
                  </span>
                  <el-table-column label="商品编码">
                    <template slot-scope="scope">
                      <span v-text="scope.row.erpCode" />
                      <edit-table title="商品编码" keys="erpCode" :info="scope.row" :index="scope.$index" @saveInfo="handleEditTabSpecs" />
                    </template>
                  </el-table-column>
                  <el-table-column label="商品条码" prop="barCode" />
                  <el-table-column label="商品价格">
                    <template slot-scope="scope">
                      <span v-text="scope.row.mprice" />
                      <edit-table title="商品价格" keys="mprice" :info="scope.row" :index="scope.$index" @saveInfo="handleEditTabSpecs" />
                    </template>
                  </el-table-column>
                  <el-table-column label="商品图片">
                    <template slot-scope="scope">
                      <el-upload
                        class="avatar-uploader specs-img-table"
                        :action="upLoadUrl"
                        :headers="headers"
                        :disabled="is_query"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleImgError"
                        :before-upload="beforeUpload"
                      >
                        <el-image v-if="scope.row.picUrl" class="avatar" style="width:60px;height:60px" :src="showImg(scope.row.picUrl)">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                          </div>
                        </el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon" @click="handleUploadIndex(scope.$index)" />
                      </el-upload>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-else>
                <template v-if="basicForm.id&&editSpecsData.length>0">
                  <el-table :data="editSpecsData">
                    <el-table-column v-for="(propsf,indexs) in dynamicProp" :key="indexs" :label="propsf.name">
                      <template slot-scope="scope">
                        <span v-if="scope.row[propsf.keys]" v-text="scope.row[propsf.keys]" />
                        <edit-table :title="propsf.name" :keys="propsf.keys" :info="scope.row" :index="scope.$index" @saveInfo="handleEditTabSpecs" />
                      </template>
                    </el-table-column>
                    <el-table-column label="商品编码" prop="erpCode">
                      <template slot-scope="scope">
                        <span v-text="scope.row.erpCode" />
                        <edit-table title="商品编码" keys="erpCode" :info="scope.row" :index="scope.$index" @saveInfo="handleEditTabSpecs" />
                      </template>
                    </el-table-column>
                    <el-table-column label="商品条码" prop="barCode">
                      <template slot-scope="scope">
                        <span v-text="scope.row.barCode" />
                        <edit-table title="商品条码" keys="barCode" :info="scope.row" :index="scope.$index" @saveInfo="handleEditTabSpecs" />
                      </template>
                    </el-table-column>
                    <el-table-column label="商品价格" prop="mprice">
                      <template slot-scope="scope">
                        <span v-text="scope.row.mprice" />
                        <edit-table title="商品价格" keys="mprice" :info="scope.row" :index="scope.$index" @saveInfo="handleEditTabSpecs" />
                      </template>
                    </el-table-column>
                    <el-table-column label="商品图片">
                      <template slot-scope="scope">
                        <el-upload
                          class="avatar-uploader specs-img-table"
                          :action="upLoadUrl"
                          :headers="headers"
                          :disabled="is_query"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccessEdit"
                          :on-error="handleImgError"
                          :before-upload="beforeUpload"
                        >
                          <el-image v-if="scope.row.picUrl" class="avatar" style="width:60px;height:60px" :src="showImg(scope.row.picUrl)">
                            <div slot="placeholder" class="image-slot">
                              加载中<span class="dot">...</span>
                            </div>
                          </el-image>
                          <i v-else class="el-icon-plus avatar-uploader-icon" @click="handleUploadIndex(scope.$index)" />
                        </el-upload>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
                <div v-for="(item,index) in specsForm.specs" :key="index" class="spec-list" style="margin-top:10px;">
                  <div class="header">
                    <span>规格{{ index+1 }}</span>
                    <i class="el-icon-delete" @click="handleDeleteSpec(index)" />
                  </div>
                  <div class="spec-content">
                    <el-form :ref="'specsForm'+index" :model="item" size="small" label-width="80px" :status-icon="true">
                      <el-form-item v-for="(items,index1) in specsForm.specsData" :key="index1">
                        <span slot="label"><span class="tip">*</span> {{ items.attributeName }}</span>
                        <el-input v-model="item['index_'+items.id+'_'+items.attributeName]" :disabled="is_query" :placeholder="'输入'+items.attributeName" />
                      </el-form-item>
                      <el-form-item label="">
                        <span slot="label"><span class="tip">*</span> 条码</span>
                        <el-input v-model="item.barCode" placeholder="输入条码" />
                      </el-form-item>
                      <el-form-item>
                        <span slot="label"><span class="tip">*</span> 商品编码</span>
                        <el-input v-model="item.erpCode" placeholder="输入条码" />
                      </el-form-item>
                      <el-form-item>
                        <span slot="label"><span class="tip">*</span> 价格</span>
                        <el-input v-model="item.mprice" placeholder="输入价格" />
                      </el-form-item>
                      <el-form-item label="商品图片">
                        <span slot="label"><span class="tip">*</span> 商品图片</span>
                        <el-upload
                          class="avatar-uploader specs-img"
                          :action="upLoadUrl"
                          :headers="headers"
                          :disabled="is_query"
                          :show-file-list="false"
                          :upload-index="index"
                          :on-success="handleAvatarSuccess"
                          :on-error="handleImgError"
                          :before-upload="beforeUpload"
                        >
                          <el-image v-if="item.picUrl" class="avatar" style="width:80px;height:80px" :src="showImg(item.picUrl)">
                            <div slot="placeholder" class="image-slot">
                              加载中<span class="dot">...</span>
                            </div>
                          </el-image>
                          <i v-else class="el-icon-plus avatar-uploader-icon" @click="handleUploadIndex(index)" />
                        </el-upload>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <p v-if="!is_query" class="add-spec">
                  <el-button type="text" icon="el-icon-plus" size="small" @click="handleAddSpec">添加规格</el-button>
                </p>
              </template>
            </el-form-item>
            <el-form-item label="" label-width="100px">
              <el-button type="" size="small" @click="step=1">上一步</el-button>
              <el-button type="primary" size="small" :loading="subLoading" @click="handleSubmitSpec">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 图文详情 -->
      <div v-show="step==3">
        <div class="edit-card">
          <div class="header">
            商品橱窗图 <span class="img-tips">最多6张，图片800*800</span>
          </div>
          <div class="edit-card-cnt">
            <div class="content">
              <vue-upload-img :actions="upLoadUrl" :disable="is_query" :before-upload="beforeUpload" :list="fileList" :headers="headers" :limit="6" @preview="handlePreview" @onsort="handleSortEnd" @onSuccess="handleImgSuccess" @onError="handleImgError" />
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <p class="img-tips" style="margin-top:10px;color:#E6A23C">提示：上传图片后可在线编辑图片，支持鼠标拖拽排序</p>
              <div class="text-center">
                <el-button type="" size="small" @click="step=2">上一步</el-button>
                <el-button v-if="!is_query" type="primary" size="small" @click="handleSubImg">保存</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="edit-card">
          <div class="header">
            商品详情
          </div>
          <div class="edit-card-cnt">
            <div class="content">
              <section class="goods-details">
                <div class="left-show">
                  <div class="img" />
                  <div class="basicMsgs">基本信息区<br>固定样式,显示商品主图、价格等信息</div>
                  <div class="editSqu w-e-text" v-html="goodsIntro.content" />
                </div>
                <div class="edit-box">
                  <Tinymce ref="editor" v-model="goodsIntro.content" :readonly="is_query" :height="400" />
                </div>
              </section>
              <div class="text-center">
                <el-button v-if="!is_query" type="primary" size="small" :loading="subLoading" @click="handleSubIntro">保存</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="选择分类"
      :visible.sync="typeVisible"
      :close-on-click-modal="false"
      width="30%"
      append-to-body
    >
      <div class="modal-body">
        <el-cascader
          v-model="chooseList"
          class="cascader"
          style="width:300px"
          :options="typeList"
          :props="defaultProps"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="typeVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSaveType">确 定</el-button>
      </span>
    </el-dialog>
    <edit-group :is-show="groupVisible" :group-data="groupDataDimens" @back="handleSaveGroup" @close="groupVisible=false" />
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import vueUploadImg from '@/components/ImgUpload'
import { getTypeTree, getPreGroupList, getTypeDimensionList } from '@/api/group'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
import { getUnit, getMetering, setGoodsAdd, updateBasicInfo, getBrandList, saveImg, saveGoodsDetails, getBasicGoodsInfo, getGoodsImgAry, getGoodsDetails } from '@/api/new-goods'
import mixins from './_source/mixin'
import specsMixin from './_source/specsMixins'
import editTable from './_source/edit-table'
import editGroup from './_source/group'
export default {
  components: { Tinymce, vueUploadImg, editTable, editGroup },
  mixins: [mixins, specsMixin],
  data() {
    const _checkName = (rule, value, callback) => {
      if (!value) {
        if (rule.field === 'commonName') {
          return callback(new Error('请输入通用名'))
        }
        return callback(new Error('请输入内容'))
      }
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
      if (!reg.test(value)) {
        callback(new Error('只能输入中英文或数字'))
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
      const reg = /(^([0-9]+|0)$)|(^(([0-9]+|0)\.([0-9]{1,2}))$)/
      if (value && !reg.test(value)) {
        callback(new Error('只能设置最多两位小数的正数'))
      } else {
        callback()
      }
    }
    return {
      step: 1,
      chooseTypeList: [], // 选中的分类
      chooseGroup: [], // 选中的分组
      groupVisible: false,
      chooseArray: [],
      brandList: [], // 品牌列表
      timeTypes: '2', // 2为月 1为年
      expireDays: -1,
      days: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      loading: false,
      basicForm: {
        'approvalNumber': '', // 批准文号
        'brandId': '', // 商品品牌id
        'commonName': '', // 药品通用名，国际非专有名称
        'drugType': '', // drugType 药品类型
        'freightType': 0, // 运输属性运输属性（0常温，1冷藏，2冰冻）
        'hasEphedrine': 0, // 包含麻黄碱，0-不包含，1-包含
        'intro': '', // 商品说明
        'isEasyBreak': 0, // 是否易碎，0-否，1-是
        'isInsurance': 0, // 是否医保支持,0-不支持，1-支持
        'isLiquid': 0, // 是否液体,0-否，1-是
        'keyFeature': '', // 功能主治
        'keyWord': '', // 关键字
        'manufacture': '', // 生产企业
        'name': '', // 商品名
        'produceOrigin': '', // 产地
        'unit': '', // 规格
        'typeId': '',
        'origin': 2, // 商品来源，1-海典标准库，2-商家自定义
        'packStandard': '', // 长宽高
        'groupIds': [] // 分组id
      },
      basicRules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        commonName: [{ required: true, validator: _checkName, message: '请输入通用名称', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入选择单位', trigger: 'change' }],
        brandId: [{ required: true, message: '请选择所属品牌', trigger: 'change' }],
        weight: [
          { required: true, validator: _checkFloat, trigger: 'blur' }
        ],
        manufacture: [{ required: true, message: '请输入生成企业', trigger: 'blur' }],
        produceOrigin: [{ required: true, message: '请输入生产地', trigger: 'blur' }],
        approvalNumber: [{ required: true, message: '请输入批准文号', trigger: 'blur' }],
        long: [{ validator: _checkFloat, trigger: 'blur' }],
        height: [{ validator: _checkFloat, trigger: 'blur' }],
        width: [{ validator: _checkFloat, trigger: 'blur' }]
      },
      dialogVisible: false,
      unit: [],
      value: '',
      dialogImageUrl: '',
      fileList: [],
      groupData: [], // 分组
      groupDataDimens: [],
      goodsIntro: { // 商品信息
        content: ''
      },
      drug: [], // 剂型
      uploadIndex: 0,
      is_query: false, // 是否为查看
      subLoading: false,

      pageLoading: false, // 加载
      leaveAction: false // 离开页面动作，true为保存离开  false异常离开
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImg?merCode=${this.merCode}`
    },
    headers() {
      return { 'Authorization': this.token }
    }
  },
  watch: {
    step(val) {
      if (val === 3) {
        this._loadGoodsDetails()
        this._loadGoodsImgAry()
      }
    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    if (this.is_query) {
      next()
    } else {
      if (!this.leaveAction) {
        const answer = window.confirm('你还有数据没有保存，是否确认退出')
        if (answer) {
          this.$store
            .dispatch('tagsView/delView', from)
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    }
  },
  created() {
    if (this.$route.query.id) { // 如果是编辑
      this._loadBasicInfo()
    } else {
      const data = sessionStorage.getItem('types') // 取出从选择分类存取的数据
      this.chooseTypeList = JSON.parse(data)
    }
    this.is_query = this.$route.query.type === 'query'
    this._loadTypeList() // 获取分组
    this._loadBrandList() // 获取所属品牌
    this._loadUnit() // 加载单位
    this._loadMetering() // 加载剂型
  },
  methods: {
    handleGoStep(val) {
      if (this.is_query) {
        this.step = val
      }
    },
    _loadUnit() { // 加载单位
      getUnit().then(res => {
        const { data } = res
        if (data) {
          data.map(v => {
            this.unit.push({
              label: v,
              value: v
            })
          })
        }
      })
    },
    _loadMetering() { // 加载剂型
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
    _loadgroupGather(type, ids) { // 查询分类和分组的父类
      const data = {
        'ids': ids,
        'type': type,
        merCode: type === '1' ? 'hydee' : this.merCode
      }
      getPreGroupList(data).then(res => {
        if (type === '1') { // 分类
          const datas = res.data[ids[0]]
          if (datas) {
            this.chooseTypeList = [{ name: datas.name, id: datas.id }, { name: datas.child.name, id: datas.child.id }, { name: datas.child.child.name, id: datas.child.child.id }]
          }
        } else { // 分组
          const datas = res.data
          ids.map(v => {
            const dat = datas[v]
            this.chooseGroup.push([{ name: dat.name, id: dat.id }, { name: dat.child.name, id: dat.child.id }, { name: dat.child.child.name, id: dat.child.child.id }])
          })
        }
      })
    },
    _loadBasicInfo() { // 加载基本信息
      getBasicGoodsInfo(this.$route.query.id, this.merCode).then(res => {
        // 分组处理
        this._loadgroupGather('1', [res.data.typeId])
        if (res.data.groupIds && res.data.groupIds.length > 0) {
          this._loadgroupGather('2', res.data.groupIds)
        }
        const { data } = res
        // 有限期处理
        if (data.expireDays === -1) {
          this.expireDays = -1
        } else {
          if (data.expireDays > 365) {
            data.expireDays = data.expireDays / 365
            this.timeTypes = '1'
          } else {
            data.expireDays = data.expireDays / 30
            this.timeTypes = '2'
          }
        }

        // 长宽高处理
        if (data.packStandard) {
          const packStandard = data.packStandard.split('*')
          data.long = packStandard[0] === 'undefined' ? '' : packStandard[0]
          data.width = packStandard[1] === 'undefined' ? '' : packStandard[1]
          data.height = packStandard[2] === 'undefined' ? '' : packStandard[2]
        }
        // 赋值值
        this.basicForm = data
      })
    },
    _loadGoodsImgAry() { // 加载商品图片
      const id = this.basicForm.id
      if (id) {
        getGoodsImgAry(id).then(res => {
          if (res.data) {
            res.data.map(v => {
              this.fileList.push({
                imgUrl: this.showImg(v.picUrl),
                picUrl: v.picUrl
              })
            })
          }
        })
      }
    },
    _loadGoodsDetails() { // 加载商品详情
      const id = this.basicForm.id
      getGoodsDetails(id).then(res => {
        if (res.data) {
          this.goodsIntro.content = res.data.content
        }
      })
    },
    handleSortEnd(val) { // 图片排序
      this.fileList = val
      if (this.fileList.length > 0) {
        // console.log('1111')
      }
    },
    handleImgSuccess(res, fileList, index) {
      this.fileList = []
      if (!this.fileList[index]) {
        this.fileList.push({ imgUrl: this.showImg(res), picUrl: res })
      } else {
        this.fileList[index].imgUrl = this.showImg(res)
        this.fileList[index].picUrl = res
      }
      this.pageLoading.close()
    },
    handleAvatarSuccessEdit(res, fileList, index) {
      this.editSpecsData[this.uploadIndex].picUrl = res.data
    },
    handleImgError() {
      this.$message({
        message: '图片上传失败',
        type: 'error'
      })
      this.pageLoading.close()
    },
    handlePreview(file) {
      this.dialogImageUrl = file.imgUrl
      this.dialogVisible = true
    },
    beforeUpload(file) {
      this.pageLoading = this.$loading({
        lock: true,
        text: '图片上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isImg) {
        this.$message({
          message: '只能上传图片',
          type: 'warning'
        })
        this.pageLoading.close()
      }
      return isImg
    },
    handleUploadIndex(index) {
      this.uploadIndex = index
    },
    handleAvatarSuccess(res, file) { // 规格图片上传成功
      if (res.code === '10000') {
        this.specsForm.specs[this.uploadIndex].picUrl = res.data
      }
      this.pageLoading.close()
    },
    _loadTypeList(isRefresh) { // 获取分组
      getTypeTree({ merCode: this.merCode, type: 2 }).then(res => {
        this.groupData = res.data
        if (isRefresh) {
          this.$message({
            message: '刷新成功',
            type: 'success'
          })
        }
      })
      getTypeDimensionList(this.$store.state.user.merCode).then(res => {
        this.groupDataDimens = res.data
      })
    },
    handleSaveGroup(row) { // 保存数据
      this.chooseArray = row
      this.chooseGroup = []
      this._filters(this.chooseArray)
      this.groupVisible = false
    },
    handleRefresh() { // 刷新分组
      this._loadTypeList(true)
    },
    handleRemoveGroup(index) { // 删除选择的分组
      this.chooseGroup.splice(index, 1)
    },
    remoteMethod(query) {
      this._loadBrandList(query)
    },
    _loadBrandList(query = '') { // 获取品牌
      getBrandList({ brandName: query }).then(res => {
        const { data } = res.data
        this.brandList = data
      })
    },
    _filters(data) {
      this.groupData.forEach((v, index) => {
        data.forEach((val, index) => {
          if (v.id === val[0]) {
            if (!this.chooseGroup[index]) {
              this.chooseGroup.push([])
            }
            this.chooseGroup[index].push({ name: v.name, id: v.id })
            if (v.children) {
              v.children.map(v1 => {
                if (v1.id === val[1]) {
                  this.chooseGroup[index].push({ name: v1.name, id: v1.id })
                }
                if (v1.children) {
                  v1.children.map(v2 => {
                    if (v2.id === val[2]) {
                      this.chooseGroup[index].push({ name: v2.name, id: v2.id })
                    }
                  })
                }
              })
            }
          }
        })
      })
    },
    _CreateBasicInfo(data) { // 创建基本信息
      setGoodsAdd(data).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.basicForm.id = res.data
        this.step = 2
        this.subLoading = false
      }).catch(_ => {
        this.subLoading = false
      })
    },
    _UpdateBasicInfo(data) { // 更新基本信息
      updateBasicInfo(data).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.step = 2
        this.subLoading = false
      }).catch(_ => {
        this.subLoading = false
      })
    },
    handleSubmitForm() { // 保存基本信息操作
      if (this.is_query) {
        this.step = 2
        return
      }
      this.$refs['basic'].validate((valid) => {
        if (valid) {
          if (valid) {
            if (this.chooseTypeList.length === 0) {
              this.$message({
                message: '请选择分类',
                type: 'warning'
              })
              return
            }
            this.basicForm.typeId = this.chooseTypeList[this.chooseTypeList.length - 1].id // 分类id
            const data = JSON.parse(JSON.stringify(this.basicForm))
            data.packStandard = `${data.long || ''}*${data.width || ''}*${data.height || ''}`
            if (this.expireDays === -1) {
              data.expireDays = -1
            } else {
              if (this.timeTypes === '2') { // 月
                data.expireDays = parseInt(this.days) * 30
              } else {
                data.expireDays = parseInt(this.days) * 365
              }
            }
            data.groupIds = []
            this.chooseGroup.map(v => {
              data.groupIds.push(v[2].id)
            })
            this.subLoading = true
            if (this.basicForm.id) {
              data.commodityId = data.id
              this._UpdateBasicInfo(data)
            } else {
              this._CreateBasicInfo(data)
            }
          }
        } else {
          // console.log('error submit')
          this.$message({
            message: '存在必填字段未填写',
            type: 'error'
          })
        }
      })
    },

    handleSubImg() { // 保存图片
      if (this.fileList.length === 0) {
        this.$message({
          message: '必须上传图片',
          type: 'error'
        })
        return
      }
      this.subLoading = true
      const data = {
        'commodityId': this.basicForm.id,
        'imgs': this.fileList
      }
      // this.fileList.map(v => {
      //   data.imgs.push({ picUrl: v.imgUrl })
      // })
      saveImg(data).then(_ => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.subLoading = false
      }).catch(_ => {
        this.subLoading = false
      })
    },
    handleSubIntro() { // 保存商品详情
      this.subLoading = true
      const data = {
        content: this.goodsIntro.content,
        id: this.basicForm.id
      }
      saveGoodsDetails(data).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.subLoading = false
        this.leaveAction = true
        setTimeout(() => {
          let url = ''
          if (this.basicForm.origin === 1) {
            url = '/goods-manage/depot'
          } else {
            url = '/goods-manage/apply-record'
          }
          this.$confirm('请确认已保存橱窗图', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.replace(url)
          }).catch(() => {
            console.log('已取消')
          })
        }, 1000)
      }).catch(_ => {
        this.subLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-wrapper {
   color: #333;
   .img-tips{
     font-size: 12px;
   }
   .specs-box{
     margin-top: 20px;
     .el-table{
       width: auto
     }
   }
  .edit-card {
    margin-top: 10px;
    .el-input{
      width: 300px;
    }
    .el-textarea{
      @extend .el-input
    }
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .header {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      font-size: 16px;
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
        &.groups{
          display: flex;
          align-items: center;
        }
        .group-list{
          display: inline-block;
          max-width: 600px;
          margin-right: 5px;
          .tag{
            margin-right: 10px;
          }
        }
        .link {
          cursor: pointer;
        }
      }
    }
  }
  .next-btn{
    margin-top: 20px;
  }
  .goods-details{
    display: flex;
    margin-bottom: 10px;
    .left-show{
      width: 320px;
      height: auto;
      border: 1px solid #e0e0e0;
      .img{
          width: 320px;
          height: 64px;
          background: url('../../../assets/image/sprite_dm.png') -2px -86px;
      }
      .basicMsgs{
        width: 100%;
        height: 100px;
        color: #666;
        line-height: 25px;
        text-align: center;
        padding-top: 20px;
        background: #f2f2f2;
      }
      .editSqu{
          height: 376px;
          border: 1px dashed red;
          img{
            max-width: 100%!important;
          }
      }
      .w-e-text {
          padding: 5px 10px;
          overflow-y: scroll;
      }
    }
    .edit-box{
      margin-left: 20px;
      padding: 10px;
      background: #f8f8f8;
      border: 1px solid #d1d1d1;
      position: relative;
    }
  }
  .spec-list{
    width: 500px;
    border-radius:5px;
    border: 1px solid #c9c9cc;
    margin-left: 80px;
    margin-bottom: 10px;
    .header{
      height: 40px;
      display: flex;
      justify-content:space-between;
      align-items: center;
      padding: 0 12px;
      border-bottom: 1px solid #c9c9cc;
      i{
        cursor: pointer;
      }
    }
    .spec-content{
        padding: 12px;
        .el-input{
          width: 250px;
        }
        .specs-img-table{
            .avatar-uploader-icon{
            width: 60px;
            height: 60px;
            line-height: 80px!important;
          }
          .avatar{
             width: 60px;
            height: 60px;
          }
        }
        .specs-img{
          .avatar-uploader-icon{
            width: 100px;
            height: 100px;
            line-height: 100px!important;
          }
          .avatar{
             width: 100px;
            height: 100px;
          }
        }
    }
  }
  .add-spec{
      margin-left: 80px;
    }
}
.link-btn{
  font-size: 14px;
}
.modal-body{
   .cascader{
      .el-input{
          width: 300px!important
      }
  }
}
</style>
