export default function ({ app, store, route, redirect }) {
  if (store.state.auth.token) {
    if (route.name === 'login') {
      redirect({ name: 'index' })
    }
  } else if (route.name !== 'login') {
    app.$cookies.set('targetRoute', route)
    redirect({ name: 'login' })
  }
}
