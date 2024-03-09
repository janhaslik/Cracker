import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.tsx";
import ShipsPage from "./pages/ships/shipspage/ShipsPage.tsx";
import ShipDetailsPage from "./pages/ships/ShipDetailsPage.tsx"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route index/>
        </Route>
        <Route
          path="/ships"
          element={<MainLayout />}
        >
          <Route index element={<ShipsPage />} />
          <Route path=":ship" element={<ShipDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;