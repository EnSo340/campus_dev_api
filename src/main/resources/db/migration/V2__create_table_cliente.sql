CREATE TABLE clientes (
    id BIGINT PRIMARY KEY,
    tipo_de_mercado VARCHAR(100),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    
    CONSTRAINT fk_cliente_usuario 
        FOREIGN KEY (id) REFERENCES usuarios(id)
        ON DELETE CASCADE
);