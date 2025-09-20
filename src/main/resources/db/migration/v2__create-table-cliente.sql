
CREATE TABLE clientes (
    id BIGINT PRIMARY KEY,
    tipo_de_mercado VARCHAR(100),
    CONSTRAINT fk_cliente_usuario FOREIGN KEY (id) REFERENCES usuarios(id) ON DELETE CASCADE
);
