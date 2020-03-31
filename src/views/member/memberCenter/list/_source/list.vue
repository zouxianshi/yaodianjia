<template>
  <div class="list-model">
    <el-table
      :data="tabelData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="微信头像"
        width="80"
      />
      <el-table-column
        prop="nickName"
        label="昵称"
      />
      <el-table-column
        prop="numberName"
        label="会员姓名"
      />
      <el-table-column
        prop="sex"
        label="性别"
      />
      <el-table-column
        prop="age"
        label="年龄"
      />
      <el-table-column
        label="操作"
        width="100"
      >
        <template>
          <el-button type="text" size="small" @click="tail()">详情</el-button>
          <span>|</span>
          <el-button type="text" size="small">更多</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'List',
  components: {},
  props: {},
  data() {
    return {
      tabelData: [
        {
          imgUrl: '',
          nickName: '张三',
          numberName: '张三',
          sex: '男',
          age: '25'
        }, {
          imgUrl: '',
          nickName: '张三',
          numberName: '张三',
          sex: '男',
          age: '25'
        }, {
          imgUrl: '',
          nickName: '张三',
          numberName: '张三',
          sex: '男',
          age: '25'
        }
      ]
    }
  },
  methods: {
    tail() {
      this.$router.push('/member/member-center/details')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-model {
    .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 40px;
      font-weight: bold;
    }
  }

</style>
