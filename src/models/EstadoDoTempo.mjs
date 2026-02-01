/**
 * Classe que representa um Estado do Tempo (Condição Climática).
 * Armazena dados meteorológicos como temperatura, umidade e vento.
 */
export default class EstadoDoTempo {
    id = null; // Identificador único

    // Propriedades privadas
    #condicaoGeral;
    #temperatura;
    #umidade;
    #precipitacaoMM;
    #velocidadeVento;
    #iconeURL; // URL do ícone representativo do clima

    /**
     * Construtor da classe EstadoDoTempo.
     * @param {string} condicaoGeral Descrição geral (ex: Ensolarado, Chuvoso)
     * @param {number} temperatura Temperatura em graus Celsius
     * @param {number} umidade Umidade relativa do ar (%)
     * @param {number} precipitacaoMM Precipitação em milímetros
     * @param {number} velocidadeVento Velocidade do vento em km/h
     * @param {string} iconeURL URL da imagem do ícone
     */
    constructor(
      condicaoGeral = "",
      temperatura = 0,
      umidade = 0,
      precipitacaoMM = 0,
      velocidadeVento = 0,
      iconeURL = ""
    ) {
      this.setCondicaoGeral(condicaoGeral);
      this.setTemperatura(temperatura);
      this.setUmidade(umidade);
      this.setPrecipitacaoMM(precipitacaoMM);
      this.setVelocidadeVento(velocidadeVento);
      this.setIconeURL(iconeURL);
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
  
    /**
     * Define a condição geral do tempo.
     * @param {string} condicao Descrição da condição
     */
    setCondicaoGeral(condicao) {
      if (typeof condicao === "string" && condicao.length > 0) {
        this.#condicaoGeral = condicao;
        return true;
      }
      return false;
    }
  
    getCondicaoGeral() {
      return this.#condicaoGeral;
    }
  
    // Define a temperatura
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
  
    // Define a umidade
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
  
    // Define a precipitação em mm
    setPrecipitacaoMM(mm) {
      if (typeof mm === "number") {
        this.#precipitacaoMM = mm;
        return true;
      }
      return false;
    }
  
    getPrecipitacaoMM() {
      return this.#precipitacaoMM;
    }
  
    // Define a velocidade do vento
    setVelocidadeVento(vel) {
      if (typeof vel === "number") {
        this.#velocidadeVento = vel;
        return true;
      }
      return false;
    }
  
    getVelocidadeVento() {
      return this.#velocidadeVento;
    }
  
    // Define a URL do ícone
    setIconeURL(url) {
      if (typeof url === "string" && url.length > 0) {
        this.#iconeURL = url;
        return true;
      }
      return false;
    }
  
    getIconeURL() {
      return this.#iconeURL;
    }
  
    /**
     * Converte o objeto para JSON.
     * @returns {Object} Objeto plano
     */
    toJSON() {
      return {
        id: this.id,
        condicaoGeral: this.#condicaoGeral,
        temperatura: this.#temperatura,
        umidade: this.#umidade,
        precipitacaoMM: this.#precipitacaoMM,
        velocidadeVento: this.#velocidadeVento,
        iconeURL: this.#iconeURL,
      };
    }
  }
  