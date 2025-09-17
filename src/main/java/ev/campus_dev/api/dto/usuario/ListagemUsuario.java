package ev.campus_dev.api.dto.usuario;

import ev.campus_dev.api.models.usuario.Usuario;
import java.util.Date;

public record ListagemUsuario(
        Long id,
        String nomeCompleto,
        String tipoDeMercado,
        String email,
        Date dataCadastro
) {
    public ListagemUsuario(Usuario usuario) {
        this(
                usuario.getId_user(),
                usuario.getNomeCompleto(),
                usuario.getTipoDeMercado(),
                usuario.getEmail(),
                usuario.getDataCadastro()
        );
    }
}
