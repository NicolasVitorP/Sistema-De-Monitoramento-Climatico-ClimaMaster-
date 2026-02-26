# <p align="center"> Sistema de Monitoramento Climático ClimaMaster </p>
<div align="center">
 <a href="https://sistema-de-monitoramento-climatico.vercel.app/" target="_blank">

  <img width="530" height="530" alt="ClimaMaster" src="https://github.com/user-attachments/assets/0b397957-8edd-4406-9b5b-8846616aaf45" />
</div>




<p align="center">
<strong>Sistema Avançado de Monitoramento Climático</strong><br />
<i>Uma solução modular para coleta, gestão e análise de dados meteorológicos georreferenciados.</i>
</p>


---
Este projeto exemplifica a estrutura de um **Sistema de Monitoramento Climático**, baseado em **3 CRUDs com relacionamentos** e **1 Relatório Combinado**.

---
🚀 **Deploy da Aplicação :**
 [Acesse o Deploy da Aplicação](https://sistema-de-monitoramento-climatico.vercel.app/)

🔗 **Documentação Técnica :** [Acesse a documentação técnica completa no GitHub](https://github.com/NicolasVitorP/Sistema-de-Monitoramento-Climatico)


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

### 
| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **ReactJS** | 19.2.3 | Biblioteca principal para a interface |
| **JavaScript** | ES6+ | Linguagem base com sintaxe moderna |
| **Vite** | 7.2.4 | Build tool de alta performance |
| **React Router** | 7.10.1 | Gerenciamento de rotas e navegação |

### Interface e Geolocalização
- **Ant Design (AntD) 6.1.0**: Design System para componentes de UI.
- **Leaflet 1.9.4 & React Leaflet 5.0.0**: Solução para mapas interativos.
- **LocalStorage**: Persistência de dados no navegador.

---

## Recursos Principais

- **Responsividade**: Design adaptável para dispositivos móveis e desktop.
- **Mapas Interativos**: Manipulação de marcadores e geolocalização dinâmica.
- **Validação de Formulários**: Verificação de dados e tratamento de erros.
- **Feedback Visual**: Implementação de mensagens de estado (sucesso/erro).
- **Interface Moderna**: Foco em usabilidade, semântica e acessibilidade.
---

## 🚀 Objetivo do Projeto
Construir um sistema modular e escalável para monitoramento climático, permitindo:
- Cadastro e gerenciamento de estações meteorológicas
- Visualização geográfica das estações em mapa interativo
- Classificação de tipos de clima
- Registro de medições em tempo real
