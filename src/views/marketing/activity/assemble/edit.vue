<template>
  <div class="app-container ">
    <div class="assemble-wrapper">
      <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="120px" size="small" class="demo-ruleForm">
        <div class="form-title">
          基础设置
        </div>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="formData.name" placeholder="活动名称不超过12字" />
        </el-form-item>
        <el-form-item label="活动底图">
          <el-radio-group v-model="formData.img">
            <el-radio label="1">不添加</el-radio>
            <el-radio label="2">添加</el-radio>
          </el-radio-group>
          <template v-if="formData.img==='2'">
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.formData" :src="formData.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </template>

        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="formData.des" type="textarea" maxlength="200" :autosize="{ minRows: 4, maxRows: 6}" style="width:300px" :show-word-limit="true" placeholder="活动描述尽量精简，将会展示在商品副标题内" />
        </el-form-item>
        <el-form-item label="活动时间" prop="activitTime">
          <el-date-picker
            v-model="formData.activitTime"
            type="datetimerange"
            value-format="yyyy-MM-dd hh:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="成团有效时间" prop="effectiveTime">
          <div class="custom-input">
            <el-input v-model="formData.effectiveTime" type="number" style="width:80px" class="custom-inner-input" placeholder="" @input.native="handleInput" />
            <div class="operate">
              <span class="el-icon-arrow-up" @click="handleAddTime(1)" />
              <span class="el-icon-arrow-down" @click="handleAddTime(2)" />
            </div>
          </div>
        </el-form-item>
        <div class="form-title">
          活动店铺
        </div>
        <el-form-item label="所有店铺">
          <el-radio-group v-model="formData.isAllStore">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>

        </el-form-item>
        <el-form-item label="已选店铺">
          <div class="choose-store-box">
            <el-tag v-for="(item,index) in chooseStore" :key="index" type="para" size="small">{{ item.stName }}</el-tag>
          </div>
          <p style="margin-top:5px">
            <el-button type="primary" size="mini" @click="handleOpenStore">选择门店</el-button>
          </p>
        </el-form-item>
        <div class="form-title">
          活动商品
        </div>
        <el-form-item label="">
          <p style="margin-bottom:10px">
            <el-button icon="el-icon-circle-plus-outline" type="primary" size="small" @click="handleOpenGoods">添加商品</el-button>
          </p>
          <el-table
            :data="goodsList"
            border
            size="small"
          >
            <el-table-column label="序号" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.$index" placeholder="" style="width:40px" />
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name" min-width="100" />
            <el-table-column label="商品编码" prop="erpCode" />
            <el-table-column label="原售价" />
            <el-table-column label="拼团价" />
            <el-table-column label="活动库存" />
            <el-table-column label="成团人数" />
            <el-table-column label="操作" min-width="110">
              <template slot-scope="scope">
                <el-button type="" size="mini">设置</el-button>
                <el-button type="danger" size="mini" @click="handleGoodsDel(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item />
      </el-form>
    </div>
    <!-- 门店模态框 -->
    <store :is-show="showStore" @close="showStore=false" @complete="handletStoreComplete" />
    <!-- 选择商品弹窗组件 -->
    <goods ref="dialogGoods" :editable="!disabled" :list="chooseGoods" @on-change="onSelectedGoods" />
  </div>
</template>
<script>
import config from '@/utils/config'
import store from './_source/store'
import goods from './_source/goods'
export default {
  components: { store, goods },
  data() {
    return {
      formData: {
        effectiveTime: '',
        name: '',
        activitTime: ''
      },
      goodsList: [],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activitTime: [{ required: true, message: '请选择活动开始和结束时间', trigger: 'change' }],
        effectiveTime: [{ required: true, message: '请输入成团有效时间', trigger: 'blur' }]
      },
      showStore: false,
      chooseStore: [],
      showGoods: false,
      chooseGoods: [],
      disabled: false
    }
  },
  computed: {
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImg?merCode=${this.merCode}`
    },
    headers() {
      return { 'Authorization': this.token }
    }
  },
  created() {

  },
  methods: {
    handleInput(e) {
      const value = e.target.value
      e.target.value = value.replace(/[^\d]/g, '')
      this.formData.effectiveTime = value.replace(/[^\d]/g, '')
    },
    handleAddTime(type) {
      if (!this.formData.effectiveTime) {
        return
      }
      if (type === 1) {
        this.formData.effectiveTime++
      } else {
        if (this.formData.effectiveTime !== 0) {
          this.formData.effectiveTime--
        }
      }
    },
    handleOpenStore() {
      this.showStore = true
    },
    handleOpenGoods() {
      console.log()
      this.$nextTick(_ => {
        this.$refs.dialogGoods.open()
      })
    },
    handletStoreComplete(row) {
      this.chooseStore = row
      this.showStore = false
    },
    handleGoodsDel(index) { // 删除商品表格数据
      this.goodsList.splice(index, 1)
    },
    onSelectedGoods(row) { // 商品选择确定事件
      this.goodsList = row
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="scss" scoped>
.assemble-wrapper{
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px!important;
    text-align: center;
  }

    .form-title{
        line-height: 16px;
      font-size: 16px;
      border-left: #409eff 2px solid;
      padding-left: 10px;
      margin-bottom: 16px;
    }
    .el-input{
        width: 200px;
    }
    .custom-input{
      display: flex;
      .custom-input-box{
         border-top-right-radius: 0!important;
        border-bottom-right-radius: 0!important;
        border-right: none!important;
        &:focus{
          outline: none;
          border-color: #147de8;
        }
      }
      .operate{
        display: flex;
        flex-direction: column;
        margin-left: -12px;
        z-index: 3;
        width: 30px;
        align-items: center;
        background: #f5f7fa;
        border: 1px solid #dcdfe6;
        height: 32px;
         border-radius: 4px;
         border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        color: #909399;
        span{
          width: 100%;
          text-align: center;
          &:last-child{
            border-top:1px solid #dcdfe6;
          }
        }
      }
    }
    .choose-store-box{
      width: 300px;
      height: 100px;
      border:1px solid #dcdfe6;
      border-radius: 4px;
      padding: 5px;
      overflow-y: auto;
      .el-tag{
        margin-right: 10px;
      }
    }
}
  .search-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .search-query{
      display: flex;
      .el-input{
        margin-right: 5px;
      }
    }
  }

</style>
