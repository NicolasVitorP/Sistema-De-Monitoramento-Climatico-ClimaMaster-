import React, { useEffect, useState } from 'react';
import { Button, message, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import RegistroClimaticoDAO from '../daos/RegistroClimaticoDAO.mjs';
import RegistroClimatico from '../models/RegistroClimatico.mjs';
import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import EstadoDoTempoDAO from '../daos/EstadoDoTempoDao.mjs';
import FormularioRegistro from '../components/FormularioRegistro';

const { Title } = Typography;

const RegistroForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dao = new RegistroClimaticoDAO();
    const estacaoDao = new EstacaoMedicaoDAO();
    const estadoDao = new EstadoDoTempoDAO();

    const [initialValues, setInitialValues] = useState(null);
    const [estacoes, setEstacoes] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        setEstacoes(estacaoDao.listar());
        setEstados(estadoDao.listar());

        if (id) {
            const registro = dao.buscar(id);
            if (registro) {
                setInitialValues({
                    estacaoId: registro.getEstacaoId(),
                    estadoTempoId: registro.getEstadoTempoId(),
                    dataHora: registro.getDataHora(),
                    temperatura: registro.getTemperatura(),
                    umidade: registro.getUmidade(),
                    pressaoAtmosferica: registro.getPressaoAtmosferica(),
                });
            } else {
                message.error('Registro não encontrado!');
                navigate('/registros');
            }
        } else {
            setInitialValues(null);
        }
    }, [id, navigate]);

    const onFinish = (values) => {
        try {
            const novoRegistro = new RegistroClimatico(
                values.estacaoId,
                values.estadoTempoId,
                values.dataHora.toISOString(), // AntD DatePicker returns a DayJS object
                values.temperatura,
                values.umidade,
                values.pressaoAtmosferica
            );

            if (id) {
                dao.atualizar(id, novoRegistro);
                message.success('Registro atualizado com sucesso!');
            } else {
                dao.salvar(novoRegistro);
                message.success('Registro cadastrado com sucesso!');
            }
            navigate('/registros');
        } catch (error) {
            console.error(error);
            message.error('Erro ao salvar dados.');
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={3} style={{ margin: 0, color: '#1976D2' }}>
                    {id ? 'Editar Registro' : 'Novo Registro'}
                </Title>
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/registros')}>
                    Voltar
                </Button>
            </div>

            <FormularioRegistro
                onFinish={onFinish}
                initialValues={initialValues}
                title={null}
                estacoes={estacoes}
                estados={estados}
            />
        </div>
    );
};

export default RegistroForm;
