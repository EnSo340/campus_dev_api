
CREATE TABLE desenvolvedores (
    id BIGINT PRIMARY KEY,
    curso VARCHAR(100),
    semestre VARCHAR(50),
    skills TEXT,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_desenvolvedor_usuario
        FOREIGN KEY (id) REFERENCES usuarios(id) ON DELETE CASCADE
);
