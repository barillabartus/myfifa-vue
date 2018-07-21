import Vue from 'vue'
import apiRequest from '@/api'
import myfifa from '@/api/myfifa'

// initial state
export const state = () => ({
  list: {},
  positions: [
    'GK',
    'CB',
    'LCB',
    'RCB',
    'LB',
    'LWB',
    'RB',
    'RWB',
    'CDM',
    'LDM',
    'RDM',
    'CM',
    'LCM',
    'RCM',
    'CAM',
    'LAM',
    'RAM',
    'LM',
    'LW',
    'RM',
    'RW',
    'CF',
    'ST'
  ]
})

// getters
export const getters = {
  competitions: state => [
    ...new Set(Object.values(state.list).map(match => match.competition))
  ].reverse(),
  teams: state => [
    ...new Set([
      ...Object.values(state.list).map(match => match.home),
      ...Object.values(state.list).map(match => match.away)
    ])
  ]
}

// actions
export const actions = {
  refresh ({ state, commit, rootState }, { teamId }) {
    return apiRequest({
      path: myfifa.matches.all,
      pathData: { teamId: teamId },
      token: rootState.token,
      success: function ({ data }) {
        commit('refresh', data)
      }
    })
  },
  get ({ rootState }, { matchId }) {
    return apiRequest({
      path: myfifa.matches.get,
      pathData: { matchId: matchId },
      token: rootState.token
    })
  },
  create ({ commit, rootState }, { teamId, match }) {
    return apiRequest({
      method: 'post',
      path: myfifa.matches.all,
      pathData: { teamId: teamId },
      token: rootState.token,
      data: { match: match },
      success: ({ data }) => {
        commit('set', data)
      }
    })
  },
  update ({ commit, rootState }, payload) {
    return apiRequest({
      method: 'patch',
      path: myfifa.matches.get,
      pathData: { matchId: payload.id },
      token: rootState.token,
      data: { match: payload },
      success: ({ data }) => {
        commit('set', data)
      }
    })
  },
  destroy ({ commit, rootState }, payload) {
    return apiRequest({
      method: 'delete',
      path: myfifa.matches.get,
      pathData: { matchId: payload },
      token: rootState.token,
      success: ({ data }) => {
        commit('remove', data.id)
      }
    })
  },
  addLog ({ commit, rootState }, { matchId, matchLog }) {
    return apiRequest({
      method: 'post',
      path: myfifa.matchLogs.all,
      pathData: { matchId: matchId },
      token: rootState.token,
      data: { match_log: matchLog },
      success: ({ data }) => {
        commit('set', data)
      }
    })
  },
  updateLog ({ commit, rootState }, payload) {
    return apiRequest({
      method: 'patch',
      path: myfifa.matchLogs.get,
      pathData: { logId: payload.id },
      token: rootState.token,
      data: { match_log: payload },
      success: ({ data }) => {
        commit('set', data)
      }
    })
  }
}

// mutations
export const mutations = {
  refresh (state, matches) {
    state.list = matches.reduce((list, match) => {
      list[match.id] = match
      return list
    }, {})
  },
  set (state, match) {
    Vue.set(state.list, match.id, match)
  },
  remove (state, matchId) {
    delete state.list[matchId]
  }
}
