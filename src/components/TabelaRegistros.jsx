import React from 'react';
import { Table, Button, Space, Modal, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TabelaRegistros = ({ data, estacoes, estados, onEdit, onDelete }) => {

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Excluir Registro?',
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

    const getNomeEstacao = (id) => {
        const estacao = estacoes.find(e => e.id === id);
        return estacao ? estacao.nome : 'Desconhecida';
    };

    const getEstadoInfo = (id) => {
        const estado = estados.find(e => e.id === id);
        if (!estado) return { nome: 'Desconhecido', color: 'default' };
        
        const condicao = estado.condicaoGeral.toLowerCase();
        let color = 'blue';
        if (condicao.includes('sol') || condicao.includes('limpo')) color = 'orange';
        if (condicao.includes('chuva') || condicao.includes('garoa')) color = 'cyan';
        if (condicao.includes('tempestade') || condicao.includes('trovoadas')) color = 'purple';
        if (condicao.includes('nublado') || condicao.includes('nuvens')) color = 'default';

        return { nome: estado.condicaoGeral, color };
    };

    const columns = [
        {
            title: 'Data/Hora',
            dataIndex: 'dataHora',
            key: 'dataHora',
            render: (text) => <span style={{ color: 'var(--text-secondary)' }}>{new Date(text).toLocaleString()}</span>,
        },
        {
            title: 'Estação',
            dataIndex: 'estacaoId',
            key: 'estacaoId',
            render: (id) => <span style={{ fontWeight: 500 }}>{getNomeEstacao(id)}</span>,
        },
        {
            title: 'Condição',
            dataIndex: 'estadoTempoId',
            key: 'estadoTempoId',
            render: (id) => {
                const info = getEstadoInfo(id);
                return <Tag color={info.color}>{info.nome}</Tag>;
            },
        },
        {
            title: 'Temp (°C)',
            dataIndex: 'temperatura',
            key: 'temperatura',
            align: 'center',
            render: (temp) => (
                <span style={{ fontWeight: 600, color: temp > 30 ? 'var(--error-color)' : 'var(--text-primary)' }}>
                    {temp} °C
                </span>
            )
        },
        {
            title: 'Umidade (%)',
            dataIndex: 'umidade',
            key: 'umidade',
            align: 'center',
            render: (umid) => <span>{umid}%</span>
        },
        {
            title: 'Pressão (hPa)',
            dataIndex: 'pressaoAtmosferica',
            key: 'pressaoAtmosferica',
            align: 'center',
            responsive: ['lg'],
        },
        {
            title: 'Ações',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space size="small">
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

export default TabelaRegistros;
