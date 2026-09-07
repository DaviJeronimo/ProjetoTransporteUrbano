CREATE TABLE IF NOT EXISTS usuario (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50)
    );

CREATE TABLE IF NOT EXISTS veiculo (
    id UUID PRIMARY KEY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    capacidade INT NOT NULL,
    tipo VARCHAR(30),
    status VARCHAR(20) NOT NULL,
    linha VARCHAR(100)
    );