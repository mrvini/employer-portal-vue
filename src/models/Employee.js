/**
 * @module models
 */

import Base from './Base'
/**
 * Employee Model
 */
export default class Employee extends Base {
    id = '';
    firstName = '';
    lastName = '';
    email = '';
    dateOfBirth;
    title = 'Unknown';
    gender = '';
    employmentStartDate;
    phone = '';
    status; // pending, active, inactive

    /**
     * @description populate Employee class from the object
     * @method module:entity.Employee.load
     * @param  {object} obj js object
     * @return {UserEntity} UserEntity itself
     */
    load (obj) {
      if (Object.keys(obj).length === 0) {
        return false
      }
      this.id = obj.id
      this.firstName = this.vCheckProperty(obj, 'firstName')
      this.lastName = this.vCheckProperty(obj, 'lastName')
      this.email = this.vCheckProperty(obj, 'email')
      this.dateOfBirth = this.vCheckDate(obj, 'dateOfBirth')
      this.title = this.vCheckProperty(obj, 'title', this.title)
      this.gender = this.vCheckProperty(obj, 'gender', this.gender)
      this.employmentStartDate = this.vCheckDate(obj, 'employmentStartDate', this.employmentStartDate)

      this.phone = this.vCheckProperty(obj, 'phone')
      this.status = this.vCheckProperty(obj, 'status')
      this.createdAt = this.vCheckDate(obj, 'createdAt')
      this.updatedAt = this.vCheckDate(obj, 'updatedAt')
      return this
    }

    /**
     * @description getter for full name
     * @method module:entity.Employee.fullName
     * @return {string} full name of the employee
     */
    get fullName () {
      return `${this.firstName} ${this.lastName}`
    }

    /**
     * @description set created date to now
     * @method module:entity.Employee.setCreatedAt
     * @return {void}
     */
    setCreatedAt () {
      this.createdAt = new Date()
      return this
    }

    /**
     * @description set udpated date to now
     * @method module:entity.Employee.setUpdatedAt
     * @return {void}
     */
    setUpdatedAt () {
      this.updatedAt = new Date()
      return this
    }
}
