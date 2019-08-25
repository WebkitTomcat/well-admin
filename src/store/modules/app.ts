import { Commit } from 'vuex'
import Cookies from 'js-cookie'

export interface Sidebar {
  opened: boolean,
  withoutAnimation: boolean,
}

export type Device = 'desktop' | 'mobile'

export interface State {
  sidebar: Sidebar,
  device: Device,
  tagsView: boolean,
}

const state: State = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  tagsView: Cookies.get('tagsView') ? !!+Cookies.get('tagsView') : true
}

const getters = {
  sidebar: (state: State) => state.sidebar,
  needTagsView: (state: State) => state.tagsView
}

const mutations = {
  TOGGLE_TAGSVIEW: (state: State) => {
    state.tagsView = !state.tagsView
    if (state.tagsView) {
      Cookies.set('tagsView', 1)
    } else {
      Cookies.set('tagsView', 0)
    }
  },
  TOGGLE_SIDEBAR: (state: State) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state: State, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

const actions = {
  toggleSideBar (context: { commit: Commit; state: State}) {
    context.commit('TOGGLE_SIDEBAR')
  },
  closeSideBar (context: { commit: Commit; state: State}, config: { withoutAnimation: boolean }) {
    context.commit('CLOSE_SIDEBAR', config.withoutAnimation)
  },
  toggleDevice (context: { commit: Commit; state: State}, device: Device) {
    context.commit('TOGGLE_DEVICE', device)
  },
  toggleTagsview (context: { commit: Commit; state: State}) {
    context.commit('TOGGLE_TAGSVIEW')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
