package ev.campus_dev.api.dto.desenvolvedor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CadastroDesenvolvedor(




        @NotNull
        String id_nomeCompleto,
        @Email
        String id_email,
        @NotBlank
        int id_anoDeNasc,
        @NotBlank
        @Pattern(regexp = "\\d{11}" )
        String senha,
        @NotNull
        String id_curso,
        @NotNull
        String id_semestre,
        @NotNull
        String skills,
        @NotBlank
        int dataDeCadastro




) {
}
