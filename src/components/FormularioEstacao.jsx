import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card } from 'antd';
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
        <Card title={title}>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item
                        label="Latitude"
                        name="latitude"
                        rules={[{ required: true, message: 'Insira a latitude!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Longitude"
                        name="longitude"
                        rules={[{ required: true, message: 'Insira a longitude!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Form.Item
                        label="Cidade"
                        name="cidade"
                        rules={[{ required: true, message: 'Insira a cidade!' }]}
                    >
                        <Input placeholder="Ex: São Paulo" />
                    </Form.Item>

                    <Form.Item
                        label="País"
                        name="pais"
                        rules={[{ required: true, message: 'Insira o país!' }]}
                    >
                        <Input placeholder="Ex: Brasil" />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" block>
                        Salvar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default FormularioEstacao;
