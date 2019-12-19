import VuexORM from '@vuex-orm/core'
import database from '@/database'
import cookieparser from 'cookieparser'
import { http, routes } from '@/api'
import pkg from '@/package.json'

// initial state
export const state = () => ({
  version: pkg.version,
  token: null
})

// getters
export const getters = {
  authenticated: state => state.token !== null
}

// mutations
export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  }
}

// actions
export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req, params }) {
    if (req.headers.cookie) {
      var parsed = cookieparser.parse(req.headers.cookie)

      if ('token' in parsed) {
        const accessToken = parsed.token
        commit('SET_TOKEN', accessToken)

        try {
          await dispatch('user/GET')

          // load current Team, if present
          if ('teamId' in params) {
            await dispatch('teams/GET', params)
          }
        } catch (e) {
          commit('SET_TOKEN', null)
        }
      }
    }
  },
  login ({ commit }, payload) {
    return http({
      method: 'post',
      path: routes.token.get,
      data: payload,
      success ({ data }) {
        commit('SET_TOKEN', data.access_token)
        commit('broadcaster/ANNOUNCE', {
          message: 'You have successfully logged in!',
          color: 'success'
        }, { root: true })
      }
    })
  },
  logout ({ commit, state }) {
    return http({
      method: 'post',
      path: routes.token.revoke,
      token: state.token,
      success ({ data }) {
        commit('SET_TOKEN', null)
        commit('broadcaster/ANNOUNCE', {
          message: 'You have successfully logged out!',
          color: 'danger'
        }, { root: true })
      }
    })
  }
}

// plugins
export const plugins = [
  VuexORM.install(database)
]
