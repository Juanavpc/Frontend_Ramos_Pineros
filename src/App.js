import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from './scenes/login/Login';
import CreateAccount from "./scenes/createaccount/CreateAccount";
import Productions from "./scenes/productions";
import authService from './services/authService';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []); 
  console.log("isLoggedIn", isLoggedIn )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && <Sidebar isSidebar={isSidebar} />} {/* Mostrar la barra lateral solo si está autenticado */}
          <main className="content">
            {isLoggedIn && <Topbar setIsSidebar={setIsSidebar} />} {/* Mostrar la barra superior solo si está autenticado */}
            <Routes>
              {/* Rutas accesibles solo para usuarios autenticados */}
              {isLoggedIn ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/productions" element={<Productions />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="*" element={<Navigate to="/" />} /> {/* Redirigir a la página principal en caso de ruta desconocida */}
                </>
              ) : (
                <>
                  {/* Rutas accesibles solo para usuarios no autenticados */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/createAccount" element={<CreateAccount />} />
                  <Route path="*" element={<Navigate to="/login" />} /> {/* Redirigir a la página de inicio de sesión en caso de ruta desconocida */}
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
