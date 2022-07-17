//? Native modules
import debug from "https://esm.sh/debug@4.3.4";

//? Our modules
import { Client } from "./client.js";
import { ClientManager } from "./managers/client.js";
import { RoomManager } from "./managers/room.js";

//? NPM modules
import { WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
// import exitHook from "https://esm.sh/async-exit-hook@2.0.1";

/**
 * @exports
 * @default
 * @class
 * @module Server
 */
export class Server {
  static address;
  /**
   * @static
   * @private
   * @description The debug logger
   */
  static #logger;

  /**
   * @description The client manager
   * @type {ClientManager}
   */
  clientManager;
  /**
   * @description The room manager
   * @type {RoomManager}
   */
  roomManager;

  /**
   * @constructor
   */
  constructor() {
    Server.#initialize();
  }

  /**
   * @static
   * @private
   * @description Initializes the server
   */
  static async #initialize() {
    this.#logger = debug("pc3");

    this.#setProperties();
    await this.#initializeProperties();
    this.#startServer();

    // Deno?.send?.("ready"); //? Here we send the ready signal to PM2
    // exitHook(() => this.#beforeExit()); //? Here we run anything before exiting
  }

  /**
   * @static
   * @private
   * @description Sets server properties
   */
  static #setProperties() {
    this.clientManager = new ClientManager();
    this.roomManager = new RoomManager();
  }

  /**
   * @static
   * @private
   * @description Initializes server properties
   */
  static async #initializeProperties() {
    await this.roomManager.initialize();

    this.#logger(`Loaded ${this.roomManager.size} rooms`);
  }

  /**
   * @static
   * @private
   * @description Starts the server
   */
  static #startServer() {
    const wss = new WebSocketServer(8080);
    wss.on("connection", (socket) => {
      const _client = new Client(this, socket);
      this.clientManager.add(_client);
      socket.on("message", (data) => {
        console.log("received: %s", data);
      });
    });

    this.#logger(
      `PC3 (${Deno.env.get("NAME") || "default"}) running on ${
        Deno.env.get("HOST") || "localhost"
      }:${Deno.env.get("PORT") || 8080}}`,
    );
  }

  /**
   * @static
   * @private
   * @async
   * @description Runs some code before exiting
   */
  // deno-lint-ignore require-await
  static async #beforeExit() {
    this.#logger("Shutting down");

    Deno.exit();
  }
}
