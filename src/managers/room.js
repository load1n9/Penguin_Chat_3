import { Room }  from '../room.js';

/**
 * @typedef {import('../room.js').Room} Room
 * @typedef {import('../client.js').Client} Client
 */

/**
 * @exports
 * @class
 * @module RoomManager
 */
export class RoomManager {
  /**
   * @private
   * @description The map holding the rooms
   * @type {Map<number, Room>}
   */
  #rooms;

  /**
   * @constructor
   */
  constructor() {
    /**
     * @private
     * @description Initialize the client holder
     * @type {Map<number, Room>}
     */
    this.#rooms = new Map();
  }

  /**
   * @description Returns the amount of rooms in the manager
   * @returns {number} The amount of rooms
   */
  get size() {
    return this.#rooms.size;
  }

  /**
   * @async
   * @description Initializes the room manager
   */
  async initialize() {
    //! This is experimental, but it doesn't matter that much to us
    const jsonRooms = (await import('../crumbs/rooms.json', { assert: { type: 'json' } })).default;

    for (const id in jsonRooms) {
      const data = Object.values(jsonRooms[id]);

      this.#rooms.set(+id, new Room(+id, ...data));
    }
  }
}
