<template>
  <div class="app-container">
    <div class="edit-wrapper">
      <div class="edit-card">
        <!-- <div class="header">
          <span>商品分类信息</span>
        </div>-->
        <div class="edit-card-cnt">
          <div class="content">
            <el-form
              ref="basic"
              :model="basicForm"
              status-icon
              label-width="160px"
              :rules="basicRules"
            >
              <el-form-item label="组合商品名称：" prop="name">
                <el-input
                  v-model="basicForm.name"
                  :disabled="basicForm.origin===1"
                  placeholder="请输入商品名称"
                  size="small"
                />
              </el-form-item>
            </el-form>
            <p class="type-list">
              <span class="type-list-title">
                <span class="color_red">*</span> 组合商品分类：
              </span>
              <el-tag v-if="chooseTypeList.length">
                <span v-if="chooseTypeList.length">
                  {{ chooseTypeList[0].name }}&nbsp;>&nbsp;
                  {{ chooseTypeList[1].name }}&nbsp;>&nbsp;{{ chooseTypeList[2].name }}
                </span>
              </el-tag>
              <span class="link link-btn" @click="typeVisible=true;_loadClassList()">选择分类</span>
            </p>
            <div class="type-list groups">
              <span class="type-list-title">
                <span class="color_red">*</span> 组合商品分组：
              </span>
              <p class="group-list">
                <el-tag
                  v-for="(item,index) in chooseGroup"
                  :key="index"
                  style="margin-right:10px"
                  closable
                  @close="handleRemoveGroup(index)"
                >
                  <span
                    class="tag"
                  >{{ item[0].name }}&nbsp;>&nbsp;{{ item[1].name }}&nbsp;>&nbsp;{{ item[2].name }}</span>
                </el-tag>
              </p>
              <span class="opreate">
                <span class="link link-btn" @click="groupVisible=true">选择分组</span>
                <span class="link link-btn" @click="handleRefresh">刷新</span>
              </span>
            </div>

            <el-form
              ref="basic2"
              :model="basicForm"
              status-icon
              label-width="160px"
              :rules="basicRules"
            >
              <el-form-item label="组合商品图片：" required>
                <el-upload
                  class="avatar-uploader specs-img"
                  :action="upLoadUrl"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeUpload"
                >
                  <img
                    v-if="basicForm.picUrl"
                    style="width:100px;height:100px"
                    :src="showImg(basicForm.picUrl)"
                    class="avatar"
                  >
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>

              <el-form-item label="关键字：">
                <el-input v-model="basicForm.keyWord" placeholder="请输入关键字" size="small" />&nbsp;用、隔开
              </el-form-item>

              <el-form-item label="组合商品详细信息：">
                <p class="color_gray">填写商品说明书，详细介绍文字</p>
                <Tinymce ref="editor" v-model="basicForm.intro" :height="400" />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <div class="edit-wrapper">
      <div class="edit-card">
        <div class="header">
          <span>选择商品</span>
        </div>
        <div class="edit-card-cnt">
          <div class="content">
            <div class="table-box">
              <el-table v-loading="loading" :data="goodsData" stripe style="width: 100%">
                <el-table-column align="left" prop="commodityName" min-width="150" label="子商品名称" />
                <el-table-column align="left" min-width="120" prop="packStandard" label="规格" />
                <el-table-column
                  prop="price"
                  align="left"
                  label="组合数量"
                  :show-overflow-tooltip="true"
                  min-width="120"
                >
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price" size="small" class="inp_mini" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="price"
                  align="left"
                  label="参考价(元)"
                  :show-overflow-tooltip="true"
                  min-width="100"
                />
                <el-table-column prop="price" label="组合单价(元)" min-width="120" align="left">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price" size="small" class="inp_mini" />
                  </template>
                </el-table-column>
                <el-table-column prop="barCode" align="left" min-width="120" label="商品编码" />
                <el-table-column prop="createTime" align="left" min-width="130" label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpDown(1,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-form
              ref="basic"
              :model="basicForm"
              status-icon
              label-width="160px"
              :rules="basicRules"
            >
              <!-- <el-form-item label="选择商品" prop="name"> -->
              <!-- <el-input v-model="basicForm.name" placeholder="组合商品名称" size="small" /> -->
              <!-- </el-form-item> -->

              <div class="icon-add icon_items" @click.stop="toSelectGoods">
                <el-button type="primary" size="small">选择商品</el-button>
              </div>

              <el-form-item label="组合商品价格：" prop="price">
                {{ basicForm.price }}
                <el-input
                  v-model="basicForm.price"
                  placeholder="组合商品价格"
                  size="small"
                  type="hidden"
                />
              </el-form-item>
            </el-form>

            <el-form ref="basic" :model="basicForm" status-icon label-width="160px">
              <el-form-item label="限购设置：" prop>
                <el-checkbox
                  v-model="basicForm.isEasyBreak"
                  :true-label="1"
                  :false-label="0"
                >单个用户限购数量为</el-checkbox>

                <el-input v-model="basicForm.num" placeholder="数量" size="mini" class="inp_mini" />
                <span class="color_gray">同一个用户限制购买的数量</span>
              </el-form-item>
            </el-form>
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
    <!--弹窗--选择商品-->
    <dialog-goods ref="goodsDialog" :list="[]" @confirm="goodsSelectChange" />
  </div>
</template>
<script>
import dialogGoods from './components/dialog-goods'
import Tinymce from '@/components/Tinymce'
import { getTypeTree, getPreGroupList } from '@/api/group'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
import {
  setGoodsAdd,
  updateBasicInfo,
  getBrandList,
  saveImg,
  saveGoodsDetails,
  getBasicGoodsInfo,
  getGoodsDetails
} from '@/api/new-goods'
import mixins from './_source/mixin'
import specsMixin from './_source/specsMixins'
export default {
  components: { Tinymce, dialogGoods },
  mixins: [mixins, specsMixin],
  data() {
    return {
      goodsData: [],
      step: 1,
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
        picUrl: '', // 组合图片
        price: 0, // 组合商品价格
        num: 1, // 限购数量
        approvalNumber: '', // 批准文号
        brandId: '', // 商品品牌id
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
        origin: 2, // 商品来源，1-海典标准库，2-商家自定义
        packStandard: '', // 长宽高
        groupIds: [] // 分组id
      },
      basicRules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        commonName: [
          { required: true, message: '请输入通用名称', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入选择单位', trigger: 'change' }
        ],
        brandId: [
          { required: true, message: '请选择所属品牌', trigger: 'change' }
        ],
        manufacture: [
          { required: true, message: '请输入生成企业', trigger: 'blur' }
        ],
        produceOrigin: [
          { required: true, message: '请输入生产地', trigger: 'blur' }
        ],
        approvalNumber: [
          { required: true, message: '请输入批准文号', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      value: '',
      dialogImageUrl: '',
      fileList: [],
      groupData: [], // 分组
      goodsIntro: {
        // 商品信息
        content: ''
      },
      uploadIndex: 0,
      subLoading: false,
      chooseTableSpec: [],
      leaveAction: false // 离开页面动作，true为保存离开  false异常离开
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${
        config.merGoods
      }/1.0/file/_uploadImg?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 路由离开关闭标签
    if (!this.leaveAction) {
      const answer = window.confirm('你还有数据没有保存，是否确认退出')
      if (answer) {
        this.$store.dispatch('tagsView/delView', from)
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  created() {
    if (this.$route.query.id) {
      this._loadBasicInfo()
      this._loadGoodsDetails()
      // this._loadGoodsImgAry()
    } else {
      // const data = sessionStorage.getItem('types')
      // this.chooseTypeList = JSON.parse(data)
    }
    this._loadTypeList() // 获取分组
    this._loadBrandList() // 获取所属品牌
  },
  methods: {
    // 选取商品
    toSelectGoods() {
      this.$refs.goodsDialog.open()
    },
    goodsSelectChange(list) {
      console.log('list', list)
      this.goodsData = list
      this.$refs.goodsDialog.close()
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
          this.chooseTypeList = [
            { name: datas.name, id: datas.id },
            { name: datas.child.name, id: datas.child.id },
            { name: datas.child.child.name, id: datas.child.child.id }
          ]
        } else {
          // 分组
          const datas = res.data
          ids.map(v => {
            const dat = datas[v]
            this.chooseGroup.push([
              { name: dat.name, id: dat.id },
              { name: dat.child.name, id: dat.child.id },
              { name: dat.child.child.name, id: dat.child.child.id }
            ])
          })
        }
      })
    },
    _loadBasicInfo() {
      // 加载基本信息
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
          data.long = packStandard[0] || ''
          data.width = packStandard[1] || ''
          data.height = packStandard[2] || ''
        }
        // 赋值值
        this.basicForm = data
      })
    },
    _loadGoodsDetails() {
      // 加载商品详情
      const id = this.$route.query.id
      getGoodsDetails(id).then(res => {
        if (res.data) {
          this.goodsIntro.content = res.data.content
        }
      })
    },
    handleSelectionChange(row) {
      this.chooseTableSpec = row
    },
    handleSortEnd(val) {
      // 图片排序
      this.fileList = val
      if (this.fileList.length > 0) {
        // console.log('1111')
      }
    },
    handleImgSuccess(res, fileList, index) {
      if (!this.fileList[index]) {
        this.fileList.push({ imgUrl: this.showImg(res), picUrl: res })
      } else {
        this.fileList[index].imgUrl = this.showImg(res)
        this.fileList[index].picUrl = res
      }
    },
    handleImgError() {
      this.$message({
        message: '图片上传失败',
        type: 'error'
      })
    },
    handlePreview(file) {
      this.dialogImageUrl = file.imgUrl
      this.dialogVisible = true
    },
    beforeUpload(file) {
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      if (!isImg) {
        this.$message({
          message: '只能上传图片',
          type: 'warning'
        })
      }
      return isImg
    },
    handleUploadIndex(index) {
      this.uploadIndex = index
    },
    handleAvatarSuccess(res, file) {
      // 规格图片上传成功
      if (res.code === '10000') {
        this.basicForm.picUrl = res.data
      }
    },
    _loadTypeList(isRefresh) {
      // 获取分组
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
    handleSaveGroup() {
      // 保存数据
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
    handleRefresh() {
      // 刷新分组
      this._loadTypeList(true)
    },
    handleRemoveGroup(index) {
      // 删除选择的分组
      this.chooseGroup.splice(index, 1)
    },
    remoteMethod(query) {
      this._loadBrandList(query)
    },
    _loadBrandList(query = '') {
      // 获取品牌
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
      this.specsForm.specs.push({
        picUrl: '',
        mprice: '',
        erpCode: '',
        barCode: ''
      })
    },
    handleDeleteSpec(index) {
      // 删除规格
      this.specsForm.specs.splice(index, 1)
    },
    handleSpecsChange(row) {
      // 规格勾选
      this.specsList.map(v => {
        if (row[row.length - 1] === v.id) {
          this.specsForm.specsData.push(v)
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
    handleSubmitForm() {
      // 保存基本信息操作
      try {
        this._loadSpces() // 获取规格
      } catch (error) {
        console.log(error)
      }
      if (this.basicForm.origin === 1) {
        this.step = 2
      }
      this.$refs['basic'].validate(valid => {
        if (valid) {
          this.basicForm.typeId = this.chooseTypeList[
            this.chooseTypeList.length - 1
          ].id // 分类id
          const data = JSON.parse(JSON.stringify(this.basicForm))
          data.packStandard = `${data.long}*${data.width}*${data.height}`
          if (this.expireDays === -1) {
            data.expireDays = -1
          } else {
            if (this.timeTypes === '2') {
              // 月
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
        } else {
          console.log('error submit')
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
      this.subLoading = true
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
          this.subLoading = false
        })
        .catch(_ => {
          this.subLoading = false
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
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.subLoading = false
          this.leaveAction = true
          setTimeout(() => {
            if (this.basicForm.origin === 1) {
              this.$router.replace('/goods-manage/depot')
            } else {
              this.$router.replace('/goods-manage/apply-record')
            }
          }, 1000)
        })
        .catch(_ => {
          this.subLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-wrapper {
  color: #333;
  .img-tips {
    font-size: 12px;
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
        margin-bottom: 22px;
        &:last-child {
          margin: 0;
        }
        &.groups {
          display: flex;
          align-items: center;
        }
        .type-list-title {
          width: 160px;
          display: inline-block;
          text-align: right;
          padding-right: 12px;
          font-size: 14px;
          color: #606266;
          .color_red {
            color: red;
          }
        }
        .group-list {
          display: inline-block;
          max-width: 600px;
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
      }
      .w-e-text {
        padding: 0 10px;
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
    width: 500px;
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
      .specs-img-table {
        .avatar-uploader-icon {
          width: 80px;
          height: 80px;
          line-height: 80px !important;
        }
        .avatar {
          width: 80px;
          height: 80px;
        }
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
.color_gray {
  color: #999;
}
</style>
<style>
.edit-wrapper .edit-card .el-input.inp_mini {
  width: 100px;
  padding: 0 5px;
}
.icon_items {
  width: 160px;
  text-align: right;
  padding-right: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
