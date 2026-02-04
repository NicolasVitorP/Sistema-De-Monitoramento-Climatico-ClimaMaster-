import React, { useEffect, useState } from 'react';
import { Button, message, Typography, Row, Col, Card } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import TabelaEstacoes from '../components/TabelaEstacoes';
import ModalMapaEstacao from '../components/ModalMapaEstacao';
import StatIcon from '../components/StatIcon';

const { Title, Text } = Typography;

const EstacaoLista = () => {
    const [data, setData] = useState([]);
    const [modalMapaVisivel, setModalMapaVisivel] = useState(false);
    const [estacaoSelecionada, setEstacaoSelecionada] = useState(null);
    const navigate = useNavigate();
    const dao = new EstacaoMedicaoDAO();

    const carregarDados = () => {
        const lista = dao.listar();
        setData(lista);
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const handleDelete = (id) => {
        dao.excluir(id);
        message.success('Estação excluída com sucesso!');
        carregarDados();
    };

    const handleVerMapa = (estacao) => {
        setEstacaoSelecionada(estacao);
        setModalMapaVisivel(true);
    };

    const handleFecharMapa = () => {
        setModalMapaVisivel(false);
        setEstacaoSelecionada(null);
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
                        <Title level={2} style={{ margin: 0, color: 'var(--text-primary)' }}>Estações de Medição</Title>
                        <Text type="secondary">Gerencie os pontos de coleta de dados climáticos.</Text>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/estacoes/nova')}
                        size="large"
                        shape="round"
                        className="btn-squeeze"
                    >
                        Nova Estação
                    </Button>
                </div>

                {/* Summary Cards */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <Card bordered={false} className="card-lift">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <StatIcon icon={<EnvironmentOutlined />} color="#1976D2" />
                                <div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total cadastrado</div>
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
                <TabelaEstacoes
                    data={data}
                    onEdit={(id) => navigate(`/estacoes/editar/${id}`)}
                    onDelete={handleDelete}
                    onVerMapa={handleVerMapa}
                />
            </div>

            <ModalMapaEstacao
                visible={modalMapaVisivel}
                onClose={handleFecharMapa}
                estacao={estacaoSelecionada}
                onEdit={(id) => {
                    handleFecharMapa();
                    navigate(`/estacoes/editar/${id}`);
                }}
            />
        </div>
    );
};

export default EstacaoLista;
