<template>
  <div class="app-container">
    <div class="edit-wrapper">
      <el-steps :active="step" simple style="margin-top: 20px">
        <el-step title="基本信息" icon="el-icon-edit-outline" />
        <el-step title="规格信息" icon="el-icon-set-up" />
        <el-step title="图文信息" icon="el-icon-picture-outline-round" />
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
              <p class="type-list">商品分类：<span v-if="chooseTypeList.length">{{ chooseTypeList[0].name }}&nbsp;>&nbsp;{{ chooseTypeList[1].name }}&nbsp;>&nbsp;{{ chooseTypeList[2].name }}</span></p>
              <div class="type-list groups">商品分组：
                <p class="group-list">
                  <span v-for="(item,index) in chooseGroup" :key="index" class="tag">{{ item[0].name }}&nbsp;>&nbsp;{{ item[1].name }}&nbsp;>&nbsp;{{ item[2].name }}</span>
                </p>
                <span class="opreate">
                  <span class="link" @click="groupVisible=true">选择分组</span>
                  <a href="#/goods-manage/group" target="_blank"><span class="link">新建分组</span></a>
                  <span class="link" @click="handleRefresh">刷新</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <div class="edit-card">
          <div class="header">
            <span>商品信息</span>
          </div>
          <div class="edit-card-cnt">
            <div class="content">
              <el-form ref="basic" :model="basicForm" status-icon label-width="130px" :rules="basicRules">
                <el-form-item label="商品信息：" prop="name">
                  <el-input v-model="basicForm.name" placeholder="请输入商品名称" size="small" />
                </el-form-item>
                <el-form-item v-if="chooseTypeList.length!==0&&(chooseTypeList[0].name!=='医疗器械'||chooseTypeList[0].name!=='保健品')" prop="commonName" label="通用名：">
                  <el-input v-model="basicForm.commonName" placeholder="请输入通用名" size="small" />
                </el-form-item>
                <el-form-item label="所属品牌：" prop="brandId">
                  <el-select
                    v-model="basicForm.brandId"
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
                <el-form-item label="重量：">
                  <el-input v-model="basicForm.weight" placeholder="请输入重量" size="small" style="width:193px">
                    <template slot="append">公斤</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="长宽高：">
                  <el-input v-model="basicForm.long" placeholder="长" size="small" style="width:70px" /> m *
                  <el-input v-model="basicForm.width" placeholder="宽" size="small" style="width:70px" /> m *
                  <el-input v-model="basicForm.height" placeholder="高" size="small" style="width:70px" />
                </el-form-item>
                <el-form-item label="单位：" prop="unit">
                  <el-select v-model="basicForm.unit" filterable placeholder="选择单位">
                    <el-option
                      v-for="item in unit"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="关键字：">
                  <el-input v-model="basicForm.keyWord" placeholder="请输入关键字" size="small" /> &nbsp;用、隔开
                </el-form-item>
              </el-form>
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
              <el-form :model="basicForm" label-width="130px" status-icon>
                <template v-if="chooseTypeList.length!==0&&chooseTypeList[0].name=='中西医药品'">
                  <el-form-item label="药品类型：">
                    <el-select v-model="basicForm.drugType" placeholder="请选择药品类型">
                      <el-option label="甲类OTC" value="0" />
                      <el-option label="处方药" value="1" />
                      <el-option label="乙类OTC" value="2" />
                      <el-option label="非处方药" value="3" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="剂型：">
                    <el-select v-model="basicForm.dosageForm" placeholder="请选择药品类型">
                      <el-option label="剂兴1" value="0" />
                      <el-option label="剂兴2" value="1" />
                    </el-select>
                  </el-form-item>
                </template>
                <el-form-item label="生产企业：" prop="manufacture">
                  <el-input v-model="basicForm.manufacture" placeholder="请输入生产企业" size="small" />
                </el-form-item>
                <el-form-item label="产地：" prop="produceOrigin">
                  <el-input v-model="basicForm.produceOrigin" placeholder="请输入产地" size="small" />
                </el-form-item>
                <el-form-item label="批准文号：" prop="approvalNumber">
                  <el-input v-model="basicForm.approvalNumber" placeholder="请输入批准文号" size="small" />
                </el-form-item>
                <el-form-item v-if="chooseTypeList[0].name!=='中西医药品'||chooseTypeList[0].name!=='医疗器械'&&chooseTypeList[0].name!=='保健品'" label="是否含有麻黄碱">
                  <el-checkbox v-model="basicForm.hasEphedrine" :true-label="1" :false-label="0">含麻黄碱</el-checkbox>
                </el-form-item>
                <el-form-item label="商品详细信息：">
                  <Tinymce ref="editor" v-model="basicForm.intro" :height="400" />
                </el-form-item>
                <el-form-item :label="chooseTypeList[0].name==='保健品'?'保健功能':'功能主治/适应症：'">
                  <el-input
                    v-model="basicForm.keyFeature"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入功能主治/适应症"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="有效期：">
                  <el-radio v-model="expireDays" :label="-1" size="small">无</el-radio>
                  <el-radio v-model="expireDays" :label="1" size="small">
                    <el-input v-model="days" style="width:80px" size="small" placeholder="" />
                    <el-select v-model="timeTypes" style="width:100px" size="small" placeholder="">
                      <el-option value="1" label="年" />
                      <el-option value="2" label="月" />
                    </el-select>
                  </el-radio>
                </el-form-item>
              </el-form>

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
              <el-form :model="basicForm">
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
                </el-form-item>
                <el-form-item label="" label-width="100px">
                  <el-button type="" size="small" @click="$router.go(-1)">上一步</el-button>
                  <el-button type="primary" size="small" @click="handleSubmitForm">下一步</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <!-- 规格信息 -->
      <div v-show="step===2">
        <div class="specs-box">
          <p class="text-right" style="font-size:13px">商品来源：海典商品标准库</p>
          <el-form>
            <el-form-item label="规格设置：">
              <el-checkbox-group v-model="chooseSpecsAry" @change="handleSpecsChange">
                <el-checkbox v-for="(item,index) in specsList" :key="index" :label="item.id"> {{ item.attributeName }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="规格信息：">
              <template v-if="false">
                <el-table :data="specsForm.specsInfo" @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column label="尺寸" />
                  <el-table-column label="颜色" />
                  <el-table-column label="规格" />
                  <el-table-column label="商品编码" />
                  <el-table-column label="商品条码" />
                  <el-table-column label="商品价格" />
                </el-table>
              </template>
              <template v-else>
                <div v-for="(item,index) in specsForm.specs" :key="index" class="spec-list">
                  <div class="header">
                    <span>规格{{ index+1 }}</span>
                    <i class="el-icon-delete" @click="handleDeleteSpec(index)" />
                  </div>
                  <div class="spec-content">
                    <el-form :model="item" size="small" label-width="80px" :status-icon="true">
                      <el-form-item v-for="(items,index1) in specsForm.specsData" :key="index1" :label="items.attributeName">
                        <el-input v-model="item['index_'+items.id+'_'+items.attributeName]" placeholder="输入包装规格" />
                      </el-form-item>
                      <el-form-item label="条码">
                        <el-input v-model="item.barCode" placeholder="输入条码" />
                      </el-form-item>
                      <el-form-item label="价格">
                        <el-input v-model="item.mprice" placeholder="输入价格" />
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <p class="add-spec">
                  <el-button type="text" icon="el-icon-plus" size="small" @click="handleAddSpec">添加规格</el-button>
                </p>
              </template>
            </el-form-item>
            <el-form-item label="" label-width="100px">
              <el-button type="" size="small" @click="$router.go(-1)">上一步</el-button>
              <el-button type="primary" size="small" @click="handleSubmitSpec">下一步</el-button>
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
              <vue-upload-img :actions="upLoadUrl" :before-upload="beforeUpload" :file-list="fileList" :headers="headers" :limit="6" @preview="handlePreview" @onsort="handleSortEnd" @onSuccess="handleImgSuccess" />
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <p class="img-tips" style="margin-top:10px;color:#E6A23C">提示：上传图片后可在线编辑图片，支持鼠标拖拽排序</p>
              <div class="text-center">
                <el-button type="primary" size="small" @click="handleSubImg">保存</el-button>
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
                  <div class="editSqu w-e-text" />
                </div>
                <div class="edit-box">
                  <Tinymce ref="editor" v-model="goodsIntro.content" :height="400" />
                </div>
              </section>
              <div class="text-center">
                <el-button type="primary" size="small" @click="handleSubIntro">保存</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="选择分组"
      :visible.sync="groupVisible"
      :close-on-click-modal="false"
      width="30%"
      append-to-body
    >
      <div class="modal-body">
        <el-cascader
          v-model="chooseArray"
          class="cascader"
          style="width:300px"
          :options="groupData"
          :props="defaultProps"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="groupVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleSaveGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import vueUploadImg from 'vueuploadimg/dist/vueuploadimg'
import { getTypeTree } from '@/api/group'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
import { setGoodsAdd, getBrandList, getSpecs, setSpecsData, saveImg, saveGoodsDetails } from '@/api/new-goods'
export default {
  components: { Tinymce, vueUploadImg },
  data() {
    return {
      step: 3,
      chooseSpecsAry: [],
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
        'packStandard': '', // 长宽高
        'groupIds': [] // 分组id
      },
      basicRules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        commonName: [{ required: true, message: '请输入通用名称', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入选择单位', trigger: 'change' }],
        brandId: [{ required: true, message: '请选择所属品牌', trigger: 'change' }],
        manufacture: [{ required: true, message: '请输入生成企业', trigger: 'blur' }],
        produceOrigin: [{ required: true, message: '请输入生产地', trigger: 'blur' }],
        approvalNumber: [{ required: true, message: '请输入批准文号', trigger: 'blur' }]
      },
      dialogVisible: false,
      specsForm: { // 商家自建商品的规格表单
        specsData: [],
        specs: [{}]
      },
      unit: [{
        value: '件',
        label: '件'
      }, {
        value: '只',
        label: '只'
      }, {
        value: '瓶',
        label: '瓶'
      }, {
        value: '袋',
        label: '袋'
      }, {
        value: '包',
        label: '包'
      },
      {
        value: '盒',
        label: '盒'
      },
      {
        value: '箱',
        label: '箱'
      }
      ],
      value: '',
      dialogImageUrl: '',
      fileList: [{
        imgUrl: 'https://img.ithome.com/newsuploadfiles/2019/10/20191015_084449_97.jpg'
      }],
      groupData: [], // 分组
      specsList: [], // 规格
      goodsIntro: { // 商品信息
        content: ''
      }
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
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      this.$store
        .dispatch('tagsView/delView', from)
      next()
    } else {
      next(false)
    }
  },
  created() {
    const data = sessionStorage.getItem('types')
    this.chooseTypeList = JSON.parse(data)
    this.basicForm.typeId = this.chooseTypeList[0].id
    this._loadTypeList() // 获取分组
    this._loadBrandList() // 获取所属品牌
    this._loadSpces() // 获取规格
  },
  methods: {
    handleSelectionChange() {},
    handleSortEnd(val) {
      console.log('排序之后的结果', val)
    },
    handleImgSuccess(res, fileList, index) {
      if (res.code === '10000') {
        this.fileList[index].imgUrl = this.showImg(res.data.data)
      }
    },
    handlePreview(file) {
      this.dialogImageUrl = file.imgUrl
      this.dialogVisible = true
    },
    beforeUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isImg) {
        this.$message({
          message: '只能上传图片',
          type: 'warning'
        })
      }
      return isImg
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
    },
    handleSaveGroup() { // 保存数据
      if (this.chooseArray.length !== 3) {
        this.$message({
          message: '分组选择不完整',
          type: 'error'
        })
        return
      }
      this.chooseGroup.push([])
      this._filters(this.chooseArray, this.chooseGroup.length - 1)
      this.groupVisible = false
    },
    handleRefresh() { // 刷新分组
      this._loadTypeList(true)
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
    _filters(data, index) {
      this.groupData.map(v => {
        if (v.id === data[0]) {
          this.chooseGroup[index].push({ name: v.name, id: v.id })
        }
        if (v.children) {
          v.children.map(v1 => {
            if (v1.id === data[1]) {
              this.chooseGroup[index].push({ name: v1.name, id: v1.id })
            }
            if (v1.children) {
              v1.children.map(v2 => {
                if (v2.id === data[2]) {
                  this.chooseGroup[index].push({ name: v2.name, id: v2.id })
                }
              })
            }
          })
        }
      })
    },
    handleAddSpec() {
      this.specsForm.specs.push({})
    },
    handleDeleteSpec(index) { // 删除规格
      this.specsForm.specs.splice(index, 1)
    },
    _loadSpces() { // 根据一级分类加载规格
      getSpecs(this.chooseTypeList[0].id).then(res => {
        res.data.map((v, index) => {
          v['index_' + index] = ''
        })
        this.specsList = res.data
      })
    },
    handleSpecsChange(row) { // 规格勾选
      this.specsList.map(v => {
        if (row[row.length - 1] === v.id) {
          this.specsForm.specsData.push(v)
        }
      })
    },
    handleSubmitForm() {
      this.$refs['basic'].validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.basicForm))
          data.packStandard = `${data.long}*${data.width}*${data.height}`
          if (this.expireDays === -1) {
            data.expireDays = -1
          } else {
            if (this.timeTypes === '2') { // 月
              data.expireDays = parseInt(this.days) * 30
            } else {
              data.expireDays = parseInt(this.days) * 360
            }
          }
          this.chooseGroup.map(v => {
            data.groupIds.push(v[2].id)
          })
          setGoodsAdd(data).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.basicForm.id = res.data
            this.step = 2
          }).catch(_ => {

          })
        } else {
          console.log('error submit')
        }
      })
    },
    handleSubmitSpec() { // 规格保存操作
      this.specsForm.specs.map(v => {
        v.valueList = []
        v.commodityId = this.basicForm.id
        for (const key in v) {
          if (v.hasOwnProperty(key)) {
            const val = key.split('_')
            if (val.includes('index')) {
              v.valueList.push({
                skuKeyId: val[1],
                skuValue: v[key],
                skuKeyName: val[2]
              })
            }
          }
        }
      })
      this.subLoading = true
      setSpecsData({ list: this.specsForm.specs }).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.subLoading = false
        this.step = 3
      }).catch(_ => {
        this.subLoading = false
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
        'imgs': []
      }
      this.fileList.map(v => {
        data.imgs.push({ picUrl: v.imgUrl })
      })
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
    handleSubIntro() { // 保存商品说明
      this.subLoading = true
      saveGoodsDetails().then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.subLoading = false
        setTimeout(() => {
          this.$router.replace('/goods-manage/apply-record')
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
        }
        .group-list{
          display: inline-block;
          max-width: 600px;
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
      }
      .w-e-text {
          padding: 0 10px;
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
    }
  }
  .add-spec{
      margin-left: 80px;
    }
}
.modal-body{
   .cascader{
      .el-input{
          width: 300px!important
      }
  }
}
</style>
