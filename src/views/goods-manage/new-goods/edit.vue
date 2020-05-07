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
        <section v-loading="basicLoading" element-loading-text="拼命加载中">
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
                    v-if="(basicForm.id!==1&&!is_query)&&basicForm.origin!==1"
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
            :rules="basicForm.origin===2?basicRules:{}"
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
                  <el-form-item label="重量" prop="weight">
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
                  <el-form-item label label-width="0px" style="display:inline-block" prop="height">
                    <el-input
                      v-model="basicForm.height"
                      placeholder="高"
                      size="small"
                      style="width:160px"
                    >
                      <template slot="append">m*</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="单位：" prop="unit">
                    <el-select v-model="basicForm.unit" placeholder="选择单位">
                      <el-option
                        v-for="item in unit"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
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
                        <el-option label="处方药" :value="1" />
                        <el-option label="乙类OTC" :value="2" />
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
                  <el-form-item label="产地：" prop="produceOrigin">
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
                      maxlength="24"
                      placeholder="请输入批准文号"
                      size="small"
                    />
                  </el-form-item>
                  <el-form-item label="商品详细信息：">
                    <p>填写商品说明书</p>
                    <div class="editorWrap">
                      <Tinymce
                        id="basicInfo"
                        ref="editor"
                        v-model="basicForm.intro"
                        :readonly="is_query"
                        :height="400"
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
                  <el-form-item
                    :label="chooseTypeList.length&&chooseTypeList[0].name=='营养保健'?'保健功能':'功能主治/适应症：'"
                  >
                    <el-input
                      v-model.trim="basicForm.keyFeature"
                      type="textarea"
                      maxlength="512"
                      :rows="3"
                      show-word-limit
                      placeholder="请输入功能主治/适应症"
                      size="small"
                    />
                  </el-form-item>
                  <el-form-item label="有效期：" prop="days">
                    <el-radio v-model="expireDays" :label="-1" size="small">无</el-radio>
                    <el-radio v-model="expireDays" :label="1" size="small">
                      <el-input
                        v-model="basicForm.days"
                        maxlength="8"
                        style="width:80px"
                        size="small"
                        placeholder
                      />
                      <el-select v-model="timeTypes" style="width:100px" size="small" placeholder>
                        <el-option value="1" label="年" />
                        <el-option value="2" label="月" />
                        <el-option value="3" label="天" />
                      </el-select>
                      <span style="color:#999">30天为一个月，365天为一年</span>
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
                  </el-form-item>
                  <el-form-item label="其他属性：">
                    <el-checkbox v-model="basicForm.isEasyBreak" :true-label="1" :false-label="0">易碎</el-checkbox>
                    <el-checkbox v-model="basicForm.isLiquid" :true-label="1" :false-label="0">液体</el-checkbox>
                    <template
                      v-if="chooseTypeList&&chooseTypeList.length!==0&&chooseTypeList[0].name==='中西药品'||(chooseTypeList.length!==0&&chooseTypeList[0].name!=='医疗器械'&&chooseTypeList[0].name!=='营养保健')"
                    >
                      <el-checkbox
                        v-model="basicForm.hasEphedrine"
                        :true-label="1"
                        :false-label="0"
                      >含麻黄碱</el-checkbox>
                    </template>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        </section>
      </div>
      <!-- 规格信息 -->
      <div v-show="step===2">
        <div class="specs-box">
          <p
            class="text-right"
            style="font-size:13px"
          >商品来源：{{ basicForm.origin===2?'商家自定义':'海典商品标准库' }}</p>
          <el-form>
            <el-form-item label="规格设置：">
              <template v-if="basicForm.origin===2&&basicForm.id&&editSpecsData.length>0">
                <template v-if="dynamicProp.length>0">
                  <span
                    v-for="(item,index) in specsList"
                    :key="index"
                    style="display:inline-block;margin-right:10px;"
                  >
                    <el-checkbox
                      :key="index"
                      checked
                      :disabled="true||is_query"
                      @change="handleSpecsChange(item)"
                    >{{ item.attributeName }}</el-checkbox>
                  </span>
                </template>
              </template>
              <template v-else-if="basicForm.origin===2&&basicForm.id">
                <el-checkbox
                  v-for="(item,index) in specsList"
                  :key="index"
                  v-model="item.isCheck"
                  :disabled="basicForm.origin===1||is_query"
                  @change="handleSpecsChange(item)"
                >{{ item.attributeName }}</el-checkbox>
              </template>
              <template v-else>
                <el-checkbox
                  v-for="(item,index) in dynamicProp"
                  :key="index"
                  v-model="item.checked"
                  :disabled="basicForm.origin===1||is_query"
                  @change="handleSpecsChange(item)"
                >{{ item.name }}</el-checkbox>
              </template>
            </el-form-item>
            <el-form-item label="规格信息：">
              <template v-if="basicForm.origin===1">
                <el-table
                  ref="multipleTable"
                  :data="editSpecsData"
                  @selection-change="handleSelectionChange"
                  @select="handleSelectChange"
                >
                  <el-table-column type="selection" :selectable="selectable" width="55" />
                  <!-- <el-table-column
                    v-for="(items,index1) in dynamicProp"
                    :key="index1"
                    :label="items.name"
                  >
                    <template slot-scope="scope">
                      <template v-if="scope.row[items.keys]">
                        <span v-text="scope.row[items.keys] || scope.row.specSkuList[0].skuValue" />
                      </template>
                      <template v-else>
                        <span v-text="scope.row.specSkuList[0].skuValue" />
                      </template>
                      <template v-if="!is_query">
                        <edit-table
                          :title="items.name"
                          :keys="items.keys"
                          :info="items.row"
                          max-length="50"
                          :index="scope.$index"
                          @saveInfo="handleEditTabSpecs"
                        />
                      </template>
                    </template>
                  </el-table-column>-->
                  <el-table-column
                    v-for="(propsf,indexs) in dynamicProp"
                    :key="indexs"
                    :label="propsf.name"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row[propsf.keys]" v-text="scope.row[propsf.keys]" />
                      <template v-if="!is_query">
                        <edit-table
                          :title="propsf.name"
                          :keys="propsf.keys"
                          :info="scope.row"
                          max-length="50"
                          :index="scope.$index"
                          @saveInfo="handleEditTabSpecs"
                        />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品编码">
                    <template slot-scope="scope">
                      <span v-text="scope.row.erpCode" />
                      <template v-if="!is_query">
                        <edit-table
                          title="商品编码"
                          keys="erpCode"
                          max-length="16"
                          :info="scope.row"
                          :index="scope.$index"
                          @saveInfo="handleEditTabSpecs"
                        />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品条码" prop="barCode">
                    <template slot-scope="scope">
                      <span v-text="scope.row.barCode" />
                      <template v-if="!is_query">
                        <edit-table
                          title="商品条码"
                          keys="barCode"
                          :info="scope.row"
                          max-length="30"
                          :index="scope.$index"
                          @saveInfo="handleEditTabSpecs"
                        />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="货主">
                    <template slot-scope="scope">
                      <template v-if="!is_query">
                        <el-select v-model="scope.row.owner" size="small" clearable>
                          <el-option label="自营" :value="0" />
                          <el-option label="平安" :value="1" />
                        </el-select>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="参考价格">
                    <template slot-scope="scope">
                      <span v-text="scope.row.mprice" />
                      <template v-if="!is_query">
                        <edit-table
                          title="参考价格"
                          keys="mprice"
                          :info="scope.row"
                          :index="scope.$index"
                          @saveInfo="handleEditTabSpecs"
                        />
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="限购数量">
                    <template slot-scope="scope">
                      <template v-if="scope.row.limitType===1">
                        <span>每笔订单限购{{ scope.row.limitNum }}件</span>
                      </template>
                      <template v-else-if="scope.row.limitType===2">
                        <span>
                          按周期每
                          <span v-if="scope.row.type===2">天</span>
                          <span v-else-if="scope.row.type===3">周</span>
                          <span v-else>月</span>
                          限购数量
                          {{ scope.row.limitNum }}件
                        </span>
                      </template>
                      <template v-else>
                        <span>不限购</span>
                      </template>
                      <template v-if="!is_query">
                        <edit-table
                          title="限购数量"
                          keys="limitNum"
                          max-length="8"
                          :info="scope.row"
                          :index="scope.$index"
                          @saveInfo="handleEditTabSpecs"
                        />
                      </template>
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
                        <el-image
                          v-if="scope.row.picUrl"
                          class="avatar"
                          style="width:60px;height:60px"
                          :src="showImg(scope.row.picUrl)"
                          @click="handleUploadIndex(scope.$index)"
                        >
                          <div slot="placeholder" class="image-slot">
                            加载中
                            <span class="dot">...</span>
                          </div>
                        </el-image>
                        <i
                          v-else
                          class="el-icon-plus avatar-uploader-icon"
                          @click="handleUploadIndex(scope.$index)"
                        />
                      </el-upload>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-else>
                <template v-if="basicForm.id&&editSpecsData.length>0">
                  <div class="spec-content">
                    <el-table :data="editSpecsData" @selection-change="handleSelectionChange">
                      <el-table-column
                        v-for="(propsf,indexs) in dynamicProp"
                        :key="indexs"
                        :label="propsf.name"
                      >
                        <template slot-scope="scope">
                          <span v-if="scope.row[propsf.keys]" v-text="scope.row[propsf.keys]" />
                          <template v-if="!is_query">
                            <edit-table
                              :title="propsf.name"
                              :keys="propsf.keys"
                              :info="scope.row"
                              max-length="50"
                              :index="scope.$index"
                              @saveInfo="handleEditTabSpecs"
                            />
                          </template>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品编码" prop="erpCode">
                        <template slot-scope="scope">
                          <span v-text="scope.row.erpCode" />
                          <template v-if="!is_query">
                            <edit-table
                              title="商品编码"
                              keys="erpCode"
                              :info="scope.row"
                              max-length="16"
                              :index="scope.$index"
                              @saveInfo="handleEditTabSpecs"
                            />
                          </template>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品条码" prop="barCode">
                        <template slot-scope="scope">
                          <span v-text="scope.row.barCode" />
                          <template v-if="!is_query">
                            <edit-table
                              title="商品条码"
                              keys="barCode"
                              :info="scope.row"
                              max-length="30"
                              :index="scope.$index"
                              @saveInfo="handleEditTabSpecs"
                            />
                          </template>
                        </template>
                      </el-table-column>
                      <el-table-column label="货主">
                        <template slot-scope="scope">
                          <template v-if="!is_query">
                            <el-select v-model="scope.row.owner" size="small" clearable>
                              <el-option label="自营" :value="0" />
                              <el-option label="平安" :value="1" />
                            </el-select>
                          </template>
                        </template>
                      </el-table-column>
                      <el-table-column label="参考价格" prop="mprice">
                        <template slot-scope="scope">
                          <span v-text="scope.row.mprice" />
                          <template v-if="!is_query">
                            <edit-table
                              title="参考价格"
                              keys="mprice"
                              :info="scope.row"
                              :index="scope.$index"
                              @saveInfo="handleEditTabSpecs"
                            />
                          </template>
                        </template>
                      </el-table-column>
                      <el-table-column label="限购数量" min-width="120">
                        <template slot-scope="scope">
                          <template v-if="scope.row.limitType===1">
                            <span>每笔订单限购{{ scope.row.limitNum }}件</span>
                          </template>
                          <template v-else-if="scope.row.limitType===2">
                            <span>
                              按周期每
                              <span v-if="scope.row.type===2">天</span>
                              <span v-else-if="scope.row.type===3">周</span>
                              <span v-else>月</span>
                              限购数量
                              {{ scope.row.limitNum }}件
                            </span>
                          </template>
                          <template v-else>不限购</template>
                          <template v-if="!is_query">
                            <edit-table
                              title="限购数量"
                              keys="limitNum"
                              max-length="8"
                              :info="scope.row"
                              :index="scope.$index"
                              @saveInfo="handleEditTabSpecs"
                            />
                          </template>
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
                            <el-image
                              v-if="scope.row.picUrl"
                              class="avatar"
                              style="width:60px;height:60px"
                              :src="showImg(scope.row.picUrl)"
                              @click="handleUploadIndex(scope.$index)"
                            >
                              <div slot="placeholder" class="image-slot">
                                加载中
                                <span class="dot">...</span>
                              </div>
                            </el-image>
                            <i
                              v-else
                              class="el-icon-plus avatar-uploader-icon"
                              @click="handleUploadIndex(scope.$index)"
                            />
                          </el-upload>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
              </template>
              <div
                v-for="(item,index) in specsForm.specs"
                :key="index"
                class="spec-list"
                style="margin-top:10px;"
              >
                <div class="header">
                  <span>规格{{ editSpecsData.length+1 }}</span>
                  <i class="el-icon-delete" @click="handleDeleteSpec(index)" />
                </div>
                <div class="spec-content">
                  <el-form
                    :ref="'specsForm'+index"
                    :model="item"
                    size="small"
                    label-width="80px"
                    :status-icon="true"
                  >
                    <el-form-item v-for="(items,index1) in specsForm.specsData" :key="index1">
                      <span slot="label">
                        <span class="tip">*</span>
                        {{ items.attributeName }}
                      </span>
                      <el-input
                        v-model.trim="item['index_'+items.id+'_'+items.attributeName]"
                        maxlength="50"
                        :disabled="is_query"
                        :placeholder="'输入'+items.attributeName"
                      />
                    </el-form-item>
                    <el-form-item>
                      <span slot="label">
                        <span class="tip">*</span> 商品编码
                      </span>
                      <el-input
                        v-model.trim="item.erpCode"
                        placeholder="输入商品编码"
                        maxlength="16"
                        @blur="input_checkErpcode(item.erpCode)"
                      />
                    </el-form-item>
                    <el-form-item label>
                      <span slot="label">
                        <span class="tip">*</span> 商品条码
                      </span>
                      <el-input
                        v-model.trim="item.barCode"
                        maxlength="30"
                        placeholder="输入商品条码"
                        @blur="input_checkBarCode(item.barCode)"
                      />
                    </el-form-item>
                    <el-form-item label>
                      <span slot="label">货主</span>
                      <el-select v-model="item.owner" size="small" clearable>
                        <el-option label="自营" :value="0" />
                        <el-option label="平安" :value="1" />
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                      <span slot="label">
                        <span class="tip">*</span> 参考价格
                      </span>
                      <el-input
                        v-model.trim="item.mprice"
                        placeholder="输入参考价格"
                        @blur="input_checkMprice(item,index)"
                      />
                    </el-form-item>
                    <el-form-item label="限购数量">
                      <div style="padding-top:10px;">
                        <el-radio-group
                          v-model="item.limitType"
                          @change="handleLimitChange(item,index)"
                        >
                          <el-radio :label="0" style="display:block">不限购</el-radio>
                          <el-radio :label="1" style="margin-top:10px">
                            <span style="color:#333">
                              每笔订单限购&nbsp;
                              <template v-if="item.limitType===1">
                                <el-input
                                  v-model="item.limitNum"
                                  size="mini"
                                  maxlength="8"
                                  :disabled="item.limitType===2||item.limitType===0"
                                  style="width:100px"
                                  @blur="input_checkLimit(item,index)"
                                />&nbsp;件
                              </template>
                              <template v-else>
                                <el-input
                                  maxlength="8"
                                  :disabled="item.limitType===2||item.limitType===0"
                                  size="mini"
                                  style="width:100px"
                                  @blur="input_checkLimit(item,index)"
                                />&nbsp;件
                              </template>
                            </span>
                          </el-radio>
                          <el-radio :label="2" style="margin-top:10px">
                            <span style="color:#333">
                              按周期每&nbsp;
                              <el-select
                                v-model="item.type"
                                :disabled="item.limitType===1||item.limitType===0"
                                size="mini"
                                style="width:80px"
                                placeholder="选择类型"
                              >
                                <el-option :value="2" label="天" />
                                <el-option :value="3" label="周" />
                                <el-option :value="4" label="月" />
                              </el-select>&nbsp;限购&nbsp;
                              <template v-if="item.limitType===2">
                                <el-input
                                  v-model="item.limit"
                                  maxlength="8"
                                  :disabled="item.limitType===1||item.limitType===0"
                                  size="mini"
                                  style="width:100px"
                                  @blur="input_checkLimit(item,index)"
                                />
                              </template>
                              <template v-else>
                                <el-input
                                  maxlength="8"
                                  :disabled="item.limitType===1||item.limitType===0"
                                  size="mini"
                                  style="width:100px"
                                  @blur="input_checkLimit(item,index)"
                                />
                              </template>
                            </span>
                          </el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                    <el-form-item label="商品图片">
                      <el-upload
                        class="avatar-uploader specs-img-table"
                        :action="upLoadUrl"
                        :headers="headers"
                        :disabled="is_query"
                        :show-file-list="false"
                        :upload-index="index"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleImgError"
                        :before-upload="beforeUpload"
                      >
                        <el-image
                          v-if="item.picUrl"
                          class="avatar"
                          style="width:80px;height:80px"
                          :src="showImg(item.picUrl)"
                          @click="handleUploadIndex(index)"
                        >
                          <div slot="placeholder" class="image-slot">
                            加载中
                            <span class="dot">...</span>
                          </div>
                        </el-image>
                        <i
                          v-else
                          class="el-icon-plus avatar-uploader-icon"
                          @click="handleUploadIndex(index)"
                        />
                      </el-upload>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <p v-if="!is_query" class="add-spec">
                <el-button type="text" icon="el-icon-plus" size="small" @click="handleAddSpec">添加规格</el-button>
              </p>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 图文详情 -->
      <div v-show="step==3">
        <div class="edit-card">
          <div class="header">
            商品橱窗图
            <span class="img-tips">最多6张，图片800*800</span>
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
              />
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
              <ol class="img-tips">
                <li>1、药品图片应体现：主商品+商品外包装（包装正面须包括：[药品名称]、 [OTC标识]及[包装详情] ，包装侧面须包括：[成份]、[性状]、[适应症]、[规格]、[用法用量]、[不良反应]、[禁忌]、[注意事项]、[执行标准]、[批准文号]、[生产企业]、[UPC码]）。</li>
                <li>2、图片单张大小不超过 1M。仅支持 jpg，jpeg，png格式。</li>
                <li>3、图片质量要聚焦清晰，不能虚化。商品图片必须为白色或无色背景。</li>
                <li>4、图片内容展示方向，应始终保持文字正向。</li>
                <li>5、请上传商品正面、侧面、背面不少于3张图片，药品需上传药品说明书图片，器械需上传器械注册证图片</li>
              </ol>
              <div class="text-center">
                <el-button type size="small" @click="step=2">上一步</el-button>
                <el-button
                  v-if="!is_query"
                  type="primary"
                  size="small"
                  :loading="subLoading1"
                  @click="handleSubImg"
                >保存</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="edit-card">
          <div class="header">商品详情</div>
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
              <div class="text-center">
                <el-button
                  v-if="!is_query"
                  type="primary"
                  size="small"
                  :loading="subLoading2"
                  @click="handleSubInfo"
                >保存</el-button>
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
      :group-data="groupDataDimens"
      @back="handleSaveGroup"
      @close="groupVisible=false"
    />
    <div class="action-wapper">
      <el-button v-if="step !== 1" type size="small" @click="backStep">上一步</el-button>
      <el-button
        v-if="setp3show"
        :loading="subLoading"
        size="small"
        type="primary"
        @click="nextStep"
      >{{ step===3?'保存':"下一步" }}</el-button>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import vueUploadImg from '@/components/ImgUpload'
