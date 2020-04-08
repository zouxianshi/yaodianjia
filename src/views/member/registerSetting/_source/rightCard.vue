<template>
  <div class="right-index-model">
    <div class="right-content-model">
      <div class="right-right-model">会员卡信息</div>
      <el-form ref="form" :model="member" label-width="100px">
        <el-form-item label="商户名称">
          <span v-text="member.merBrandName">}</span>
        </el-form-item>
        <el-form-item label="商户LOGO">
          <img :src="member.merLogoUrl" alt>
        </el-form-item>
        <el-form-item label="卡片背景">
          <el-radio-group v-model="member.cardBgType" @change="changeback">
            <el-radio :label="1">颜色</el-radio>
            <el-radio :label="2">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="member.cardBgType==2" label="上传图片">
          <div class="right-input-line">
            <el-upload
              class="avatar-uploader"
              :headers="headers"
              :action="upLoadUrl"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              :show-file-list="false"
            >
              <img v-if="member.cardBgContent" :src="member.cardBgContent" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="right-input-rule">图片尺寸要求：1000像素*600像素，支持.jpg .png .jpeg格式，大小不超过1M 详细规范请参考</div>
          </div>
        </el-form-item>
        <el-form-item v-if="member.cardBgType==1" label="卡片颜色">
          <ul class="right-color-check">
            <li v-for="(item,index) in colorlist" :key="index" :style="{background:item,border:member.cardBgContent==item?'2px solid #409eff':''}" @click="checkColor(item)">{{ item }}</li>
          </ul>
        </el-form-item>
        <el-form-item label="会员卡标题" label-width="100px">
          <div class="right-input-line">
            <el-input v-model="member.cardTitle" class="right-input-model" />
            <div class="right-input-rule">不能为空且长度不能超过9个汉字或18个英文字符</div>
          </div>
        </el-form-item>
        <el-form-item label="默认发卡机构" label-width="100px">
          <el-input v-model="member.organization" class="right-input-model" placeholder="商户旗舰店" />
        </el-form-item>
        <el-form-item label="特权说明" label-width="100px">
          <el-input v-model="member.prerogative" type="textarea" placeholder="会员卡可享受会员特权" />
        </el-form-item>
        <el-form-item label="使用说明" label-width="100px">
          <el-input v-model="member.useNotice" type="textarea" placeholder="每人限领1张" />
        </el-form-item>
        <el-form-item label="商户电话" label-width="100px">
          <el-input v-model="member.serviceTel" class="right-input-model" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <div class="right-content-model">
      <div class="right-right-model">会员卡设置</div>
      <h2 class="right-title-model">引导菜单设置</h2>
      <div v-for="(item,index) in member.customCells" :key="index">
        <div style="display:flex;justify-content:space-between;padding:0 40px 0 0px">
          <div>{{ index+1 }}.</div>
          <i v-if="member.customCells.length>1" class="el-icon-close" @click="deletmenu(index)" />
        </div>
        <el-form :ref="member.customCells[index]" :model="member.customCells[index]" label-width="80px">
          <el-form-item label="引导菜单">
            <el-input v-model="item.name" class="right-input-model" />
          </el-form-item>
          <el-form-item label="引导语">
            <el-input v-model="item.tips" class="right-input-model" />
          </el-form-item>
          <el-form-item label="连接跳转">
            <div class="right-line-model">
              <div class="right-link-model">{{ item.url }}</div>
              <el-button size="mini" @click="modifyAdress(index)">修改地址</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div style="display:flex;justify-content: center;margin-bottom:20px">
        <el-button
          type="primary"
          plain
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="addmeun"
        >增加新引索菜单</el-button>
      </div>
      <!-- 连接修改弹框 -->
      <el-dialog append-to-body title="跳转连接地址" :visible.sync="dialog.dialogVisible" width="70%">
        <template>
          <div style="display:flex;margin-bottom:20px">
            <el-radio v-model="dialog.dialogRadio" label="1">小程序地址：</el-radio>
            <div>{{ geturl }}</div>
          </div>
          <div style="display:flex;margin-bottom:20px;align-items: center;">
            <el-radio v-model="dialog.dialogRadio" label="2">自定义地址：</el-radio>
            <div>
              <el-input v-model="dialog.dialogInput" placeholder="请输入内容" style="width:200%" />
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogSure">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <div class="right-play-model">
        <h2 class="right-title-model">微信支付注册设置</h2>
        <el-form :ref="member" :model="member" label-width="80px">
          <el-form-item label="微信支付注册">
            <el-radio-group v-model="member.isPay">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div style="margin-left:100px">
          <el-button type="primary" size="small" @click="submit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { editMemberInfo } from '@/api/memberService'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
