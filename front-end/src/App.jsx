
import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Login from "./pages/Login"
import Chat from "./pages/Chat"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
