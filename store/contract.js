import Vue from 'vue'
import $_http from '@/api'
import myfifa from '@/api/myfifa'
import objectify from '@/plugins/objectify'

// initial state
export const state = () => ({
  bonusRequirementTypes: [
    'Appearances',
    'Goals',
    'Assists',
    'Clean Sheets'
  ]
})

// actions
export const actions = {
  getAll ({ commit, rootState }, { playerId }) {
    return $_http({
      path: myfifa.contracts.index,
      pathData: { playerId: playerId },
      token: rootState.token,
      success: ({ data }) => {
        commit('player/SET', {
          ...rootState.player.list[playerId],
          contracts: objectify(data)
        }, { root: true })
      }
    })
  },
  create ({ commit, rootState }, { playerId, contract }) {
    return $_http({
      method: 'post',
      path: myfifa.contracts.index,
      pathData: { playerId: playerId },
      token: rootState.token,
      data: { contract: contract }
    })
  },
  update ({ commit, rootState }, payload) {
    return $_http({
      method: 'patch',
      path: myfifa.contracts.record,
      pathData: { contractId: payload.id },
      token: rootState.token,
      data: { contract: payload }
    })
  }
}
