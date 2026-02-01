import EstacaoMedicao from "../models/EstacaoMedicao.mjs";

/**
 * Data Access Object (DAO) para Estações de Medição.
 * Gerencia a persistência de dados no LocalStorage do navegador.
 */
export default class EstacaoMedicaoDAO {
    constructor() {
        this.chave = "estacoesMedicao"; // Chave usada no LocalStorage
    }

    /**
     * Lista todas as estações salvas no LocalStorage.
     * @returns {Array} Lista de objetos de estações
     */
    listar() {
        try {
            const dados = localStorage.getItem(this.chave);
            return dados ? JSON.parse(dados) : [];
        } catch (e) {
            console.error("Erro ao ler EstacaoMedicao:", e);
            return [];
        }
    }

    /**
     * Gera um ID único aleatório para novas estações.
     * @returns {string} ID gerado
     */
    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    }

    /**
     * Converte um objeto da classe EstacaoMedicao para um objeto simples (POJO).
     * @param {EstacaoMedicao} estacao Instância da classe
     * @returns {Object} Objeto plano para salvar
     */
    toPlain(estacao) {
        if (!estacao) return {};

        return {
            id: estacao.id ?? this.gerarId(),
            nome: estacao.getNome?.(),
            latitude: estacao.getLatitude?.(),
            longitude: estacao.getLongitude?.(),
            cidade: estacao.getCidade?.(),
            pais: estacao.getPais?.(),
        };
    }

    /**
     * Salva uma nova estação no armazenamento.
     * @param {EstacaoMedicao} estacao Objeto a ser salvo
     * @returns {Object} O objeto salvo com ID
     */
    salvar(estacao) {
        const lista = this.listar();
        const obj = this.toPlain(estacao);

        if (!obj.id) obj.id = this.gerarId();

        lista.push(obj);
        localStorage.setItem(this.chave, JSON.stringify(lista));
        return obj;
    }

    /**
     * Atualiza uma estação existente pelo ID.
     * @param {string} id ID da estação a atualizar
     * @param {EstacaoMedicao} novaEstacao Dados atualizados
     */
    atualizar(id, novaEstacao) {
        const lista = this.listar();
        const obj = this.toPlain(novaEstacao);

        obj.id = id;

        const idx = lista.findIndex((e) => e.id === id);

        if (idx >= 0) {
            lista[idx] = obj;
        } else {
            // Se não encontrar, adiciona como novo (comportamento de 'upsert' opcional)
            lista.push(obj);
        }

        localStorage.setItem(this.chave, JSON.stringify(lista));
    }

    /**
     * Remove uma estação pelo ID.
     * @param {string} id ID da estação a remover
     */
    excluir(id) {
        const novaLista = this.listar().filter((e) => e.id !== id);
        localStorage.setItem(this.chave, JSON.stringify(novaLista));
    }

    /**
     * Busca uma estação específica pelo ID e retorna uma instância da classe.
     * @param {string} id ID da estação
     * @returns {EstacaoMedicao|null} Instância encontrada ou null
     */
    buscar(id) {
        const item = this.listar().find((e) => e.id === id);
        if (!item) return null;

        const estacao = new EstacaoMedicao(
            item.nome,
            item.latitude,
            item.longitude,
            item.cidade,
            item.pais
        );

        estacao.id = item.id; // Restaurar o ID no objeto
        return estacao;
    }
}
