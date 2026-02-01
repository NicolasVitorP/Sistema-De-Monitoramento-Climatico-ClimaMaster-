import React, { useEffect, useState, useMemo } from 'react';
import { Table, Typography, Card, Statistic, Row, Col, DatePicker, Button, Tag, Space } from 'antd';
import { 
    FireOutlined, 
    ExperimentOutlined, 
    DashboardOutlined, 
    EnvironmentOutlined, 
    ReloadOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import RelatorioService from '../services/RelatorioService.mjs';

import StatIcon from '../components/StatIcon';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

/**
 * Página de Relatório Combinado.
 * Exibe médias calculadas e estatísticas gerais por estação e período.
 */
const RelatorioCombinado = () => {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState(null);

    // Carrega dados do RelatorioService
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
    }, [datas]);

    // Calcular Estatísticas Resumidas (Total, Médias Gerais)
    const stats = useMemo(() => {
        if (!dados.length) return { totalEstacoes: 0, avgTemp: 0, avgUmid: 0 };
        const totalEstacoes = dados.length;
        const totalTemp = dados.reduce((acc, curr) => acc + parseFloat(curr.mediaTemperatura), 0);
        const totalUmid = dados.reduce((acc, curr) => acc + parseFloat(curr.mediaUmidade), 0);
        return {
            totalEstacoes,
            avgTemp: (totalTemp / totalEstacoes).toFixed(1),
            avgUmid: (totalUmid / totalEstacoes).toFixed(1)
        };
    }, [dados]);

    const columns = [
        {
            title: 'Estação',
            dataIndex: 'nome',
            key: 'nome',
            sorter: (a, b) => a.nome.localeCompare(b.nome),
            render: (text) => <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{text}</span>
        },
        {
            title: 'Localização',
            key: 'local',
            render: (_, record) => (
                <Space>
                   <EnvironmentOutlined style={{ color: 'var(--text-light)' }} />
                   <span style={{ color: 'var(--text-secondary)' }}>{record.cidade}, {record.pais}</span>
                </Space>
            ),
        },
        {
            title: 'Qtd. Registros',
            dataIndex: 'quantidadeRegistros',
            key: 'qtd',
            sorter: (a, b) => a.quantidadeRegistros - b.quantidadeRegistros,
            align: 'center',
            render: (qtd) => <Tag color="blue">{qtd}</Tag>
        },
        {
            title: 'Média Temperatura',
            dataIndex: 'mediaTemperatura',
            key: 'mediaTemp',
            sorter: (a, b) => a.mediaTemperatura - b.mediaTemperatura,
            render: (temp) => {
                const color = temp > 30 ? 'volcano' : temp < 15 ? 'cyan' : 'green';
                const icon = temp > 30 ? <ArrowUpOutlined /> : temp < 15 ? <ArrowDownOutlined /> : null;
                return (
                    <Tag color={color} style={{ fontSize: '14px', padding: '4px 8px' }}>
                        {icon} {temp} °C
                    </Tag>
                );
            },
            align: 'center',
        },
        {
            title: 'Média Umidade',
            dataIndex: 'mediaUmidade',
            key: 'mediaUmidade',
            sorter: (a, b) => a.mediaUmidade - b.mediaUmidade,
            render: (umid) => {
                const color = umid < 30 ? 'orange' : 'blue';
                return (
                    <Tag color={color} style={{ fontSize: '14px', padding: '4px 8px' }}>
                         {umid} %
                    </Tag>
                );
            },
            align: 'center',
        },
    ];

    return (
        <div className="fade-in">
             <div style={{ marginBottom: '32px' }}>
                <Title level={2} style={{ margin: 0, color: 'var(--text-primary)' }}>
                    Relatório Combinado
                </Title>
                <Text type="secondary">Visão geral das médias climáticas por estação de monitoramento.</Text>
            </div>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={8}>
                    <Card bordered={false} className="card-lift">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                           <StatIcon icon={<EnvironmentOutlined />} color="#1976D2" />
                           <div>
                               <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total Estações</div>
                               <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                   {stats.totalEstacoes}
                               </div>
                           </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                     <Card bordered={false} className="card-lift">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                           <StatIcon icon={<FireOutlined />} color="#ef4444" />
                           <div>
                               <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Temp. Média Geral</div>
                               <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                   {stats.avgTemp} °C
                               </div>
                           </div>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                     <Card bordered={false} className="card-lift">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                           <StatIcon icon={<ExperimentOutlined />} color="#0ea5e9" />
                           <div>
                               <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Umidade Média Geral</div>
                               <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
                                   {stats.avgUmid} %
                               </div>
                           </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Filter & Table */}
            <Card bordered={false} style={{ marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    alignItems: 'center'
                }}>
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Filtrar Período:</span>
                    <RangePicker
                        showTime
                        onChange={(dates) => setDatas(dates)}
                        style={{ flex: 1, minWidth: '280px', maxWidth: '400px' }}
                    />
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        onClick={carregarDados}
                        shape="round"
                    >
                        Atualizar Dados
                    </Button>
                </div>
            </Card>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
                <Table
                    columns={columns}
                    dataSource={dados}
                    rowKey="id"
                    loading={loading}
                    pagination={{ pageSize: 8, responsive: true }}
                    scroll={{ x: 800 }}
                    bordered={false}
                />
            </div>
        </div>
    );
};

export default RelatorioCombinado;
