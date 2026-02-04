export default class RegistroClimatico {
  id = null;

  #estacaoId;
  #estadoTempoId;
  #dataHora;
  #temperatura;
  #umidade;
  #pressaoAtmosferica;

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
