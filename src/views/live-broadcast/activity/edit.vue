<template>
  <div class="app-container">
    <div class="live-activity-wrapper">
      <el-form
        :model="formData"
        size="small"
        label-width="120px"
      >
        <div class="form-title">基本信息</div>
        <el-divider />
        <el-form-item label="直播头像：">
          <el-avatar :size="60" src="https://empty" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
        </el-form-item>
        <el-form-item label="直播名称：">
          <span />老百姓大药房
        </el-form-item>
        <el-form-item label="直播主题：">
          <el-input v-model="formData.zhuti" placeholder="请输入直播主题" />
        </el-form-item>
        <el-form-item label="开播时间：">
          <el-date-picker
            v-model="formData.time"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="直播封面：">
          <div class="cover">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>

        </el-form-item>
        <div class="form-title">关联商品</div>
        <el-divider />
        <el-form-item label="参与商品：">
          <el-button type="" size="mini">选择商品</el-button>
          <el-table :data="goodsList" border size="small">
            <!-- <el-table-column v-if="!activityId" type="selection" width="55" /> -->
            <el-table-column label="商品名称" prop="name" min-width="100" />
            <el-table-column label="商品编码" prop="erpCode" />
            <el-table-column label="参考价" prop="mprice" />
            <el-table-column label="操作" min-width="110">
              <template slot-scope="scope">
                <!-- <el-button
                  type
                  size="mini"
                  :disabled="disabled"
                  @click="handleEditSetting(scope.row)"
                >设置</el-button> -->
                <el-button
                  v-if="!activityId"
                  type="danger"
                  :disabled="disabled"
                  size="mini"
                  @click="handleGoodsDel(scope.row,scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="选择优惠券：">
          <el-button type="" size="mini">选择商品</el-button>
        </el-form-item>
        <div class="form-title">关联商品</div>
        <el-divider />
        <el-form-item label="图片：">
          <div class="ad-cover">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="formData.imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="链接地址：">
          <el-input v-model="formData.zhuti" placeholder="链接地址" />
        </el-form-item>
        <el-form-item label="直播背景色：">
          <colorPicker v-model="formData.color" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 选择主商品组件 -->
    <store-goods
      ref="dialogGoods"
      :limit-max="20"
      :list="goodsList"
      :store-ids="formData.allStore?[]:chooseStore.map(item => item.id)"
      @on-change="onSelectedGoods"
    />
    <!-- 选择优惠券 -->
    <check-coupon ref="" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import storeGoods from '@/views/marketing/components/store-gods'
import checkCoupon from '@/components/Marketings/checkCoupon'
export default {
  name: 'LiveActivityEdit',
  components: { storeGoods, checkCoupon },
  data() {
    return {
      chooseStore: [],
      formData: {
        color: '#e2534d'
      },
      goodsList: [],
      pageLoading: null
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  methods: {
    handleGoodsDel() {

    },
    handleOpenGoods() {
      // 打开选择商品弹窗组件
      this.$refs.dialogGoods.open()
    },
    onSelectedGoods() {

    },
    errorHandler() {

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.live-activity-wrapper {
  .form-title {
    line-height: 16px;
    font-size: 16px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 16px;
  }
  .cover{
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
  .ad-cover{
    .avatar-uploader-icon {
      width: 300px;
      height: 100px;
      line-height:100px !important;
    }
    .avatar {
      width: 350px;
      height: 100px;
    }
  }
}
</style>
