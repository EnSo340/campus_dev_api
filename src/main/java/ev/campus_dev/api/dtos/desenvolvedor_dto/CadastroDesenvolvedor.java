package ev.campus_dev.api.dtos.desenvolvedor_dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public record CadastroDesenvolvedor(




        @NotNull
        String nomeCompleto,
        @Email
        String email,
        @NotBlank
        int anoDeNasc,
        @NotBlank
        @Pattern(regexp = "\\d{11}" )
        String senha,
        @NotNull
        String curso,
        @NotNull
        String semestre,
        @NotNull
        String skills,
        @NotBlank
        LocalDateTime dataDeCadastro




) {
}
