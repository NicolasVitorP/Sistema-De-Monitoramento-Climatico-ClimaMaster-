import React, { useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EstadoDoTempoDAO from '../daos/EstadoDoTempoDao.mjs';
import EstadoDoTempo from '../models/EstadoDoTempo.mjs';
import FormularioEstado from '../components/FormularioEstado';

const { Title } = Typography;

const EstadoDoTempoForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dao = new EstadoDoTempoDAO();
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        if (id) {
            const estado = dao.buscar(id);
            if (estado) {
                setInitialValues({
                    condicaoGeral: estado.getCondicaoGeral(),
                    temperatura: estado.getTemperatura(),
                    umidade: estado.getUmidade(),
                    precipitacaoMM: estado.getPrecipitacaoMM(),
                    velocidadeVento: estado.getVelocidadeVento(),
                    iconeURL: estado.getIconeURL(),
                });
            } else {
                message.error('Registro não encontrado!');
                navigate('/');
            }
        } else {
            setInitialValues(null);
        }
    }, [id, navigate]);

    const onFinish = (values) => {
        try {
            const novoEstado = new EstadoDoTempo(
                values.condicaoGeral,
                values.temperatura,
                values.umidade,
                values.precipitacaoMM,
                values.velocidadeVento,
                values.iconeURL
            );

            if (id) {
                dao.atualizar(id, novoEstado);
                message.success('Estado do tempo atualizado com sucesso!');
            } else {
                dao.salvar(novoEstado);
                message.success('Estado do tempo cadastrado com sucesso!');
            }
            navigate('/');
        } catch (error) {
            console.error(error);
            message.error('Erro ao salvar dados.');
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={3} style={{ margin: 0, color: '#1976D2' }}>
                    {id ? 'Editar Estado do Tempo' : 'Novo Estado do Tempo'}
                </Title>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
                    Voltar
                </Button>
            </div>

            <FormularioEstado
                onFinish={onFinish}
                initialValues={initialValues}
                title={null} // Removed title from card to use page title
            />
        </div>
    );
};

export default EstadoDoTempoForm;
