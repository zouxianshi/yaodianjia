
<template>
  <span>
    <el-button type="text" @click="btnCllick">查看退款单信息</el-button>
    <el-dialog
      title="查看退款单信息"
      custom-class="dialogRefundOrder"
      append-to-body
      :visible.sync="dialogRefundOrderVisible"
      destroy-on-close
    >
      <ul v-loading="loading" class="info-list">
        <li>
          <span class="item-lable">退款状态：</span>
          <span class="item-value">{{ returnrespDto && returnrespDto.status | returnType }}</span>
        </li>
        <li>
          <span class="item-lable">退款单号：</span>
          <span class="item-value">{{ returnrespDto && returnrespDto.id }}</span>
        </li>
        <li>
          <span class="item-lable">退款金额：</span>
          <span class="item-value">
            <span>
              ￥<span
                v-if="returnrespDto && returnrespDto.isReturnFreight === 1"
              >{{ ((returnrespDto.refundAmount || 0)*100 + (returnrespDto.freightAmount ||0)*100) / 100 }}</span>
              <span v-else>{{ returnrespDto && returnrespDto.refundAmount || 0 }}</span>
            </span>
            <!-- actualRefundAmount退款金额 isReturnFreight是否退还运费 0.否 1.是 -->
            <span
              v-if="returnrespDto && returnrespDto.isReturnFreight === 1"
            >（含运费{{ returnrespDto.freightAmount || 0 }}元）</span>
          </span>
        </li>
        <li v-if="orderType === 'I'">
          <span class="item-lable">海贝退回：</span>
          <span class="item-value">
            <span>{{ returnrespDto && returnrespDto.actualRefundHb || 0 }}</span>
          </span>
        </li>
        <li>
          <span class="item-lable">实退金额：</span>
          <span class="item-value">
            <span
              v-if="returnrespDto && returnrespDto.actualRefundAmount"
            >￥{{ returnrespDto.actualRefundAmount }}</span>
            <span v-else>-</span>
          </span>
        </li>
        <li>
          <span class="item-lable">退款原因：</span>
          <span class="item-value">{{ (returnrespDto && returnrespDto.refundReason )|| '-' }}</span>
        </li>
        <li>
          <span class="item-lable">退款说明：</span>
          <span class="item-value">{{ (returnrespDto && returnrespDto.refundReturnDesc) || '-' }}</span>
        </li>
        <li>
          <span class="item-lable">图片凭证：</span>
          <div>
            <el-image
              v-for="(item, index) in picList"
              :key="index"
              :preview-src-list="[showImg(item)]"
              style="width: 100px; height: 100px"
              :src="showImg(item)"
              fit="fill"
            />
          </div>
        </li>
        <li>
          <span class="item-lable">申请时间：</span>
          <span class="item-value">{{ (returnrespDto && returnrespDto.createTime) || '-' }}</span>
        </li>
        <li>
          <span class="item-lable">退回运费：</span>
          <!-- 是否退还运费 0.否 1.是 -->
          <span class="item-value">{{ returnrespDto && returnrespDto.isReturnFreight?'是':'否' }}</span>
        </li>
        <li>
          <span class="item-lable">退货方式：</span>
          <span class="item-value">{{ (returnrespDto && returnrespDto.refundType) | refundType }}</span>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogRefundOrderVisible = false">知道了</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
// import { getRefundInfo } from '@/api/order'
export default {
  name: 'DialogRefundOrder',
  filters: {
    returnType: function(value) {
      // 状态0待退货,1待退款，2退款完成 3驳回
      let text = '-'
      switch (value) {
        case 0:
          text = '待退货'
          break
        case 1:
          text = '待退款'
          break
        case 2:
          text = '退款完成'
          break
        case 3:
          text = '驳回'
          break
        default:
          break
      }
      return text
    },
    refundType: function(value) {
      // 退货方式1.快递寄回 2.送回门店
      let text = '-'
      switch (value) {
        case 1:
          text = '快递寄回'
          break
        case 2:
          text = '送回门店'
          break
        default:
          break
      }
      return text
    }
  },
  // 查看退款单
  props: {
    id: {
      type: String,
      default: ''
    },
    returnrespDto: {
      type: Object,
      default() {
        return {}
      }
    },
    orderType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogRefundOrderVisible: false,
      // returnrespDto: {},
      loading: false
    }
  },
  computed: {
    picList: function() {
      let arr = []
      if (this.returnrespDto && this.returnrespDto.pictureVoucher) {
        arr = this.returnrespDto.pictureVoucher.split(',')
      }
      return arr
    }
  },
  methods: {
    btnCllick() {
      this.dialogRefundOrderVisible = true
    }
    // 查询退款单信息
    // _get(returnQuestId) {
    //   this.loading = true
    //   getRefundInfo(returnQuestId).then((res) => {
    //     const { data, code } = res
    //     if (code === '10000') {
    //       this.returnrespDto = data
    //       this.loading = false
    //     }
    //   }).catch(() => {
    //     this.loading = false
    //   })
    // }
  }
}
</script>

<style lang="scss">
.dialogRefundOrder {
  .info-list {
    li {
      display: flex;
      flex-direction: row;
      line-height: 24px;
      font-size: 14px;
      margin-bottom: 12px;
      .item-lable {
        display: inline-block;
        flex: 0 0 6em;
        text-align: right;
      }
    }
  }
}
</style>
