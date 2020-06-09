<template>
  <div class="spec-form-item-model">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="spec-content">
      <el-form :model="item" size="small" label-width="80px" :status-icon="true">
        <template v-for="(el,i) in specSelect">
          <el-form-item v-if="el.selected" :key="i">
            <span slot="label">
              <span class="tip">*</span>
              {{ el.attributeName }}
            </span>
            <el-input v-model.trim="item[`index_${el.id}_${el.attributeName}`]" maxlength="50" :placeholder="'输入'+el.attributeName" />
            <div v-if="error[`index_${el.id}_${el.attributeName}`]" class="sfim-error">
              {{ error[`index_${el.id}_${el.attributeName}`] }}
            </div>
          </el-form-item>
        </template>
        <el-form-item>
          <span slot="label">
            <span class="tip">*</span> 商品编码
          </span>
          <el-input v-model.trim="item.erpCode" placeholder="输入商品编码" maxlength="16" />
          <div v-if="error.errorErpCode" class="sfim-error">
            {{ error.errorErpCode }}
          </div>
        </el-form-item>
        <el-form-item label>
          <span slot="label">条形码</span>
          <el-input v-model.trim="item.barCode" maxlength="30" placeholder="若有条形码请务必填写" />
        </el-form-item>
        <el-form-item label>
          <span slot="label">货主</span>
          <el-select v-model="item.owner" size="small" clearable>
            <el-option label="自营" :value="0" />
            <el-option label="平安" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <span class="tip">*</span> 参考价格
          </span>
          <el-input v-model.trim="item.mprice" placeholder="输入参考价格" />
          <div v-if="error.errorMprice" class="sfim-error">
            {{ error.errorMprice }}
          </div>
        </el-form-item>
        <el-form-item label="限购数量">
          <div style="padding-top:10px;">
            <m-item-limit-num ref="itemLimitNum" :item="item" />
          </div>
          <div v-if="error.errorLimitNum" class="sfim-error">
            {{ error.errorLimitNum }}
          </div>
        </el-form-item>
        <el-form-item label="商品图片">
          <!--规格图片上传-->
          <m-column-upload :item="item" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import mItemLimitNum from './itemLimitNum'
import mColumnUpload from './columnUpload'
/* eslint-disable */
export default {
  name: 'SpecFormItem',
  data() {
    return {
      error: {}
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    idx: {
      type: Number,
      default: null
    },
    specSelect: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    resetParams() {
      _.map(this.specSelect, v => {
        this.error[`index_${v.id}_${v.attributeName}`] = false
      })
      this.error.errorErpCode = false
      this.error.errorLimitNum = false
      this.error.errorMprice = false
    },
    $verification() {
      const { item: { erpCode, mprice }, $parent, item, $refs, idx } = this

      let flag = true

      this.resetParams()

      _.map(this.specSelect, v => {
        const key = `index_${v.id}_${v.attributeName}`
        const keyVal = item[key]
        // selected spec
        if (v.selected) {
          if (!keyVal) {
            this.error[key] = `${v.attributeName}不能为空`
            flag = false
          }

          if (keyVal && !$parent.vfOwner(key, keyVal, idx, item['owner'])) {
            this.error[key] = `${v.attributeName}与货主条件已重复`
            flag = false
          }
        }
      })

      if (!erpCode) {
        this.error.errorErpCode = '商品编码不能为空'
        flag = false
      }

      // todo 验证方法解除双向绑定

      if (!$parent.vfErpCode(erpCode, idx)) {
        this.error.errorErpCode = '商品编码已重复'
        flag = false
      }

      if (!mprice) {
        this.error.errorMprice = '金额不能为空'
        flag = false
      }

      if (typeof $refs['itemLimitNum'].$verification() === 'string') {
        this.error.errorLimitNum = $refs['itemLimitNum'].$verification()
        flag = false
      }

      return flag ? item : false
    }
  },
  watch: {
    'specSelect': {
      deep: true,
      immediate: true,
      handler(data) {
        this.error = {}
        _.map(data, v => {
          if (v.selected) {
            this.error[`index_${v.id}_${v.attributeName}`] = false
          }
        })
        this.error = { ...this.error, errorErpCode: false, errorMprice: false, errorLimitNum: false }
      }
    }
  },
  beforeCreate() {
  },
  created() {
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
  computed: {},
  components: { mItemLimitNum, mColumnUpload }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-form-item-model {
    width: 550px;
    border-radius: 5px;
    border: 1px solid #c9c9cc;
    margin-bottom: 10px;
    .header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      border-bottom: 1px solid #c9c9cc;
      position: relative;
      .el-icon-delete {
        position: absolute;
        right: 16px;
        top: 12px;
        cursor: pointer;
        font-size: 16px;
        &:hover {
          color: #ff0000;
        }
      }
    }
    .spec-content {
      padding: 12px;
      .specs-img {
        .avatar-uploader-icon {
          width: 100px;
          height: 100px;
          line-height: 100px !important;
        }
        .avatar {
          width: 100px;
          height: 100px;
        }
      }
    }
    .sfim-error {
      font-size: 12px;
      color: #ff0000;
    }
  }
</style>
