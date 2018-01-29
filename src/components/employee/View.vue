<template>
  <div id='employee-view' >
      <md-progress-bar md-mode="indeterminate" v-if='isLoading'></md-progress-bar>
      <form novalidate class="md-layout-row md-gutter">
     <md-card class="md-flex-50 md-flex-small-100">
       <md-card-header>
         <div class="md-title">View Employee</div>
       </md-card-header>

       <md-card-content>
         <div class="md-layout-row md-layout-wrap md-gutter">
           <div class="md-flex md-flex-small-100">
             <md-field>
               <label for="first-name">First Name</label>
               <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="isView" />
             </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
             <md-field>
               <label for="last-name">Last Name</label>
               <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="isView" />
             </md-field>
           </div>
         </div>

         <div class="md-layout-row md-gutter md-layout-wrap">
           <div class="md-flex md-flex-small-100">
             <md-field>
               <label for="gender">Gender</label>
               <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="isView">
                 <md-option></md-option>
                 <md-option value="M">M</md-option>
                 <md-option value="F">F</md-option>
               </md-select>
             </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
               <md-field>
                 <label for="email">Email</label>
                 <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="isView" />
               </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
               <md-field >
                 <label for="title">Title</label>
                 <md-input type="title" name="title" id="title" autocomplete="title" v-model="form.title" :disabled="isView" />
               </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
               <md-field >
                 <label for="phone">Phone</label>
                 <md-input type="phone" name="phone" id="phone" autocomplete="phone" v-model="form.phone" :disabled="isView" />
               </md-field>
           </div>

         </div>

         <label for="dateOfBirth">Date of Birth</label>
          <md-datepicker v-model="form.dateOfBirth" :md-open-on-focus="false" :disabled="isView" />

          <label for="employmentStartDate">Employement Start Date</label>
           <md-datepicker v-model="form.employmentStartDate" :md-open-on-focus="false" :disabled="isView" />

           <md-card-actions>
             <md-button type="submit" class="md-primary" @click='goBack'>Cancel</md-button>
           </md-card-actions>
       </md-card-content>
     </md-card>
     <error :error='error' ref="errorAlert"></error>
   </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import ErrorAlert from '../alert/Error'

// import employee services
import EmployeeService from '../../services/Employee'
const employeeService = new EmployeeService()

export default {
  name: 'EmployeeView',
  componets: [ErrorAlert],
  mixins: [validationMixin],
  data: () => ({
    form: {
      id: null,
      firstName: null,
      lastName: null,
      gender: null,
      dateOfBirth: null,
      email: null,
      employmentStartDate: null,
      phone: null,
      title: null
    },
    employeeSaved: false,
    isLoading: false,
    isView: true,
    lastEmployee: null,
    error: {}
  }),
  methods: {
    goBack () {
      this.isLoading = false
      this.$router.go(-1)
    }
  },
  mounted () {
    const employeeId = this.$route.query.id
    employeeService.findById(employeeId)
      .then(
        (result) => {
          this.form = result
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
