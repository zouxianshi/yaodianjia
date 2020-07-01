<template>
  <div class="style-setting-model">
    <div class="ssm-box">
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="blue" @change="onChange">
          <span class="ssm-item-text">气质蓝</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_0.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="red" @change="onChange">
          <span class="ssm-item-text">中国红</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_1.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="gold" @change="onChange">
          <span class="ssm-item-text">淡雅金</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_2.png" alt="" width="180"></div>
        </el-radio>
      </div>
      <div class="ssm-item">
        <el-radio v-model="basics.styleType" label="custom" @change="onChange">
          <span class="ssm-item-text">自定义</span>
          <div class="ssm-item-img"><img src="./../img/renovation_tpl_3.png" alt="" width="180"></div>
        </el-radio>
      </div>
    </div>
    <m-custom-setting v-if="basics.styleType === 'custom'" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import renovationService from '@/api/renovation'
import mCustomSetting from './customSetting'
import { handlerBackfill } from './../../stepAssembly/default'

export default {
  name: 'StyleSetting',
  data() {
    return {
      tplData: {}
    }
  },
  props: {
  },
  methods: {
    ...mapMutations('renovation', ['setBasics', 'setDragList', 'setStaticDragData', 'reset']),
    $verification() {
      return true
    },
    handlerStyle(tplType) {
      const data = _.cloneDeep(this.tplData)
      const dragList = handlerBackfill(data)

      const color = () => {
        switch (tplType) {
          case 'red':
            return '#F32525'
          case 'blue':
            return '#4B61FF'
          case 'gold':
            return '#F1B96B'
        }
      }

      this.setBasics({
        ..._.omit(data, ['list']),
        ..._.pick(this.basics, ['id', 'name', 'title', 'shareDesc', 'shareImg']),
        styleType: tplType,
        borderColor: color(),
        backgroundColor: color()
      })

      this.setDragList(dragList)

      this.setStaticDragData({
        banner: _.find(data.list, ['type', 'banner'])
      })
    },
    onChange(tplType) {
      if (tplType !== 'custom') {
        this.handlerStyle(tplType)
      } else {
        this.setBasics({
          borderColor: '#ffffff',
          backgroundColor: '#ffffff'
        })
      }
    },
    getDefaultTpl() {
      renovationService.getDefaultTpl().then(res => {
        this.tplData = {
          ..._.omit(res.data, ['id', 'name', 'title', 'shareDesc', 'shareImg'])
        }
        this.handlerStyle('blue')
      })
    }
  },
  watch: {
  },
  beforeCreate() {
  },
  created() {
    this.getDefaultTpl()
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
  computed: {
    ...mapState('renovation', ['basics'])
  },
  components: { mCustomSetting }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .style-setting-model {
    .ssm-box {
      overflow: hidden;
      padding: 38px 0 38px 76px;
      .ssm-item {
        width: 180px;
        float: left;
        text-align: center;
        margin-right: 92px;
        &:last-child {
          margin-right: 0;
        }
        .ssm-item-img {
          margin-top: 20px;
        }
      }
    }
  }
</style>
