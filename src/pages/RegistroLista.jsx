import React, { useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import RegistroClimaticoDAO from '../daos/RegistroClimaticoDAO.mjs';
import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import EstadoDoTempoDAO from '../daos/EstadoDoTempoDao.mjs';
import TabelaRegistros from '../components/TabelaRegistros';

const { Title } = Typography;

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
        <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
                    Voltar para Início
                </Button>
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                gap: '16px'
            }}>
                <Title level={2} style={{ margin: 0, color: '#1976D2' }}>Registros Climáticos</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/registros/novo')}
                    size="large"
                    shape="round"
                    style={{ background: '#1976D2' }}
                >
                    Novo Registro
                </Button>
            </div>
            <TabelaRegistros
                data={data}
                estacoes={estacoes}
                estados={estados}
                onEdit={(id) => navigate(`/registros/editar/${id}`)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default RegistroLista;
