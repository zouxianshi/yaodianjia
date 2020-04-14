<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础设置" name="first">
        <el-form ref="form" :model="form" size="small" label-width="120px">
          <div class="form-title">基本信息</div>
          <el-form-item label="活动名称：" prop="name">
            <el-input
              v-model="form.name"
              placeholder="不超过30字"
              style="width: 380px;"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="活动时间：" prop="activitTime">
            <el-date-picker
              v-model="form.activitTime"
              style="width: 380px"
              size="small"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              :default-time="['00:00:00', '23:59:59']"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="handleTimeChange"
            />
          </el-form-item>
          <div class="form-title">活动规则</div>
          <el-form-item label="活动范围：" prop="isAllStore">
            <el-radio-group v-model="form.isAllStore" @change="handleStoreChange">
              <el-radio :label="1">全部门店</el-radio>
              <el-radio :label="0">部分门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="已选门店：">
            <template v-if="form.isAllStore===0">
              <span>
                已选门店
                <el-link type="primary" :underline="false">{{ chooseStore.length }}</el-link>个店铺
              </span>
              <div class="choose-store-box">
                <el-tag
                  v-for="(item,index) in chooseStore"
                  :key="index"
                  type="para"
                  size="small"
                >{{ item.stName }}</el-tag>
              </div>
              <p style="margin-top:5px">
                <store-dialog @complete="handleSelectStore">选择门店</store-dialog>
              </p>
            </template>
            <template v-else>
              <span>
                已选全部门店
                <el-link type="primary" :underline="false">{{ allStore.length }}</el-link>个店铺
              </span>
            </template>
          </el-form-item>

          <el-form-item label="活动商品：" prop="isAllProduct">
            <el-radio-group v-model="form.isAllProduct" @change="handleProductChange">
              <!-- @change="handleStoreChange" -->
              <el-radio :label="1">全部商品</el-radio>
              <el-radio :label="0">部分商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="已选商品：">
            <template v-if="form.isAllProduct===0">
              <span>
                已选商品
                <el-link type="primary" :underline="false">{{ storeGoods.length }}</el-link>个商品
              </span>
              <div class="choose-store-box">
                <el-tag
                  v-for="item in storeGoods"
                  :key="item.specId"
                  type="para"
                  size="small"
                >{{ item.name }}</el-tag>
              </div>
              <p style="margin-top:5px">
                <store-goods @on-change="handleSelectGoods">选择商品</store-goods>
              </p>
            </template>
            <template v-else>
              <span>
                已选全部商品
                <el-link type="primary" :underline="false">{{ allStoreGoods.length }}</el-link>个商品
              </span>
            </template>
          </el-form-item>
          <el-form-item label="下单规则：" prop="type">
            <el-checkbox-group v-model="form.type">
              <el-tooltip class="item" effect="dark" content="参加满减是否使用优惠" placement="top-end">
                <el-checkbox label="1" name="type">
                  优惠券
                  <i class="el-icon-question" />
                </el-checkbox>
              </el-tooltip>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活动规则：" prop="rule_type">
            <el-radio-group v-model="form.rule_type" @change="ruleTypeChange">
              <el-radio :label="1">阶梯满减</el-radio>
              <el-radio :label="0">
                循环满减
                <i class="el-icon-question" />
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 优惠设置 -->
          <div class="form-title">优惠设置</div>
          <div v-for="(domain, $Index) in form.pmt_rule_full" :key="$Index">
            <el-divider v-if="form.rule_type === 1" content-position="left">
              {{ $Index+1 }}级优惠
              <el-button
                v-if="$Index !== 0"
                style="margin-left: 20px"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click="handleDelete($Index)"
              />
            </el-divider>
            <el-form-item
              label="满减门槛："
              :prop="'pmt_rule_full.'+ $Index + '.threshold'"
              :rules="{
                required: true, validator:validThreshold, trigger: 'change'
              }"
            >
              <el-input v-model="domain.threshold" style="width: 200px" class="input-with-select">
                <el-select slot="append" v-model="domain.uint" placeholder="请选择">
                  <el-option label="元" value="0" />
                  <el-option label="件" value="1" />
                </el-select>
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="优惠内容" required>
              <el-col :span="24">
                <el-form-item
                  :prop="'pmt_rule_full.'+ $Index + '.rule_content.order_full'"
                  :rules="{}"
                >
                  <el-checkbox v-model="domain.rule_content.order_full" border>订单金额优惠</el-checkbox>
                </el-form-item>
                <el-col :span="24">
                  <el-form-item :prop="'pmt_rule_full.'+ $Index + '.rule_content.discount_type'">
                    <el-radio
                      v-model="domain.rule_content.discount_type"
                      label="0"
                      @input.native="discountType($event, $Index)"
                    >
                      减
                      <el-input
                        v-model="domain.rule_content.amount"
                        style="width: 200px"
                        class="input-with-select"
                      >
                        <template slot="append">元</template>
                      </el-input>
                    </el-radio>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-radio
                    v-model="domain.rule_content.discount_type"
                    label="1"
                    @input.native="discountType($event, $Index)"
                  >
                    打
                    <el-input
                      v-model="domain.rule_content.amount"
                      style="width: 200px"
                      class="input-with-select"
                    >
                      <template slot="append">折</template>
                    </el-input>
                  </el-radio>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-checkbox v-model="domain.rule_content.order_full" border>送赠品</el-checkbox>
              </el-col>
            </el-form-item>-->
            <el-form-item label="优惠内容：">
              <div>
                <el-checkbox v-model="domain.rule_content.order_full" border>订单金额优惠</el-checkbox>
                <section v-if="domain.rule_content.order_full" style="margin-left: 50px">
                  <div class="section-group-item">
                    <el-radio
                      v-model="domain.rule_content.discount_type"
                      label="0"
                      @input.native="discountType($event, $Index)"
                    >减</el-radio>
                    <el-input
                      v-model="domain.rule_content.amount"
                      style="width: 200px"
                      class="input-with-select"
                    >
                      <template slot="append">元</template>
                    </el-input>
                  </div>
                  <div v-if="form.rule_type === 1" class="section-group-item">
                    <el-radio
                      v-model="domain.rule_content.discount_type"
                      label="1"
                      @input.native="discountType($event, $Index)"
                    >打</el-radio>
                    <el-input
                      v-model="domain.rule_content.discountNum"
                      style="width: 200px"
                      class="input-with-select"
                      :min="0"
                      :max="10"
                    >
                      <template slot="append">折</template>
                    </el-input>
                  </div>
                </section>
              </div>
              <div>
                <el-checkbox v-model="domain.rule_content.gift_or_not" border>送赠品</el-checkbox>
                <store-goods-gifts
                  v-if="!!domain.rule_content.gift_or_not"
                  @commit="handleGiftList"
                />
                <div
                  v-if="!!domain.rule_content.gift_or_not && giftList.length"
                  class="section-group-item"
                >
                  已选赠品：
                  <el-tag
                    v-for="item in giftList"
                    :key="item.specId"
                    type="para"
                    size="small"
                  >{{ item.name }}</el-tag>
                </div>
              </div>
            </el-form-item>
          </div>
          <!-- <el-form-item>

          </el-form-item>-->
          <el-divider v-if="form.rule_type === 1" content-position="left">
            <el-tooltip
              effect="dark"
              content="最多支持五级优惠，每级优惠不叠加，如：满足二级优惠条件后则不再享有一级优惠。"
              placement="top-start"
            >
              <el-button plain type="warning" size="mini" @click="handleAdd">
                添加层级
                <i class="el-icon-question" />
              </el-button>
            </el-tooltip>
          </el-divider>
          <el-form-item>
            <el-button type="primary" style="width: 120px" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="推广设置" name="second">
        <el-form ref="form" :model="dymacPromote" size="small" label-width="120px">
          <div class="form-title">活动宣传设置</div>
          <el-form-item label="活动图片：">
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="handleImgError"
            >
              <el-image
                v-if="dymacPromote.imgUrl"
                :src="showImg(dymacPromote.imgUrl)"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <p style="color: rgb(171,171,171)">活动图片首页设置, 建议尺寸：750px*268px支持.jpg.png.jpeg格式，大小不超过1M</p>
          </el-form-item>
          <div class="form-title">朋友圈推广</div>
          <img :src="shareImg">
          <el-form-item label="标题：">
            <el-input
              v-model="dymacPromote.name"
              placeholder="不超过15字"
              style="width: 380px;"
              maxlength="15"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="摘要：">
            <el-input
              v-model="dymacPromote.name"
              style="width: 380px;"
              maxlength="30"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
          <el-form-item label="图片：" />
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import _ from 'lodash'
import storeGoods from '../components/store-gods'
import storeGoodsGifts from '../components/store-gods-gifts'
import storeDialog from '../components/store'
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import shareImg from '@/assets/image/acvity/share-img.png'

