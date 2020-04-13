<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础设置" name="first">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
          <div class="form-title">基本信息</div>
          <el-form-item label="活动名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="不超过30字"
              style="width: 380px;"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="活动时间" prop="activitTime">
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
          <el-form-item label="活动范围" prop="isAllStore">
            <el-radio-group v-model="form.isAllStore" @change="handleStoreChange">
              <el-radio :label="1">全部门店</el-radio>
              <el-radio :label="0">部分门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="已选门店">
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

          <el-form-item label="活动商品" prop="isAllProduct">
            <el-radio-group v-model="form.isAllProduct" @change="handleProductChange">
              <!-- @change="handleStoreChange" -->
              <el-radio :label="1">全部商品</el-radio>
              <el-radio :label="0">部分商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="已选商品">
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
          <el-form-item label="下单规则" prop="type">
            <el-checkbox-group v-model="form.type">
              <el-tooltip class="item" effect="dark" content="参加满减是否使用优惠" placement="top-end">
                <el-checkbox label="1" name="type">
                  优惠券
                  <i class="el-icon-question" />
                </el-checkbox>
              </el-tooltip>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="活动规则" prop="rule_type">
            <el-radio-group v-model="form.rule_type">
              <el-radio :label="1">阶梯满减</el-radio>
              <el-radio :label="0">
                循环满减
                <i class="el-icon-question" />
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 优惠设置 -->
          <!-- <el-form-item label="优惠设置"></el-form-item> -->
          <div>优惠设置</div>
          <el-form-item label="满减门槛">
            <el-input
              v-model="form.pmt_rule_full[0].threshold"
              style="width: 200px"
              class="input-with-select"
            >
              <el-select slot="append" v-model="form.pmt_rule_full[0].uint" placeholder="请选择">
                <el-option label="元" value="0" />
                <el-option label="件" value="1" />
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="优惠内容">
            <el-checkbox-group v-model="form.pmt_rule_full[0].rule_content" size="small">
              <el-checkbox label="1" border>
                订单金额优惠
              </el-checkbox>
              <br>
              <el-checkbox label="2" border>送赠品</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="onSave">保存</el-button>
            <el-button type="primary" @click="onSubmit">保存并提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="推广设置" name="second">推广设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import _ from 'lodash'
import storeGoods from '../components/store-gods'
import storeDialog from '../components/store'
export default {
  components: {
    storeGoods,
    storeDialog
  },
  data() {
    const checkEffectiveTime = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error('请输入成团有效时间'))
      }
      if (value < 2) {
        return callback(new Error('成团有效时间不得低于2小时'))
      }
      if (value > 48) {
        return callback(new Error('成团有效时间不得高于48小时'))
      }
      callback()
    }
    const checkActivitTime = (rule, value, callback) => {
      console.log('我是时间检测-----------------------')
      if (!value && !value.length) {
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
            uint: '0',
            threshold: 100,
            rule_content: ['1']
          }
        ]
      },
      chooseStore: [],
      allStore: [],
      storeGoods: [],
      allStoreGoods: [],
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activitTime: [
          {
            required: true,
            validator: checkActivitTime,
            trigger: 'change'
          }
        ],
        effectiveTime: [
          { required: true, validator: checkEffectiveTime, trigger: 'blur' }
        ]
      }
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
    // 格式话表单提交数据
    formateFormData() {
      console.log('我是格式话表单提交数据----------------', this.form)
      return { ...this.form }
    },
    async onSave() {
      console.log('我是保存----------------')
      const data = this.formateFormData()
      // _.pick(data, [''])
      console.log('我是保存----------------最终的数据', data)
    },
    onSubmit() {
      console.log('我是提交----------------')
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
  .form-title {
    line-height: 14px;
    font-size: 14px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .el-select .el-input {
    width: 80px;
  }
  .input-with-select .el-input-group__append {
    background-color: #fff;
  }
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
}
</style>
