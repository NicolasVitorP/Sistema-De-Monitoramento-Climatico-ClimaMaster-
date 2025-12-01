import React from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TabelaEstados = ({ data, onEdit, onDelete }) => {

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Tem certeza que deseja excluir?',
            content: 'Essa ação não pode ser desfeita.',
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Não',
            onOk() {
                onDelete(id);
            },
        });
    };

    const columns = [
        {
            title: 'Condição Geral',
            dataIndex: 'condicaoGeral',
            key: 'condicaoGeral',
        },
        {
            title: 'Temperatura (°C)',
            dataIndex: 'temperatura',
            key: 'temperatura',
        },
        {
            title: 'Umidade (%)',
            dataIndex: 'umidade',
            key: 'umidade',
        },
        {
            title: 'Precipitação (mm)',
            dataIndex: 'precipitacaoMM',
            key: 'precipitacaoMM',
        },
        {
            title: 'Vento (km/h)',
            dataIndex: 'velocidadeVento',
            key: 'velocidadeVento',
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record.id)}
                    >
                        Editar
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    >
                        Excluir
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default TabelaEstados;
