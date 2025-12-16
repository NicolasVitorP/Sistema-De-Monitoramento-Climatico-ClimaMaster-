import React, { useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import EstacaoMedicao from '../models/EstacaoMedicao.mjs';
import FormularioEstacao from '../components/FormularioEstacao';

const { Title } = Typography;

const EstacaoForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dao = new EstacaoMedicaoDAO();
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        if (id) {
            const estacao = dao.buscar(id);
            if (estacao) {
                setInitialValues({
                    nome: estacao.getNome(),
                    latitude: estacao.getLatitude(),
                    longitude: estacao.getLongitude(),
                    cidade: estacao.getCidade(),
                    pais: estacao.getPais(),
                });
            } else {
                message.error('Estação não encontrada!');
                navigate('/estacoes');
            }
        } else {
            setInitialValues(null);
        }
    }, [id, navigate]);

    const onFinish = (values) => {
        try {
            const novaEstacao = new EstacaoMedicao(
                values.nome,
                values.latitude,
                values.longitude,
                values.cidade,
                values.pais
            );

            if (id) {
                dao.atualizar(id, novaEstacao);
                message.success('Estação atualizada com sucesso!');
            } else {
                dao.salvar(novaEstacao);
                message.success('Estação cadastrada com sucesso!');
            }
            navigate('/estacoes');
        } catch (error) {
            console.error(error);
            message.error('Erro ao salvar dados.');
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={3} style={{ margin: 0, color: '#1976D2' }}>
                    {id ? 'Editar Estação' : 'Nova Estação'}
                </Title>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/estacoes')}>
                    Voltar
                </Button>
            </div>

            <FormularioEstacao
                onFinish={onFinish}
                initialValues={initialValues}
                title={null}
            />
        </div>
    );
};

export default EstacaoForm;
