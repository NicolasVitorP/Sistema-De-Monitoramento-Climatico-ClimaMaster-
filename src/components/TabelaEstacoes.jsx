import React from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';

const TabelaEstacoes = ({ data, onEdit, onDelete, onVerMapa }) => {

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
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
        },
        {
            title: 'País',
            dataIndex: 'pais',
            key: 'pais',
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EnvironmentOutlined />}
                        onClick={() => onVerMapa(record)}
                        title="Ver no Mapa"
                    />
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

    return (
        <div style={{ overflowX: 'auto' }}>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                scroll={{ x: 800 }}
                pagination={{ position: ['bottomCenter'], responsive: true }}
            />
        </div>
    );
};

export default TabelaEstacoes;
