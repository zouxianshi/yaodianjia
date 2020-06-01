fix:test 
## Getting started

```bash
# clone the project
git clone git@10.200.25.127:client/yaodianjia.git

# enter the project directory
cd merchant

#//set registry  

npm config set registry  http://npm.pt.hydee.cn

# install dependency
npm install

# develop
npm  run serve
```

## 公共包说明

#### 导出下载

``vue
<script>
  import download from '@hydee/download'
  export default {
    methods: {
      handleBatchExport() {
        exportNotMatch(this.merCode)
          .then(res => {
            download.blob(res, '未对码列表')
            this.$message({
              message: '数据导出成功',
              type: 'success'
            })
          })
          .catch(() => {})
      },
    }
  }
</script>
```