export default {
  name: 'RightCard',
  components: {},
  props: {
    // 会员卡信息
    member: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 颜色板
    colorlist: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 小程序地址
    geturl: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      dialog: {
        dialogVisible: false,
        dialogRadio: '1',
        dialogInput: '',
        dialogUrl: ''
      },
      form: {
        imgUrl: ''
      },
      // 修改第几个菜单
      modifyAdressnum: 0
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    headers() {
      return { Authorization: this.token, merCode: this.merCode }
    },
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    }
  },
  watch: {},
  beforeCreate() {},
  created() {
  },
  beforeMount() {},
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  methods: {
    beforeUpload(file) {
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      console.log(file)
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 1MB!',
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
    uploadSuccess(res, file, fileList) {
      // 图片上传成功
      if (res.code === '10000') {
        this.member.cardBgContent = this.showImgHandler(res.data)
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 验证标题格式
    titleReg(title) {
      var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
      if (!reg.test(title)) {
        this.$message({
          message: '标题中不能包含特殊符号',
          type: 'error'
        })
      }
      if (reg.test(title)) {
        let len = 0
        for (var i in title) {
          if (title.charCodeAt(i) > 127 || title.charCodeAt(i) === 94) {
            len += 2
          } else {
            len++
          }
        }
        if (len < 18) {
          return true
        } else {
          this.$message({
            message: '标题长度不能超过9个汉字或18个英文字符',
            type: 'error'
          })
        }
      }
    },
    // 验证商家电话
    iphoneReg(num) {
      const numReg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      if (numReg.test(num) === false) {
        this.$message({
          message: '电话格式错误',
          type: 'error'
        })
      } else {
        return true
      }
    },
    submit() {
      const regtitle = this.titleReg(this.member.cardTitle)
      const regphone = this.iphoneReg(this.member.serviceTel)
      if (this.member.cardBgType === 1) {
        for (const i in this.colorlist) {
          if (this.colorlist[i] === this.member.cardBgContent) {
            this.member.cardBgContent = i
          }
        }
      }
      if (regtitle && regphone) {
        editMemberInfo(this.member).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$emit('getlist')
        })
      }
    },
    // 确认对话框
    dialogSure() {
      if (this.dialog.dialogRadio === '1') {
        this.member.customCells[this.modifyAdressnum].url = this.geturl
      } else {
        this.member.customCells[this.modifyAdressnum].url = this.dialog.dialogInput
      }
      if (this.dialog.dialogInput === '' && this.dialog.dialogRadio === '2') {
        this.$message({
          message: '自定不能为空',
          type: 'warning'
        })
      } else {
        // this.dialog.dialogUrl = ''
        this.dialog.dialogInput = ''
        this.dialog.dialogVisible = false
      }
      console.log(this.member.customCells)
    },
    // 删除菜单
    deletmenu(index) {
      console.log(index)
      this.member.customCells.splice(index, 1)
    },
    // 显示修改地址弹框
    modifyAdress(index) {
      this.modifyAdressnum = index
      this.dialog.dialogVisible = true
      if (this.geturl !== this.member.customCells[index].url) {
        this.dialog.dialogRadio = '2'
        this.dialog.dialogInput = this.member.customCells[index].url
      } else {
        this.dialog.dialogRadio = '1'
      }
    },
    // 新增菜单
    addmeun() {
      if (this.member.customCells == null || this.member.customCells.length < 3) {
        const dataele = {
          name: '',
          tips: '',
          url: this.geturl
        }
        if (this.member.customCells == null) {
          this.member.customCells = []
        }
        this.member.customCells.push(dataele)
      } else {
        this.$message({
          message: '引导菜单不能超过3个',
          type: 'warning'
        })
      }
    },
    checkColor(index) {
      this.member.cardBgContent = index
    },
    changeback() {
      this.member.cardBgContent = ''
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.right-index-model {
  padding: 5px;
  background: #f5f7fa;
  .right-color-check{
    width: 220px;
    li{
      float: left;
      width: 50px;
      height:25px;
      font-size: 12px;
      line-height: 25px;
    }
    li:hover{
      cursor:pointer;
    }
  }
  .right-content-model {
    padding: 10px;
    background: #ffffff;
    margin-bottom: 10px;
    .right-dialog-model {
      display: flex;
    }
    .right-line-model {
      display: flex;
      .right-link-model {
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .right-input-line {
      display: flex;
      .right-input-rule {
        font-size: 12px;
        color: #d9d9d9;
      }
    }
    .right-input-model {
      width: 40%;
    }
  }
  .right-right-model {
    font-size: 16px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 10px;
  }
  .right-play-model {
    border-top: 2px solid #eeeeee;
    padding-bottom: 10px;
  }
  .right-title-model {
    margin: 10px 0;
    font-size: 14px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
