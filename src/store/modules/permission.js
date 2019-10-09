import { asyncRoutes, constantRoutes } from '@/router'
import { findArray } from '@/utils/index'
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.meta.menu_id) {
      const modulesIndex = findArray(roles, { id: tmp.meta.menu_id })
      if (modulesIndex > -1) { // 一级菜单
        if (tmp.children) {
          tmp.children.forEach((value, index, ary) => { // 二级
            if (roles[modulesIndex].children) {
              const chidIndex = findArray(roles[modulesIndex].children, { id: value.meta.menu_id })
              if (chidIndex > -1) {
                if (roles[modulesIndex].children[chidIndex].children) {
                  roles[modulesIndex].children[chidIndex].children.forEach((row, index, ary) => {
                    if (row.rePath) { // 增加菜单权限
                      value.meta[row.rePath] = 1
                    }
                  })
                } else {
                  if (roles[modulesIndex].children) {
                    roles[modulesIndex].children.forEach((row, index) => {
                      if (row.rePath) {
                        value.meta[row.rePath] = 1
                      }
                    })
                  }
                }
              } else {
                value.hidden = true
              }
            }
          })
        }
        res.push(tmp)
      }
    }
  })
  res.push({ path: '*', redirect: '/404', hidden: true, meta: { title: '404' }})
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) { // 超级管理员
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
