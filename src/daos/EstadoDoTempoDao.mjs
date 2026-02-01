import EstadoDoTempo from "../models/EstadoDoTempo.mjs";

/**
 * Data Access Object (DAO) para Estados do Tempo.
 * Gerencia a persistência de dados no LocalStorage.
 */
export default class EstadoDoTempoDAO {
  constructor() {
    this.chave = "estadosDoTempo"; // Chave de armazenamento
  }

  /**
   * Lista todos os estados do tempo salvos.
   * @returns {Array} Lista de objetos
   */
  listar() {
    try {
      const dados = localStorage.getItem(this.chave);
      return dados ? JSON.parse(dados) : [];
    } catch (e) {
      console.error("Erro ao ler EstadoDoTempo:", e);
      return [];
    }
  }

  /**
   * Gera um ID único string.
   * @returns {string} ID gerado.
   */
  gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }

  /**
   * Transforma a instância de classe em objeto JS puro.
   */
  toPlain(estado) {
    if (!estado) return {};

    return {
      id: estado.id ?? this.gerarId(),
      condicaoGeral: estado.getCondicaoGeral?.(),
      temperatura: estado.getTemperatura?.(),
      umidade: estado.getUmidade?.(),
      precipitacaoMM: estado.getPrecipitacaoMM?.(),
      velocidadeVento: estado.getVelocidadeVento?.(),
      iconeURL: estado.getIconeURL?.(),
    };
  }

  /**
   * Salva um novo estado do tempo.
   */
  salvar(estado) {
    const lista = this.listar();
    const obj = this.toPlain(estado);

    if (!obj.id) obj.id = this.gerarId();

    lista.push(obj);
    localStorage.setItem(this.chave, JSON.stringify(lista));
    return obj;
  }

  /**
   * Atualiza um estado existente.
   */
  atualizar(id, novoEstado) {
    const lista = this.listar();
    const obj = this.toPlain(novoEstado);

    obj.id = id;

    const idx = lista.findIndex((e) => e.id === id);

    if (idx >= 0) {
      lista[idx] = obj;
    } else {
      lista.push(obj);
    }

    localStorage.setItem(this.chave, JSON.stringify(lista));
  }

  /**
   * Remove um estado pelo ID.
   */
  excluir(id) {
    const novaLista = this.listar().filter((e) => e.id !== id);
    localStorage.setItem(this.chave, JSON.stringify(novaLista));
  }

  /**
   * Busca por ID e retorna uma instância da classe.
   */
  buscar(id) {
    const item = this.listar().find((e) => e.id === id);
    if (!item) return null;

    const estado = new EstadoDoTempo(
      item.condicaoGeral,
      item.temperatura,
      item.umidade,
      item.precipitacaoMM,
      item.velocidadeVento,
      item.iconeURL
    );

    estado.id = item.id; // restaurar ID
    return estado;
  }
}
