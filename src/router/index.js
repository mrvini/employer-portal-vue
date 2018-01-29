import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Employees from '@/components/employee/Employees'
import EmployeeAdd from '@/components/employee/Add'
import EmployeeUpdate from '@/components/employee/Update'
import EmployeeView from '@/components/employee/View'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Dashboard',
    component: Dashboard // @TODO add login screen someday
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/employees/add',
    name: 'EmployeeAdd',
    component: EmployeeAdd
  },
  {
    path: '/employees/update',
    name: 'EmployeeUpdate',
    component: EmployeeUpdate
  },
  {
    path: '/employees/view',
    name: 'EmployeeView',
    component: EmployeeView
  }
  ]
})
