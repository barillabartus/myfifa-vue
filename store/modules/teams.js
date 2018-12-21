import http from '@/api'
import myfifa from '@/api/myfifa'
import { Team } from '@/models'

// actions
const actions = {
  FETCH ({ commit, rootState }) {
    return http({
      path: myfifa.teams.index,
      token: rootState.session.token,
      success: ({ data }) => {
        Team.insert({ data })
        console.log('inserted Team')
      }
    })
  },
  GET ({ commit, rootState }, { teamId }) {
    return http({
      path: myfifa.teams.record,
      pathData: { teamId },
      token: rootState.session.token,
      success: ({ data }) => { Team.insert({ data }) }
    })
  },
  ANALYZE_SEASON ({ rootState }, { teamId, season }) {
    return http({
      method: 'post',
      path: myfifa.analyze.season,
      pathData: { teamId, season },
      token: rootState.session.token
    })
  },
  CREATE ({ commit, rootState }, team) {
    return http({
      method: 'post',
      path: myfifa.teams.index,
      token: rootState.session.token,
      data: { team },
      success: ({ data }) => {
        Team.insert({ data })
      }
    })
  },
  UPDATE ({ commit, rootState }, team) {
    return http({
      method: 'patch',
      path: myfifa.teams.record,
      pathData: { teamId: team.id },
      token: rootState.session.token,
      data: { team },
      success: ({ data }) => { Team.insert({ data }) }
    })
  },
  REMOVE ({ commit, rootState }, teamId) {
    return http({
      method: 'delete',
      path: myfifa.teams.record,
      pathData: { teamId },
      token: rootState.session.token,
      success: ({ data }) => { Team.delete(data.id) }
    })
  }
}

export default {
  namespaced: true,
  actions
}
