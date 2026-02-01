/**
 * Classe que representa uma Estação de Medição Climática.
 * Armazena informações sobre a localização e identificação da estação.
 */
export default class EstacaoMedicao {
    id = null; // Identificador único da estação

    // Propriedades privadas
    #nome;
    #latitude;
    #longitude;
    #cidade;
    #pais;

    /**
     * Construtor da classe EstacaoMedicao.
     * @param {string} nomeNome da estação
     * @param {number} latitude Latitude geográfica
     * @param {number} longitude Longitude geográfica
     * @param {string} cidade Cidade onde está localizada
     * @param {string} pais País de localização
     */
    constructor(
        nome = "",
        latitude = 0,
        longitude = 0,
        cidade = "",
        pais = ""
    ) {
        this.setNome(nome);
        this.setLatitude(latitude);
        this.setLongitude(longitude);
        this.setCidade(cidade);
        this.setPais(pais);
    }

    // ====== Métodos de Acesso ao ID ======
    
    /**
     * Define o ID da estação.
     * @param {string} id Novo ID
     * @returns {boolean} True se o ID for válido, false caso contrário
     */
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
    // ====================================

    /**
     * Define o nome da estação.
     * @param {string} nome Novo nome
     */
    setNome(nome) {
        if (typeof nome === "string" && nome.length > 0) {
            this.#nome = nome;
            return true;
        }
        return false;
    }

    getNome() {
        return this.#nome;
    }

    /**
     * Define a latitude.
     * @param {number} lat Latitude numérica
     */
    setLatitude(lat) {
        if (typeof lat === "number") {
            this.#latitude = lat;
            return true;
        }
        return false;
    }

    getLatitude() {
        return this.#latitude;
    }

    /**
     * Define a longitude.
     * @param {number} long Longitude numérica
     */
    setLongitude(long) {
        if (typeof long === "number") {
            this.#longitude = long;
            return true;
        }
        return false;
    }

    getLongitude() {
        return this.#longitude;
    }

    /**
     * Define a cidade.
     * @param {string} cidade Nome da cidade
     */
    setCidade(cidade) {
        if (typeof cidade === "string" && cidade.length > 0) {
            this.#cidade = cidade;
            return true;
        }
        return false;
    }

    getCidade() {
        return this.#cidade;
    }

    /**
     * Define o país.
     * @param {string} pais Nome do país
     */
    setPais(pais) {
        if (typeof pais === "string" && pais.length > 0) {
            this.#pais = pais;
            return true;
        }
        return false;
    }

    getPais() {
        return this.#pais;
    }

    /**
     * Converte o objeto para um formato JSON simples.
     * Útil para serialização e armazenamento.
     * @returns {Object} Representação do objeto em JSON
     */
    toJSON() {
        return {
            id: this.id,
            nome: this.#nome,
            latitude: this.#latitude,
            longitude: this.#longitude,
            cidade: this.#cidade,
            pais: this.#pais,
        };
    }
}
