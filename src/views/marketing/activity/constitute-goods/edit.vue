<template>
  <div class="app-container">
    <el-form
      ref="basic"
      :model="basicForm"
      label-width="160px"
      :rules="basicRules"
      @submit.native.prevent
    >
      <div class="edit-wrapper">
        <div class="edit-card">
          <div class="edit-card-cnt">
            <div class="content">
              <p class="type-list">
                <span class="type-list-title">
                  <span class="color_red">*</span> 组合商品名称：
                </span>
                <el-input v-model="basicForm.name" placeholder="请输入商品名称" size="small" />
                <input id="hiddenText" type="text" style="display:none" onkeypress="searchKeywordKeyboard(event)">
              </p>
              <!-- <el-form-item label="组合商品名称：" prop="name" required>
                <el-input v-model="basicForm.name" placeholder="请输入商品名称" size="small" />
                <input id="hiddenText" type="text" style="display:none" onkeypress="searchKeywordKeyboard(event)">
              </el-form-item> -->
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
                <span v-if="!this.$route.query.id" class="link link-btn" @click="typeVisible=true;_loadClassList()">选择分类</span>
              </p>
              <div class="type-list groups">
                <span class="type-list-title">
                  <span class="color_red">*</span> 组合商品分组：
                </span>
                <p class="group-list">
                  <!-- <el-tag v-if="chooseGroup.length" style="margin-right:10px">
                    <span v-if="chooseGroup.length">
                      {{ chooseGroup[0].name }}&nbsp;>&nbsp;
                      {{ chooseGroup[1].name }}&nbsp;>&nbsp;{{ chooseGroup[2].name }}
                    </span>
                  </el-tag> -->
                  <el-tag v-for="(item,index) in chooseGroup" :key="index" style="margin-right:10px" closable @close="handleRemoveGroup(index)">
                    <span class="tag">{{ item[0].name }}&nbsp;>&nbsp;{{ item[1].name }}{{ item[2] && "&nbsp;>&nbsp;" + item[2].name }}</span>
                  </el-tag>
                </p>
                <span class="opreate">
                  <span class="link link-btn" @click="groupVisible=true">选择分组</span>
                  <span class="link link-btn" @click="handleRefresh">刷新</span>
                </span>
              </div>

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

              <el-form-item label="关键字：" prop="keyWord" @submit.native.prevent>
                <el-input v-model="basicForm.keyWord" placeholder="请输入关键字" size="small" />&nbsp;用、隔开
                <input id="hiddenText" type="text" style="display:none" onkeypress="searchKeywordKeyboard(event)">
              </el-form-item>

              <el-form-item label="组合商品详细信息：">
                <p class="color_gray">填写商品说明书，详细介绍文字</p>
                <Tinymce ref="editor" v-model="basicForm.detail" :height="400" />
              </el-form-item>
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
                <el-table v-loading="loading" :data="basicForm.childCommodities" stripe style="width: 100%" class="table-form">
                  <el-table-column align="left" prop="commodityName" min-width="150" label="子商品名称" />
                  <el-table-column prop="standard" label="规格" align="center" min-width="150" />
                  <el-table-column
                    align="left"
                    label="组合数量"

                    min-width="120"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        label-width="0"
                        :prop="'childCommodities.' + scope.$index + '.number'"
                        :rules="[{ required: true, validator: check_num, trigger: 'blur' }]"
                      >
                        <el-input v-model="scope.row.number" size="small" class="inp_mini" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="mprice"
                    align="left"
                    label="参考价(元)"
                    :show-overflow-tooltip="true"
                    min-width="100"
                  />
                  <el-table-column prop="price" label="组合单价(元)" min-width="160" align="left">
                    <template slot-scope="scope">
                      <el-form-item
                        label-width="0"
                        :prop="'childCommodities.' + scope.$index + '.price'"
                        :rules="[{ required: true, validator: check_price, trigger: 'blur' }]"
                      >
                        <el-input v-model="scope.row.price" size="small" class="inp_mini" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="weight" align="left" min-width="120" label="商品重量" style="display:none" /> -->
                  <el-table-column prop="erpCode" align="left" min-width="120" label="商品编码" />
                  <el-table-column align="left" min-width="130" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        size="mini"
                        @click="handleDelete(scope.$index,scope.row)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="icon-add icon_items" @click.stop="toSelectGoods">
                <el-button type="primary" size="small">选择商品</el-button>
              </div>

              <el-form-item label="组合商品价格(元)：" prop="price" required>
                <span>{{ basicForm.price }}</span>
              </el-form-item>

              <el-form-item label="参考价(元)：" prop="mprice" required>
                <span>{{ basicForm.mprice }}</span>
              </el-form-item>

              <el-form-item label="组合商品重量(克)：" prop="weight">
                <span>{{ basicForm.weight }}</span>
              </el-form-item>

              <el-form-item label="限购设置：" prop="limitNum">
                <span>单个用户限购数量为</span>
                <el-input v-model="basicForm.limitNum" placeholder="0" size="mini" class="inp_mini" />
                <span v-show="basicForm.limitNum <= 0 && basicForm.limitNum >= 0" style="margin-left: 5px;margin-right: 10px;color: #e6a23c;">不限购</span>
                <span class="color_gray">同一个用户限制购买的数量</span>
              </el-form-item>

            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div class="footer">
      <span>
        <el-button size="small" @click="$router.go(-1)">取 消</el-button>
        <el-button type="primary" size="small" :loading="subLoading" @click="handleConstituteGoods">确 定</el-button>
      </span>
    </div>

    <!-- <el-dialog
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
    </el-dialog> -->
    <el-dialog

      title="选择分类"
      :visible.sync="typeVisible"
      :close-on-click-modal="false"
      width="30%"
      append-to-body
    >
      <div v-loading="loading" class="modal-body">
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
    <dialog-goods ref="goodsDialog" :list="propGoodsList" @confirm="goodsSelectChange" @on-change="onSelectedGoods" />
    <!--弹窗--选择分组-->
    <edit-group :is-show="groupVisible" type="1" :group-data="groupDataDimens" @back="handleSaveGroup" @close="groupVisible=false" />
  </div>
