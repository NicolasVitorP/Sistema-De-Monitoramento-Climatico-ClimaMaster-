import React, { useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import EstacaoMedicao from '../models/EstacaoMedicao.mjs';
import FormularioEstacao from '../components/FormularioEstacao';

const { Title } = Typography;

/**
 * Página de formulário para cadastro e edição de estações de medição.
 */
const EstacaoForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dao = new EstacaoMedicaoDAO();
    const [initialValues, setInitialValues] = useState(null);

    // Carrega os dados da estação se estiver em modo de edição
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

    // Manipula a submissão do formulário
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
        <div className="fade-in" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Título dinâmico (Novo ou Editar) */}
                <Title level={2} style={{ margin: 0, color: 'var(--text-primary)' }}>
                    {id ? 'Editar Estação' : 'Nova Estação'}
                </Title>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => navigate('/estacoes')}
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Voltar
                </Button>
            </div>

            <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
                <FormularioEstacao
                    onFinish={onFinish}
                    initialValues={initialValues}
                />
            </div>
        </div>
    );
};

export default EstacaoForm;
