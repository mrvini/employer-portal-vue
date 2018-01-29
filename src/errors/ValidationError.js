
/**
 * @module errors
 */

/**
 * @description custom Validation Error
 *
 * @class module:errors.ValidationError
 * @extends module:errors.BaseError
 */
export default class ValidationError {
  /**
   * @description custom Service Error constructor
   * @constructor
   * @method  module:errors.ValidationError.constructor
   * @param {string} message error message
   * @param {string} type error type message
   * @param {object} invalidAttributes of invalid attributes
   * @returns {void}
   */
  constructor (message, type) {
    this.name = 'ValidationError'
    this.message = message || ''
    this.type = type || 'ValidationError'
  }

  /**
   * method to redefined toJSON class
   * @method module:errors.BaseError.toJSON
   * @return {object} class object
   */
  toJSON () {
    const object = {}
    Object.getOwnPropertyNames(this).forEach(
      function setPropertyCallback (key) {
        if (key !== 'stack') {
          object[key] = this[key]
        }
      },
      this
    )
    return object
  }
}
