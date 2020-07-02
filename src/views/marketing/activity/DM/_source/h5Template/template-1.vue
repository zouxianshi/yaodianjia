<template>
  <div class="dashboard-container">
    <div v-loading="pageLoading" class="app-container" :class="disabled ? 'x-disabled-container': ''" element-loading-text="加载中">
      <section class="x-header">
        <!-- 标题 -->
        <h5>选择页面样式</h5>
      </section>
      <section class="x-body">
        <!-- 列表 -->
        <ul class="template-list">
          <li v-for="item in 6" :key="item" class="li-item">
            <div class="cover-box">
              <div class="cover" />
              <div class="mask">
                <el-button type="primary" size="small">使用模板</el-button>
              </div>
            </div>
            <div class="caption-box">
              <div class="title">新春模板</div>
              <div class="desc">海典健康微商城为商家提供不同节日氛围的海典健康微商城为商家提供不同节日氛围的..</div>
            </div>
          </li>
          <li class="li-item li-add">
            <div class="cover-box">
              <div class="text">空白模板</div>
              <div class="mask">
                <el-button type="primary" size="small" @click="toSetModule">设置模板</el-button>
              </div>
            </div>
            <div class="caption-box">
              <div class="title">自定义模板</div>
            </div>
          </li>
        </ul>
      </section>
      <section class="x-footer">
        <!-- 分页器 -->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    toSetModule() {
    }
  }
}
</script>
<style lang="scss" scoped>
  .x-header{
    h5{
      font-size: 24px;
      color: #333;
    }
  }
  .x-body{
    .template-list{
      display: flex;
      flex-wrap: wrap;
      .li-item{
        width: 260px;
        height: 356px;
        box-sizing: border-box;
        border: 1px solid #dedede;
        border-radius: 2px;
        box-shadow: 0 0 5px #dedede;
        background: #eaeaea;
        display: flex;
        flex-direction: column;
        margin: 20px 20px 0 0;
        &:hover{
          border-color: red;
          .cover-box .mask{
            display: flex;
          }
          .caption-box{
            background-color:rgba(0, 0, 0, 0.1);
          }
        }
        .cover-box {
          position: relative;
          flex:1;
          .cover{
            width: 100%;
            height: 100%;
            background: url('../../../../assets/image/template_bg.png') no-repeat center/100% 100%;
          }
          .mask{
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            align-items: center;
            justify-content: center;
          }
        }
        .caption-box{
          flex: 0 0 70px;
          overflow: hidden;
          background-color: white;
          box-sizing: border-box;
          padding: 10px 15px;
          text-align: center;
          .title{
            font-size: 18px;
            line-height: 36px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .desc {
            font-size: 14px;
            color: #888888;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .li-add{
        .cover-box {
          display: flex;
          background-color:#eef0f3;
          .text{
            margin: auto;
            font-size: 20px;
            color: #888888;
          }
        }
      }
    }
  }
</style>
