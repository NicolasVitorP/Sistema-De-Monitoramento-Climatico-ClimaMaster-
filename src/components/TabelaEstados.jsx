import React, { useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import IconPreviewModal from './IconPreviewModal';

const TabelaEstados = ({ data, onEdit, onDelete }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handlePreview = (url) => {
        setPreviewUrl(url);
        setModalOpen(true);
    };

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
                        icon={<EyeOutlined />}
                        onClick={() => handlePreview(record.iconeURL)}
                    >
                        Ver Ícone
                    </Button>
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
            <IconPreviewModal
                url={previewUrl}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default TabelaEstados;
