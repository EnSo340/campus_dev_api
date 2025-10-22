package ev.campus_dev.api.dtos.desenvolvedor_dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CadastroDesenvolvedor(
        @NotBlank(message = "Nome completo é obrigatório")
        String nomeCompleto,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Formato de email inválido")
        String email,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
        String senha,

        // Campos que podem ser nulos no cadastro e preenchidos depois no perfil
        String curso,
        String semestre,
        String skills
) {}


//
//        @NotNull
//        String nomeCompleto,
//        @Email
//        String email,
//        @NotBlank
//        int anoDeNasc,
//        @NotBlank
//        @Pattern(regexp = "\\d{11}" )
//        String senha,
//        @NotNull
//        String curso,
//        @NotNull
//        String semestre,
//        @NotNull
//        String skills,
//        @NotBlank
//        LocalDateTime dataDeCadastro

