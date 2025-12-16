import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const FormularioEstacao = ({ onFinish, initialValues, title }) => {
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
                label="Nome da Estação"
                name="nome"
                rules={[{ required: true, message: 'Por favor, insira o nome da estação!' }]}
            >
                <Input placeholder="Ex: Estação Central" />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Latitude"
                        name="latitude"
                        rules={[{ required: true, message: 'Insira a latitude!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Longitude"
                        name="longitude"
                        rules={[{ required: true, message: 'Insira a longitude!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="Cidade"
                        name="cidade"
                        rules={[{ required: true, message: 'Insira a cidade!' }]}
                    >
                        <Input placeholder="Ex: São Paulo" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    <Form.Item
                        label="País"
                        name="pais"
                        rules={[{ required: true, message: 'Insira o país!' }]}
                    >
                        <Input placeholder="Ex: Brasil" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" block shape="round">
                    Salvar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormularioEstacao;
