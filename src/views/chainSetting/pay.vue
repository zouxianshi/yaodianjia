<template>
  <div class="container">
    <h3>订单支付方式</h3>
    <div class="border" style="display:inline-block;width: 100%;margin-top: 10px">
      <div style="float: left">
        <span class="label-name">快递订单：</span>
        <el-checkbox>货到付款</el-checkbox>
      </div>
      <div style="float:  left;margin-left: 30px">
        <h6>
          后台所有订单都支持在线支付，自提订单支持在线支付及到店支付。<br>
          此处选择商户自行配置，提示：为了避免顾客与商家之间关于付款或退款的纠纷，建议商家送货上门的订单不要选择货到付款
        </h6>
      </div>
    </div>
    <h3 style="margin-top: 30px">下单付款方式</h3>
    <div class="border" style="display:inline-block;width: 100%;margin-top: 10px">
      <div>
        <span>
          <i class="el-icon-picture-outline" />
        </span>
        <el-button type="text" @click="onSetting(true)">设置</el-button>
        <el-switch
          v-model="wechat"
          style="margin-left: 200px"
        />
      </div>
      <div>
        <span>
          <i class="el-icon-picture-outline" />
        </span>
        <el-button type="text" disabled @click="onSetting(false)">设置</el-button>
        <el-switch
          v-model="alipay"
          style="margin-left: 200px"
          disabled
        />
      </div>
    </div>
    <el-dialog
      append-to-body
      :title="isWechat ? '微信支付设置' : '支付宝设置'"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <el-form ref="form" :model="form" label-position="right" label-width="130px">
        <el-form-item label="支付授权配置：">
          <span>{{ configuration }}</span>
          <el-button type="text" style="margin-left: 20px">复制</el-button>
        </el-form-item>
        <el-form-item :label="isWechat ? '微信支付商户号：' : '支付宝商户号：'">
          <el-input v-model="form.code" style="width: 300px" />
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
        </el-form-item>
        <el-form-item :label="isWechat ? '微信支付key：' : '支付宝key：'">
          <el-input v-model="form.key" style="width: 300px" />
        </el-form-item>
        <el-form-item label="商户证书：">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small">取 消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getPayset
} from '../../api/chainSetting'
export default {
  name: 'Pay',
  data() {
    return {
      visable: false,
      wechat: false,
      alipay: false,
      isWechat: true,
      configuration: 'ydjia.hydee.cn/wx/wxpay/',
      form: {
        number: null,
        key: null
      },
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  created() {
    this.getPayset()
  },
  methods: {
    onSetting(isWechat) {
      this.isWechat = isWechat
      this.visable = true
    },
    getPayset() {
      this.loading = true
      getPayset({
        merCode: this.merCode,
        type: 0
      }).then(res => {
        if (res.code === '10000') {
          this.list = res.data.data
          this.totalCount = res.data.totalCount
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    dismiss() {

    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  components: { }
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
