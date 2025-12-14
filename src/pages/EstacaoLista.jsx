import React, { useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import TabelaEstacoes from '../components/TabelaEstacoes';
import ModalMapaEstacao from '../components/ModalMapaEstacao';

const { Title } = Typography;

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
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
                    Voltar para Início
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Title level={2}>Estações de Medição</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/estacoes/nova')}
                    size="large"
                >
                    Nova Estação
                </Button>
            </div>
            <TabelaEstacoes
                data={data}
                onEdit={(id) => navigate(`/estacoes/editar/${id}`)}
                onDelete={handleDelete}
                onVerMapa={handleVerMapa}
            />
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
