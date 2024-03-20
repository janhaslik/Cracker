import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout.tsx";
import ShipsPage from "./pages/ships/shipspage/ShipsPage.tsx";
import ShipDetailsPage from "./pages/ships/shipdetailspage/ShipDetailsPage.tsx"
import './App.css';
import ShipmentsPage from "./pages/shipments/ShipmentsPage.tsx";
import MaintenancesPage from "./pages/maintenances/maintenancespage/MaintenancesPage.tsx";
import CrewMembersPage from "./pages/crewmembers/crewmemberspage/CrewMembersPage.tsx";

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
          <Route path=":shipnr" element={<ShipDetailsPage />} />
        </Route>
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route path="shipments" element={<ShipmentsPage/>}/>
          <Route path="maintenances" element={<MaintenancesPage/>}/>
          <Route path="crewmembers" element={<CrewMembersPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;