<template>
  <div class="container">
    <h3>订单支付方式</h3>
    <div class="border" style="display:inline-block;width: 100%;margin-top: 10px">
      <div>
        <span class="label-name">快递订单：</span>
        <el-checkbox v-model="deliveryOrder" :true-label="1" :false-label="0" @change="changeOrderPayset">货到付款</el-checkbox>
      </div>
      <div style="margin-top: 5px">
        <span class="label-name">配送订单：</span>
        <el-checkbox v-model="distributionOrder" :true-label="1" :false-label="0" @change="changeOrderPayset">货到付款</el-checkbox>
      </div>
      <div style="margin-top: 5px">
        <span class="label-name">自提订单：</span>
        <el-checkbox v-model="storesOrder" :true-label="1" :false-label="0" @change="changeOrderPayset">到店支付</el-checkbox>
      </div>
      <el-alert
        type="warning"
        :closable="false"
        style="line-height:20px;margin-top:10px"
      >
        后台所有订单都支持在线支付，自提订单支持在线支付及到店支付。<br>
        此处选择商户自行配置，提示：为了避免顾客与商家之间关于付款或退款的纠纷，建议商家送货上门的订单不要选择货到付款
      </el-alert>
      <!--<div style="margin-top: 10px">
        <h6 style="line-height: 20px">
          后台所有订单都支持在线支付，自提订单支持在线支付及到店支付。<br>
          此处选择商户自行配置，提示：为了避免顾客与商家之间关于付款或退款的纠纷，建议商家送货上门的订单不要选择货到付款
        </h6>
      </div>-->
    </div>
    <h3 style="margin-top: 30px">下单付款方式</h3>
    <div class="border" style="display:inline-block;width: 100%;margin-top: 10px">
      <div style="display: flex;display: -webkit-flex;align-items: center;">
        <span>
          <img src="../../assets/image/h5/pic_wechat_pay.png" style="width: 40px">
        </span>
        <span>
          微信支付
        </span>
        <el-button type="text" style="margin-left: 20px" @click="onSetting(true)">设置</el-button>
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          style="margin-left: 200px"
          @change="setStatus"
        />
      </div>
      <!--<div>
        <span>
          <i class="el-icon-picture-outline" />
        </span>
        <el-button type="text" disabled @click="onSetting(false)">设置</el-button>
        <el-switch
          v-model="alipay"
          style="margin-left: 200px"
          disabled
        />
      </div>-->
    </div>
    <el-dialog
      v-if="visable"
      append-to-body
      :title="isWechat ? '微信支付设置' : '支付宝设置'"
      :visible.sync="visable"
      width="800px"
      :close-on-click-modal="false"
      @close="dismiss"
    >
      <el-form ref="form" :model="form" :rules="rules" label-position="right" label-width="140px">
        <el-form-item label="支付授权配置：">
          <span>
            <span>{{ form.payAutoConfig }}</span>
            <el-button type="text" style="margin-left: 20px" class="copy-key" :data-clipboard-text="form.payAutoConfig" @click="onCopyLink">复制</el-button>
            <el-popover
              placement="right"
              title="操作提示："
              width="500"
              trigger="click"
            >
              <span style="line-height: 30px">
                1：进入微信商户平台<br>
                2：点击“产品中心”，点击“开发配置”<br>
                3：找到支付配置，公众号支付配置，点击“添加”<br>
                4：选择左侧相应的支付授权链接复制<br>
                5：粘贴到输入框中,<el-button type="text" @click="showGuide(4)">点击查看图片</el-button><br>
                6：支付授权目录开始下拉框切记选择https://
              </span>
              <el-image
                id="imgWechatGuide4"
                style="width: 0px; height: 0px"
                :src="wechatGuide4"
                :preview-src-list="wechatGuideList4"
              />
              <el-button slot="reference" type="text" size="mini" class="el-icon-question" style="margin-left: 5px" />
            </el-popover>
          </span>
          <!--<span v-else>
            <el-input v-model="form.payAutoConfig" style="width: 300px" maxlength="100" onkeyup="this.value=this.value.replace(/[，。、！？：“”［］【】——（）…！＠＃￥＆＊＋＞＜；：‘\u4E00-\u9FA5]/g,'');" />
            <el-popover
              placement="right"
              title="操作提示："
              width="500"
              trigger="click"
            >
              <span>
                1：进入微信商户平台<el-link href="https://pay.weixin.qq.com/" type="primary" :underline="false" target="_blank">https://pay.weixin.qq.com/</el-link><br>
                2：点击“产品中心”，点击“开发配置”<br>
                3：找到支付配置，公众号支付配置，点击“添加”<br>
                4：选择左侧相应的支付授权链接复制<br>
                5：粘贴到输入框中<br>
                6：支付授权目录开始下拉框切记选择https://
              </span>
              <el-button slot="reference" type="text" class="el-icon-question" style="margin-left: 5px" />
            </el-popover>
          </span>-->
        </el-form-item>
        <el-form-item :label="isWechat ? '微信支付商户号：' : '支付宝商户号：'" prop="merchantCode">
          <el-input v-model.trim="form.merchantCode" style="width: 300px" maxlength="50" onkeyup="this.value=this.value.replace(/[，。、！？：“”［］【】——（）…！＠＃￥＆＊＋＞＜；：‘\u4E00-\u9FA5]/g,'');" />
          <el-popover
            placement="right"
            title="操作提示："
            width="500"
            trigger="click"
          >
            <span style="line-height: 30px">
              1：进入微信商户平台<el-link href="https://pay.weixin.qq.com/" type="primary" :underline="false" target="_blank">https://pay.weixin.qq.com/</el-link><br>
              2：点击“微信支付”，复制微信支付商户号<br>
              3：粘贴到输入框中,
              <el-button type="text" @click="showGuide(1)">点击查看图片</el-button>
            </span>
            <el-image
              id="imgWechatGuide1"
              style="width: 0px; height: 0px"
              :src="wechatGuide1"
              :preview-src-list="wechatGuideList1"
            />
            <el-button slot="reference" type="text" class="el-icon-question" style="margin-left: 5px" />
          </el-popover>
        </el-form-item>
        <el-form-item :label="isWechat ? '微信支付key：' : '支付宝key：'" prop="payKey">
          <el-input v-model.trim="form.payKey" style="width: 300px" maxlength="60" onkeyup="this.value=this.value.replace(/[，。、！？：“”［］【】——（）…！＠＃￥＆＊＋＞＜；：‘\u4E00-\u9FA5]/g,'');" />
          <el-popover
            placement="right"
            title="操作提示："
            width="500"
            trigger="click"
          >
            <span style="line-height: 30px">
              1：进入微信商户平台<el-link href="https://pay.weixin.qq.com/" type="primary" :underline="false" target="_blank">https://pay.weixin.qq.com/</el-link><br>
              2：点击“API安全”，根据要求安装相关证书，已安装略过<br>
              3：点击“设置秘钥”，
              <el-button type="text" @click="showGuide(2)">点击查看图片</el-button>
            </span>
            <el-image
              id="imgWechatGuide2"
              style="width: 0px; height: 0px"
              :src="wechatGuide2"
              :preview-src-list="wechatGuideList2"
            />
            <el-button slot="reference" type="text" class="el-icon-question" style="margin-left: 5px" />
          </el-popover>
        </el-form-item>
        <div v-loading="uploadLoading">
          <el-form-item label="商户证书：" prop="merchantCertificate">
            <el-input v-model="form.merchantCertificate" style="display: none" />
            <div style="position: relative">
              <el-upload
                class="upload-demo"
                :headers="headers"
                :action="upLoadUrl"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccess"
                :before-upload="handleBefore"
                :file-list="fileList"
                style="position: relative;"
              >
                <el-button slot="trigger" size="small" type="primary">点击上传</el-button>

                <!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
              <el-popover
                placement="right"
                title="操作提示："
                width="500"
                trigger="click"
                style="position: absolute;top:-3px;left:90px"
              >
                <span style="line-height: 30px">
                  1：进入微信商户平台  <el-link href="https://pay.weixin.qq.com/" type="primary" :underline="false" target="_blank">https://pay.weixin.qq.com/</el-link><br>
                  2：进入账户中心>API安全>下载证书<br>
                  3：<el-button type="text" @click="showGuide(3)">点击查看图片</el-button>
                </span>
                <el-image
                  id="imgWechatGuide3"
                  style="width: 0px; height: 0px"
                  :src="wechatGuide3"
                  :preview-src-list="wechatGuideList3"
                />
                <el-button slot="reference" type="text" class="el-icon-question" style="margin-top: 5px" />
              </el-popover>
            </div>
          </el-form-item>

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dismiss">取 消</el-button>
        <el-button type="primary" size="small" :loading="loading" @click="handleSubmit('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import config from '../../utils/config'
