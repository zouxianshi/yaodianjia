<template>
  <div class="dashboard-container">
    <div class="app-container">
      <section class="x-panel">
        <div class="header">
          <p class="title">玩转营销</p>
          <div class="desc">社交营销，突破营销瓶颈，轻松引流、裂变、复购 </div>
        </div>
        <div class="content">
          <ul class="ul-list">
            <li v-for="(item, index) in marketing" :key="index" class="li-item">
              <div class="li-left">
                <img :src="item.icon">
              </div>
              <div class="li-center">
                <div class="title">{{ item.title }}</div>
                <div class="desc">{{ item.desc }}</div>
              </div>
              <div class="li-right">
                <el-button class="btn-create" type="primary" size="mini" :disabled="item.disabled" @click="toCreate(item.type)">创建</el-button>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section class="x-panel">
        <div class="header">
          <p class="title">促销方案</p>
          <div class="desc">降价促销，把握好尺度，方能出奇制胜</div>
        </div>
        <div class="content">
          <ul class="ul-list2">
            <li class="li-item">
              <div class="li-left">
                <div class="text-box">减</div>
              </div>
              <div class="li-center">
                <div class="title">满减</div>
                <div class="desc">订单满一定金额减去部分订单金额的优惠方 法，满减的营销效果是：让利小，效果好！</div>
              </div>
            </li>
            <li class="li-item">
              <div class="li-left">
                <div class="text-box">赠</div>
              </div>
              <div class="li-center">
                <div class="title">满赠</div>
                <div class="desc">满赠是订单满一定金额赠送的促销方式，一 般包括买一送一，买一送几。促销目标是... </div>
              </div>
            </li>
            <li class="li-item">
              <div class="li-left">
                <div class="text-box">邮</div>
              </div>
              <div class="li-center">
                <div class="title">包邮</div>
                <div class="desc">订单满一定金额包邮的优惠方法，包邮可提 高订单下单率，顾客不需要为邮费烦恼... </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityCreate',
  data() {
    return {
      marketing: [
        {
          icon: require('../../../assets/image/icon_limit.png'),
          title: '限时优惠',
          desc: '包含限时秒杀和限时特惠两种活动方式，秒杀更强调高时效性的低价刺激，可设置独立库存，限时折扣则更侧重于优惠折扣。设置固定周期的限时活动，可提高顾客粘性。',
          type: 1,
          disabled: false
        }, {
          icon: require('../../../assets/image/icon_DM.png'),
          title: '电子DM单',
          desc: '海典健康微商城为商家提供不同节日氛围的DM单模板；丰富的DM单组件，支持商家自己编辑设计专属单页，打破服务号每周四次的图文推送限制，实现不限次数的定向精准推送给顾客，并可以通过好友和朋友圈裂变传播。',
          type: 2,
          disabled: false
        }, {
          icon: require('../../../assets/image/icon_share_hb.png'),
          title: '分享红包',
          desc: '分享红包能够通过优惠券裂变，从而达到社群营销，通过用户主动行为触发分享红包活动，发送到群，用户通过打开链接，领取红包。',
          type: 3,
          disabled: true
        }, {
          icon: require('../../../assets/image/pt.png'),
          title: '拼团活动',
          desc: '拼团活动可以为商家做拉新引流计划提供高效的途径，同事拼团活动也是最流行的社群运营活动之一。用户可通过拼团活动购买到划算的商品，同时分享给好友参团，从而实现用户裂变增长',
          type: 4,
          disabled: false
        }
      ]
    }
  },
  created() {

  },
  methods: {
    toCreate(type) { // type 1.限时活动 2.电子DM单 3.分享红包 4.拼团活动
      if (type === 1) {
        this.$router.push('/marketing/activity/limit-edit')
      } else if (type === 2) {
        this.$router.push('/marketing/activity/dm-template')
      } else if (type === 4) {
        this.$router.push('/marketing/activity/assemble-edit')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    padding: 24px;
  }

  .x-panel {
    margin-bottom: 40px;
    font-family: Microsoft YaHei;

    .header {
      .title {
        font-size: 28px;
        font-weight: 400;
        color: #303133;
      }

      .desc {
        margin-top: 12px;
        font-size: 14px;
        font-weight: 400;
        color: #303133;
      }
    }

    .content {
      margin-top: 20px;

      .ul-list2 {
        display: flex;
        flex-wrap: wrap;

        .li-item {
          display: flex;
          flex: 0 0 auto;
          width: 380px;
          height: 120px;
          margin-right: 15px;
          background: rgba(227, 227, 227, 0.3);
          border: 1px solid rgba(220, 223, 230, 1);
          border-radius: 4;
          overflow: hidden;
          box-sizing: border-box;
          padding: 20px 10px 10px 15px;
          margin-bottom: 15px;

          .li-left {
            .text-box {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 60px;
              height: 60px;
              background: rgba(227, 227, 227, 0.3);
              border: 1px solid rgba(220, 223, 230, 1);
              border-radius: 4px;
              font-size: 38px;
              color: #cccccc;
            }
          }

          .li-center {
            flex: 1;
            margin-left: 15px;

            .title {
              height: 17px;
              font-size: 18px;
              color: #303133;
            }

            .desc {
              margin-top: 10px;
              font-size: 14px;
              line-height: 24px;
              height: 50px;
              color: #606266;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
            }
          }
        }
      }

      .ul-list {
        .li-item {
          display: flex;
          width: 700px;
          border-bottom: 1px solid rgba(220, 223, 230, 1);
          padding: 24px 0;

          .li-left {
            img {
              width: 64px;
              height: 64px;
              border-radius: 4px;
              overflow: hidden;
              background: linear-gradient(146deg, rgba(118, 235, 216, 1), rgba(24, 179, 210, 1));
            }
          }

          .li-center {
            flex: 1;
            margin-left: 20px;

            .title {
              height: 17px;
              font-size: 18px;
              color: #303133;
            }

            .desc {
              margin-top: 10px;
              font-size: 14px;
              line-height: 24px;
              color: #606266;
            }
          }
        }
      }
    }
  }
</style>
