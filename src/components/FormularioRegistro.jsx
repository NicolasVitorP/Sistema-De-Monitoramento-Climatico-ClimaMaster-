import React, { useEffect } from 'react';
import { Form, InputNumber, Button, Select, DatePicker, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

/**
 * Componente de formulário para criar ou editar um Registro Climático.
 * 
 * @param {Object} props
 * @param {Function} props.onFinish Callback de submissão
 * @param {Object} props.initialValues Valores iniciais para edição
 * @param {Array} props.estacoes Lista de estações disponíveis
 * @param {Array} props.estados Lista de estados do tempo disponíveis
 */
const FormularioRegistro = ({ onFinish, initialValues, estacoes, estados }) => {
    const [form] = Form.useForm();

    // Inicializa o formulário e converte a data para objeto Dayjs
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                dataHora: initialValues.dataHora ? dayjs(initialValues.dataHora) : null,
            });
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
        >
            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    {/* Seleção de Estação */}
                    <Form.Item
                        label="Estação de Medição"
                        name="estacaoId"
                        rules={[{ required: true, message: 'Selecione a estação!' }]}
                    >
                        <Select placeholder="Selecione uma estação" style={{ borderRadius: '12px' }}>
                            {estacoes.map(estacao => (
                                <Option key={estacao.id} value={estacao.id}>{estacao.nome}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    {/* Seleção de Condição */}
                    <Form.Item
                        label="Condição do Tempo"
                        name="estadoTempoId"
                        rules={[{ required: true, message: 'Selecione a condição!' }]}
                    >
                        <Select placeholder="Selecione a condição" style={{ borderRadius: '12px' }}>
                            {estados.map(estado => (
                                <Option key={estado.id} value={estado.id}>{estado.condicaoGeral}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            {/* Data e Hora */}
            <Form.Item
                label="Data e Hora"
                name="dataHora"
                rules={[{ required: true, message: 'Selecione a data e hora!' }]}
            >
                <DatePicker showTime style={{ width: '100%', borderRadius: '12px' }} format="DD/MM/YYYY HH:mm" />
            </Form.Item>

            <Row gutter={24}>
                <Col xs={24} sm={8}>
                    {/* Temperatura */}
                    <Form.Item
                        label="Temperatura"
                        name="temperatura"
                        rules={[{ required: true, message: 'Insira a temperatura!' }]}
                    >
                        <InputNumber 
                            style={{ width: '100%', borderRadius: '12px' }} 
                            suffix="°C"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    {/* Umidade */}
                    <Form.Item
                        label="Umidade"
                        name="umidade"
                        rules={[{ required: true, message: 'Insira a umidade!' }]}
                    >
                        <InputNumber 
                            style={{ width: '100%', borderRadius: '12px' }} 
                            min={0} 
                            max={100}
                            suffix="%"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    {/* Pressão */}
                    <Form.Item
                        label="Pressão"
                        name="pressaoAtmosferica"
                        rules={[{ required: true, message: 'Insira a pressão!' }]}
                    >
                        <InputNumber 
                            style={{ width: '100%', borderRadius: '12px' }} 
                            min={0}
                            suffix="hPa"
                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* Botão Salvar */}
            <Form.Item style={{ marginTop: '16px' }}>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SaveOutlined />} 
                    size="large" 
                    block 
                    className="btn-squeeze"
                    style={{ height: '48px', borderRadius: '12px', fontSize: '16px', fontWeight: 600 }}
                >
                    Salvar Registro
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormularioRegistro;
