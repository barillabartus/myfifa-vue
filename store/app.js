const appTitle = 'MyFIFA Manager'

// initial state
export const state = () => ({
  drawer: false,
  title: appTitle,
  overline: '',
  headline: '',
  caption: ''
})

// mutations
export const mutations = {
  setTitle (state, title) {
    state.title = title || appTitle
  },
  setPage (state, { title, overline, headline, caption }) {
    state.title = title || appTitle
    state.overline = overline
    state.headline = headline
    state.caption = caption
  },
  setDrawer (state, drawer) {
    state.drawer = drawer
  },
  toggleDrawer (state) {
    state.drawer = !state.drawer
  }
}
