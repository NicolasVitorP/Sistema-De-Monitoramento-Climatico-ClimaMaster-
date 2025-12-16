import React, { useEffect, useState } from 'react';
import { Table, Typography, Card, Statistic, Row, Col, DatePicker, Button, Space } from 'antd';
import { FireOutlined, ExperimentOutlined, DashboardOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import RelatorioService from '../services/RelatorioService.mjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const RelatorioCombinado = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState(null);

    const carregarDados = () => {
        setLoading(true);
        const service = new RelatorioService();

        let startDate = null;
        let endDate = null;

        if (datas && datas.length === 2) {
            startDate = datas[0].toDate();
            endDate = datas[1].toDate();
        }

        const resultado = service.getRelatorioMedias(startDate, endDate);
        setDados(resultado);
        setLoading(false);
    };

    useEffect(() => {
        carregarDados();
    }, [datas]); // Recarregar quando as datas mudam

    const columns = [
        {
            title: 'Estação',
            dataIndex: 'nome',
            key: 'nome',
            sorter: (a, b) => a.nome.localeCompare(b.nome),
        },
        {
            title: 'Cidade / Pais',
            key: 'local',
            render: (_, record) => `${record.cidade} - ${record.pais}`,
        },
        {
            title: 'Qtd. Registros',
            dataIndex: 'quantidadeRegistros',
            key: 'qtd',
            sorter: (a, b) => a.quantidadeRegistros - b.quantidadeRegistros,
            align: 'center',
        },
        {
            title: 'Média Temperatura (°C)',
            dataIndex: 'mediaTemperatura',
            key: 'mediaTemp',
            sorter: (a, b) => a.mediaTemperatura - b.mediaTemperatura,
            render: (temp) => (
                <span style={{ color: temp > 30 ? 'red' : temp < 10 ? 'blue' : 'inherit', fontWeight: 'bold' }}>
                    {temp} °C
                </span>
            ),
            align: 'center',
        },
        {
            title: 'Média Umidade (%)',
            dataIndex: 'mediaUmidade',
            key: 'mediaUmidade',
            sorter: (a, b) => a.mediaUmidade - b.mediaUmidade,
            render: (umid) => (
                <span style={{ color: umid < 30 ? 'orange' : 'inherit' }}>
                    {umid} %
                </span>
            ),
            align: 'center',
        },
    ];

    return (
        <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0, color: '#1976D2' }}>
                    <DashboardOutlined /> Relatório de Médias
                </Title>
                <p style={{ color: 'var(--text-secondary)' }}>Análise de temperatura e umidade média agrupada por estação.</p>
            </div>

            <Card style={{ marginBottom: 24, borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.5)' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    alignItems: 'center'
                }}>
                    <span style={{ fontWeight: 500 }}>Filtrar por Período:</span>
                    <RangePicker
                        showTime
                        onChange={(dates) => setDatas(dates)}
                        style={{ flex: 1, minWidth: '280px' }}
                    />
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        onClick={carregarDados}
                        shape="round"
                    >
                        Atualizar
                    </Button>
                </div>
            </Card>

            <div style={{ overflowX: 'auto' }}>
                <Table
                    columns={columns}
                    dataSource={dados}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 10, responsive: true }}
                    scroll={{ x: 800 }}
                    bordered
                    style={{ background: 'transparent' }}
                />
            </div>
        </div>
    );
};

export default RelatorioCombinado;
