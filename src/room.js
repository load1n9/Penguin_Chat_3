
/**
 * @typedef {import('./client.js').Client} Client
 */

/**
 * @exports
 * @class
 * @module Room
 */
export class Room {
  /**
   * @constructor
   * @param {number} id - The room id
   * @param {string} name - The room name
   */
  constructor(id, name) {
    /**
     * @description The room id
     * @type {number}
     */
    this.id = id;
    /**
     * @description The room name
     * @type {string}
     */
    this.name = name;
    /**
     * @description The map holding the clients
     * @type {Map<id, Client>}
     */
    this.clients = new Map();
  }

  /**
   * @description Returns the amount of clients in the room
   * @returns {number} The amount of clients
   */
  get size() {
    return this.clients.size;
  }
}
