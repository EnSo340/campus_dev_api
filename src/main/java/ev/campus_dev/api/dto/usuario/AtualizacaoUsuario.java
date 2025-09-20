package ev.campus_dev.api.dto.usuario;

public record AtualizacaoUsuario(


        String nomeCompleto,
        String tipoDeMercado,
        String email,
        String senha,
        String role


) {
}
