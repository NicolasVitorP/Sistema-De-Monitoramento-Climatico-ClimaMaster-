import React, { useEffect } from 'react';
import { Form, InputNumber, Button, Card, Select, DatePicker, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const FormularioRegistro = ({ onFinish, initialValues, title, estacoes, estados }) => {
    const [form] = Form.useForm();

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
        >
            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Estação de Medição"
                        name="estacaoId"
                        rules={[{ required: true, message: 'Selecione a estação!' }]}
                    >
                        <Select placeholder="Selecione uma estação">
                            {estacoes.map(estacao => (
                                <Option key={estacao.id} value={estacao.id}>{estacao.nome}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Condição do Tempo"
                        name="estadoTempoId"
                        rules={[{ required: true, message: 'Selecione a condição!' }]}
                    >
                        <Select placeholder="Selecione a condição">
                            {estados.map(estado => (
                                <Option key={estado.id} value={estado.id}>{estado.condicaoGeral}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Data e Hora"
                name="dataHora"
                rules={[{ required: true, message: 'Selecione a data e hora!' }]}
            >
                <DatePicker showTime style={{ width: '100%' }} format="DD/MM/YYYY HH:mm" />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} sm={8}>
                    <Form.Item
                        label="Temperatura (°C)"
                        name="temperatura"
                        rules={[{ required: true, message: 'Insira a temperatura!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item
                        label="Umidade (%)"
                        name="umidade"
                        rules={[{ required: true, message: 'Insira a umidade!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} max={100} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                    <Form.Item
                        label="Pressão (hPa)"
                        name="pressaoAtmosferica"
                        rules={[{ required: true, message: 'Insira a pressão!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" block>
                    Salvar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormularioRegistro;
