<!-- 客服列表页面 -->

<template>
  <div class="app-container">
    <div class="customer-service-list-container">
      <div class="app-container">
        <div class="table-header">
          <!-- 筛选 -->
          <div class="filter">
            <span class="filter-desc">筛选：客服状态</span>
            <el-dropdown @command="handleStatusToggle">
              <span class="el-dropdown-link">
                {{ merSupportTableData.selectedFilterText }}
                <i
                  class="el-icon-arrow-down el-icon--right"
                />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in statusMap"
                  :key="index"
                  :command="item.symbol"
                >{{ item.text }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <!-- 添加客服 -->
          <el-button class="add" type="primary" size="mini" @click.stop="handleAddSupportStaff()">添加客服</el-button>

          <el-dialog
            :close-on-click-modal="false"
            :before-close="handleAddDialogClose"
            title="添加客服"
            append-to-body
            :visible="addDialogVisible"
            width="80%"
          >
            <div class="search-filter">
              <div class="search-filter-item">
                <span class="search-filter-item-text">员工姓名</span>
                <el-input
                  v-model="merStaffQuery.empName"
                  class="search-filter-item-input"
                  type="text"
                  placeholder="请输入员工姓名"
                  maxlength="30"
                  @input="handleStaffNameInput"
                />
              </div>
              <div class="search-filter-item">
                <span class="search-filter-item-text">所属机构</span>
                <el-input
                  v-model="merStaffQuery.subOrgName"
                  class="search-filter-item-input"
                  type="text"
                  placeholder="请输入员工机构部门"
                  maxlength="30"
                  @input="handleStaffDepInput"
                />
              </div>
              <el-button class="search-btn" type="primary" @click="handleSearchSubmit">查询</el-button>
            </div>
            <el-table
              ref="multipleTable"
              height="400"
              :data="merStaffTableData.list"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column width="55" :selectable="selectable">
                <template slot-scope="scope">
                  <el-tooltip v-if="scope.row.staff" content="该员工已经是客服了" placement="top">
                    <el-checkbox :value="scope.row.staff" disabled />
                  </el-tooltip>
                  <el-checkbox
                    v-else
                    :value="scope.row.checked"
                    @change="handleStaffSelect(scope.row)"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="empCode" label="员工编码" width="120" />
              <el-table-column prop="empName" label="姓名" width="120" />
              <el-table-column prop="name" label="性别" width="120">
                <template slot-scope="scope">
                  <span>{{ sexEnum[scope.row.sex] }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="mobile" label="手机号" width="120" />
              <el-table-column prop="post" label="职位" width="120" />
              <el-table-column prop="subOrgName" label="部门" show-overflow-tooltip />
            </el-table>
            <el-pagination
              class="pagination"
              :current-page="merStaffQuery.currentPage"
              :page-sizes="merStaffPageSizes"
              :page-size="merStaffQuery.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="merStaffTableData.total"
              @size-change="handleStaffSizeChange"
              @current-change="handleStaffPageChange"
            />
            <div class="selected-staff">
              已选员工：
              <span
                v-for="(item,index) in merStaffTableData.selectedList"
                :key="index"
                class="selected-staff-item"
              >{{ item.empName }} {{ item.empCode }}，</span>
            </div>
            <div class="staff-dialog-bottom">
              <el-button @click="addDialogVisible=false">取消</el-button>
              <el-button type="primary" @click="staffDialogConfirmBtnClick">确认</el-button>
            </div>
          </el-dialog>
        </div>

        <!-- 客服列表 -->
        <div class="support-staff-comp">
          <el-table
            :data="merSupportTableData.list"
            :style="`width: 100%; max-height:${tableHeight}+'px `"
          >
            <el-table-column prop="id" label="序号" width="180">
              <template slot-scope="scope">
                {{ scope.row.index }}
              </template>
            </el-table-column>
            <el-table-column prop="isOnline" label="在线状态" width="180">
              <template slot-scope="scope">
                <div v-if="scope.row.onlineStatus === 1" class="online-text">在线</div>
                <div v-else class="offline-text">离线</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="客服名称" />
            <el-table-column prop="actions" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="viewHistoryMsg(scope.row)">查看消息记录</el-button>
                <el-button type="text" size="small" @click="toggleSupportStaffStatus(scope.row)">
                  {{
                    scope.row.status === 1 ? '停用' : '启用'
                  }}
                </el-button>
                <el-button type="text" size="small" @click="handleDelBtnClick(scope.row)">删除</el-button>
                <el-dialog
                  :show-close="false"
                  append-to-body
                  title="提示"
                  :visible="delDialogVisible"
                  width="30%"
                >
                  <span>确认删除此客服？</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="delDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="delSupportItem">确 定</el-button>
                  </span>
                </el-dialog>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            :current-page="merSupportQuery.currentPage"
            :page-sizes="merSupportPageSizes"
            :page-size="merSupportQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="merSupportTableData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import list from './list'
export default list
</script>

<style scoped lang="scss">
  @import "./list.scss";
</style>
