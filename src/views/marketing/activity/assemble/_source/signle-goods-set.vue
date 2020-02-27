<template>
  <el-dialog
    :visible.sync="isShow"
    width="700px"
    :close-on-click-modal="false"
    append-to-body
    :show-close="false"
    custom-class="custom-dialog-class"
  >
    <div slot="title" class="custom-title">
      <span>活动商品设置</span>
    </div>
    <div class="dialog-body">
      <section class="goods-basib-info">
        <div class="image">
          <el-image :src="showImg(info.mainPic)" style="width:100px">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="txt-info">
          <p>商品名称：{{ info.name }}</p>
          <p>商品编号：{{ info.erpCode }}</p>
          <p>指导价格：<span class="zd-price" v-text="'￥'+info.mprice" /><span class="zdjg">&nbsp;当前所选店铺中最低价价格为：<span>￥</span></span></p>
        </div>
      </section>
      <div class="form">
        <el-form :model="settingForm" size="small" label-width="100px">
          <el-form-item label="成团人数">
            <div class="custom-input">
              <el-input v-model="settingForm.activityNumber" style="width:80px" class="custom-inner-input" placeholder="" @input.native="handleInput" />
              <div class="operate">
                <span class="el-icon-arrow-up" @click="handleAddTime(1)" />
                <span class="el-icon-arrow-down" @click="handleAddTime(2)" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="是否限购">
            <el-radio-group v-model="settingForm.xg">
              <el-radio label="">否</el-radio>
              <el-radio label="">是</el-radio>
            </el-radio-group>
            <section style="margin-top:20px">
              <el-form-item label="每人限开/参团" label-width="110px">
                <div class="custom-input">
                  <el-input v-model="settingForm.addLimitTimes" style="width:80px" class="custom-inner-input" placeholder="" @input.native="handleInput" />
                  <div class="operate">
                    <span class="el-icon-arrow-up" @click="handleAddTime(1)" />
                    <span class="el-icon-arrow-down" @click="handleAddTime(2)" />
                  </div>
                  &nbsp;次
                </div>
              </el-form-item>
              <el-form-item label="单次限购" label-width="110px">
                <div class="custom-input">
                  <el-input v-model="settingForm.limitCount" style="width:80px" class="custom-inner-input" placeholder="" @input.native="handleInput" />
                  <div class="operate">
                    <span class="el-icon-arrow-up" @click="handleAddTime(1)" />
                    <span class="el-icon-arrow-down" @click="handleAddTime(2)" />
                  </div>
                  &nbsp;份
                </div>
              </el-form-item>
            </section>
          </el-form-item>
          <el-form-item label="是否包邮">
            <el-radio-group v-model="settingForm.isFreeshipping">
              <el-radio :label="false">否</el-radio>
              <el-radio :label="true">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="拼团库存">
            <div class="custom-input">
              <el-input v-model="settingForm.productActivityCount" style="width:80px" class="custom-inner-input" placeholder="" @input.native="handleInput" />
              <div class="operate">
                <span class="el-icon-arrow-up" @click="handleAddTime(1)" />
                <span class="el-icon-arrow-down" @click="handleAddTime(2)" />
              </div>
              <span>&nbsp;&nbsp;拼团活动库存至少要满足一个团的库存需求</span>
            </div>

          </el-form-item>
          <el-form-item label="拼团价格">
            <el-input style="width:80px" /> <span>&nbsp;&nbsp;拼团价格需低于当前价格</span>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="isShow=false">取 消</el-button>
      <el-button type="primary" size="small" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'EditGoodsModals',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      isShow: false,
      settingForm: {

      }
    }
  },
  created() {

  },
  methods: {
    open() {
      this.isShow = true
    },
    handleSubmit() {
      this.$emit('complete', this.info)
    },
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
    }
  }
}
</script>
<style lang="scss">
.custom-dialog-class{
    .el-dialog__header{
        padding: 0;
        background: #e5e5e5;
        line-height: 45px;
        padding-left: 20px;
    }
    .el-dialog__body{
        padding: 10px 10px;
    }
    .goods-basib-info{
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #e5e5e5;
        .txt-info{
            margin-left: 10px;
            p{
                line-height: 35px;
            }
            .zd-price{
                font-size: 20px;
                color: red;
            }
            .zdjg{
                 font-size: 12px;
                 color: #c9c9c9;
                span{
                    color: red;
                }
            }
        }
    }
    .form{
        margin-top: 20px;
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
}
</style>
