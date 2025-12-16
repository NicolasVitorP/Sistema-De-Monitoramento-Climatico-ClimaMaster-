import React from 'react';
import { Table, Button, Space, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TabelaRegistros = ({ data, estacoes, estados, onEdit, onDelete }) => {

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

    const getNomeEstacao = (id) => {
        const estacao = estacoes.find(e => e.id === id);
        return estacao ? estacao.nome : 'Desconhecida';
    };

    const getNomeEstado = (id) => {
        const estado = estados.find(e => e.id === id);
        return estado ? estado.condicaoGeral : 'Desconhecido';
    };

    const columns = [
        {
            title: 'Data/Hora',
            dataIndex: 'dataHora',
            key: 'dataHora',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Estação',
            dataIndex: 'estacaoId',
            key: 'estacaoId',
            render: (id) => getNomeEstacao(id),
        },
        {
            title: 'Condição',
            dataIndex: 'estadoTempoId',
            key: 'estadoTempoId',
            render: (id) => getNomeEstado(id),
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
            title: 'Pressão (hPa)',
            dataIndex: 'pressaoAtmosferica',
            key: 'pressaoAtmosferica',
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

export default TabelaRegistros;
