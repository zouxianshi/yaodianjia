<template>
  <div class="comment-settings-model">
    <card-item
      :img="bannerImage"
      lable="商品评价"
      desc="商品评论开启后用户可在商品后添加评论，同时商户也可以维护评论。"
    >
      <div class="card-action">
        <el-switch
          v-model="isTurnOn"
          :active-text="isTurnOn ? '已开启' : '已关闭'"
          @change="handleChange"
        />
        <el-button type="text" class="button" @click="handleManagerClick">评论管理</el-button>
      </div>
    </card-item>
  </div>
</template>
<script>
import CardItem from './CardItem'
import { queryActivity, updateActivity } from '@/api/commentService'
import { mapGetters } from 'vuex'
import bannerImage from '@/assets/image/commentSetting/comment-banner-image.png'

export default {
  name: 'MainSetting',
  data() {
    return {
      isTurnOn: true,
      bannerImage
    }
  },
  props: {},
  mounted() {
    this._query()
  },
  methods: {
    handleManagerClick() {
      this.$router.push('/storeSetting/comment-settings/manager')
    },
    async _query() {
      const { merCode } = this
      try {
        const res = await queryActivity({ merCode, type: 1 })
        this.isTurnOn = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async handleChange() {
      const { merCode, isTurnOn } = this
      try {
        await updateActivity({ merCode, status: isTurnOn ? 1 : 0, type: 1 })
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token'])
  },
  components: {
    CardItem
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.comment-settings-model {
  .card-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
