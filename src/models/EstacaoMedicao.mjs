export default class EstacaoMedicao {
    id = null;

    #nome;
    #latitude;
    #longitude;
    #cidade;
    #pais;

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
