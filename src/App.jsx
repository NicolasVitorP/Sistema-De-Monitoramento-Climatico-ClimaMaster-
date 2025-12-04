import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { CloudOutlined, EnvironmentOutlined, TableOutlined } from '@ant-design/icons';
import EstadoDoTempoLista from './pages/EstadoDoTempoLista';
import EstadoDoTempoForm from './pages/EstadoDoTempoForm';
import EstacaoLista from './pages/EstacaoLista';
import EstacaoForm from './pages/EstacaoForm';
import RegistroLista from './pages/RegistroLista';
import RegistroForm from './pages/RegistroForm';
import './App.css';

const { Header, Content, Footer } = Layout;

const AppContent = () => {
  const location = useLocation();
  const getSelectedKey = () => {
    if (location.pathname.startsWith('/estacoes')) return 'estacoes';
    if (location.pathname.startsWith('/registros')) return 'registros';
    return 'tempo';
  };

  const [current, setCurrent] = useState(getSelectedKey());

  const items = [
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
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh', background: 'transparent' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', padding: '0 24px', borderRadius: '8px 8px 0 0' }}>
        <div className="logo" style={{ marginRight: '24px', fontWeight: 'bold', fontSize: '18px', color: '#1890ff' }}>
          ClimaMaster
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          onClick={onClick}
          items={items}
          style={{ flex: 1, borderBottom: 'none', background: 'transparent' }}
        />
      </Header>
      <Content style={{ padding: '24px' }}>
        <div className="site-layout-content">
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
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: 'transparent' }}>
        ClimaMaster ©2025 Created with Ant Design
      </Footer>
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
