/**
 * @module services
 */

import axios from 'axios'
import EmployeeModel from '../models/Employee'
import ValidationError from '../errors/ValidationError'

const host = 'http://localhost:3000'
/**
 * Employee Manager service
 * @class module:services.EmployeeManager
 */
class EmployeeManager {
  /**
   * @description create employee method
   * @method module:services.EmployeeManager.create
   * @param  {EmployeeModel} [employee=false] employee model
   * @return {Promise<EmployeeModel>} employee model
   */
  create (employee = false) {
    if (!(employee instanceof EmployeeModel)) {
      return Promise.reject(new ValidationError('Employee object is invalid in create employee'))
    }

    return axios.post(
      `${host}/employees`,
      employee)
      .then(response => {
        console.log('i am getting response', response)
      })
      .catch(
        e => {
          throw e
        }
      )
  }

  /**
   * @description create employee method
   * @method module:services.EmployeeManager.udpate
   * @param  {EmployeeModel} [employee=false] employee model
   * @return {Promise<EmployeeModel>} employee model
   */
  update (employee = false) {
    if (!(employee instanceof EmployeeModel)) {
      return Promise.reject(new ValidationError('Employee object is invalid in update employee'))
    }
    if (!employee.id) {
      return Promise.reject(new ValidationError('Employee id is not specified'))
    }
    return axios.put(
      `${host}/employees/${employee.id}`,
      employee)
      .then(response => {
        // reload employee model and return;
        return employee.load(response.data)
      })
      .catch(
        e => {
          throw e
        }
      )
  }

  /**
   * @description create employee method
   * @method module:services.EmployeeManager.delete
   * @param  {string} [id=false] id of the employee
   * @return {Boolean} status of the operation
   */
  delete (id = false) {
    if (!id) {
      return Promise.reject(new ValidationError('Employee id is invalid in findById'))
    }
    return Promise.resolve(true)
  }

  /**
   * @description find employee by id
   * @method module:services.EmployeeManager.findById
   * @param  {string} [id=false] unique id of the employee
   * @return {Promise<EmployeeModel>} employee model
   */
  findById (id = false) {
    if (!id) {
      return Promise.reject(new ValidationError('Employee id is invalid in findById'))
    }
    return axios.get(`${host}/employees/${id}`)
      .then(response => {
        // load employee model and return;
        const employee = new EmployeeModel()
        return employee.load(response.data)
      })
      .catch(
        e => {
          throw e
        }
      )
  }

  /**
   * @description find employee by criteria
   * @method module:services.EmployeeManager.findByCriteria
   * @param  {object} [criteria={}] search criteria object
   * @return {Promise<[EmployeeModel]>} array of employee models
   */
  findByCriteria (criteria = {}) {
    const searchCriteria = {}
    if (criteria && Object.keys(criteria).length > 0) {
      Object.assign(searchCriteria, criteria)
    }

    const employeeList = []
    return axios.get(`${host}/employees`)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log(response.data)
        response.data.forEach(
          (el) => {
            const employee = new EmployeeModel()
            employee.load(el)
            employeeList.push(employee)
          }
        )
        return employeeList
      })
      .catch(e => {
        throw e
      })
  }
}

export default EmployeeManager
