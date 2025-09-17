   id_user BIGINT NOT NULL AUTO_INCREMENT,
    nome_completo VARCHAR(150) NOT NULL,
    tipo_de_mercado VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATE NOT NULL,

    PRIMARY KEY (id_user)