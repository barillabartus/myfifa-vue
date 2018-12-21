import http from '@/api'
import myfifa from '@/api/myfifa'
import { Competition } from '@/models'

// actions
const actions = {
  FETCH ({ state, commit, rootState }, { teamId }) {
    return http({
      path: myfifa.competitions.index,
      pathData: { teamId },
      token: rootState.session.token,
      success: function ({ data }) { Competition.insert({ data }) }
    })
  },
  GET ({ state, commit, rootState }, { competitionId }) {
    const competition = Competition.find(competitionId)
    if (competition) {
      return { data: competition }
    } else {
      return http({
        path: myfifa.competitions.record,
        pathData: { competitionId },
        token: rootState.session.token,
        success: function ({ data }) { Competition.insert({ data }) }
      })
    }
  },
  CREATE ({ commit, rootState }, { teamId, competition }) {
    return http({
      method: 'post',
      path: myfifa.competitions.index,
      pathData: { teamId },
      token: rootState.session.token,
      data: { competition }
    })
  },
  UPDATE ({ commit, rootState }, competition) {
    return http({
      method: 'patch',
      path: myfifa.competitions.record,
      pathData: { competitionId: competition.id },
      token: rootState.session.token,
      data: { competition }
    })
  },
  REMOVE ({ commit, rootState }, competitionId) {
    return http({
      method: 'delete',
      path: myfifa.competitions.record,
      pathData: { competitionId },
      token: rootState.session.token
    })
  }
}

export default {
  namespaced: true,
  actions
}
