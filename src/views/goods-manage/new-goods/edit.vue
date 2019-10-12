<template>
  <div class="app-container">
    <div class="edit-wrapper">
      <el-steps :active="step" simple style="margin-top: 20px">
        <el-step title="基本信息" icon="el-icon-edit-outline" />
        <el-step title="规格信息" icon="el-icon-set-up" />
        <el-step title="图文信息" icon="el-icon-picture-outline-round" />
      </el-steps>
      <div v-show="step===1">
        <!-- 分类信息 -->
        <div class="edit-card">
          <div class="header">
            <span>分类信息</span>
          </div>
          <div class="edit-card-cnt">
            <div class="content">
              <p class="type-list">商品分类：<span>抗感染&nbsp;>&nbsp;抗生素</span></p>
              <p class="type-list">商品分组：<span>抗感染&nbsp;>&nbsp;抗生素</span>
                <span class="link">选择分组</span> <span class="link">新建分组</span> <span class="link">刷新</span>
              </p>
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
              <el-form :model="basicForm" label-width="130px">
                <el-form-item label="商品信息：">
                  <el-input v-model="basicForm.name" placeholder="请输入商品名称" size="small" />
                </el-form-item>
                <el-form-item label="通用名：">
                  <el-input v-model="basicForm.name" placeholder="请输入通用名" size="small" />
                </el-form-item>
                <el-form-item label="所属品牌：">
                  <el-select v-model="value" filterable placeholder="请选择所属品牌">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="重量：">
                  <el-input v-model="basicForm.zl" placeholder="请输入重量" size="small" style="width:193px">
                    <template slot="append">公斤</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="长宽高：">
                  <el-input v-model="basicForm.zl" placeholder="长" size="small" style="width:70px" /> m *
                  <el-input v-model="basicForm.zl" placeholder="宽" size="small" style="width:70px" /> m *
                  <el-input v-model="basicForm.zl" placeholder="高" size="small" style="width:70px" />
                </el-form-item>
                <el-form-item label="单位：">
                  <el-select v-model="value" filterable placeholder="选择单位">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="关键字：">
                  <el-input v-model="basicForm.zl" placeholder="请输入关键字" size="small" /> &nbsp;用、隔开
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
              <el-form :model="basicForm" label-width="130px">
                <el-form-item label="药品类型：">
                  <el-select v-model="value" placeholder="请选择药品类型">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="剂型：">
                  <el-select v-model="value" placeholder="请选择剂型">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="生产企业：">
                  <el-input v-model="basicForm.name" placeholder="请输入生产企业" size="small" />
                </el-form-item>
                <el-form-item label="产地：">
                  <el-input v-model="basicForm.name" placeholder="请输入产地" size="small" />
                </el-form-item>
                <el-form-item label="批准文号：">
                  <el-input v-model="basicForm.name" placeholder="请输入批准文号" size="small" />
                </el-form-item>
                <el-form-item label="商品详细信息：">
                  <Tinymce ref="editor" v-model="basicForm.content" :height="400" />
                </el-form-item>
                <el-form-item label="功能主治/适应症：">
                  <el-input
                    v-model="basicForm.name"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入功能主治/适应症"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="有效期：">
                  <el-radio v-model="basicForm.type" size="small">无</el-radio>
                  <el-radio v-model="basicForm.type" size="small">
                    <el-input v-model="basicForm.num" style="width:80px" size="small" placeholder="2" />
                    <el-select v-model="basicForm.types" style="width:100px" size="small" placeholder="">
                      <el-option value="年" label="年" />
                      <el-option value="月" label="月" />
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
                  <el-radio-group v-model="value">
                    <el-radio :label="3">常温</el-radio>
                    <el-radio :label="6">冷藏</el-radio>
                    <el-radio :label="9">冷冻</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="其他属性：">
                  <el-checkbox-group v-model="value">
                    <el-checkbox label="0">易碎</el-checkbox>
                    <el-checkbox label="1">液体</el-checkbox>
                    <el-checkbox label="2">含麻黄碱</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="next-btn text-center">
          <el-button type="primary" size="small">下一步</el-button>
        </div>
      </div>
      <!-- 规格信息 -->
      <div v-show="step===2">
        <div class="specs-box">
          <p class="text-right" style="font-size:13px">商品来源：海典商品标准库</p>
          <el-form>
            <el-form-item label="规格设置：">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="0">药品规格</el-checkbox>
                <el-checkbox label="1">颜色</el-checkbox>
                <el-checkbox label="2">尺寸</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="规格信息：">
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
              <Img-upload :actions="upLoadUrl" :headers="headers" :limit="6" :file-data="{merCode:merCode}" @preview="handlePreview" @onsort="handleSortEnd" @onSuccess="handleImgSuccess" />
              <el-dialog append-to-body :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <p class="img-tips" style="margin-top:10px;color:#E6A23C">提示：上传图片后可在线编辑图片，支持鼠标拖拽排序</p>
              <div class="text-center">
                <el-button type="primary" size="small">保存</el-button>
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
                <figure>
                  <img src="" alt="">
                </figure>
                <div class="edit-box">
                  <Tinymce ref="editor" v-model="basicForm.content" :height="400" />
                </div>
              </section>
              <div class="text-center">
                <el-button type="primary" size="small">保存</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import ImgUpload from '@/components/ImgUpload'
export default {
  components: { Tinymce, ImgUpload },
  data() {
    return {
      step: 3,
      checkList: ['1', '2'],
      basicForm: {

      },
      specsForm: {
        specsInfo: []
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    upLoadUrl() {
      return `${this.uploadFileURL}/1.0/file/_upload`
    },
    merCode() {
      return 'sdfdf'
    },
    headers() {
      return { 'Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwM2Y3YzdkM2Y1NGI0MDMyOTU1NjI5ZTdjZDRlMWUyNiIsIm5hbWUiOiJzZGZkZi0xODgwNjkiLCJleHAiOjE1NzA3MTY4NDR9.WjCTA3SnnLjGSeI_kvFoUzruVcPy4FGXd1ust25CEzaer_6Rn-Eqs9K0epgWx0eaQyO5Rd1_RcBW5vA9W6zLLnebpzcC0xbh4Aql29zQUmiHjUiHLXnq7MxYzI6QZyGyG88YjG9UDiUzy2rTM48fjcbL9AtMebWeSj2RrtDEDsgKlTLf7C4epoE2YWolCOVybR6RwXbBgKxEXFU1vDg-PgfaL3yLML7GyqctkIjVoo6tnaV9tVeVTCQ2FHH5ySx3KGf7cFUP1JW6SqLsV4I-Do-Ll38us85Wct7dBvo9x2yjjYZe9xmGGYtOfBYF2BJnXV8X44yoFxE2mEFfVoRtvg' }
    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    this.$store
      .dispatch('tagsView/delView', from)
    next()
  },
  created() {

  },
  methods: {
    handleSelectionChange() {},
    handleSortEnd(val) {
      console.log('排序之后的结果', val)
    },
    handleImgSuccess(res, fileList, index) {
      if (res.code === '10000') {
        console.log(res, fileList, index)
      }
    },
    handlePreview(file) {
      this.dialogImageUrl = file.imgUrl
      this.dialogVisible = true
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
    .edit-box{
      margin-right: 10px;
    }
  }
}
</style>
