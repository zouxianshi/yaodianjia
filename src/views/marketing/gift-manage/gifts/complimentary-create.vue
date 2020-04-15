<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <el-form-item label="赠品名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="不超过15字"
          style="width: 380px;"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="选择商品：" required>
        <template>
          <store-goods-view :limit-max="1" @on-change="handleSelectGoods">选择商品</store-goods-view>
          <div class="info">一个赠品对应一个商品</div>
          <gift-list :cols="cols" :data="storeGoods" />
        </template>
      </el-form-item>
      <el-form-item label="赠品库存：" prop="stock">
        <template>
          <el-input-number v-model="form.stock" :min="0" :max="9999999999" />
          <span class="info">赠品赠完不再续增</span>
        </template>
      </el-form-item>
      <el-form-item label="每人限领：">
        <el-col :span="24">
          <el-form-item>
            <el-radio v-model="form.limit" :label="0">不限次数</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="limit">
          <el-form-item style="margin-right: 10px">
            <el-radio v-model="form.limit" :label="1">每人限领</el-radio>
          </el-form-item>
          <el-form-item prop="limitStock">
            <el-input-number v-model="form.limitStock" />
            <span style="margin-left: 5px" class="info">件</span>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 120px" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storeGoodsView from '../../components/store-gods'
import giftList from './list'
import { createGift } from '@/api/activity'
export default {
  components: { storeGoodsView, giftList },
  data() {
    const checkLimitStock = (rule, value, callback) => {
      if (this.form.limit === 1) {
        if (!value) {
          return callback(new Error('请输入限领件数'))
        }
        if (!/^[1-9]\d*$/.test(value)) {
          return callback(new Error('必须为大于0的正整数'))
        }
      }
      callback()
    }
    const checkStock = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入赠品库存'))
      }
      if (!/^[1-9]\d*$/.test(value)) {
        return callback(new Error('必须为大于0的正整数'))
      }
      callback()
    }
    return {
      form: {
        limit: 0,
        limitStock: '',
        stock: ''
      },
      storeGoods: [], // 选择的商品信息
      cols: [
        {
          prop: 'mainPic',
          label: '商品图片',
          type: 'img',
          render: true // 交给后续逻辑渲染
        },
        {
          prop: 'name',
          label: '商品名称'
          // width: '150'
        },
        {
          prop: 'erpCode',
          label: '商品编码'
        },
        {
          prop: 'specId',
          label: 'sku编码'
        },
        {
          prop: 'mprice',
          label: '参考价'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入赠品名称', trigger: 'blur' }],
        stock: [{ required: true, validator: checkStock, trigger: 'change' }],
        limitStock: [{ validator: checkLimitStock, trigger: 'change' }]
      }
    }
  },
  methods: {
    handleSelectGoods(val) {
      console.log('handleSelectGoods----我是传递过来的', val)
      this.storeGoods = val
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('submit ok', valid)
          if (Array.isArray(this.storeGoods) && this.storeGoods.length) {
            createGift()
              .then(res => {
                console.log(res)
                if (res.code === '10000') {
                  this.$message({
                    message: '创建成功',
                    type: 'success'
                  })
                  this.$router.replace({
                    path: `/marketing/gifts/complimentary`
                  })
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.$message({
              message: '请选择商品信息',
              type: 'warning'
            })
            return false
          }
        } else {
          console.log('submit error', valid)
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-container {
  .limit {
    display: flex;
    flex-direction: row;
  }
  .info {
    color: #bdbdbd;
  }
}
</style>
