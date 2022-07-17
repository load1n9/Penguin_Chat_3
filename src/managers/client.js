/**
 * @typedef {import('../client.js').Client} Client
 */

/**
 * @exports
 * @class
 * @module ClientManager
 */
export class ClientManager {
  /**
   * @private
   * @description The map holding the clients
   * @type {Map<number, Client>}
   */
  #clients;

  /**
   * @constructor
   */
  constructor() {
    /**
     * @private
     * @description Initialize the client holder
     * @type {Map<number, Client>}
     */
    this.#clients = new Map();
  }
  add(client) {
    this.#clients.set(client.id, client);
  }
  /**
   * @description Returns the amount of clients in the manager
   * @returns {number} The amount of clients
   */
  get size() {
    return this.#clients.size;
  }
}
