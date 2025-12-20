# 🌦 Sistema de Monitoramento Climático (ClimaMaster)

Este projeto exemplifica a estrutura de um **Sistema de Monitoramento Climático**, baseado em **3 CRUDs com relacionamentos** e **1 Relatório Combinado**.

---
🚀 **Deploy da Aplicação :**
https://sistema-de-monitoramento-climatico.vercel.app/

🔗 **Documentação Técnica :** [Acesse a documentação técnica completa no GitHub](https://github.com/NicolasVitorP/Sistema-de-Monitoramento-Climatico)


## 📍 CRUD Estações de Medição
**Entidade:** Locais fixos para coleta de dados.

**Campos:**
- `id`
- `nome` (Ex: `"Estação Meteorológica Central"`)
- `latitude`
- `longitude`
- `cidade`
- `pais`

**Relacionamento:**
- **1:N** com **Registros Climáticos**  
  *(Uma Estação gera Muitos Registros).*

---

## ☁️ CRUD Estado do Tempo
**Entidade:** Representa o estado do tempo observado em um determinado momento.

**Campos:**
- `id`
- `condicaoGeral` (Ex: `"Ensolarado"`, `"Nublado"`, `"Chuva Forte"`)
- `temperatura` (número)
- `umidade` (número)
- `precipitacaoMM` (número)
- `velocidadeVento` (número)
- `iconeURL` (URL do ícone)

**Relacionamento:**
- Pode ser utilizada em **Registros Climáticos**, caso seja necessário registrar medições ao longo do tempo.  
  *(Um Estado do Tempo pode ser referenciado em Muitos Registros).*

---

## 🌡️ CRUD Registros Climáticos
**Entidade:** As medições reais de clima em um ponto no tempo.

**Campos:**
- `id`
- `estacaoId` *(Chave Estrangeira → Estações de Medição)*
- `estadoTempoId` *(Chave Estrangeira → Estado do Tempo)*
- `dataHora` *(Timestamp da medição)*
- `temperatura (°C)`
- `umidade (%)`
- `pressaoAtmosferica (hPa)`

**Relacionamento:**
- Possui **duas chaves estrangeiras**, estabelecendo a ligação necessária para o sistema e o relatório.

---

## 📊 Relatório Combinado
**Relatório:** Médias Climáticas por Estação  

**Entidades Combinadas:**  
- Estações de Medição  
- Registros Climáticos  

**Métrica:**  
- Exibe a **Temperatura Média** e a **Umidade Média** por cada Estação em um período de tempo definido.

**Objetivo:**  
- Mostrar qual estação registrou as maiores médias de temperatura/umidade, utilizando **agrupamento (Group By)** no contexto SQL/NoSQL.

---

## 📌 Requisitos Adicionais (Estrutura e DAO)
- **DAOs:**  
  - `EstacaoMedicaoDAO`  
  - `EstadoDoTempoDAO`  
  - `RegistroClimaticoDAO`  

Cada DAO encapsula as operações **CRUD** para sua respectiva entidade, isolando a lógica de persistência (**LocalStorage**) do restante da aplicação React.

---

## 🛠️ Tecnologias
- **Frontend:** ReactJS 19.2.3
- **Linguagem:** JavaScript (ES6+)
- **UI/UX:** Ant Design (AntD) 6.1.0
- **Roteamento:** React Router DOM 7.10.1
- **Mapas:** Leaflet 1.9.4 & React Leaflet 5.0.0
- **Build Tool:** Vite 7.2.4
- **Persistência:** LocalStorage
- **Recursos Extras:**  
  - Responsividade (mobile-first)
  - Mapas interativos com marcadores
  - Validação de formulários
  - Feedback visual (loaders, mensagens de sucesso/erro)
  - Interface moderna e acessível

---

## 🚀 Objetivo do Projeto
Construir um sistema modular e escalável para monitoramento climático, permitindo:
- Cadastro e gerenciamento de estações meteorológicas
- Visualização geográfica das estações em mapa interativo
- Classificação de tipos de clima
- Registro de medições em tempo real
- Relatórios agregados para análise de tendências climáticas
