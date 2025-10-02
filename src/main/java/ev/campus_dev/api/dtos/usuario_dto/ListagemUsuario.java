package ev.campus_dev.api.dtos.usuario_dto;

import ev.campus_dev.api.models.usuario.Usuario;

import java.time.LocalDateTime;

public record ListagemUsuario(
        Long id_user,
        String nomeCompleto,
        String email,
        LocalDateTime dataCadastro,
        String role
) {
    public ListagemUsuario(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                usuario.getDataCadastro(),
                usuario.getRole()
        );
    }
}
