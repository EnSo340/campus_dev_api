package ev.campus_dev.api.dtos.usuario_dto;

public record AtualizacaoUsuario(


        String nomeCompleto,
        String tipoDeMercado,
        String email,
        String senha,
        String role


) {
}
