"use strict";

const RequestPromise = require('request-promise');

module.exports = class RestApiClient {
  constructor() { }

  /**
   * Makes an HTTP GET request.
   * @name getRequest
   * @param {string} uri - The request uri.
   * @param {string} auth - The request authorization header.
   */
  async getRequest(uri, auth) {
    let response = await this.request(uri, 'GET', auth);
    return response;
  }

  /**
   * Makes an HTTP JSON POST request.
   * @name postJsonRequest
   * @param {string} uri - The request uri.
   * @param {string} auth - The request authorization header.
   * @param {string} content - The request JSON string.
   */
  async postJsonRequest(uri, auth, content) {
    let response = await this.postRequest(uri, auth, 'application/json', JSON.stringify(content));
    return response;
  }

  /**
   * Makes an HTTP POST request.
   * @name postRequest
   * @param {string} uri - The request uri.
   * @param {string} auth - The request authorization header.
   * @param {string} contentType - The request content type.
   * @param {string} content - The request content.
   */
  async postRequest(uri, auth, contentType, content) {
    let response = await this.request(uri, 'POST', auth, contentType, content);
    return response;
  }

  /**
   * Makes an HTTP request.
   * @name request
   * @param {string} method - The request method.
   * @param {string} uri - The request uri.
   * @param {string} auth - The request authorization header.
   * @param {string} [contentType] - The request content type.
   * @param {string} [content] - The request content.
   */
  async request(uri, method, auth = null, contentType = null, content = null) {
    let options = {
      uri: uri,
      method: method,
      rejectUnauthorized: false,
      headers: { }
    };

    if (auth && auth !== '') {
      options.headers['Authorization'] = auth;
    }

    if (contentType && content) {
      options.body = content;
      options.headers['Content-Type'] = contentType;
    }

    return await RequestPromise(options);
  }
}
