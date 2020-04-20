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
          <el-button type="primary" plain size="small" @click="$refs.GoodsComponent.open()">选择商品</el-button>
          <!-- <store-goods-view :limit-max="1" @on-change="handleSelectGoods">选择商品</store-goods-view> -->
          <div class="info">一个赠品对应一个商品</div>
        </template>
      </el-form-item>
      <el-form-item>
        <!-- <gift-list :cols="cols" :data="storeSelectGoods" /> -->
        <select-goods ref="storeGods" @del-item="delSelectGoods" />
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
            <el-input-number v-model="form.limitStock" :disabled="form.limit!==1" />
            <span style="margin-left: 5px" class="info">件</span>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 120px" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :limit-max="1"
      :list="storeSelectGoods"
      @on-change="handleSelectGoods"
    />
  </div>
</template>

<script>
import storeGoods from '../../components/store-gods'
// import giftList from './list'
import selectGoods from '../../components/select-goods'
import { createActGift } from '@/api/activity'
import { mapGetters } from 'vuex'
export default {
  components: { storeGoods, selectGoods },
  computed: {
    ...mapGetters(['merCode'])
  },
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
        limit: 0, // 是否限购 0 不限 1 限购
        limitStock: '', // 限购数量
        stock: '' // 总库存
      },
      storeSelectGoods: [], // 选择的商品信息
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
      },
      loading: false
    }
  },
  methods: {
    handleSelectGoods(val) {
      console.log('handleSelectGoods----我是传递过来的', val)
      this.storeSelectGoods = val
      this.$refs.storeGods.dataFrom(val)
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('submit ok', valid, this.form, this.storeSelectGoods)
          if (
            Array.isArray(this.storeSelectGoods) &&
            this.storeSelectGoods.length
          ) {
            // 重整数据
            let data = {}
            data = {
              limitCount: this.form.limit === 0 ? 0 : this.form.limitStock,
              name: this.form.name,
              stock: this.form.stock,
              specId: this.storeSelectGoods[0].specId,
              merCode: this.merCode
            }
            this.loading = true
            createActGift(data)
              .then(res => {
                console.log(res)
                this.loading = false
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
                this.loading = false
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
    },
    delSelectGoods(item, index) {
      console.log('item, index', item, index)
      this.storeSelectGoods.splice(index, 1)
      this.$refs.storeGods.dataFrom(this.storeSelectGoods)
      // this.storeSelectGoods = this.storeSelectGoods
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
