import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Drawer, Button, theme } from "antd";
import {
  CloudOutlined,
  EnvironmentOutlined,
  TableOutlined,
  DashboardOutlined,
  MenuOutlined,
} from "@ant-design/icons";
// Importação das páginas da aplicação
import EstadoDoTempoLista from "./pages/EstadoDoTempoLista";
import EstadoDoTempoForm from "./pages/EstadoDoTempoForm";
import EstacaoLista from "./pages/EstacaoLista";
import EstacaoForm from "./pages/EstacaoForm";
import RegistroLista from "./pages/RegistroLista";
import RegistroForm from "./pages/RegistroForm";
import RelatorioCombinado from "./pages/RelatorioCombinado";
import "./App.css";
// Importação de componentes reutilizáveis
import Logo from "./components/Logo";

// Destruturação dos componentes de Layout do Ant Design
const { Header, Content, Footer, Sider } = Layout;

/**
 * Componente principal de conteúdo da aplicação.
 * Gerencia a navegação e o layout responsivo.
 */
const AppContent = () => {
  const location = useLocation();
  // Estado para controlar a abertura do menu lateral em dispositivos móveis
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // Estado para verificar se o dispositivo é móvel (largura <= 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Hook para monitorar o redimensionamento da janela e ajustar o modo mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    // Remove o listener ao desmontar o componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Determina a chave do menu selecionado com base na rota atual.
   * @returns {string} Chave do item de menu ativo.
   */
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith("/estacoes")) return "estacoes";
    if (path.startsWith("/registros")) return "registros";
    if (path.startsWith("/relatorio")) return "relatorio";
    return "tempo";
  };

  // Itens do menu de navegação
  const menuItems = [
    {
      label: <Link to="/">Estados do Tempo</Link>,
      key: "tempo",
      icon: <CloudOutlined />,
    },
    {
      label: <Link to="/estacoes">Estações de Medição</Link>,
      key: "estacoes",
      icon: <EnvironmentOutlined />,
    },
    {
      label: <Link to="/registros">Registros Climáticos</Link>,
      key: "registros",
      icon: <TableOutlined />,
    },
    {
      label: <Link to="/relatorio">Relatório Combinado</Link>,
      key: "relatorio",
      icon: <DashboardOutlined />,
    },
  ];

  // Fecha o menu drawer ao clicar em um item no mobile
  const handleMenuClick = () => {
    if (isMobile) setMobileDrawerOpen(false);
  };

  return (
    <Layout
      className="app-layout"
      style={{ minHeight: "100vh", background: "var(--bg-app)" }}
    >
      {/* Navegação Mobile (Drawer) */}
      <Drawer
        title={
          <div
            style={{
              textAlign: "center",
              width: "100%",
              height: "50px", // Altura fixa para o logo
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
             <Logo width={150} />
          </div>
        }
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Drawer>

      {/* Sidebar Desktop - Aparência padrão SaaS */}
      {!isMobile && (
        <Sider
          width={260}
          theme="light"
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 100,
            background: "var(--bg-app)",
            borderRight: "1px solid var(--border-color)",
          }}
        >
          <div
            className="logo-container"
            style={{
              height: "80px", // Altura aumentada para o logo
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Centraliza o logo
              padding: "16px",
            }}
          >
            <Logo width="100%" />
          </div>
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            style={{
              background: "transparent",
              borderRight: 0,
              padding: "0 8px",
            }}
          />
        </Sider>
      )}

      {/* Layout do Conteúdo Principal */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : 260,
          transition: "all 0.2s",
          background: "var(--bg-content)",
          minHeight: "100vh",
        }}
      >
        {isMobile && (
          <Header
            style={{
              padding: 0,
              background: "var(--bg-content)",
              borderBottom: "1px solid var(--border-color)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              style={{ fontSize: "18px", width: 64, height: 64 }}
            />
            <div style={{ height: "40px", display: "flex", alignItems: "center" }}>
              <Logo width={120} condensed={true} />
            </div>
          </Header>
        )}

        <Content style={{ margin: "0", padding: "24px", overflow: "initial" }}>
          <div className="page-transition" key={location.pathname}>
            {" "}
            {/* Key força a re-renderização para animação */}
            <Routes>
              {/* Definição das Rotas da Aplicação */}
              <Route path="/" element={<EstadoDoTempoLista />} />
              <Route path="/novo" element={<EstadoDoTempoForm />} />
              <Route path="/editar/:id" element={<EstadoDoTempoForm />} />

              <Route path="/estacoes" element={<EstacaoLista />} />
              <Route path="/estacoes/nova" element={<EstacaoForm />} />
              <Route path="/estacoes/editar/:id" element={<EstacaoForm />} />

              <Route path="/registros" element={<RegistroLista />} />
              <Route path="/registros/novo" element={<RegistroForm />} />
              <Route path="/registros/editar/:id" element={<RegistroForm />} />

              <Route path="/relatorio" element={<RelatorioCombinado />} />
            </Routes>
          </div>
        </Content>
        {/* Rodapé Minimalista */}
        <Footer
          style={{
            textAlign: "center",
            background: "transparent",
            color: "var(--text-light)",
            padding: "12px 0",
          }}
        >
          ClimaMaster ©2026
        </Footer>
      </Layout>
    </Layout>
  );
};

// Componente App que envolve a aplicação com o Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
