import EstadoDoTempo from "../models/EstadoDoTempo.mjs";

export default class EstadoDoTempoDAO {
  constructor() {
    this.chave = "estadosDoTempo";
  }

  // Lista tudo do LocalStorage
  listar() {
    try {
      const dados = localStorage.getItem(this.chave);
      return dados ? JSON.parse(dados) : [];
    } catch (e) {
      console.error("Erro ao ler EstadoDoTempo:", e);
      return [];
    }
  }

  // Gera ID único
  gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }

  // Converte o objeto da classe → JSON simples
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

  // Salva um novo item
  salvar(estado) {
    const lista = this.listar();
    const obj = this.toPlain(estado);

    if (!obj.id) obj.id = this.gerarId();

    lista.push(obj);
    localStorage.setItem(this.chave, JSON.stringify(lista));
    return obj;
  }

  // Atualiza por ID
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

  // Excluir por ID
  excluir(id) {
    const novaLista = this.listar().filter((e) => e.id !== id);
    localStorage.setItem(this.chave, JSON.stringify(novaLista));
  }

  // Buscar por ID e reconstruir classe
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

    estado.id = item.id; // adicionar ID no objeto
    return estado;
  }
}
