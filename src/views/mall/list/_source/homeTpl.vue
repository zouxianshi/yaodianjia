<template>
  <div v-loading="isLoading" class="home-tpl-model">
    <div class="htm-item">
      <div class="htm-default" @click="onToPath('blank')">
        <p class="htm-text-p1">新建空白模板</p>
        <p class="htm-text-p2"><i class="el-icon-circle-plus-outline" /></p>
      </div>
      <div class="htm-text">空白模板</div>
    </div>
    <div class="htm-item">
      <div class="htm-photo" @click="onToPath('default')">
        <img :src="defaultHomeImg + '?x-oss-process=style/w_160'" alt="" width="160" height="333">
      </div>
      <div class="htm-text">默认模板</div>
    </div>
  </div>
</template>
<script>
import { getDefImg, createInitId } from '@/api/mallService'
export default {
  name: 'HomeTpl',
  data() {
    return {
      defaultHomeImg: '',
      isLoading: false
    }
  },
  props: {},
  methods: {
    async onToPath(type) {
      let url = '/mall/home-settings'
      if (type === 'default') {
        this.isLoading = true
        const { data } = await createInitId()
        this.isLoading = false
        url = `${url}/${data}`
      }
      this.$router.push(url)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.isLoading = true
    getDefImg().then((v) => {
      this.defaultHomeImg = v.data
      this.isLoading = false
    }).catch(() => {
      this.isLoading = false
    })
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .home-tpl-model {
    overflow: hidden;
    width: 360px;
    margin: -20px auto 0 auto;
    .htm-item {
      width: 160px;
      float: left;
      margin: 0 10px;
      cursor: pointer;
      .htm-default,.htm-photo {
        transition: all 0.2s ease-out;
      }
      &:hover {
        .htm-default,.htm-photo {
          transition: all 0.2s ease-out;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
      }
      .htm-default {
        width: 158px;
        height: 331px;
        border: 1px solid #ebeef5;
        text-align: center;
        background: #fff;
        .htm-text-p1 {
          font-size: 16px;
          color: #ccc;
          margin-top: 130px;
        }
        .htm-text-p2 {
          padding: 16px 0;
          >i {
            font-size: 33px;
            color: #ccc;
          }
        }
      }
      .htm-text {
        text-align: center;
        padding: 10px 0;
      }
    }
  }
</style>
