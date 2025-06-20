import { io } from "socket.io-client";

const URL = "https://aguacomunbackend-production.up.railway.app";

export const socketConnection = io(URL,{autoConnect:false})