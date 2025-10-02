CREATE TABLE projetos_desenvolvedores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    projeto_id BIGINT NOT NULL,
    desenvolvedor_id BIGINT NOT NULL,

    CONSTRAINT fk_projeto FOREIGN KEY (projeto_id) REFERENCES projetos(id_projeto) ON DELETE CASCADE,
    CONSTRAINT fk_desenvolvedor FOREIGN KEY (desenvolvedor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE (projeto_id, desenvolvedor_id)
);
