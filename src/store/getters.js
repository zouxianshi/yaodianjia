const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  merCode: state => state.user.merCode,
  groupList: state => state.group.list,
  userId: state => state.user.userId,
  merLogo: state => state.customerService.merLogo,
  historyCSList: state => state.customerService.historyCSList,
  curOnlineUserData: state => state.customerService.curOnlineUserData,
  onlineConversationData: state => state.customerService.onlineConversationData,
  hasNewMsg: state => state.customerService.hasNewMsg,
  ryConnected: state => state.customerService.ryConnected
}

export default getters
