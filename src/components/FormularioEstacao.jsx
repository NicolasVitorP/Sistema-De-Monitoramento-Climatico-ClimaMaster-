import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

/**
 * Componente de formulário para criar ou editar uma Estação de Medição.
 * 
 * @param {Object} props
 * @param {Function} props.onFinish Função callback chamada ao submeter o formulário com sucesso.
 * @param {Object} props.initialValues Valores iniciais para preencher o formulário (em caso de edição).
 */
const FormularioEstacao = ({ onFinish, initialValues }) => {
    const [form] = Form.useForm();

    // Efeito para atualizar os valores do formulário quando initialValues muda
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
            size="large"
        >
            {/* Campo Nome */}
            <Form.Item
                label="Nome da Estação"
                name="nome"
                rules={[{ required: true, message: 'Por favor, insira o nome da estação!' }]}
            >
                <Input placeholder="Ex: Estação Central" style={{ borderRadius: '12px' }} />
            </Form.Item>

            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    {/* Campo Latitude */}
                    <Form.Item
                        label="Latitude"
                        name="latitude"
                        rules={[{ required: true, message: 'Insira a latitude!' }]}
                    >
                        <InputNumber style={{ width: '100%', borderRadius: '12px' }} placeholder="-23.55" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    {/* Campo Longitude */}
                    <Form.Item
                        label="Longitude"
                        name="longitude"
                        rules={[{ required: true, message: 'Insira a longitude!' }]}
                    >
                        <InputNumber style={{ width: '100%', borderRadius: '12px' }} placeholder="-46.63" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    {/* Campo Cidade */}
                    <Form.Item
                        label="Cidade"
                        name="cidade"
                        rules={[{ required: true, message: 'Insira a cidade!' }]}
                    >
                        <Input placeholder="Ex: São Paulo" style={{ borderRadius: '12px' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    {/* Campo País */}
                    <Form.Item
                        label="País"
                        name="pais"
                        rules={[{ required: true, message: 'Insira o país!' }]}
                    >
                        <Input placeholder="Ex: Brasil" style={{ borderRadius: '12px' }} />
                    </Form.Item>
                </Col>
            </Row>

            {/* Botão de Salvar */}
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
                    Salvar Estação
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormularioEstacao;
