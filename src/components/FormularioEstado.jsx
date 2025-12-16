import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const FormularioEstado = ({ onFinish, initialValues, title }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
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
            <Form.Item
                label="Condição Geral"
                name="condicaoGeral"
                rules={[{ required: true, message: 'Por favor, insira a condição geral!' }]}
            >
                <Input placeholder="Ex: Ensolarado, Nublado" />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Temperatura (°C)"
                        name="temperatura"
                        rules={[{ required: true, message: 'Insira a temperatura!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Umidade (%)"
                        name="umidade"
                        rules={[{ required: true, message: 'Insira a umidade!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} max={100} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Precipitação (mm)"
                        name="precipitacaoMM"
                        rules={[{ required: true, message: 'Insira a precipitação!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Velocidade do Vento (km/h)"
                        name="velocidadeVento"
                        rules={[{ required: true, message: 'Insira a velocidade do vento!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="URL do Ícone"
                name="iconeURL"
                rules={[{ required: true, message: 'Insira a URL do ícone!' }]}
            >
                <Input placeholder="http://exemplo.com/icone.png" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" block shape="round">
                    Salvar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormularioEstado;