export default {
  components: {
    storeGoods,
    storeDialog,
    storeGoodsGifts
  },
  computed: {
    ...mapGetters(['token', 'merCode']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  data() {
    const checkActivitTime = (rule, value, callback) => {
      console.log('我是时间检测-----------------------')
      if (!value) {
        return callback(new Error('请选择活动开始和结束时间'))
      }
      if (value[0] >= value[1]) {
        return callback(new Error('活动结束时间要大于开始时间'))
      }
      callback()
    }

    return {
      activeName: 'first',
      form: {
        type: ['1'],
        isAllStore: 1,
        isAllProduct: 1,
        rule_type: 1,
        pmt_rule_full: [
          {
            uint: '0', // 满减门槛元/件
            threshold: '', // 满减门槛金额
            rule_content: {
              gift_or_not: false,
              order_full: true,
              discount_type: '0', // 折1/减价0
              amount: '',
              discountNum: ''
            }
          }
        ]
      },
      initRuleFull: {
        uint: '0', // 满减门槛元/件
        threshold: '', // 满减门槛金额
        rule_content: {
          gift_or_not: false,
          order_full: true,
          discount_type: '0', // 折1/减价0
          amount: '',
          discountNum: ''
        }
      },
      chooseStore: [],
      allStore: [],
      storeGoods: [],
      allStoreGoods: [],
      giftList: [], // 赠品列表
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activitTime: [
          {
            required: true,
            validator: checkActivitTime,
            trigger: 'change'
          }
        ]
      },
      dymacPromote: {
        imgUrl: ''
      },
      pageLoading: '',
      shareImg
    }
  },
  methods: {
    handleTimeChange(row) {
      console.log('活动时间', row)
      if (row) {
        this.form.startTime = row[0]
        this.form.endTime = row[1]
      }
      // 此时需要需查询店铺和商品信息；
    },
    handleClick() {},
    handleStoreChange() {
      console.log('活动范围门店变更')
    },
    handleProductChange() {
      console.log('活动范围活动商品变更')
    },
    // 校验满减门槛金额设置
    validThreshold(rule, value, callback) {
      const index = rule.field.split('.')[1]
      if (!value) {
        return callback(new Error('满减门槛不能为空'))
      }
      console.log(this.form.pmt_rule_full[index].uint)
      if (!value || value <= 0) {
        return callback(new Error('满减门槛必须大于0'))
      }
      // 元
      if (this.form.pmt_rule_full[index].uint === '0') {
        if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {
          return callback(new Error('必须为大于0.01的正数'))
        }
      }
      // 件
      if (this.form.pmt_rule_full[index].uint === '1') {
        if (!/^[1-9]\d*$/.test(value)) {
          return callback(new Error('必须为大于0的正整数'))
        }
      }

      callback()
    },
    thresholdChange(e, unit) {
      console.log('111111', e)
      const value = e.target.value
      const regx =
        unit === '1' ? /^[1-9]\d*$/ : /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
      if (!regx.test(value)) {
        e.target.value = ''
      }
    },
    ruleDtoChange(e, val) {
      console.log('ruleDtoChange', e, val)
      this.form.ruleDto[0].type = val
      this.form.ruleDto[0].num = 800
    },
    handleSelectStore(val) {
      console.log('门店结果页出来了-------', val)
      this.chooseStore = val
    },
    handleSelectGoods(val) {
      this.storeGoods = val
    },
    handleGiftList(list) {
      console.log('提交的数据-----赠品列表', list)
      this.giftList = list
    },
    // 追加优惠层级
    handleAdd() {
      // 追加优惠层级需要先设置一级优惠通过后再设置第二项
      this.form.pmt_rule_full = this.form.pmt_rule_full.concat({
        ...this.initRuleFull
      })
    },
    // 删除层级
    handleDelete(index) {
      // const data = this.form.pmt_rule_full.slice(index, 1)
      const data = JSON.parse(JSON.stringify(this.form.pmt_rule_full))
      console.log('data', index, this.form.pmt_rule_full)
      data.splice(index, 1)
      console.log('data-------------', data)
      this.form.pmt_rule_full = data
      // this.$set( this.form.pmt_rule_full);
    },
    ruleTypeChange(val) {
      console.log('ruleTypeChange----', val)
      if (val === 0) {
        this.form.pmt_rule_full = [{ ...this.initRuleFull }]
      }
    },
    discountType(e, index) {
      console.log('discountType----', e)
      if (e.target.value === '0') {
        this.form.pmt_rule_full[index].rule_content.discountNum = ''
      } else {
        this.form.pmt_rule_full[index].rule_content.amount = ''
      }
      //  e.target.value = e.target.value
    },
    handleImgError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        // location.reload()
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
        this.pageLoading.close()
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '10000') {
        this.dymacPromote.imgUrl = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      console.log('图片地址-----', this.dymacPromote)
      this.pageLoading.close()
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
    },

    // 格式化表单验证提交数据
    formateFormData() {
      console.log('我是格式话表单提交数据----------------', this.form)
      //
      this.$refs.form.validate(valid => {
        if (valid) {
          if (new Date(this.form.startTime).getTime() < new Date().getTime()) {
            this.$message.warning('活动开始时间不能小于当前时间')
            return
          }
          // const valid_pmt_rule_full = false
          // 优惠规则设置校验
          if (
            this.form.pmt_rule_full &&
            Array.isArray(this.form.pmt_rule_full)
          ) {
            for (let i = 0; i < this.form.pmt_rule_full.length; i++) {
              const item = this.form.pmt_rule_full[i]
              if (
                item.rule_content &&
                (item.rule_content.order_full || item.rule_content.gift_or_not)
              ) {
                // 优惠内容选择了订单金额优惠
                if (item.rule_content.order_full) {
                  // 订单金额-满减减金额
                  if (item.rule_content.discount_type === '0') {
                    if (
                      !/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(
                        item.rule_content.amount
                      ) ||
                      item.rule_content.amount <= 0
                    ) {
                      this.$message.warning(
                        `请检查第${i + 1}项优惠内容设置，必须为大于0.01的正数`
                      )
                      break
                    }
                  }
                  // 订单金额-满减打折
                  if (item.rule_content.discount_type === '1') {
                    if (
                      item.rule_content.discountNum <= 0 ||
                      item.rule_content.discountNum >= 10
                    ) {
                      this.$message.warning(
                        `请检查第${i + 1}项优惠内容设置，折扣值大于0且小于10.0`
                      )
                      break
                    }
                  }
                }
                // 赠品处判断不能为空，
                if (item.rule_content.gift_or_not) {
                  if (
                    !this.giftList ||
                    (Array.isArray(this.giftList) && this.giftList.length)
                  ) {
                    this.$message.warning('赠品内容不能为空')
                    break
                  }
                }
              }
            }
          } else {
            this.$message.warning('活动优惠设置不能为空')
            return
          }
          // if(!valid_pmt_rule_full) return
          return { ...this.form }
        } else {
          console.log('error submit!!', valid)
          return false
        }
      })
    },
    async onSave() {
      console.log('我是保存----------------')
      const data = this.formateFormData()
      // _.pick(data, [''])
      console.log('我是保存----------------最终的数据', data)
    },
    onSubmit() {
      //
      const formdata = this.formateFormData()
      console.log('我是提交----------------', formdata)
    }
  },
  beforeRouteLeave(to, from, next) {
    next(false)
    this.$confirm(
      '检测到未保存的内容，是否在离开页面前保存修改？',
      '确认信息',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '保存',
        cancelButtonText: '放弃修改'
      }
    )
      .then(() => {
        this.$message({
          type: 'info',
          message: '保存修改'
        })
      })
      .catch(action => {
        next()
      })
  }
}
</script>

<style lang="scss">
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-container {
  position: relative;
  .form-title {
    line-height: 14px;
    font-size: 14px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .el-select .el-input {
    width: 60px;
  }
  // .input-with-select .el-input-group__append {
  //   background-color: #fff;
  // }
  .choose-store-box {
    width: 500px;
    height: 100px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 5px;
    overflow-y: auto;
    .el-tag {
      margin-right: 10px;
      max-width: 150px;
      @extend .text-overflow-1;
    }
  }
  .section-group-item {
    margin: 10px 0;
  }
  .action-wapper {
    position: absolute;
    padding: 12px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: right;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
  }
  .avatar-uploader {
    .avatar {
      width: 300px !important;
      height: 100px !important;
    }
  }
}
</style>
