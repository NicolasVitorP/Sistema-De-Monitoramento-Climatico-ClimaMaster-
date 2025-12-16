import EstacaoMedicaoDAO from '../daos/EstacaoMedicaoDAO.mjs';
import RegistroClimaticoDAO from '../daos/RegistroClimaticoDAO.mjs';

export default class RelatorioService {
    constructor() {
        this.estacaoDAO = new EstacaoMedicaoDAO();
        this.registroDAO = new RegistroClimaticoDAO();
    }

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

        return estacoes.map(estacao => {
            // Filtrar registros desta estação
            const registrosEstacao = registros.filter(r => r.estacaoId === estacao.id);
            const qtd = registrosEstacao.length;

            let mediaTemp = 0;
            let mediaUmidade = 0;

            if (qtd > 0) {
                const somaTemp = registrosEstacao.reduce((acc, r) => acc + Number(r.temperatura || 0), 0);
                const somaUmidade = registrosEstacao.reduce((acc, r) => acc + Number(r.umidade || 0), 0);

                mediaTemp = somaTemp / qtd;
                mediaUmidade = somaUmidade / qtd;
            }

            return {
                ...estacao,
                quantidadeRegistros: qtd,
                mediaTemperatura: parseFloat(mediaTemp.toFixed(2)),
                mediaUmidade: parseFloat(mediaUmidade.toFixed(2))
            };
        });
    }
}
