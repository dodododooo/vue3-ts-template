import { createRouter, createWebHashHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHashHistory(),
  // You don't need to pass the routes anymore,
  // the plugin writes it for you 🤖
  extendRoutes: (routes) => {
    console.log(routes)
    // completely optional since we are modifying the routes in place
    return routes
  },
})

export default router
