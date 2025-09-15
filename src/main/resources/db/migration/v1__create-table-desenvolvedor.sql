CREATE=TABLE desenvolvedores (
id=BIGINT AUTO_INCREMENT PRIMARY KEY,
nome_completo=VARCHAR(150) NOT NULL,
email=VARCHAR(150) NOT NULL UNIQUE,
ano_de_nasc= INT NOT NULL,
senha=VARCHAR(255) NOT NULL,
curso= VARCHAR(100) NOT NULL,
semestre= VARCHAR(50),
skills= VARCHAR(255),
data_de_cadastro= INT NOT NULL
);
