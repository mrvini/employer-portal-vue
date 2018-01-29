/**
 * @module models
 */

import ValidationError from '../errors/ValidationError'
/**
 * @class module:entity.Base
 * @abstract
 */
export default class Base {
  /**
     * @description load entire object from the set
     * @method module:entity.Base.load
     * @param  {object} obj js object
     * @return {Boolean} if load of the object was successful
     */
  load (obj) {
    throw new ValidationError('Entity method "load" is not implemented')
  }

  // ---- validators or parsers

  /**
     * method to check date and return appropriate value
     * @method module:entity.Base.vCheckDate
     * @param  {object} obj object to check
     * @param  {string} property name of the property
     * @param {mix} [defaultValue=new Date()] default value
     * @return {Date|string} parsed value
     */
  vCheckDate (obj, property, defaultValue = new Date()) {
    const value = this.vCheckProperty(obj, property, defaultValue)
    return value ? new Date(value) : ''
  }

  /**
     * method to check property of the object
     * @method module:entity.Base.vCheckProperty
     * @param {object} obj object to check
     * @param {string} property name of the property
     * @param {mix} [defaultValue=false] default value
     * @return {mix} parsed value
     */
  vCheckProperty (obj, property, defaultValue = false) {
    return obj.hasOwnProperty(property) ? obj[ property ] : defaultValue
  }
}
