import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomeView from '../views/pages/Home.vue'
import ProfileView from '../views/pages/Profile.vue'
import LoginView from '../views/auth/Login.vue'
import ResetView from '../views/auth/password/Reset.vue'
import ManageUserView from '../views/pages/ManageCustomer.vue'
import ForgotView from '../views/auth/password/Forgot.vue'
import ResetSuccessView from '../views/auth/password/ResetSuccess.vue'
import ForbiddenView from '../views/auth/ForbiddenView.vue'
import AddCustomerView from '../views/pages/AddCustomer.vue'
import EditCustomerView from '../views/pages/EditCustomer.vue'
import ManageObatView from '../views/pages/ManageObat.vue'
import AddObat from '../views/pages/AddObat.vue'
import EditObatView from '../views/pages/EditObat.vue'
import ManageResepview from '../views/pages/ManageResep.vue'
import AddResepView from '../views/pages/AddResep.vue'
import AddTransactionView from '../views/pages/AddTransaction.vue'


const routes = [
  {path:'/', name: 'login', component: LoginView, meta: { guest: true }},
  {path: '/reset_password', name: 'reset', component: ResetView, meta: { guest: true }}, 
  {path: '/reset_success', name: 'reset_success', component: ResetSuccessView, meta: { guest: true}},
  {path: '/forgot', name: 'forgot', component: ForgotView, meta: { guest: true }},
  {path: '/dashboard', name: 'dashboard', component: HomeView, meta: { auth: true }},
  {path: '/profile', name: 'profile', component: ProfileView, meta: { auth: true }},
  {path: '/manage', name: 'manageuser', component: ManageUserView, meta: { admin: true }},
  {path: '/403', name: 'forbidden', component: ForbiddenView, meta: { guest : true}},
  {path: '/addcustomer', name: 'addcustomer', component: AddCustomerView, meta: { admin: true }},
  {path: '/editcustomer/:id', name: 'editcustomer', component: EditCustomerView, meta: { admin: true }},
  {path: '/obat', name: 'manageobat', component: ManageObatView, meta: { admin: true }},
  {path: '/addobat', name: 'addobat', component: AddObat, meta: { admin: true }},
  {path: '/editobat/:id', name: 'editobat', component: EditObatView, meta: { admin: true }},
  {path: '/resep', name: 'manageresep', component: ManageResepview, meta: { admin: true }},
  {path: '/addresep', name: 'addresep', component: AddResepView, meta: { admin: true }},
  {path: '/addtransaction', name: 'addtransaction', component: AddTransactionView, meta: { admin: true }},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)){
    if (!store.getters.GET_AUTH_STATUS) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)){
    if (store.getters.GET_AUTH_STATUS) {
      next({
        name: 'dashboard'
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.admin)){
    if (!store.getters.GET_AUTH_STATUS){
      next({
        name: 'login'
      })
    } else if (!store.getters.GET_AUTH_INFO.role) {
      next({
        name: 'dashboard'
      })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.reset)){
    if (store.getters.GET_AUTH_STATUS){
      next({
        name: 'dashboard'
      })
    } else if (!store.getters.GET_AUTH_RESET) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
