import MyRouter from "./routers/routes"
import { AuthContextProvider } from './context/AuthContext'

function App() {

  return (
    <AuthContextProvider>
      <MyRouter />
    </AuthContextProvider>
  )
}

export default App
