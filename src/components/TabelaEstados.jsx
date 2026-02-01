import React, { useState } from 'react';
import { Table, Button, Space, Modal, Tooltip, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import IconPreviewModal from './IconPreviewModal';

/**
 * Componente que exibe a tabela de Estados do Tempo.
 * 
 * @param {Object} props
 * @param {Array} props.data Dados dos estados
 * @param {Function} props.onEdit Função de editar
 * @param {Function} props.onDelete Função de deletar
 */
const TabelaEstados = ({ data, onEdit, onDelete }) => {
    const [previewUrl, setPreviewUrl] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    // Abre o modal de visualização do ícone
    const handlePreview = (url) => {
        setPreviewUrl(url);
        setModalOpen(true);
    };

    // Confirmação de exclusão
    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Excluir Estado do Tempo?',
            content: 'Essa ação não pode ser desfeita.',
            okText: 'Excluir',
            okType: 'danger',
            cancelText: 'Cancelar',
            centered: true,
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
            render: (text) => <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{text}</span>
        },
        {
            title: 'Temp (°C)',
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
            align: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Ver ícone">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<EyeOutlined style={{ color: 'var(--primary-color)' }} />}
                            onClick={() => handlePreview(record.iconeURL)}
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
            <IconPreviewModal
                url={previewUrl}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default TabelaEstados;
