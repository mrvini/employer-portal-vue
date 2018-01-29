<template>
  <div id='employee-list'>
      <md-progress-bar md-mode="indeterminate" v-if='isLoading'></md-progress-bar>
      <md-table v-model="searched" md-sort="fullName" md-sort-order="asc" md-card md-fixed-header>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Employees</h1>
          </div>

          <md-field md-clearable class="md-toolbar-section-end">
            <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
          </md-field>
        </md-table-toolbar>

        <md-table-empty-state md-label="No employees found" :md-description="`No employee found for this '${search}' query. Try a different search term or create a new employee.`">
          <md-button class="md-primary md-raised"  :to="{ path: '/employees/add' }">Register New Employee</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
          <md-table-cell md-label="Name" md-sort-by="fullName">{{ item.fullName }}</md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
          <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
          <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
          <md-table-cell md-label="Employment Start Date" md-sort-by="employmentStartDate">{{ item.employmentStartDate | formatDate }}</md-table-cell>
          <md-table-cell @md-selected.prevent="updateEmployee">
              <md-button class="md-icon-button" :to="{path:'/employees/update', query: { id: item.id }}">
               <md-icon>edit</md-icon>
               <md-tooltip md-direction="left">Update Employee: {{ item.fullName }} </md-tooltip>
             </md-button>
             <md-button class="md-icon-button" :to="{path:'/employees/view', query: { id: item.id }}">
              <md-icon>visibility</md-icon>
              <md-tooltip md-direction="left">View Employee: {{ item.fullName }}</md-tooltip>
            </md-button>
            <md-button class="md-icon-button" @click='deleteEmployee(item)'>
             <md-icon>delete_forever</md-icon>
             <md-tooltip md-direction="left">Delete Employee: {{ item.fullName }}</md-tooltip>
           </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
      <md-dialog-confirm
          :md-active.sync="deleteDialogActive"
          md-title="Dete Employee"
          md-content="Are you sure you'd like to remove employee?"
          md-confirm-text="Yes"
          md-cancel-text="No"
          @md-cancel="onCancelDelete"
          @md-confirm="onConfirmDelete" />
      <div class='addEmployeeFab'>
          <md-button class="md-fab" :to="{path:'/employees/add'}">
            <md-icon>add</md-icon>
          </md-button>
      </div>
      <error :error='error' ref="errorAlert"></error>

  </div>
</template>

<script>
import ErrorAlert from '../alert/Error'
// import employee services
import EmployeeService from '../../services/Employee'
const employeeService = new EmployeeService()

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(
        item => toLower(item.fullName).includes(toLower(term))
    )
  }
  return items
}

export default {
  name: 'EmployeeList',
  componets: [ErrorAlert],
  data: () => ({
    deleteDialogActive: false,
    employeeToDelete: null,
    isLoading: true,
    search: null,
    searched: [],
    employees: [],
    error: {}
  }),
  methods: {
    newUser () {
      window.alert('Noop')
    },
    searchOnTable () {
      this.searched = searchByName(this.employees, this.search)
    },
    viewEmployee (item) {
      this.$router.push({path: '/employees/view/', query: { id: item.id }})
    },
    updateEmployee (item) {
      this.$router.push({path: '/employees/update/', query: { id: item.id }})
    },
    deleteEmployee (item) {
      this.deleteDialogActive = true
      this.employeeToDelete = item
    },
    reloadEmlpoyees () {
      employeeService.findByCriteria()
        .then(
          (results) => {
            this.searched = this.employees = results
            this.isLoading = false
          }
        )
        .catch(
          (err) => {
            this.error = err
            this.$refs.errorAlert.isActive = true
            this.isLoading = false
          }
        )
    },
    onConfirmDelete () {
      employeeService.delete(this.employeeToDelete.id)
        .then(
          (success) => {
            this.employeeToDelete = null
            return this.reloadEmlpoyees()
          }
        )
        .catch(
          (err) => {
            this.error = err
            this.$refs.errorAlert.isActive = true
            this.isLoading = false
            this.employeeToDelete = null
          }
        )
    },
    onCancelDelete () {
      this.employeeToDelete = null
    }
  },
  mounted () {
    this.reloadEmlpoyees()
  },
  filters: {
    formatDate: (date) => {
      let currentDate = date
      if (typeof currentDate !== 'object' && typeof currentDate !== 'string') {
        return ''
      } else if (typeof currentDate === 'string') {
        currentDate = new Date(date)
      }
      return currentDate.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
  .md-field {
    max-width: 300px;
  }
  .addEmployeeFab {
      float: right;
      padding: 20px;
  }
</style>
