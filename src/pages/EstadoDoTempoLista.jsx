import React, { useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EstadoDoTempoDAO from '../daos/EstadoDoTempoDao.mjs';
import TabelaEstados from '../components/TabelaEstados';

const { Title } = Typography;

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
        <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                gap: '16px'
            }}>
                <Title level={2} style={{ margin: 0, color: '#1976D2' }}>Estados do Tempo</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/novo')}
                    size="large"
                    shape="round"
                    style={{ background: '#1976D2' }}
                >
                    Novo Estado
                </Button>
            </div>
            <TabelaEstados
                data={data}
                onEdit={(id) => navigate(`/editar/${id}`)}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default EstadoDoTempoLista;
