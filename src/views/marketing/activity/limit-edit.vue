<template>
  <div class="dashboard-container">
    <div class="app-container">
      <section class="form-box">
        <el-form :model="xForm" size="small" label-width="80px">
          <el-form-item label="活动类型">
            <el-radio-group v-model="xForm.type">
              <el-radio label="限时优惠" value="1" />
              <el-radio label="限时秒杀" value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动名称" required>
            <el-input placeholder="不超过20字" style="width: 320px;" />
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input type="textarea" placeholder="不超过50字" style="width: 320px;" />
          </el-form-item>
          <el-form-item label="生效时间" required>
            <el-time-picker v-model="xForm.startTime" placeholder="开始时间" /> -
            <el-time-picker v-model="xForm.startTime" placeholder="结束时间" />
          </el-form-item>
          <el-form-item label="优惠模式">
            <el-radio-group v-model="xForm.mode">
              <el-radio label="折扣" value="1" />
              <el-radio label="减价" value="2" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动范围">
            <el-radio-group v-model="xForm.range">
              <el-radio label="全部门店" value="1" />
              <el-radio label="部分门店" value="2" />
              <el-button type="text" @click="toSelectStore">选取门店</el-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否免运">
            <el-radio-group v-model="xForm.range">
              <el-radio label="否" value="0" />
              <el-radio label="是" value="1" />
            </el-radio-group>
            <template>
              <el-checkbox v-model="xForm.isBY" label="快递包邮" value="1" />
              <el-checkbox v-model="xForm.isPS" label="免配送费" value="1" />
            </template>
          </el-form-item>
        </el-form>
        <div class="table-box">
          <div class="muti-set">
            <el-form label-width="80px">
              <el-form-item label="批量设置">
                <el-select v-model="mutiSetType" placeholder="批量设置" @change="mutiSetChange">
                  <template>
                    <el-option label="批量设置折扣" value="1" />
                    <el-option label="批量设置减价" value="2" />
                    <el-option label="批量设置限购" value="3" />
                    <el-option label="批量设置库存" value="4" />
                  </template>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="tabData" size="small" style="margin: 20px 0">
            <el-table-column label="序号" type="index" />
            <el-table-column label="商品名称" prop="name" min-width="150px" />
            <el-table-column label="规格" prop="name" min-width="100px" />
            <el-table-column label="生产厂家" prop="name" min-width="120px" />
            <el-table-column label="折扣" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.value" style="width: 40px" />
                <span>折</span>
                <span>元</span>
              </template>
            </el-table-column>
            <el-table-column label="限购" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.num" style="width: 40px" />
              </template>
            </el-table-column>
            <el-table-column label="库存" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.store" style="width: 40px" />
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="name" min-width="120px">
              <template slot-scope="scope">
                <el-button type="text" @click.stop="handleDel(scope.row, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" size="small" @click="toSelectGoods">选择商品</el-button>
        </div>
      </section>
    </div>
    <dialog-set ref="dialogSet" :type="mutiSetType" />
    <dialog-goods ref="dialogGoods" />
    <dialog-store ref="dialogStore" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dialogSet from './_source/dialog-set'
import dialogGoods from '@/components/Dialog/DialogGoods'
import dialogStore from '@/components/Dialog/DialogStore'
// import {
//   getActivityList
// } from '@/api/marketing'
import config from '@/utils/config'

export default {
  name: 'Banner',
  components: {
    dialogSet,
    dialogGoods,
    dialogStore
  },
  data() {
    const checkWebsite = (rule, value, callback) => {
      console.log('value', value)
      if (value === '') {
        callback(new Error('请输入链接地址'))
      }
      if (!/(http|https):\/\/([\w.]+\/?)\S*/.test(value)) {
        callback(new Error('链接格式不正确，例：http://111.com'))
      }
      callback()
    }
    const checkNum = (rule, value, callback) => {
      if (value !== '' && !/^[1-9]([0-9])*$/.test(value)) {
        callback(new Error('请输入正整数'))
      }
      callback()
    }
    return {
      searchForm: {

      },
      tabData: [{
        value: 10,
        num: 6,
        store: 200
      }],
      xForm: {
        id: '',
        imgUrl: '',
        linkUrl: '',
        dateRange: '',
        startTime: '',
        endTime: '',
        isBY: 0,
        isPS: 0,
        isMY: 0
      },
      xRules: {
        imgUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        linkUrl: [
          { required: true, validator: checkWebsite, trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择时间段', trigger: 'change' }
        ],
        sort: [
          { validator: checkNum, trigger: 'blur' }
        ]
      },
      editDetail: null, // 编辑详情
      mutiSetType: '' // 设置类型 1.折扣 2.减价 3限购 4.库存
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return { 'Authorization': this.$store.getters.token }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    mutiSetChange(val) {
      this.$refs.dialogSet.open()
    },
    toSelectGoods() {
      this.$refs.dialogGoods.open()
    },
    toSelectStore() {
      this.$refs.dialogStore.open()
    }
  }
}
</script>
<style lang="scss">
.scope-img-wrap {
  width: 60px;
  height: 40px;
  background: #f5f5f5;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.x-dialog-body {
  width: 100%;
  display: flex;
  .form-box {
    flex: 1;
  }
  .preview-box {
    flex: 0 0 250px;
    .title {
      font-size: 18px;
    }
    .prview-pic {
      margin-top: 20px;
      width: 100%;
      height: 450px;
    }
  }
  .test-1 {
    color: red;
  }
}

.note-grey {
  font-size: 14px;
  line-height: 1.1;
  color: #999999;
}
</style>
