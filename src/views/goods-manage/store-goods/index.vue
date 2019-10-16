<template>
  <div class="app-container">
    <div class="store-goods-wrapper">
      <el-radio-group
        v-model="radio3"
        size="small"
      >
        <el-radio-button label="1">在售</el-radio-button>
        <el-radio-button label="2">下架</el-radio-button>
        <el-radio-button label="3">售馨</el-radio-button>
        <el-radio-button label="3">锁定</el-radio-button>
      </el-radio-group>
      <section @keydown.enter="getList">
        <div
          class="search-form"
          style="margin-top:20px;margin-bottom:10px"
        >
          <div class="search-item">
            <span class="label-name">选择门店</span>
            <el-input
              v-model.trim="keyword"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input
              v-model.trim="keyword"
              size="small"
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品编码</span>
            <el-input
              v-model.trim="keyword"
              size="small"
              placeholder="商品编码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="keyword"
              size="small"
              placeholder="商品编码"
            />
          </div>
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="keyword"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="keyword"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品分组</span>
            <el-cascader
              v-model="value"
              :options="options"
              size="small"
            />
          </div>
          <div class="search-item">
            <el-button
              type=""
              size="small"
            >查询</el-button>
          </div>
          <div class="search-item">
            <el-button type="primary" size="small">批量上架</el-button>
            <el-button type="danger" size="small">批量下架</el-button>
            <el-button type="" size="small">批量锁定库存价格</el-button>
          </div>
        </div>
      </section>
      <div class="table-box">
        <p class="choose-num text-right"><span>已选中（1）个</span></p>
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="orName"
            align="left"
            min-width="120"
            :show-overflow-tooltip="true"
            label="门店信息"
          />
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商品图片"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.stPath">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.stPath"
                  lazy
                  fit="contain"
                  :preview-src-list="[`${scope.row.stPath}`]"
                />
              </template>
              <template v-else>
                <p class="">暂未上传</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            min-width="120"
            label="商品信息"
          />
          <el-table-column
            prop="address"
            label="商品编码"
            align="left"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="参考价格"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="门店价格"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="门店库存"
          />
          <el-table-column
            prop="address"
            align="left"
            fixed="right"
            label="操作"
            min-width="100"
          >
            <template>
              <!-- <el-button type="" size="mini" @click="handleListEdit(scope.row)">编辑</el-button> -->
              <el-button
                type="primary"
                size="small"
                @click="handleClick"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      radio3: '1',
      keyword: '',
      tableData: [{

      }],
      value: '',
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      loading: false
    }
  },
  created() {

  },
  methods: {
    getList() {

    },
    handleSelectionChange(val) {

    },
    handleClick() {
      this.$router.push('/goods-manage/mate')
    }
  }
}
</script>
<style lang="scss">
.store-goods-wrapper {
  .search-form {
    .search-item {
      .label-name {
        width: 60px;
      }
      .el-input {
        width: 180px;
      }
    }
  }
}
</style>
