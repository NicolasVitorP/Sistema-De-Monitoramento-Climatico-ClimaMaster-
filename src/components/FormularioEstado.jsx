import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Row, Col } from 'antd';
import { SaveOutlined, CloudOutlined } from '@ant-design/icons';

/**
 * Componente de formulário para criar ou editar um Estado do Tempo.
 * 
 * @param {Object} props
 * @param {Function} props.onFinish - Callback de submissão.
 * @param {Object} props.initialValues - Valores para edição (opcional).
 */
const FormularioEstado = ({ onFinish, initialValues }) => {
    const [form] = Form.useForm();

    // Popula o formulário se houver valores iniciais (modo edição)
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
            {/* Condição Geral */}
            <Form.Item
                label="Condição Geral"
                name="condicaoGeral"
                rules={[{ required: true, message: 'Por favor, insira a condição geral!' }]}
            >
                <Input prefix={<CloudOutlined />} placeholder="Ex: Ensolarado, Nublado" style={{ borderRadius: '12px' }} />
            </Form.Item>

            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    {/* Temperatura */}
                    <Form.Item
                        label="Temperatura"
                        name="temperatura"
                        rules={[{ required: true, message: 'Insira a temperatura!' }]}
                    >
                        <InputNumber 
                            style={{ width: '100%', borderRadius: '12px' }} 
                            suffix="°C"
                            placeholder="25"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
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
                            placeholder="60"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col xs={24} sm={12}>
                    {/* Precipitação */}
                    <Form.Item
                        label="Precipitação"
                        name="precipitacaoMM"
                        rules={[{ required: true, message: 'Insira a precipitação!' }]}
                    >
                        <InputNumber 
                            style={{ width: '100%', borderRadius: '12px' }} 
                            min={0}
                            suffix="mm" 
                            placeholder="0"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                    {/* Vento */}
                    <Form.Item
                        label="Velocidade do Vento"
                        name="velocidadeVento"
                        rules={[{ required: true, message: 'Insira a velocidade do vento!' }]}
                    >
                        <InputNumber 
                            style={{ width: '100%', borderRadius: '12px' }} 
                            min={0}
                            suffix="km/h" 
                            placeholder="10"
                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* URL do ícone */}
            <Form.Item
                label="URL do Ícone"
                name="iconeURL"
                rules={[{ required: true, message: 'Insira a URL do ícone!' }]}
            >
                <Input placeholder="http://exemplo.com/icone.png" style={{ borderRadius: '12px' }} />
            </Form.Item>

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
                    Salvar Estado
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormularioEstado;
