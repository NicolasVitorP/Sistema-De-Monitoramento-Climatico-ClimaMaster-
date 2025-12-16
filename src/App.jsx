import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, theme } from 'antd';
import {
  CloudOutlined,
  EnvironmentOutlined,
  TableOutlined,
  DashboardOutlined,
  MenuOutlined
} from '@ant-design/icons';
import EstadoDoTempoLista from './pages/EstadoDoTempoLista';
import EstadoDoTempoForm from './pages/EstadoDoTempoForm';
import EstacaoLista from './pages/EstacaoLista';
import EstacaoForm from './pages/EstacaoForm';
import RegistroLista from './pages/RegistroLista';
import RegistroForm from './pages/RegistroForm';
import RelatorioCombinado from './pages/RelatorioCombinado';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;

const AppContent = () => {
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/estacoes')) return 'estacoes';
    if (path.startsWith('/registros')) return 'registros';
    if (path.startsWith('/relatorio')) return 'relatorio';
    return 'tempo';
  };

  const menuItems = [
    {
      label: <Link to="/">Estados do Tempo</Link>,
      key: 'tempo',
      icon: <CloudOutlined />,
    },
    {
      label: <Link to="/estacoes">Estações de Medição</Link>,
      key: 'estacoes',
      icon: <EnvironmentOutlined />,
    },
    {
      label: <Link to="/registros">Registros Climáticos</Link>,
      key: 'registros',
      icon: <TableOutlined />,
    },
    {
      label: <Link to="/relatorio">Relatório Combinado</Link>,
      key: 'relatorio',
      icon: <DashboardOutlined />,
    },
  ];

  const handleMenuClick = () => {
    if (isMobile) setMobileDrawerOpen(false);
  };

  return (
    <Layout className="app-layout">
      {/* Mobile Drawer Navigation */}
      <Drawer
        title={<div style={{ textAlign: 'center', width: '100%' }}>ClimaMaster</div>}
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

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider width={250} theme="light" className="glass-panel" style={{
          margin: '16px 0 16px 16px',
          border: 'none',
          borderRadius: '16px',
          height: 'calc(100vh - 32px)',
          position: 'fixed',
          left: 0,
          zIndex: 100
        }}>
          <div className="logo-container" style={{
            margin: '16px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '64px' // Fixed height for consistency
          }}>
            <h2 style={{ margin: 0, color: '#1976D2' }}>ClimaMaster</h2>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            style={{ borderRight: 0 }}
          />
        </Sider>
      )}

      {/* Main Content Layout */}
      <Layout style={{ marginLeft: isMobile ? 0 : 280, transition: 'all 0.2s' }}>
        <Header style={{ padding: 0, background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              style={{ fontSize: '18px', width: 64, height: 64 }}
            />
          )}
          <div style={{ padding: '0 24px', fontSize: '20px', fontWeight: 600 }}>
            {/* Dynamic Title based on selection could go here */}
          </div>
        </Header>

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-content fade-in">
            <Routes>
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
        <Footer style={{ textAlign: 'center', background: 'transparent' }}>
          ClimaMaster ©2025 Created with Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
