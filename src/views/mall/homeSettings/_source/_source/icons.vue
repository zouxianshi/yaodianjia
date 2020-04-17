<template>
  <div class="hs-icons-model">
    <div v-if="iconClx !== 'no-data'" :class="iconClx" :style="{width:`${size}px`,height:`${size}px`,}" />
    <img v-else src="./img/va_default_icons_no_data.png" :width="size" :height="size" style="display: block;">
  </div>
</template>
<script>
export default {
  name: 'HsIcons',
  data() {
    return {}
  },
  props: {
    iconClx: {
      type: String,
      default: -1
    },
    size: {
      type: Number,
      default: 64
    }
  },
  methods: {},
  watch: {},
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .hs-icons-model {
    @for $i from 0 through 17 {
      .sa_default_icons_#{$i} {
        background: url('./img/sa_default_icons_#{$i}.png') no-repeat;
        display: block;
        background-size: cover;
      }
    }
  }
</style>
