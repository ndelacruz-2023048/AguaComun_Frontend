import MyRouter from "./routers/routes"
import { AuthContextProvider } from './context/AuthContext'
import { socketConnection as socket } from './socket/socket'; 
import { useEffect } from "react";
import { Tooltip } from 'react-tooltip';

function App() {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Conectado al servidor con id:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado del servidor");
    });

    return () => {
      socket.disconnect(); // solo si cierras la app
    };
  }, []);
  return (
    <AuthContextProvider>
      <Tooltip id="defaultTooltip" />
      <MyRouter />
    </AuthContextProvider>
  )
}

export default App
