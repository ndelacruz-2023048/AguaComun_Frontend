import { use, useEffect } from "react"
import { socketConnection as socket } from "../socket/socket";

export const useSocket = () => {
    useEffect(()=>{
        socket.connect()

        socket.on("connect", () => {
            console.log("Socket conectado con id:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket desconectado");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.disconnect();
        }
    },[])

    return socket
}