<template>
  <div class="app-container">
    <div class="details-wrapper">
      <div class="live-total">
        <el-card body-style="width:300px;height:130px">这是视频</el-card>
        <el-card class="box-card list-total">
          <div class="box-list">
            <p class="nums">{{ statistics.totalOrderNum || 0 }}</p>
            <p>成交订单</p>
          </div>
          <div class="box-list">
            <p class="nums">{{ statistics.totalVisitOrderRate || 0 }}</p>
            <p>用户成交率</p>
          </div>
          <div class="box-list">
            <p class="nums">{{ statistics.totalOrderAmount || 0 }}</p>
            <p>总金额金额</p>
          </div>
        </el-card>
        <el-card class="box-card flex-center " style="width: 300px; height: 130px;">
          <div class="box-list ">
            <p class="nums">
              {{ statistics.totalVisitNum || 0 }}
              <span>&nbsp;￥</span>
            </p>
            <p>累计观看人数</p>
          </div>
        </el-card>
      </div>
      <div style="margin-top:20px">
        <el-card body-style="padding:0 0 20px">
          <p class="title-line">基本信息</p>
          <el-divider />
          <div class="info-wrapper">
            <el-form>
              <el-form-item label="直播名称：">
                <span>{{ LiveDetails.name }}</span>
              </el-form-item>
              <el-form-item label="直播头像：">
                <el-avatar
                  size="medium"
                  :src="showImg(LiveDetails.merLogoUrl)"
                />
              </el-form-item>
              <el-form-item label="直播主题：">
                <span>{{ statistics.name }}</span>
              </el-form-item>
              <el-form-item label="开播时间：">
                <span>{{ statistics.realBeginTime }}</span>
              </el-form-item>
              <el-form-item label="直播封面：">
                <el-image
                  style="width:100px;height:100px"
                  :src="showImg(LiveDetails.coverPicUrl)"
                />
              </el-form-item>
            </el-form>
          </div>
          <p class="title-line">关联商品</p>
          <el-divider />
          <div class="info-wrapper">
            <p style="margin-bottom:10px;font-size:14px">参与商品</p>
            <el-table :data="goodsList" max-height="450px" border size="small">
              <!-- <el-table-column v-if="!activityId" type="selection" width="55" /> -->
              <el-table-column label="商品名称" prop="commodityName" min-width="100" />
              <el-table-column label="商品编码" prop="erpCode" />
              <el-table-column label="规格" prop="mprice">
                <template slot-scope="scope" :show-overflow-tooltip="true">
                  <div v-html="formatSkuInfo(scope.row.specSkus)" />
                </template>
              </el-table-column>
              <el-table-column label="参考价" prop="mprice" />
              <el-table-column label="操作" min-width="110">
                <template slot-scope="scope">
                  <!-- <el-button
                  type
                  size="mini"
                  :disabled="disabled"
                  @click="handleEditSetting(scope.row)"
                  >设置</el-button>-->
                  <el-button
                    type="text"
                    size="mini"
                    @click="handleGoodsDel(scope.row,scope.$index)"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <p style="margin-bottom:10px;font-size:14px;margin-top:20px">参与优惠券</p>
            <el-table :data="selectlist" max-height="450" style="width: 100%">
              <el-table-column prop="cname" show-overflow-tooltip label="优惠券名称" />
              <el-table-column prop="address" label="优惠内容">
                <template
                  slot-scope="scope"
                >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination) }}</template>
              </el-table-column>
              <el-table-column label="使用时间" width="160">
                <template
                  slot-scope="scope"
                >{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
              </el-table-column>
              <el-table-column label="使用场景" width="110">
                <template
                  slot-scope="scope"
                >{{ scope.row.sceneRule ===1?'线上':'' || scope.row.sceneRule ===2?'线下':'' || scope.row.sceneRule ===3?'线上线下通用':'' }}</template>
              </el-table-column>
              <el-table-column label="适用门店" width="100">
                <template
                  slot-scope="scope"
                >{{ scope.row.shopRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
              </el-table-column>
              <el-table-column label="适用商品" width="100">
                <template
                  slot-scope="scope"
                >{{ scope.row.productRule ===1?'全部商品':'' || scope.row.productRule ===2?'部分商品':'' || scope.row.productRule ===3?'部分商品不可用':'' }}</template>
              </el-table-column>
              <el-table-column label="发放张数" width="110">
                <template slot-scope="scope">
                  <el-popover
                    v-model="scope.row.showVisible"
                    placement="bottom"
                    width="200"
                    trigger="manual"
                  >
                    <div style="text-align: right; margin: 0">
                      <el-form :model="tableFrom" :rules="tableRules" size="mini">
                        <el-form-item label prop="sendNum">
                          <el-input v-model.number="tableFrom.sendNum" placeholder="输入发放张数" />
                        </el-form-item>
                        <el-form-item label>
                          <el-button type @click="scope.row.showVisible=false">取消</el-button>
                          <el-button type="primary">确定</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                    <span v-text="scope.row.nul" />
                    <el-button
                      slot="reference"
                      type="text"
                      icon="el-icon-edit"
                      size="mini"
                      circle
                      @click="scope.row.showVisible=!scope.row.showVisible"
                    />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="deleteRow(scope.$index, forms.selectlist)"
                  >移除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import liveRequest from '@/api/live'
import config from '@/utils/config'
export default {
  data() {
    return {
      goodsList: [],
      selectlist: [],
      statistics: '',
      LiveDetails: ''
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  created() {
    this.getStatistics()
    this.getLiveDetails()
    this.getLivegoods()
  },
  methods: {
    async getStatistics() {
      try {
        const { data } = await liveRequest.getdataCenterStatistics({
          liveId: `${this.$route.query.id}`
        })
        this.statistics = data
        console.log(data)
        // this.totaldata = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取直播详情
    async getLiveDetails() {
      try {
        const { data } = await liveRequest.getLiveDetails({
          liveId: this.$route.query.id
        })
        this.LiveDetails = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取直播商品列表
    async getLivegoods() {
      try {
        const { data } = await liveRequest.getLivegoods({
          liveId: this.$route.query.id
        })
        console.log(data)
        this.goodsList.push(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
.flex-between {
  display: flex;
  justify-content: space-between;
}
.live-total .el-card__body {
  @extend .flex-between;
  height: 130px;
  align-items: center;
}
</style>
<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  height: 130px;
  align-items: center;
}
.title-line {
  padding: 20px 23px 0;
}
.live-total {
  // padding:0 30px;
  @extend .flex-between;
  .nums {
    margin-bottom: 10px;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-list {
    margin: 0 30px;
    text-align: center;
    p {
      &:first-child {
        font-size: 20px;
        font-weight: 600;
        span {
          font-size: 12px;
        }
      }
      &:last-child {
        color: #bebfc1;
        font-size: 14px;
      }
    }
  }
}
.info-wrapper {
  padding: 0 120px;
}
</style>
