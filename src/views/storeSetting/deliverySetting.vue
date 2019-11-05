<template>
  <div class="container">
    <el-dialog
      append-to-body
      title="配送费用设置"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <el-form label-width="110px" label-position="right">
        <div style="font-size: 16px;font-weight: 400;margin-bottom: 10px">起送价</div>
        <el-form-item label="起送价：">
          <el-input style="width: 100px" size="mini" />
          元
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <el-checkbox>浮动费用：</el-checkbox>
          </template>
          超出
          <el-input style="width: 100px" size="mini" />
          公里（步行距离），每公里加收
          <el-input style="width: 100px" size="mini" />
          元
        </el-form-item>
        <div style="font-size: 16px;font-weight: 400;margin-bottom: 10px">免运设置</div>
        <el-form-item label="免费配送：">
          <el-radio v-model="radio" label="1" size="mini">否</el-radio>
          <el-radio v-model="radio" label="2" size="mini">是</el-radio>
          <span style="font-size: 12px;font-weight: 400;color: #99a9bf">
            合理设置门店运费满免规则，有助于门店销售
          </span>
        </el-form-item>
        <el-form-item label="配送费：">
          <el-input style="width: 100px" size="mini" />
          元
        </el-form-item>
        <el-form-item label="免运门槛：">
          <el-input style="width: 100px" size="mini" />
          元
        </el-form-item>
        <div style="font-size: 16px;font-weight: 400;margin-bottom: 10px">配送时间设置</div>
        <el-form-item label="配送时间：">
          <el-input style="width: 200px" size="mini" maxlength="10" show-word-limit />
        </el-form-item>
        <el-alert
          title="配送时间设置用于在微商城下单时，展示订单预计送达时间"
          type="warning"
          :closable="false"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="list"
      height="550"
      border
      style="margin-top: 20px"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="所在省份" property="name" />
      <el-table-column label="包含门店数" property="name" />
      <el-table-column label="支持配送门店数" property="name" />
      <el-table-column label="起送价" property="name" />
      <el-table-column label="是否免运" property="name" />
      <el-table-column label="详细规则" property="name" />
      <el-table-column label="配送费" property="name" />
      <el-table-column label="配送说明" property="name" />
      <el-table-column label="操作">
        <template>
          <el-button type="text">设置配送规则</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <span style="font-size: 14px">已选 {{ multipleSelection.length }}个省份</span>
      <el-button type="primary" size="mini" @click="visable = true">批量设置配送费用规则</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliverySetting',
  data() {
    return {
      visable: false,
      multipleSelection: [],
      list: [
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' },
        { code: '12', name: 'aaa' }
      ]
    }
  }
}
</script>

<style scoped>
  .container{
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 10px;
  }
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
</style>
