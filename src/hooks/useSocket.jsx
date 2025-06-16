import { use, useEffect } from "react"
import { socketConnection as socket } from "../socket/socket";

export const useSocket = () => {
    
    return socket
}