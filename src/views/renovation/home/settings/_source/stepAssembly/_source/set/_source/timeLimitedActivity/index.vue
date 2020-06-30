<template>
  <div class="set-tla-model">
    <div class="set-view-ass" style="width: 340px">
      <component :is="mod" :item="itemParams" />
    </div>
    <div class="snm-view">
      <m-item-card title="限时活动设置" @on-ass-submit="onAssSubmit">
        <el-divider content-position="left">活动选择</el-divider>
        <el-button size="mini" style="margin-bottom: 20px;" @click="dialogVisible = true">选择活动</el-button>
        <div v-if="error.isActivity" class="sa-assembly-error" style="margin-bottom: 10px;">
          {{ error.isActivity }}
        </div>
        <el-form label-width="90px" size="mini">
          <el-form-item label="活动名称">
            {{ selectActivity.pmtName }}
          </el-form-item>
          <el-form-item label="活动类型">
            <span v-if="selectActivity.pmtType === 11">限时特惠</span>
            <span v-if="selectActivity.pmtType === 12">限时秒杀</span>
          </el-form-item>
          <el-form-item label="活动状态">
            <el-tag v-if="selectActivity.validStatus === 0">未开始</el-tag>
            <el-tag v-if="selectActivity.validStatus === 1" type="success">正在进行</el-tag>
            <el-tag v-if="selectActivity.validStatus === 2" type="danger">已结束</el-tag>
          </el-form-item>
          <el-form-item label="活动时间">
            <template v-if="selectActivity.startTime">
              {{ selectActivity.startTime }} - {{ selectActivity.endTime }}
            </template>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">商品选择</el-divider>
        <el-radio-group v-model="itemParams.chooseFlag" :disabled="isSelectGoods">
          <el-radio :label="0">自动展示</el-radio>
          <el-radio :label="1">手动选择</el-radio>
        </el-radio-group>
        <div v-if="itemParams.chooseFlag === 1" style="margin-top: 20px;">
          <m-form-item :item="itemParams" @on-update="onUpdateItemList" />
        </div>
      </m-item-card>
    </div>
    <el-dialog title="选择活动" append-to-body	:visible.sync="dialogVisible" width="800">
      <m-select-activity v-if="dialogVisible" ref="selectActivity" :item="itemParams" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCouponSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import renovationService from '@/api/renovation'
import mSelectActivity from './_source/selectActivity'
// import { itemParams } from './../../../../default'
import mFirst from './../../../preview/_source/timeLimitedActivity/first'
import mSecond from './../../../preview/_source/timeLimitedActivity/second'
import mThird from './../../../preview/_source/timeLimitedActivity/third'
import mItemCard from './../itemCard'
import mFormItem from './_source/formItem'

export default {
  name: 'SetTla',
  data() {
    return {
      dialogVisible: false,
      itemParams: {},
      selectActivity: {},
      error: {
        isActivity: false
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onAssSubmit() {
      // let flag = true
      if (_.isEmpty(this.selectActivity)) {
        // flag = false
        this.error.isActivity = '请选择活动'
      }

      // if (flag) {
      //
      // }
    },
    onUpdateItemList(v) {
      console.log(v)
    },
    getActivityGoods(p) {
      const params = {
        currentPage: 1,
        pageSize: 20,
        ...p
      }
      renovationService.getHomepageActItemList(params).then(res => {
        console.log(res)
      })
    },
    onCouponSubmit() {
      const selectActivity = this.$refs.selectActivity.$verification()
      if (typeof selectActivity === 'object') {
        this.selectActivity = selectActivity

        const { activityId, startTime, endTime } = selectActivity

        this.$set(this.itemParams, 'activityId', activityId)
        this.$set(this.itemParams, 'startTime', startTime)
        this.$set(this.itemParams, 'endTime', endTime)
        this.dialogVisible = false

        if (this.itemParams.chooseFlag === 0) {
          this.getActivityGoods({
            activityId,
            chooseFlag: this.itemParams.chooseFlag,
            origin: 1,
            itemCount: 1,
            storeId: '31e24df01e984451ab445c587e9487df'
          })
        }
      }
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.itemParams = _.cloneDeep(this.item)
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    isSelectGoods() {
      return _.isEmpty(this.selectActivity)
    },
    mod() {
      switch (this.item.subType) {
        case 'first':
          return mFirst
        case 'second':
          return mSecond
        case 'third':
          return mThird
      }
    }
  },
  components: { mItemCard, mFormItem, mSelectActivity }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .set-tla-model {
    .set-view-ass {
      .commodity-second-item-model,.sap-tla-first-model {
        border: 1px solid #F0F0F0;
        box-sizing: border-box
      }
    }
  }
</style>