import {
  setPayset,
  getPayset,
  setOrderPayset,
  getOrderPayset
} from '../../api/chainSetting'
export default {
  name: 'Pay',
  data() {
    return {
      uploadLoading: false,
      loading: false,
      visable: false,
      wechat: false,
      alipay: false,
      isWechat: true,
      // configuration: 'ydjia.hydee.cn/wx/wxpay/',
      orderPaysetId: null,
      deliveryOrder: 0,
      storesOrder: 1,
      distributionOrder: 0,
      data: null,
      form: {
        id: null,
        merCode: null,
        merchantCertificate: null,
        merchantCode: null,
        payAutoConfig: null,
        payKey: null,
        payType: 0,
        status: 0
      },
      fileList: [],
      wechatGuide1: require('../../assets/image/chainSetting/img_wechat_guide1.png'),
      wechatGuide2: require('../../assets/image/chainSetting/img_wechat_guide2.jpg'),
      wechatGuide3: require('../../assets/image/chainSetting/img_wechat_guide3.png'),
      wechatGuide4: require('../../assets/image/chainSetting/img_wechat_guide4.jpg'),
      wechatGuideList1: [require('../../assets/image/chainSetting/img_wechat_guide1.png')],
      wechatGuideList2: [require('../../assets/image/chainSetting/img_wechat_guide2.jpg')],
      wechatGuideList3: [require('../../assets/image/chainSetting/img_wechat_guide3.png')],
      wechatGuideList4: [require('../../assets/image/chainSetting/img_wechat_guide4.jpg')],
      rules: {
        merchantCode: [
          { required: true, message: '请输入支付商户号', trgger: 'blur' }
        ],
        payKey: [
          { required: true, message: '请输入支付key', trgger: 'blur' }
        ],
        merchantCertificate: [
          { required: true, message: '请上传商户证书', trgger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'roles']),
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { 'Authorization': this.$store.getters.token }
    }
  },
  created() {
    this.getPayset()
    this.getOrderPayset()
  },
  methods: {
    handleSubmit(form) { // 保存
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit')
        }
      })
    },
    onSetting(isWechat) {
      this.form.payAutoConfig = this.payH5Base
      this.isWechat = isWechat
      this.visable = true
    },
    getOrderPayset() {
      this.loading = true
      getOrderPayset(this.merCode).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.orderPaysetId = res.data[0].id
          this.distributionOrder = res.data[0].distributionOrder
          this.deliveryOrder = res.data[0].deliveryOrder
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', res.data)
      })
    },
    changeOrderPayset() {
      setOrderPayset({
        id: this.orderPaysetId,
        merCode: this.merCode,
        deliveryOrder: this.deliveryOrder,
        distributionOrder: this.distributionOrder,
        storesOrder: this.storesOrder
      }).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.$message({
            message: '设置成功',
            type: 'success',
            duration: 5 * 1000
          })
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', res.data)
      })
    },
    getPayset() {
      this.loading = true
      getPayset({
        merCode: this.merCode,
        type: 0
      }).then(res => {
        if (res.code === '10000') {
        // this.data = _.filter(_.cloneDeep(res.data), (o) => {return o.payType === 0})
          const tempData = _.filter(_.cloneDeep(res.data), (o) => { return o.payType === 0 })
          if (tempData && tempData.length > 0) {
            this.data = tempData[0]
          }
          // this.data = null
          console.log(this.data)
          if (this.data) {
            this.form = _.cloneDeep(this.data)
            this.form.id = this.data.id
            this.form.merCode = this.data.merCode
            this.form.merchantCertificate = this.data.merchantCertificate
            this.form.merchantCode = this.data.merchantCode
            this.form.payAutoConfig = this.data.payAutoConfig
            this.form.payKey = this.data.payKey
            this.form.payType = this.data.payType
            this.form.status = this.data.status
            if (this.data.merchantCertificate) {
              this.fileList = [{
                name: '商户证书',
                url: this.data.merchantCertificate
              }]
            } else {
              this.fileList = []
            }
          } else {
            this.form.id = null
            this.form.merCode = null
            this.form.merchantCertificate = null
            this.form.merchantCode = null
            this.form.payAutoConfig = null
            this.form.payKey = null
            this.form.payType = 0
            this.form.status = 0
            this.fileList = []
          }
          /* const tempData = _.filter(_.cloneDeep(res.data), (o) => {return o.payType === 0})
          if(tempData && tempData.length > 0){
            this.form = tempData[0]
          }else{
            this.form.id = null
            this.form.merCode = null
            this.form.merchantCertificate = null
            this.form.merchantCode = null
            this.form.payAutoConfig = null
            this.form.payKey = null
            this.form.payType = 0
            this.form.status = 0
          }*/
          console.log(this.form)
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', res.data)
      })
    },
    setStatus() {
      // this.loading = true
      this.form.merCode = this.merCode
      if (!this.form.merchantCode || !this.form.payKey || !this.form.merchantCertificate) {
        this.$message({
          message: '请先完善支付设置',
          type: 'error',
          duration: 5 * 1000
        })
        if (this.form.status === 0) {
          this.form.status = 1
          this.data.status = 1
        } else {
          this.form.status = 0
          this.data.status = 0
        }
        return
      }
      /* if(!this.form.payKey){
      this.$message({
        message: '请输入支付key',
        type: 'error',
        duration: 5 * 1000
      })
      if(this.form.status === 0){
        this.form.status = 1
      }else{
        this.form.status = 0
      }
      return
    }*/
      setPayset(this.form).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.data.status = this.form.status
        } else {
          this.loading = false
          if (this.form.status === 0) {
            this.form.status = 1
            this.data.status = 1
          } else {
            this.form.status = 0
            this.data.status = 0
          }
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    submit() {
      if (this.uploadLoading) {
        return
      }
      this.loading = true
      this.form.merCode = this.merCode
      setPayset(this.form).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.dismiss()
          this.getPayset()
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    dismiss() {
      this.uploadLoading = false
      if (this.data) {
        this.form = _.cloneDeep(this.data)
        this.form.id = this.data.id
        this.form.merCode = this.data.merCode
        this.form.merchantCertificate = this.data.merchantCertificate
        this.form.merchantCode = this.data.merchantCode
        this.form.payAutoConfig = this.data.payAutoConfig
        this.form.payKey = this.data.payKey
        this.form.payType = this.data.payType
        this.form.status = this.data.status
        this.fileList = [{
          name: '商户证书',
          url: this.data.merchantCertificate
        }]
      } else {
        this.form.id = null
        this.form.merCode = null
        this.form.merchantCertificate = null
        this.form.merchantCode = null
        this.form.payAutoConfig = null
        this.form.payKey = null
        this.form.payType = 0
        this.form.status = 0
        this.fileList = []
      }
      /* this.form.id = null
      this.form.merCode = null
      this.form.merchantCertificate = null
      this.form.merchantCode = null
      this.form.payAutoConfig = null
      this.form.payKey = null
      this.form.payType = 0
      this.form.status = 1*/
      this.visable = false
    },
    showGuide(index) {
      if (index === 1) {
        document.getElementById('imgWechatGuide1').click()
      } else if (index === 2) {
        document.getElementById('imgWechatGuide2').click()
      } else if (index === 3) {
        document.getElementById('imgWechatGuide3').click()
      } else if (index === 4) {
        document.getElementById('imgWechatGuide4').click()
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.form.merchantCertificate = null
    },
    handlePreview(file) {
      console.log(file)
    },
    handleBefore() {
      this.uploadLoading = true
    },
    handleExceed(files, fileList) {
      console.log(this.fileList)
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleUploadSuccess(res, file) {
      this.uploadLoading = false
      this.form.merchantCertificate = res.data
      console.log(this.form.merchantCertificate)
    },
    onCopyLink() {
      const clipboard = new Clipboard(`.copy-key`)
      clipboard.on('success', () => {
        this.$message({ type: 'success', message: '复制成功！' })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({ type: 'error', message: JSON.stringify(e) })
        clipboard.destroy()
      })
    }
  }
}
</script>

<style scoped>
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    color: #99a9bf;
  }
  .label-name {
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    color: #999999;
    font-size: 14px;
  }
  .border{
    border-style: solid;
    border-width: 1px;
    border-color: #dddddd;
    border-radius: 2px;
    color: #1f2d3d;
    padding: 10px;
  }
</style>