</template>
<script>
import dialogGoods from './_source/dialog-goods'
import Tinymce from '@/components/Tinymce'
import { getTypeTree, getPreGroupList, getTypeDimensionList } from '@/api/group'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
import {
  saveImg
} from '@/api/new-goods'
import mixins from './_source/mixin'
import specsMixin from './_source/specsMixins'
import {
  addConstituteGoods,
  updateConstituteGoods,
  getConstituteGoodsInfo
} from '@/api/constitute-goods'
import { checkNumberdouble } from '@/utils/validate'
import editGroup from './_source/grouping'
import { findArray } from '@/utils/index'
export default {
  components: { Tinymce, dialogGoods, editGroup },
  mixins: [mixins, specsMixin],
  data() {
    const _check_price = (rule, value, callback) => {
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
      if (value !== '' && reg.test(value) || value === '0') {
        callback(new Error('请输入正整数'))
      }
      if (value > 99) {
        callback(new Error('最大值不能超过99'))
      }
      callback()
    }
    const _checklimitNum = (rule, value, callback) => { // 限购数量验证
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
      chooseTypeList: [], // 选中的分类
      chooseGroup: [], // 选中的分组(id+name)
      groupVisible: false,
      chooseArray: [], // 选中的分组(只有id)
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      subLoading: false,
      loading: false, // 加载分类
      basicForm: {
        firstTypeId: '', // 一级分类
        secondTypeId: '', // 二级分类
        typeId: '', // 三级分类
        detail: '', // 富文本内容
        image: '', // 组合图片
        price: 0, // 组合商品价格
        limitNum: 0, // 限购数量
        mprice: 0, // 参考价格
        weight: 0, // 商品总重量
        keyWord: '', // 关键字
        name: '', // 商品名
        childCommodities: [], // 子商品信息
        // groupIds: [], // 分组的ids
        groupId: '' // 分组id
      },
      // childCommodities: [], // 子商品信息
      basicRules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字', trigger: 'blur' }
        ],
        image: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        keyWord: [{ min: 1, max: 30, message: '长度在 1 到 30 个字', trigger: 'blur' }],
        number: [{ required: true, trigger: 'blur' }],
        price: [{ required: true, trigger: 'blur' }],
        limitNum: [{ validator: _checklimitNum, trigger: 'blur' }]
      },
      // childCommoditiesRules: {
      //   number: [{ required: true, trigger: 'blur' }],
      //   price: [{ required: true, trigger: 'blur' }]
      // },
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
    // currentSelectList() {
    //   if (this.xFormSet.formName === 'xForm6') {
    //     return this.xForm6.selectGoodsList
    //   }
    //   if (this.xFormSet.formName === 'xForm8') {
    //     return this.xForm8.selectGoodsList
    //   }
    //   return []
    // }
  },
  watch: {
    'basicForm.childCommodities': {
      // 监听组合商品总价格
      handler: function(newval) {
        let priceAll = 0
        let mpriceAll = 0
        let weightAll = 0
        this.basicForm.price = 0
        this.basicForm.mprice = 0
        this.basicForm.weight = 0

        newval.forEach(function(item, index) {
          console.log('item.weight:::', item.weight)
          const number1 = item.number && item.number !== '' ? item.number : 0
          const price = item.price && item.price !== '' ? item.price : 0
          const mprice = item.mprice && item.mprice !== '' ? item.mprice : 0
          const weight = item.weight && item.weight !== '' ? item.weight : 0
          // 子商品的数量验证
          const reg = /[^0-9]/
          if (!number1) {
            return false
          }
          if (number1 !== '' && reg.test(number1) || number1 === '0') {
            return false
          }
          if (number1 > 99) {
            return false
          }
          // 子商品的价格验证
          if (!price) {
            return false
          }
          if (price !== '') {
            if (!checkNumberdouble(price)) {
              return false
            }
          }
          if (price < 0) {
            return false
          }
          if (price > 99999) {
            return false
          }

          priceAll += number1 * price
          mpriceAll += number1 * mprice
          weightAll += number1 * weight
        })

        this.$nextTick(function() {
          this.basicForm.price = parseFloat(priceAll.toFixed(2))
          this.basicForm.mprice = parseFloat(mpriceAll.toFixed(2))
          this.basicForm.weight = parseFloat(weightAll.toFixed(2))
        })
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
    // 选取商品
    toSelectGoods() {
      this.propGoodsList = this.basicForm.childCommodities
      this.$nextTick(_ => {
        this.$refs.goodsDialog.open()
      })
    },
    goodsSelectChange(list) {
      this.basicForm.childCommodities = list.map(item => {
        item.id = null
        return item
      })

      this.$refs.goodsDialog.close()
    },
    onSelectedGoods(list) {
      if (list && list.length > 0) {
        // 1.移除table list中不在选取中的数据
        this.basicForm.childCommodities.forEach((item, index) => {
          const inIndex = list.findIndex(v => {
            return v.specId === item.specId
          })
          if (inIndex === -1) {
            this.basicForm.childCommodities.splice(index, 1)
          }
        })
        // 1.在table list中添加选取中没有的数据
        list.forEach(goods => {
          const inIndex = this.basicForm.childCommodities.findIndex(item => {
            return goods.specId === item.specId
          })
          if (inIndex === -1) {
            const item = {
              id: '',
              activityId: this.dataid,
              productManufacture: goods.manufacture || '',
              productName: goods.name || '',
              productSpecId: goods.specId || '',
              productSpecName: this.formatSkuInfo(goods.specSkuList || ''),
              stockAmount: (goods.stockAmount || '') + '',
              number: (goods.number || '') + '',
              price: (goods.price || '') + '',
              weight: goods.weight,
              mprice: goods.mprice // 参考
            }
            this.basicForm.childCommodities.unshift(item)
          } else {
            console.log('已存在')
          }
        })
        // this.selectedStore = list
        // this.storeIds = this.selectedStore.map(store => store.id)
        // this.storeNames = this.selectedStore.map(store => store.stName)
        console.log(this.tableForm.childCommodities)
      }
    },
    _loadgroupGather(type, ids) {
      // 查询分类和分组的父类
      const data = {
        ids: ids,
        type: type,
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
            const arr = [{ name: dat.name, id: dat.id }, { name: dat.child.name, id: dat.child.id }]
            dat.child.child && arr.push({ name: dat.child.child.name, id: dat.child.child.id })
            this.chooseGroup.push(arr)
          })
        }
      })
    },
    _loadInfo() {
      // 加载商品信息
      getConstituteGoodsInfo(this.$route.query.id, this.merCode).then(res => {
        // 分组处理
        this._loadgroupGather('1', [res.data.typeId])
        if (res.data.groupId && res.data.groupId.length > 0) {
          this._loadgroupGather('2', [res.data.groupId])
        }
        // this._loadgroupGather('2', [res.data.groupId])
        const { data } = res

        // 赋值
        console.log('data=====', data)
        this.basicForm = data
        this.basicForm.childCommodities = data.childCommodities
        if (this.basicForm.detail) {
          this.$refs.editor.setContent(this.basicForm.detail)
        }

        // console.log('this.basicForm:', this.basicForm)
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
        this.basicForm.childCommodities.splice(index, 1)
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
      getTypeDimensionList(this.$store.state.user.merCode).then(res => {
        this.groupDataDimens = res.data
      })
    },
    // handleSaveGroup() {
    //   // 保存数据
    //   if (this.chooseArray.length !== 3) {
    //     this.$message({
    //       message: '分组选择不完整',
    //       type: 'error'
    //     })
    //     return
    //   }
    //   // console.log('this.chooseArray', this.chooseArray.id)
    //   this._filters(this.chooseArray)
    //   this.groupVisible = false
    // },
    handleSaveGroup(row) { // 保存数据
      this.chooseArray = row
      this.chooseGroup = []
      if (this.chooseArray.length > 1) {
        this.$message({ type: 'warning', message: '组合商品分组有且只能选择一个' })
        return false
      }
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
    // _filters(data, index) {
    //   this.chooseGroup = []
    //   this.groupData.map(v => {
    //     if (v.id === data[0]) {
    //       this.chooseGroup.push({ name: v.name, id: v.id, dimensionId: v.dimensionId })
    //       // console.log('维度id:', v.dimensionId)
    //     }
    //     if (v.children) {
    //       v.children.map(v1 => {
    //         if (v1.id === data[1]) {
    //           this.chooseGroup.push({ name: v1.name, id: v1.id })
    //         }
    //         if (v1.children) {
    //           v1.children.map(v2 => {
    //             if (v2.id === data[2]) {
    //               this.chooseGroup.push({ name: v2.name, id: v2.id })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   })
    // },
    _filters(data) {
      data.forEach((val, index1) => {
        const findIndex = findArray(this.groupData, { id: val[0] })
        if (findIndex > -1) { // 找一级
          if (!this.chooseGroup[index1]) {
            this.chooseGroup.push([])
          }
          const row = this.groupData[findIndex]
          this.chooseGroup[index1].push({ name: row.name, id: row.id })
          if (row.children) { // 找二级
            const findIndex_child = findArray(row.children, { id: val[1] })
            if (findIndex_child > -1) {
              const child = row.children[findIndex_child]
              this.chooseGroup[index1].push({ name: child.name, id: child.id })
              if (child.children) { // 找三级
                const findIndex_children = findArray(child.children, { id: val[2] })
                if (findIndex_children > -1) {
                  const children = child.children[findIndex_children]
                  this.chooseGroup[index1].push({ name: children.name, id: children.id })
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
      // 保存商品详
      // this.basicForm.childCommodities = this.childCommodities
      // const data = {
      //   content: this.basicForm,
      //   id: this.basicForm.id
      // }
      if (!this.basicForm.name) {
        this.$message({ type: 'warning', message: '请输入商品名称' })
        return false
      }
      if (this.basicForm.name.length < 1 || this.basicForm.name.length > 30) {
        this.$message({ type: 'warning', message: '商品名称长度在1到30个字符' })
        return false
      }
      if (!this.chooseTypeList.length) {
        this.$message({ type: 'warning', message: '请选择分类' })
        return false
      }
      if (!this.chooseGroup.length) {
        this.$message({ type: 'warning', message: '请选择分组' })
        return false
      }
      if (!this.basicForm.image) {
        this.$message({ type: 'warning', message: '请上传图片' })
        return false
      }
      if (!this.basicForm.childCommodities.length) {
        this.$message({ type: 'warning', message: '请选择商品' })
        return false
      }

      for (let i = 0; i < this.basicForm.childCommodities.length; i++) {
        if (!this.basicForm.childCommodities[i].number) {
          this.$message({ type: 'warning', message: '请输入组合数量' })
          return false
        }
        if (this.basicForm.childCommodities[i].price < 0) {
          this.$message({ type: 'warning', message: '请输入组合单价' })
          return false
        }
        if (this.basicForm.childCommodities[i].price === 0) {
          this.$message({ type: 'warning', message: '组合单价必须大于0' })
          return false
        }
      }

      this.$refs['basic'].validate(valid => {
        console.log('valid:', valid)
        if (valid) {
          this.basicForm.typeId = this.chooseTypeList[
            this.chooseTypeList.length - 1
          ].id // 第三级分类id
          this.basicForm.secondTypeId = this.chooseTypeList[
            this.chooseTypeList.length - 2
          ].id // 第二级分类id
          this.basicForm.firstTypeId = this.chooseTypeList[
            this.chooseTypeList.length - 3
          ].id // 第一级分类id
          const data = JSON.parse(JSON.stringify(this.basicForm))

          data.groupId = this.chooseGroup[0][2] ? this.chooseGroup[0][2].id : this.chooseGroup[0][1].id // 第三级分组的id

          data.merCode = this.merCode
          this.subLoading = true
          if (this.basicForm.id) {
            data.commodityId = data.id
            this._UpdateBasicInfo(data)
          } else {
            this._CreateBasicInfo(data)
          }
        } else {
          this.$message({
            message: '存在必填字段未填写',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
        background: url('../../../../assets/image/sprite_dm.png') -2px -86px;
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
  width: 90px;
  min-width: 90px;
  padding: 0 5px;
}
.icon_items {
  width: 160px;
  text-align: right;
  padding-right: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.footer {
  text-align: center;
  margin: 50px auto;
}
.avatar-uploader-icon{
  font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px !important;
    text-align: center;
}

</style>
<style lang="scss">
.table-form{
  .el-form-item{
    margin: 15px 0;
  }
  .el-input{
    input {
      text-align: center;
    }
  }
}
.edit-wrapper .edit-card .el-input.inp_mini {
    width: 110px;
    }
</style>

