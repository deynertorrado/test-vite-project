import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Login } from "./pages/Login";
import { Produccion } from "./pages/Produccion";
import { Usuarios } from "./pages/Usuarios";
import { Gestionar } from "./pages/Gestionar";
import { General } from "./pages/General";
import { NoPage } from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NoPage />} />
        <Route index path="/" element={<Login />} />
        <Route path="/Home" element={<Layout />}>
          <Route path="Gestionar" element={<Gestionar />} />
          <Route path="Usuarios" element={<Usuarios />} />
          <Route path="Produccion" element={<Produccion />} />
          <Route path="General" element={<General />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App