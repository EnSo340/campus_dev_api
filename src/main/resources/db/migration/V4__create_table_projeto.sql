CREATE TABLE projetos (
    id_projeto BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    linguagem_tecnologia VARCHAR(100),
    qnd_pessoas_necessarias INT,
    status ENUM('ABERTO', 'EM_ANDAMENTO', 'FINALIZADO') DEFAULT 'ABERTO',
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    prazo_entrega DATETIME,
    link_convite VARCHAR(255),

    -- FK para quem criou o projeto (cliente)
    cliente_id BIGINT,

    CONSTRAINT fk_projeto_cliente
        FOREIGN KEY (cliente_id) REFERENCES usuarios(id)
        ON DELETE SET NULL
);