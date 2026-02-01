/**
 * Classe que representa um Registro Climático específico.
 * Relaciona uma Estação de Medição com um Estado do Tempo em um determinado momento.
 */
export default class RegistroClimatico {
  id = null; // Identificador único do registro

  // Propriedades privadas
  #estacaoId; // ID da estação associada
  #estadoTempoId; // ID do estado do tempo associado (opcional/legado)
  #dataHora; // Data e hora do registro
  #temperatura; // Leitura de temperatura no momento
  #umidade; // Leitura de umidade no momento
  #pressaoAtmosferica; // Leitura de pressão atmosférica

  /**
   * Construtor da classe RegistroClimatico.
   * @param {string} estacaoId ID da estação de origem
   * @param {string} estadoTempoId ID do tipo de clima (opcional)
   * @param {string} dataHora Data e hora em formato string ou Date
   * @param {number} temperatura Valor da temperatura
   * @param {number} umidade Valor da umidade
   * @param {number} pressaoAtmosferica Valor da pressão
   */
  constructor(
    estacaoId = "",
    estadoTempoId = "",
    dataHora = "",
    temperatura = 0,
    umidade = 0,
    pressaoAtmosferica = 0
  ) {
    this.setEstacaoId(estacaoId);
    this.setEstadoTempoId(estadoTempoId);
    this.setDataHora(dataHora);
    this.setTemperatura(temperatura);
    this.setUmidade(umidade);
    this.setPressaoAtmosferica(pressaoAtmosferica);
  }

  // ====== ID ======
  setId(id) {
    if (typeof id === "string" && id.length > 0) {
      this.id = id;
      return true;
    }
    return false;
  }

  getId() {
    return this.id;
  }
  // =================

  // Define o ID da estação associada
  setEstacaoId(id) {
    if (typeof id === "string" && id.length > 0) {
      this.#estacaoId = id;
      return true;
    }
    return false;
  }

  getEstacaoId() {
    return this.#estacaoId;
  }

  // Define o ID do estado do tempo
  setEstadoTempoId(id) {
    if (typeof id === "string" && id.length > 0) {
      this.#estadoTempoId = id;
      return true;
    }
    return false;
  }

  getEstadoTempoId() {
    return this.#estadoTempoId;
  }

  // Define a data e hora, convertendo para ISO string
  setDataHora(dataHora) {
    if (dataHora) {
      this.#dataHora = new Date(dataHora).toISOString();
      return true;
    }
    return false;
  }

  getDataHora() {
    return this.#dataHora;
  }

  // Define a temperatura registrada
  setTemperatura(temp) {
    if (typeof temp === "number") {
      this.#temperatura = temp;
      return true;
    }
    return false;
  }

  getTemperatura() {
    return this.#temperatura;
  }

  // Define a umidade registrada
  setUmidade(umidade) {
    if (typeof umidade === "number") {
      this.#umidade = umidade;
      return true;
    }
    return false;
  }

  getUmidade() {
    return this.#umidade;
  }

  // Define a pressão atmosférica registrada
  setPressaoAtmosferica(pressao) {
    if (typeof pressao === "number") {
      this.#pressaoAtmosferica = pressao;
      return true;
    }
    return false;
  }

  getPressaoAtmosferica() {
    return this.#pressaoAtmosferica;
  }

  /**
   * Converte para JSON.
   */
  toJSON() {
    return {
      id: this.id,
      estacaoId: this.#estacaoId,
      estadoTempoId: this.#estadoTempoId,
      dataHora: this.#dataHora,
      temperatura: this.#temperatura,
      umidade: this.#umidade,
      pressaoAtmosferica: this.#pressaoAtmosferica,
    };
  }
}
