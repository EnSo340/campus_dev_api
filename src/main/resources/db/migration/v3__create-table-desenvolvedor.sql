
CREATE TABLE desenvolvedores (
    id BIGINT PRIMARY KEY,
    ano_de_nasc INT,
    curso VARCHAR(100),
    semestre VARCHAR(50),
    skills TEXT,
    CONSTRAINT fk_desenvolvedor_usuario FOREIGN KEY (id) REFERENCES usuarios(id) ON DELETE CASCADE
);
