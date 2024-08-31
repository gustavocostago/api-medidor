# MEDIDOR

## Descrição

Um back-end de um serviço que gerencia a leitura individualizada de consumo de água e gás. o serviço utilizará IA para obter a medição através da foto de um medidor.

## Requisitos

- Crie um arquivo .env na raiz do projeto com a seguinte configuração:

```bash
GEMINI_API_KEY=<sua-chave-da-API>
```

Substitua <sua-chave-da-API> pela chave da API Gemini.

## Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/gustavocostago/api-medidor.git
```

### 2. Executar o docker-compose

```bash
docker compose up -d
```
