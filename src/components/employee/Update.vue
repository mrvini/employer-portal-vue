<template>
  <div id='employee-view' >
      <md-progress-bar md-mode="indeterminate" v-if='isLoading'></md-progress-bar>
      <form novalidate class="md-layout-row md-gutter" @submit.prevent="processEmployee">
     <md-card class="md-flex-50 md-flex-small-100">
       <md-card-header>
         <div class="md-title">Update Employee: {{form.firstName}} {{form.lastName}}</div>
       </md-card-header>

       <md-card-content>
         <div class="md-layout-row md-layout-wrap md-gutter">
           <div class="md-flex md-flex-small-100">
             <md-field :class="getValidationClass('firstName')">
               <label for="first-name">First Name</label>
               <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="isLoading" />
               <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
               <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
             </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
             <md-field :class="getValidationClass('lastName')">
               <label for="last-name">Last Name</label>
               <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="isLoading" />
               <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
               <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
             </md-field>
           </div>
         </div>

         <div class="md-layout-row md-gutter md-layout-wrap">
           <div class="md-flex md-flex-small-100">
             <md-field>
               <label for="gender">Gender</label>
               <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="isLoading">
                 <md-option></md-option>
                 <md-option value="M">M</md-option>
                 <md-option value="F">F</md-option>
               </md-select>
             </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
               <md-field :class="getValidationClass('email')">
                 <label for="email">Email</label>
                 <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="isLoading" />
                 <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                 <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
               </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
               <md-field :class="getValidationClass('title')">
                 <label for="title">Title</label>
                 <md-input type="title" name="title" id="title" autocomplete="title" v-model="form.title" :disabled="isLoading" />
                 <span class="md-error" v-if="!$v.form.title.required">The title is required</span>
                 <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid Title</span>
               </md-field>
           </div>

           <div class="md-flex md-flex-small-100">
               <md-field :class="getValidationClass('phone')">
                 <label for="phone">Phone</label>
                 <md-input type="phone" name="phone" id="phone" autocomplete="phone" v-model="form.phone" :disabled="isLoading" />
                 <span class="md-error" v-if="!$v.form.phone.required">The Phone is required</span>
                 <span class="md-error" v-else-if="!$v.form.phone.minlength">Invalid Phone</span>
               </md-field>
           </div>

         </div>

         <div class="md-flex md-flex-small-100">
           <md-field :class="getValidationClass('dateOfBirth')">
             <label for="dateOfBirth">Date of Birth</label>
              <md-datepicker v-model="form.dateOfBirth" :md-open-on-focus="false" :disabled="isLoading" />
              <span class="md-error" v-if="!$v.form.dateOfBirth.required">The Date of Birth is required</span>
           </md-field>
         </div>

         <div class="md-flex md-flex-small-100">
           <md-field :class="getValidationClass('employmentStartDate')">
             <label for="employmentStartDate">Employement Start Date</label>
              <md-datepicker v-model="form.employmentStartDate" :md-open-on-focus="false" :disabled="isLoading" />
              <span class="md-error" v-if="!$v.form.employmentStartDate.required">The Employment start date is required</span>
           </md-field>
         </div>
       </md-card-content>

       <md-card-actions>
         <md-button type="submit" class="md-primary" @click='goBack'>Cancel</md-button>
         <md-button type="submit" class="md-primary" :disabled="isLoading">Save</md-button>
       </md-card-actions>
     </md-card>

     <md-snackbar :md-active.sync="employeeSaved">The user {{ lastEmployee }} was saved with success!</md-snackbar>
     <error :error='error'></error>
   </form>
  </div>
</template>

<script>
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators'
import Error from '../alert/Error'

// import employee services
import EmployeeService from '../../services/Employee'
import EmployeeModel from '../../models/Employee'
const employeeService = new EmployeeService()
Vue.component('error', Error)
export default {
  name: 'EmployeeUpdate',
  componets: [Error],
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
    lastEmployee: null,
    isError: false,
    error: ''
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      dateOfBirth: {
        required
      },
      email: {
        required,
        email
      },
      employmentStartDate: {
        required
      },
      phone: {
        required,
        minLength: minLength(10)
      },
      title: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    goBack() {
        this.isLoading = false
        this.clearForm()
        this.$router.go(-1)
    },
    clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.gender = null
        this.form.email = null
        this.form.phone = null
        this.form.employmentStartDate = null
        this.form.dateOfBirth = null
    },
    saveEmployee () {
      this.isLoading = true
      const employee = new EmployeeModel()
      employee.load(this.form).setUpdatedAt()
      employeeService.update(employee)
        .then(
          (updatedEmployee) => {
            this.form = updatedEmployee;
            this.lastEmployee = `${this.form.firstName} ${this.form.lastName}`
            this.employeeSaved = true
          }
        )
        .catch(
          (err) => {
            this.isError = true
            alert('This is the error', err) // display error dialog
          }
        )
        .finally(
            () => {
                this.isLoading = false
            }
        )
    },
    processEmployee () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveEmployee()
      }
    }
  },
  created () {
    // load employee first thing
    const self = this
    const employeeId = this.$route.query.id
    employeeService.findById(employeeId)
      .then(
        (result) => {
          console.log(result);
          self.form = result
          self.isLoading = false
        }
      )
      .catch(
        (err) => {
          this.isError = true
          this.error = err
          self.isLoading = false
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
