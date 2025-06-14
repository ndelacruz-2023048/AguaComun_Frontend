import { io } from "socket.io-client";

const URL = "http://localhost:3662";

export const socketConnection = io(URL,{autoConnect:false})