CREATE TABLE projeto (
    id_projeto BIGINT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    linguagem_tecnologia VARCHAR(150),
    qnd_pessoas_necessarias INT,
    status VARCHAR(100),
    data_criacao DATE,
    prazo_entrega DATE,
    link_convite VARCHAR(500),

    PRIMARY KEY (id_projeto)
);
