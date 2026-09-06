import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsuariosPage } from "../pages/UsuariosPage";
import { VeiculosPage } from "../pages/VeiculosPage";
import { LoginPage } from "../pages/LoginPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona a raiz para a tela de Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rotas da aplicação */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<UsuariosPage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />

        {/* Rota 404 para caminhos não encontrados */}
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>Página Não Encontrada (404)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}