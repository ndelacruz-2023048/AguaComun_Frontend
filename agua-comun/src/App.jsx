import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-4 mb-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 p-6 transition-all duration-300 hover:shadow-lg rounded-lg" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 p-6 transition-all duration-300 hover:shadow-lg rounded-lg" alt="React logo" />
        </a>
      </div>
      <span className="inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 mb-4">
        Vite + React
      </span>
      <div className="bg-white shadow-md rounded-lg p-4 text-center mb-4 h-50 w-150">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
        >
          count is {count}
        </button>
        <p className="mt-2 text-gray-600">
          Edit <code className="font-mono">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-700">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
