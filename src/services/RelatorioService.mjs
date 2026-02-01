import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import RegistroClimaticoDAO from '../daos/RegistroClimaticoDAO.mjs';

/**
 * Serviço responsável pela geração de relatórios e agregação de dados climáticos.
 * Combina dados de estações e registros para gerar estatísticas.
 */
export default class RelatorioService {
    constructor() {
        this.estacaoDAO = new EstacaoMedicaoDAO();
        this.registroDAO = new RegistroClimaticoDAO();
    }

    /**
     * Gera um relatório com médias de temperatura e umidade por estação.
     * Pode filtrar os registros por um intervalo de datas.
     * 
     * @param {Date} startDate Data inicial para filtro (opcional)
     * @param {Date} endDate Data final para filtro (opcional)
     * @returns {Array} Lista de dados combinados com médias calculadas
     */
    getRelatorioMedias(startDate, endDate) {
        const estacoes = this.estacaoDAO.listar();
        let registros = this.registroDAO.listar();

        // Filtrar por data se fornecido
        if (startDate && endDate) {
            registros = registros.filter(r => {
                const data = new Date(r.dataHora);
                return data >= startDate && data <= endDate;
            });
        }

        // Mapeia cada estação para calcular suas estatísticas
        return estacoes.map(estacao => {
            // Filtrar registros desta estação
            const registrosEstacao = registros.filter(r => r.estacaoId === estacao.id);
            const qtd = registrosEstacao.length;

            let mediaTemp = 0;
            let mediaUmidade = 0;

            if (qtd > 0) {
                // Calcula a soma e a média
                const somaTemp = registrosEstacao.reduce((acc, r) => acc + Number(r.temperatura || 0), 0);
                const somaUmidade = registrosEstacao.reduce((acc, r) => acc + Number(r.umidade || 0), 0);

                mediaTemp = somaTemp / qtd;
                mediaUmidade = somaUmidade / qtd;
            }

            // Retorna o objeto combinado da estação com seus dados estatísticos
            return {
                ...estacao,
                quantidadeRegistros: qtd,
                mediaTemperatura: parseFloat(mediaTemp.toFixed(2)),
                mediaUmidade: parseFloat(mediaUmidade.toFixed(2))
            };
        });
    }
}
