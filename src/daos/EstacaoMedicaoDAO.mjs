import EstacaoMedicao from "../models/EstacaoMedicao.mjs";

export default class EstacaoMedicaoDAO {
    constructor() {
        this.chave = "estacoesMedicao";
    }

    // Lista tudo do LocalStorage
    listar() {
        try {
            const dados = localStorage.getItem(this.chave);
            return dados ? JSON.parse(dados) : [];
        } catch (e) {
            console.error("Erro ao ler EstacaoMedicao:", e);
            return [];
        }
    }

    // Gera ID único
    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    }

    // Converte o objeto da classe → JSON simples
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

    // Salva um novo item
    salvar(estacao) {
        const lista = this.listar();
        const obj = this.toPlain(estacao);

        if (!obj.id) obj.id = this.gerarId();

        lista.push(obj);
        localStorage.setItem(this.chave, JSON.stringify(lista));
        return obj;
    }

    // Atualiza por ID
    atualizar(id, novaEstacao) {
        const lista = this.listar();
        const obj = this.toPlain(novaEstacao);

        obj.id = id;

        const idx = lista.findIndex((e) => e.id === id);

        if (idx >= 0) {
            lista[idx] = obj;
        } else {
            lista.push(obj);
        }

        localStorage.setItem(this.chave, JSON.stringify(lista));
    }

    // Excluir por ID
    excluir(id) {
        const novaLista = this.listar().filter((e) => e.id !== id);
        localStorage.setItem(this.chave, JSON.stringify(novaLista));
    }

    // Buscar por ID e reconstruir classe
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

        estacao.id = item.id; // adicionar ID no objeto
        return estacao;
    }
}
