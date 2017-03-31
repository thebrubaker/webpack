export default [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    component: require('layouts/admin'),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    component: require('layouts/login')
  }
]
