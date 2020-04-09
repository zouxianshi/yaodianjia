<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础设置" name="first">
        <el-form ref="form" :model="form" label-width="80px">
          <div class="title-divider">基本信息</div>
          <el-form-item label="活动名称">
            <el-input
              v-model="form.name"
              placeholder="不超过30字"
              style="width: 380px;"
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="活动时间" prop="startTime">
            <el-date-picker
              v-model="form.dateRange"
              style="width: 380px"
              size="small"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              :default-time="['00:00:00','23:59:59']"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="handleTimeChange($event, 3)"
            />
          </el-form-item>
          <div class="title-divider">活动规则</div>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker
                v-model="form.date1"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery" />
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type" />
              <el-checkbox label="地推活动" name="type" />
              <el-checkbox label="线下主题活动" name="type" />
              <el-checkbox label="单纯品牌曝光" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助" />
              <el-radio label="线下场地免费" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="推广设置" name="second">推广设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      form: {}
    }
  },
  methods: {
    handleClick() {},
    onSubmit() {}
  }
}
</script>

<style lang="scss">
.app-container {
  .title-divider {
    border-bottom: 1px solid #dcdfe6;
    line-height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
  }
}
</style>
