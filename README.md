# 🌦 Sistema de Monitoramento Climático (ClimaMaster)

Este projeto exemplifica a estrutura de um **Sistema de Monitoramento Climático**, baseado em **3 CRUDs com relacionamentos** e **1 Relatório Combinado**.

---

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

## ☁️ CRUD Tipos de Clima
**Entidade:** Categorias para classificar a condição observada.

**Campos:**
- `id`
- `descricao` (Ex: `"Ensolarado"`, `"Nublado"`, `"Chuva Forte"`)
- `icone` (URL ou código do ícone)

**Relacionamento:**
- **1:N** com **Registros Climáticos**  
  *(Um Tipo é referenciado em Muitos Registros).*

---

## 🌡️ CRUD Registros Climáticos
**Entidade:** As medições reais de clima em um ponto no tempo.

**Campos:**
- `id`
- `estacaoId` *(Chave Estrangeira → Estações de Medição)*
- `tipoClimaId` *(Chave Estrangeira → Tipos de Clima)*
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
  - `EstacaoDAO`  
  - `TipoClimaDAO`  
  - `RegistroDAO`  

Cada DAO encapsula as operações **CRUD** para sua respectiva entidade, isolando a lógica de persistência (**LocalStorage ou MongoDB**) do restante da aplicação React.

---

## 🛠️ Tecnologias
- **Frontend:** ReactJS  
- **UI/UX:** Ant Design (AntD)  
- **Banco de Dados:** LocalStorage ou MongoDB  
- **Recursos Extras:**  
  - Responsividade  
  - Feedback visual (loaders, mensagens de sucesso/erro)

---

## 🚀 Objetivo do Projeto
Construir um sistema modular e escalável para monitoramento climático, permitindo:
- Cadastro e gerenciamento de estações meteorológicas
- Classificação de tipos de clima
- Registro de medições em tempo real
- Relatórios agregados para análise de tendências

