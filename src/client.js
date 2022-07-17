/**
 * @typedef {import('./server.js').Server} Server
 */

/**
 * @exports
 * @class
 * @module Client
 */
export class Client {
  /**
   * @param {Server} server
   * @param {any}  socket
   */
  constructor(server, socket) {
    this.server = server;
    this.socket = socket;
    this.id = this.socket.webSocket.conn.rid;
  }
}
