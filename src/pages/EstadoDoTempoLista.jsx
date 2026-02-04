
import React, { useEffect, useState } from 'react';
import { Button, message, Typography, Row, Col, Card } from 'antd';
import { PlusOutlined, CloudOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EstadoDoTempoDAO from '../daos/EstadoDoTempoDao.mjs';
import TabelaEstados from '../components/TabelaEstados';
import StatIcon from '../components/StatIcon';

const { Title, Text } = Typography;

const EstadoDoTempoLista = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dao = new EstadoDoTempoDAO();

    const carregarDados = () => {
        const lista = dao.listar();
        setData(lista);
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
             {/* Header & Stats */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                        <Title level={2} style={{ margin: 0, color: 'var(--text-primary)' }}>Estados do Tempo</Title>
                        <Text type="secondary">Tipos de condições climáticas disponíveis.</Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/novo')}
                        size="large"
                        shape="round"
                        className="btn-squeeze"
                    >
                        Novo Estado
                    </Button>
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Card bordered={false} className="card-lift">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <StatIcon icon={<CloudOutlined />} color="#0ea5e9" /> {/* Cyan */}
                                <div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Condições Cadastradas</div>
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
                <TabelaEstados
                    data={data}
                    onEdit={(id) => navigate(`/editar/${id}`)}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default EstadoDoTempoLista;
