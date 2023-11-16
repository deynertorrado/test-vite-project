import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { Production } from "./pages/Production";
import { Users } from "./pages/Users";
import { Manage } from "./pages/Manage";
import { General } from "./pages/General";
import { NoPage } from "./pages/NoPage";
import { Logout } from "./pages/Logout";
import { ProdComponent } from "./components/production/ProdComponent";
import { ProdGraphic } from "./components/production/ProdGraphic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NoPage />} />
        <Route index path="/" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Inicio" element={<Layout />} >
          <Route path="Gestionar" element={<Manage />} />
          <Route path="Usuarios" element={<Users />} />
          <Route path="Produccion" element={<Production />} >
            <Route path="Agregar" element={<ProdComponent />} />
            <Route path="Consultar" element={<ProdGraphic />} />
          </Route>
          <Route path="General" element={<General />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App