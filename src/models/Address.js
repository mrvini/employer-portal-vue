/**
 * @module models
 */

import Base from './Base'
/**
 * Address Model
 */
export default class Address extends Base {
    addressLine1;
    addressLine2;
    city;
    state;
    zip;
    country;

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
      this.addressLine1 = this.vCheckProperty(obj, 'addressLine1')
      this.addressLine1 = this.vCheckProperty(obj, 'addressLine2')
      this.city = this.vCheckProperty(obj, 'city')
      this.state = this.vCheckProperty(obj, 'state')
      this.zip = this.vCheckProperty(obj, 'zip')
      this.country = this.vCheckProperty(obj, 'country')
      return this
    }
}
