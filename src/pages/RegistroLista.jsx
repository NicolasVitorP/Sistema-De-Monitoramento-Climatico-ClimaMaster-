
import React, { useEffect, useState } from 'react';
import { Button, message, Typography, Row, Col, Card } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, UnorderedListOutlined, FireOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import RegistroClimaticoDAO from '../daos/RegistroClimaticoDAO.mjs';
import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import EstadoDoTempoDAO from '../daos/EstadoDoTempoDao.mjs';
import TabelaRegistros from '../components/TabelaRegistros';
import StatIcon from '../components/StatIcon';

const { Title, Text } = Typography;

const RegistroLista = () => {
    const [data, setData] = useState([]);
    const [estacoes, setEstacoes] = useState([]);
    const [estados, setEstados] = useState([]);
    const navigate = useNavigate();

    const dao = new RegistroClimaticoDAO();
    const estacaoDao = new EstacaoMedicaoDAO();
    const estadoDao = new EstadoDoTempoDAO();

    const carregarDados = () => {
        const lista = dao.listar();
        setData(lista);
        setEstacoes(estacaoDao.listar());
        setEstados(estadoDao.listar());
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const handleDelete = (id) => {
        dao.excluir(id);
        message.success('Registro excluído com sucesso!');
        carregarDados();
    };

    return (
        <div className="fade-in" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '16px' }}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => navigate('/')}
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Voltar
                </Button>
            </div>

             {/* Header & Stats */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                     <div>
                        <Title level={2} style={{ margin: 0, color: 'var(--text-primary)' }}>Registros Climáticos</Title>
                        <Text type="secondary">Histórico de dados coletados das estações.</Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/registros/novo')}
                        size="large"
                        shape="round"
                        className="btn-squeeze"
                    >
                        Novo Registro
                    </Button>
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Card bordered={false} className="card-lift">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <StatIcon icon={<UnorderedListOutlined />} color="#7c3aed" /> {/* Violet */}
                                <div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total Registros</div>
                                    <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                        {data.length}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            
            <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
                <TabelaRegistros
                    data={data}
                    estacoes={estacoes}
                    estados={estados}
                    onEdit={(id) => navigate(`/registros/editar/${id}`)}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default RegistroLista;
