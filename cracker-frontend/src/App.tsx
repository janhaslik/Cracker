import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavLayout from "./components/NavLayout.tsx"
import ShipsPage from "./pages/ships/ShipsPage.tsx"
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavLayout/>
          <Routes>
            <Route path="/"/>
            <Route path="/ships" element={<ShipsPage/>}/>
            <Route path="/ships/:ship"/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
