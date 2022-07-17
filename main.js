import { Server } from "./src/server.js";
import {
  StandardWebSocketClient,
} from "https://deno.land/x/websocket@v0.1.4/mod.ts";

// Deno.title = `${Deno.env.get("NAME")}@${Deno.pid}`;

new Server();

const ws = new StandardWebSocketClient("ws://127.0.0.1:8080");
ws.on("open", () => {
  console.log("ws connected!");
  ws.send("something")
});