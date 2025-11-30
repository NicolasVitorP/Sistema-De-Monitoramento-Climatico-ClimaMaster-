export default class EstadoDoTempo {
    id = null; // <-- ID simples e público
  
    #condicaoGeral;
    #temperatura;
    #umidade;
    #precipitacaoMM;
    #velocidadeVento;
    #iconeURL;
  
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
  