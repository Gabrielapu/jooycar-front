import { createRouter, createWebHistory } from 'vue-router'
import Trips from '../views/Trips.vue'
import TripDetail from '../views/TripDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Trips
    },
    {
      path: '/trip/:id',
      name: 'trip-detail',
      component: TripDetail
    }
  ]
})

export default router
