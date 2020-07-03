<template>
  <div class="app-container_activity">
    <el-form
      ref="basic"
      :model="basicForm"
      label-width="160px"
      :rules="basicRules"
      size="small"
      @submit.native.prevent
    >
      <div class="edit-wrapper">
        <div class="edit-card">
          <div class="header">
            <span>基本信息</span>
          </div>
          <div class="edit-card-cnt">
            <el-form-item label="组合商品名称：" prop="name" required>
              <el-input v-model="basicForm.name" placeholder="请输入商品名称" size="small" />
            </el-form-item>
            <el-form-item label="组合商品分组：" prop="groupId" required>
              <el-input v-model="basicForm.groupId" style="display: none" />
              <el-button size="small" @click="groupVisible=true">选择分组</el-button>
              <div v-if="chooseGroup.length" class="group-list">
                <el-tag
                  v-for="(item,index) in chooseGroup"
                  :key="index"
                  style="margin-right:10px"
                  closable
                  @close="handleRemoveGroup(index)"
                >
                  <span
                    class="tag"
                  >{{ item[0].name }}&nbsp;>&nbsp;{{ item[1].name }}{{ item[2] && "&nbsp;>&nbsp;" + item[2].name }}</span>
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item label="组合商品图片：" prop="image" required>
              <el-upload
                v-loading="uploadLoading"
                class="avatar-uploader x-uploader"
                :action="upLoadUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeUpload"
                @preview="handlePreview"
              >
                <div v-if="basicForm.image" class="el-img-box">
                  <img
                    style="width:120px;height:120px"
                    :src="showImg(basicForm.image)"
                    class="avatar"
                  >
                  <div class="img-actions" @click.stop>
                    <i class="icon el-icon-upload2" title="上传" @click.stop="handleUpload" />
                    <i class="icon el-icon-delete" title="删除" @click.stop="handleRemove" />
                  </div>
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="相关商品：" prop="goodsIds" required>
              <el-input v-model="basicForm.goodsIds" style="display: none" />
              <div style="margin-bottom: 8px">
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="$refs.GoodsComponent.open()"
                >选择商品 | 已选（{{ storeSelectGoods.length }}）</el-button>
                <span class="color_gray">最多选择5个子商品</span>
              </div>
              <select-goods-constitute ref="storeGods" @del-item="delSelectGoods" />
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="售卖价¥：" required>
                  <el-input v-model="basicForm.price" style="width: 160px;" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="参考价¥：" required>
                  <el-input v-model="basicForm.mprice" style="width: 160px;" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品重量(克)：" required>
                  <el-input v-model="basicForm.weight" style="width: 160px;" disabled />
                  <!-- <span>{{ basicForm.weight }}</span> -->
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="限购量：" prop="limitNum">
                  <el-input
                    v-model="basicForm.limitNum"
                    size="small"
                    style="width: 160px;"
                    placeholder="不限制"
                    controls-position="right"
                    :max="999999"
                  />
                  <el-tooltip content="每个用户限购数量，0或不填都为不限制" placement="top">
                    <i style="color: #147de8" class="el-icon-warning-outline" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="edit-wrapper">
        <div class="edit-card">
          <div class="header">
            <span>详细介绍</span>
          </div>
          <div class="edit-card-cnt">
            <el-form-item label="关键字：" prop="keyWord" @submit.native.prevent>
              <el-input
                v-model="basicForm.keyWord"
                :rows="2"
                type="textarea"
                placeholder="请输入关键字,用、隔开"
              />
            </el-form-item>
            <el-form-item label="活动购买须知：" prop="desc" @submit.native.prevent>
              <el-input v-model="basicForm.desc" :rows="4" type="textarea" />
            </el-form-item>
            <el-form-item label="商品说明书：">
              <p class="color_gray">填写商品说明书，详细介绍文字</p>
              <Tinymce ref="editor" v-model="basicForm.detail" :height="400" />
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="footer">
      <span>
        <el-button size="small" @click="$router.go(-1)">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="subLoading"
          @click="handleConstituteGoods"
        >确 定</el-button>
      </span>
    </div>
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :limit-max="5"
      :store-ids="[]"
      :list="storeSelectGoods"
      @on-change="handleSelectGoods"
    />
    <!--弹窗--选择分组-->
    <edit-group
      :is-show="groupVisible"
      type="1"
      :group-data="groupDataDimens"
      @back="handleSaveGroup"
      @close="groupVisible=false"
    />
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { getTypeTree, getPreGroupList, getTypeDimensionList } from '@/api/group'
import config from '@/utils/config'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { saveImg } from '@/api/new-goods'
import mixins from './mixin'
import specsMixin from './specsMixins'
import {
  addConstituteGoods,
  updateConstituteGoods,
  getConstituteGoodsInfo
} from '@/api/constitute-goods'
import selectGoodsConstitute from './select-goods-constitute'
import storeGoods from '../../../components/store-gods'
// import storeDialog from '../../../components/store'
// import selectStore from '../../../components/select-store'
import { checkNumberdouble } from '@/utils/validate'
import editGroup from './grouping'
import { findArray } from '@/utils/index'
export default {
  components: {
    Tinymce,
    editGroup,
    selectGoodsConstitute,
    storeGoods
    // storeDialog,
    // selectStore
  },
  mixins: [mixins, specsMixin],
  data() {
    const _check_price = (rule, value, callback) => {
      console.log('111check_price0------', rule, value, callback)
      console.log(
        '111check_price0------storeSelectGoods',
        this.storeSelectGoods
      )
      if (rule.required && value <= 0) {
        callback(new Error('请输入最多2位小数的正数'))
      }
      if (value !== '') {
        if (!checkNumberdouble(value)) {
          callback(new Error('请输入最多2位小数的正数'))
        }
      }
      if (value < 0) {
        callback(new Error('最小值必须大于等于0'))
      }
      if (value > 99999) {
        callback(new Error('最大值不能超过99999'))
      }
      callback()
    }
    const _check_num = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if ((value !== '' && reg.test(value)) || value === '0') {
        callback(new Error('请输入正整数'))
      }
      if (value > 99) {
        callback(new Error('最大值不能超过99'))
      }
      callback()
    }
    const _checklimitNum = (rule, value, callback) => {
      // 限购数量验证
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '' && reg.test(value)) {
        callback(new Error('请输入非负整数'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    return {
      // goodsData: [],
      check_price: _check_price,
      check_num: _check_num,
      chooseGroup: [], // 选中的分组(id+name)
      groupVisible: false,
      chooseArray: [], // 选中的分组(只有id)
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        multiple: true
      },
      subLoading: false,
      loading: false, // 加载分类
      basicForm: {
        detail: '', // 富文本内容
        image: '', // 组合图片
        price: 0, // 组合商品价格
        limitNum: '', // 限购数量
        mprice: 0, // 参考价格
        weight: 0, // 商品总重量
        keyWord: '', // 关键字
        name: '', // 商品名
        // groupIds: [], // 分组的ids
        groupId: '', // 分组id
        desc: '',
        goodsIds: '', // 商品信息
        storeIds: '' // 门店信息
      },
      basicRules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字', trigger: 'blur' }
        ],
        groupId: [{ required: true, message: '请选择分组', trigger: 'change' }],
        goodsIds: [
          { required: true, message: '请选择商品', trigger: 'change' }
        ],
        storeIds: [
          { required: true, message: '请选择门店', trigger: 'change' }
        ],
        image: [{ required: true, message: '请上传图片', trigger: 'change' }],
        keyWord: [
          { min: 1, max: 30, message: '长度在 1 到 30 个字', trigger: 'blur' }
        ],
        number: [{ required: true, trigger: 'blur' }],
        price: [{ required: true, trigger: 'blur' }],
        limitNum: [{ validator: _checklimitNum, trigger: 'blur' }]
      },
      dialogVisible: false,
      // value: '',
      // dialogImageUrl: '',
      fileList: [],
      groupData: [], // 分组数据
      groupDataDimens: [],
      propGoodsList: [],
      // goodsIntro: {
      //   // 商品信息
      //   content: ''
      // },
      uploadIndex: 0,
      chooseTableSpec: [],
      uploadLoading: false,
      leaveAction: false, // 离开页面动作，true为保存离开  false异常离开
      storeSelectGoods: []
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token', 'activity']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  watch: {
    activity: {
      handler: function(newval) {
        console.log('111111===activity', newval)
        this.basicForm.price = parseFloat(newval.soulePrice.toFixed(2))
        this.basicForm.mprice = parseFloat(newval.mprice.toFixed(2))
        this.basicForm.weight = parseFloat(newval.weight.toFixed(2))
      },
      deep: true
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
      this._loadInfo()
      this._loadClassList() // 获取分类
    }
    this._loadTypeList() // 获取分组
  },
  methods: {
    _loadgroupGather(type, ids) {
      // 查询分类和分组的父类
      const data = {
        ids: ids,
        type: type,
        merCode: this.merCode
      }

      getPreGroupList(data).then(res => {
        // 分组
        const datas = res.data
        ids.map(v => {
          const dat = datas[v]
          const arr = [
            { name: dat.name, id: dat.id },
            { name: dat.child.name, id: dat.child.id }
          ]
          dat.child.child &&
            arr.push({ name: dat.child.child.name, id: dat.child.child.id })
          this.chooseGroup.push(arr)
        })
      })
    },
    _loadInfo() {
      // 加载商品信息
      getConstituteGoodsInfo(this.$route.query.id, this.merCode).then(res => {
        // 分组处理
        if (res.data.groupId && res.data.groupId.length > 0) {
          this._loadgroupGather('2', [res.data.groupId])
        }
        const { data } = res
        // 赋值
        console.log('data=====', data)
        this.basicForm = data
        // this.basicForm.childCommodities = data.childCommodities
        if (this.basicForm.detail) {
          this.$refs.editor.setContent(this.basicForm.detail)
        }
      })
    },
    handleSelectionChange(row) {
      this.chooseTableSpec = row
    },
    handleImgError() {
      this.$message({
        message: '图片上传失败',
        type: 'error'
      })
    },
    handlePreview(file) {
      this.basicForm.image = file.image
      // this.dialogVisible = true
    },
    beforeUpload(file) {
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 2MB!',
          type: 'warning'
        })
        return false
      }
      if (!isImg) {
        this.$message({
          message: '请上传jpeg、png、jpg格式的图片',
          type: 'warning'
        })
        return false
      }
      if (isImg) {
        this.uploadLoading = true
      }
      return isImg
    },
    handleUploadIndex(index) {
      this.uploadIndex = index
    },
    handleUpload() {
      $('.el-img-box').click()
    },
    handleRemove() {
      this.basicForm.image = ''
    },
    handleAvatarSuccess(res, file) {
      // 图片上传成功
      if (res.code === '10000') {
        this.basicForm.image = res.data
      } else {
        this.loading = false
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.uploadLoading = false
    },
    handleDelete(index, row) {
      // 删除组合商品
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.basicForm.childCommodities.splice(index, 1)
      })
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
      getTypeDimensionList(this.merCode).then(res => {
        this.groupDataDimens = res.data
      })
    },
    handleSaveGroup(row) {
      // 保存数据
      console.log('111111111-handleSaveGroup', row)
      this.chooseArray = row
      this.chooseGroup = []
      this._filters(this.chooseArray)
      if (row.length > 1) {
        this.$message({
          type: 'warning',
          message: '组合商品分组有且只能选择一个'
        })
        return false
      }
      this.basicForm.groupId = row[0][row[0].length - 1]
      this.groupVisible = false
    },
    handleRemoveGroup(index) {
      // 删除选择的分组
      this.chooseGroup.splice(index, 1)
    },
    _filters(data) {
      data.forEach((val, index1) => {
        const findIndex = findArray(this.groupData, { id: val[0] })
        if (findIndex > -1) {
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
    handleAddSpec() {
      this.specsForm.specs.push({
        image: '',
        mprice: '',
        erpCode: ''
      })
      console.log(this.specsForm.specs)
      console.log('=================')
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
      this.leaveAction = true
      addConstituteGoods(data)
        .then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.basicForm.id = res.data
          this.$router.push('/goods-manage/constitute-goods')
          this.subLoading = false
        })
        .catch(_ => {
          this.subLoading = false
        })
    },
    _UpdateBasicInfo(data) {
      // 更新基本信息
      this.leaveAction = true
      updateConstituteGoods(data)
        .then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push('/goods-manage/constitute-goods')
          this.subLoading = false
        })
        .catch(_ => {
          this.subLoading = false
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
    handleConstituteGoods() {
      this.$refs['basic'].validate(valid => {
        console.log('valid:', valid)
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.basicForm))
          this.$refs.storeGods
            .onsubmit()
            .then(res => {
              console.log('二次验证也通过了----------------------', res)
              console.log(this.basicForm)
            })
            .catch(res => {
              console.log('二次验证失败----------------------')
            })
          // data.groupId = this.chooseGroup[0][2]
          //   ? this.chooseGroup[0][2].id
          //   : this.chooseGroup[0][1].id // 第三级分组的id

          data.merCode = this.merCode
          // this.subLoading = true
          // if (this.basicForm.id) {
          //   data.commodityId = data.id
          //   this._UpdateBasicInfo(data)
          // } else {
          //   this._CreateBasicInfo(data)
          // }
        } else {
          this.$message({
            message: '存在必填字段未填写',
            type: 'error'
          })
        }
      })
    },
    delSelectGoods(item, index) {
      console.log('item, index', item, index)
      console.log('this.storeSelectGoods', this.storeSelectGoods)
      this.storeSelectGoods.splice(index, 1)
      this.basicForm.storeIds = _.map(this.storeSelectGoods, 'specId').join(',')
      this.$refs.storeGods.dataFrom(this.storeSelectGoods)
      // this.storeSelectGoods = this.storeSelectGoods
    },
    handleSelectGoods(val) {
      this.storeSelectGoods = val
      this.basicForm.goodsIds = _.map(val, 'specId').join(',')
      this.$refs.storeGods.dataFrom(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container_activity {
  .footer {
    text-align: center;
    margin: 50px auto;
  }
  .color_gray {
  color: #999;
}
}
.edit-wrapper {
  color: #333;
  margin-bottom: 80px;
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
    .header {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      font-size: 16px;
      border-bottom: 1px solid rgba(231, 231, 231, 1);
      margin-bottom: 20px;
    }

    .edit-card-cnt {
      color: #333;
      .group-list {
        max-width: 600px;
        margin-right: 5px;
        border: 1px solid #e2e2e2;
        padding: 10px;
        margin-top: 10px;
        .tag {
          margin-right: 10px;
        }
      }
    }
  }
  .next-btn {
    margin-top: 20px;
  }
  .add-spec {
    margin-left: 80px;
  }
}

// .link-btn {
//   font-size: 14px;
// }
// .modal-body {
//   .cascader {
//     .el-input {
//       width: 300px !important;
//     }
//   }
// }

</style>
<style lang="scss">
// .table-form {
//   .el-form-item {
//     margin: 15px 0;
//   }
//   .el-input {
//     input {
//       text-align: center;
//     }
//   }
// }
// .edit-wrapper .edit-card .el-input.inp_mini {
//   width: 110px;
// }
// .container_activity {
//   .avatar-uploader-icon {
//     font-size: 28px;
//     color: #8c939d;
//     width: 120px;
//     height: 120px;
//     line-height: 120px !important;
//     text-align: center;
//   }
// }
</style>

