package ev.campus_dev.api.dtos.usuario_dto;

import java.time.LocalDateTime;

public record CadastroUsuario(
        String nomeCompleto,
        String tipoDeMercado,
        String email,
        String senha,
        String role,
        LocalDateTime dataDeCadastro
) {}