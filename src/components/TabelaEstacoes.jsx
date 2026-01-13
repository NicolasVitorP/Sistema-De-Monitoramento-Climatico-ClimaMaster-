import React from 'react';
import { Table, Button, Space, Modal, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';

const TabelaEstacoes = ({ data, onEdit, onDelete, onVerMapa }) => {

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Excluir Estação?',
            content: 'Essa ação removerá permanentemente a estação e seus registros.',
            okText: 'Excluir',
            okType: 'danger',
            cancelText: 'Cancelar',
            centered: true,
            maskClosable: true,
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
            render: (text) => <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{text}</span>
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
            responsive: ['md'],
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
            responsive: ['md'],
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
            align: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Ver no Mapa">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<EnvironmentOutlined style={{ color: 'var(--info-color)' }} />}
                            onClick={() => onVerMapa(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Editar">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<EditOutlined style={{ color: 'var(--text-secondary)' }} />}
                            onClick={() => onEdit(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <Button
                            type="text"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                scroll={{ x: 800 }}
                pagination={{ position: ['bottomCenter'], responsive: true }}
                bordered={false}
            />
        </div>
    );
};

export default TabelaEstacoes;
