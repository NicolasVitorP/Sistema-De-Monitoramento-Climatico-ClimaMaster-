import RegistroClimatico from "../models/RegistroClimatico.mjs";

export default class RegistroClimaticoDAO {
    constructor() {
        this.chave = "registrosClimaticos";
    }

    // Lista tudo do LocalStorage
    listar() {
        try {
            const dados = localStorage.getItem(this.chave);
            return dados ? JSON.parse(dados) : [];
        } catch (e) {
            console.error("Erro ao ler RegistroClimatico:", e);
            return [];
        }
    }

    // Gera ID único
    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    }

    // Converte o objeto da classe → JSON simples
    toPlain(registro) {
        if (!registro) return {};

        return {
            id: registro.id ?? this.gerarId(),
            estacaoId: registro.getEstacaoId?.(),
            estadoTempoId: registro.getEstadoTempoId?.(),
            dataHora: registro.getDataHora?.(),
            temperatura: registro.getTemperatura?.(),
            umidade: registro.getUmidade?.(),
            pressaoAtmosferica: registro.getPressaoAtmosferica?.(),
        };
    }

    // Salva um novo item
    salvar(registro) {
        const lista = this.listar();
        const obj = this.toPlain(registro);

        if (!obj.id) obj.id = this.gerarId();

        lista.push(obj);
        localStorage.setItem(this.chave, JSON.stringify(lista));
        return obj;
    }

    // Atualiza por ID
    atualizar(id, novoRegistro) {
        const lista = this.listar();
        const obj = this.toPlain(novoRegistro);

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

        const registro = new RegistroClimatico(
            item.estacaoId,
            item.estadoTempoId,
            item.dataHora,
            item.temperatura,
            item.umidade,
            item.pressaoAtmosferica
        );

        registro.id = item.id;
        return registro;
    }
}