import { getTypeTree, getPreGroupList, getTypeDimensionList } from '@/api/group'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
import {
  getUnit,
  getMetering,
  setGoodsAdd,
  updateBasicInfo,
  getBrandList,
  saveImg,
  saveGoodsDetails,
  getBasicGoodsInfo,
  getGoodsImgAry,
  getGoodsDetails
} from '@/api/new-goods'
import mixins from './_source/mixin'
import specsMixin from './_source/specsMixins'
import editTable from './_source/edit-table'
import editGroup from '../components/grouping'
import { findArray } from '@/utils/index'
import { checkNumberdouble } from '@/utils/validate'
// import { throttle } from '@/utils/throttle'

export default {
  name: 'GoodsEdit',
  components: { Tinymce, vueUploadImg, editTable, editGroup },
  mixins: [mixins, specsMixin],
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
      // const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
      // if (!reg.test(value)) {
      //   callback(new Error('只能输入中英文或数字'))
      // } else {
      //   callback()
      // }
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
            console.log('value', value)
            return callback(new Error('请输入大于0的整数'))
          }
          callback()
        }
      } else {
        console.log(value)
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
        approvalNumber: '', // 批准文号
        brandId: '', // 商品品牌id
        brandName: '', // 品牌名称
        commonName: '', // 药品通用名，国际非专有名称
        drugType: '', // drugType 药品类型
        freightType: 0, // 运输属性运输属性（0常温，1冷藏，2冰冻）
        hasEphedrine: 0, // 包含麻黄碱，0-不包含，1-包含
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
        typeId: '',
        long: '',
        height: '',
        width: '',
        days: '',
        origin: 2, // 商品来源，1-海典标准库，2-商家自定义
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
      subLoading: false,
      subLoading2: false,
      subLoading1: false, // 加载
      pageLoading: false, // 加载
      leaveAction: false // 离开页面动作，true为保存离开  false异常离开
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
    step(val) {
      if (val === 3) {
        this._loadGoodsDetails()
        this._loadGoodsImgAry()
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
    // 路由离开关闭标签
    if (this.is_query && this.pageLoading) {
      this.pageLoading.close()
    }
  },
  created() {
    if (!this.$route.query.id) {
      // 如果是编辑
      const data = sessionStorage.getItem('types') // 取出从选择分类存取的数据
      this.chooseTypeList = JSON.parse(data)
    }

    this.is_query = this.$route.query.type === 'query'
    console.log(this.$route.query.type)
    if (this.is_query) {
      sessionStorage.setItem('editId', '')
      sessionStorage.setItem('editIsQuery', this.is_query)
    } else {
      sessionStorage.setItem('editIsQuery', '')
      sessionStorage.setItem('editId', this.$route.query.id)
    }
    this._loadTypeList() // 获取分组
    this._loadBrandList({
      pageSize: 30,
      currentPage: 1
    }) // 获取所属品牌
    console.log('@@@@@@@@@@@@@')
    this.getTypeListData()
      .then(res => {
        this._loadBasicInfo()
      })
      .catch(_ => {
        this._loadBasicInfo()
      })
    this._loadUnit() // 加载单位
    // chooseTypeList不为空且第一个为中西药品才有必要加载
    this._loadMetering() // 加载剂型

    this.pageLoading = this.$loading({
      lock: true,
      text: '数据初始化中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  methods: {
    tinymceLoad() {
      // 富文本渲染染成
      if (this.pageLoading) {
        this.pageLoading.close()
      }
    },
    handleGoStep(val) {
      console.log('val', val)
      if (this.is_query) {
        this.step = val
      }
    },
    handleBrandChange(val) {
      console.log('handleBrandChange-------', val)
      const index = this.brandList.findIndex(item => {
        return item.id === val
      })
      if (index > -1) {
        this.basicForm.brandName = this.brandList[index].name
        this.basicForm.brandId = val
      }
    },
    handleBrandClear(val) {
      console.log('handleBrandChange-------handleBrandClear', val)
      this.basicForm.brandName = ''
      this.basicForm.brandId = ''
      this._loadBrandList({
        pageSize: 30,
        currentPage: 1
      })
    },
    _loadUnit() {
      // 加载单位
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
    _loadMetering() {
      // 加载剂型
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
    _loadgroupGather(type, ids) {
      // 查询分类和分组的父类
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
              this.chooseGroup.push([
                { name: dat.name, id: dat.id },
                { name: dat.child.name, id: dat.child.id },
                { name: dat.child.child.name, id: dat.child.child.id }
              ])
            }
          })
        }
        console.log('chooseGroup', this.chooseGroup)
      })
    },
    _loadBasicInfo() {
      // 加载基本信息
      if (!this.$route.query.id) {
        this.basicLoading = false
        return
      }
      this.subLoading = true
      getBasicGoodsInfo(this.$route.query.id, this.merCode)
        .then(res => {
          // 分组处理
          this._loadgroupGather('1', [res.data.typeId])
          if (res.data.groupIds && res.data.groupIds.length > 0) {
            this._loadgroupGather('2', res.data.groupIds)
          }
          const { data } = res
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
          // 药品类型处理 如果默认为3直接设置为空
          if (data.drugType && data.drugType > 2) {
            data.drugType = ''
          }
          // 有限期处理
          if (data.expireDays === -1) {
            this.expireDays = -1
          } else {
            this.expireDays = 1
            data.days = data.expireDays
            this.timeTypes = '3'
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
          // 赋值值
          this.basicForm = data
          this.$refs.editor.setContent(this.basicForm.intro)
          this.basicLoading = false
          this.subLoading = false
        })
        .catch(_ => {
          this.basicLoading = false
          this.subLoading = false
        })
    },
    _loadGoodsImgAry() {
      // 加载商品图片
      const id = this.basicForm.id
      if (id) {
        getGoodsImgAry(id).then(res => {
          if (res.data) {
            const fileList = []
            res.data.forEach((v, index) => {
              const item = {
                imgUrl: this.showImg(v.picUrl),
                picUrl: v.picUrl
              }
              fileList.push(item)
            })
            this.fileList = fileList
          }
        })
      }
    },
    _loadGoodsDetails() {
      // 加载商品详情
      const id = this.basicForm.id
      this.$refs['details-ty'].destroyTinymce() // 先销毁
      getGoodsDetails(id)
        .then(res => {
          if (res.data) {
            this.goodsIntro.content = res.data.content
          }
          this.$refs['details-ty'].init() // 再初始化
        })
        .catch(_ => {
          this.$refs['details-ty'].init()
        })
    },
    handleSortEnd(val) {
      // 图片排序
      this.fileList = val
      if (this.fileList.length > 0) {
        // console.log('1111')
      }
    },
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
    handleAvatarSuccessEdit(res, fileList, index) {
      if (res.code === '10000') {
        this.editSpecsData[this.uploadIndex].picUrl = res.data

        console.log(this.editSpecsData)
        console.log('+++this.editSpecsData')
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
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
    handlePreview(file) {
      this.dialogImageUrl = file.imgUrl
      this.dialogVisible = true
    },
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
      console.log('index:---', index)
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
    _loadTypeList(isRefresh) {
      // 获取分组
      getTypeTree({ merCode: this.merCode, type: 2 }).then(res => {
        this.groupData = res.data
        console.log('获取分组----', res.data)
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
    handleSaveGroup(row) {
      console.log('传递过来的数据-----', row)
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
      // console.log(1111)
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
      console.log('触发了-------')
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
        console.log('0------', findIndex)
        if (findIndex > -1) {
          console.table(this.groupData)
          console.log('0------data', this.groupData[findIndex])
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
      // 创建基本信息
      setGoodsAdd(data)
        .then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.basicForm.id = res.data
          this.step = 2
          this.subLoading = false
        })
        .catch(_ => {
          this.subLoading = false
        })
    },
    _UpdateBasicInfo(data) {
      // 更新基本信息
      updateBasicInfo(data)
        .then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.step = 2
          this.subLoading = false
        })
        .catch(_ => {
          this.subLoading = false
        })
    },
    nextStep() {
      // 如果是查看
      if (this.is_query) {
        this.step += 1
        return
      }
      // 否则执行相关逻辑
      if (this.step === 1) {
        this.handleSubmitForm()
      } else if (this.step === 2) {
        this.handleSubmitSpec()
      } else if (this.step === 3) {
        this.handleSubIntro()
      }
    },
    backStep() {
      this.step = this.step - 1
    },
    handleSubmitForm() {
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
              data.groupIds.push(v[2].id)
            })
            if (this.chooseTypeList.length !== 3) {
              this.$message({
                message: '分类选择不完整，分类必须三级',
                type: 'error'
              })
              return
            }
            this.subLoading = true
            if (this.basicForm.id) {
              data.firstTypeId = this.chooseTypeList[0].id
              data.secondTypeId = this.chooseTypeList[1].id
              data.commodityId = data.id
              this._UpdateBasicInfo(data)
            } else {
              data.firstTypeId = this.chooseTypeList[0].id
              data.secondTypeId = this.chooseTypeList[1].id

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

    handleSubImg() {
      // 保存图片
      if (this.fileList.length === 0) {
        this.$message({
          message: '必须上传图片',
          type: 'error'
        })
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
    },
    handleSubIntro() {
      // 保存商品详情
      this.subLoading = true
      const data = {
        content: this.goodsIntro.content,
        id: this.basicForm.id
      }
      saveGoodsDetails(data)
        .then(res => {
          // this.$message({
          //   message: '保存成功，请至“待完善” / “待提交审核”/ “已通过”页面查询商品',
          //   type: 'success'
          // })
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
            })
              .then(() => {
                this.$store
                  .dispatch('tagsView/delView', this.$route)
                  .then(res => {
                    sessionStorage.setItem('isRefreshDepot', true)
                    this.$router.replace(url)
                  })
                // this.$store.dispatch('tagsView/delView', this.$route)
                // this.$store
                //   .dispatch('tagsView/delVisitedView', this.$route)
                //   .then(res => {})
                // this.$router.replace(url)
                // this.$router.go(-1) // 返回上一个路由
              })
              .catch(() => {
                console.log('已取消')
              })
          }, 1000)
        })
        .catch(_ => {
          this.subLoading = false
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
</style>
<style lang="scss" scoped>
.edit-wrapper {
  color: #333;
  padding-bottom: 50px;
  .img-tips {
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: #e6a23c;
    li {
      margin-bottom: 5px;
    }
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
  position: absolute;
  padding: 12px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: right;
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
