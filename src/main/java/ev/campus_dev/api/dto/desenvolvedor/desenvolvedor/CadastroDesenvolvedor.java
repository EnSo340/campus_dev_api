package ev.campus_dev.api.dto.desenvolvedor.desenvolvedor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

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
        int dataDeCadastro




) {
}
