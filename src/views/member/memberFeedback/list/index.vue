<template>
  <div class="feedback-model">
    <el-card class="box-card">
      <div v-loading="loading" class="feedback-list">
        <div v-for="(item,index) in dataList" :key="index">
          <div class="feedback-content">
            <div class="feedback-left">
              <div>
                <!-- <img :src="item.memberHead" class="feedback-content-image"> -->
                <el-image
                  style=" width: 50px;height: 50px;border-radius: 50%;"
                  :src="item.memberHea"
                >
                  <div slot="error" class="image-slot">加载失败</div>
                </el-image>
              </div>
              <div>
                <p>
                  {{ item.nickName }}&nbsp;
                  <span
                    style="color:#909399;font-size: 14px;"
                  >{{ item.userId }}</span>
                </p>
                <p style="margin-top:10px;color:#909399;font-size: 14px;">{{ item.messageContext }}</p>
              </div>
            </div>
            <div
              style="font-size: 14px;color:#909399;"
            >{{ item.complaintTime.split(' ')[0].replace(/-/g,'/') }}</div>
          </div>
          <div class="feedback-line">
            <el-divider />
          </div>
        </div>
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { queryMessageList } from '@/api/memberService'
import { mapGetters } from 'vuex'
export default {
  name: 'Feedback',
  props: {},
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: 20,
      totalCount: 1,
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.getMessageList()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getMessageList() {
      this.loading = true
      var params = {
        currentPage: this.currentPage,
        // isVisit: '',
        merCode: this.merCode,
        // messageStatus: '',
        pageSize: this.pageSize
      }
      queryMessageList(params).then(res => {
        this.dataList = res.data.data
        this.totalCount = res.data.totalCount
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getMessageList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMessageList()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.feedback-model {
  padding: 20px;
  background: #f5f7fa;
  .feedback-list {
    background: #ffffff;
    height: calc(100vh - 248px);
    padding-top: 24px;
    .block {
      text-align: right;
      margin-top: 100px;
    }
    .feedback-content {
      display: flex;
      justify-content: space-between;
      padding: 0px 30px;
      .feedback-left {
        display: flex;
        align-items: center;
        .image-slot {
          text-align: center;
          line-height: 50px;
          font-size:10px;
          background: #f5f7fa
        }
        .feedback-content-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        div:nth-child(2) {
          margin: 0px 40px 0px 20px;
        }
      }
    }

    .feedback-line {
      margin: 0px 15px;
    }
  }
}
</style>
