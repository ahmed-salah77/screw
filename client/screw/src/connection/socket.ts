import io from "socket.io-client";

const URL = "https://room-app-ahmedsalah7.koyeb.app/";
const URL_LOCAL = "http://127.0.0.1:5000";

const socket = io(URL_LOCAL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
});

export { socket };
