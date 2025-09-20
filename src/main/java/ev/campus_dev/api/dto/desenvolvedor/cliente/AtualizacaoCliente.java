package ev.campus_dev.api.dto.desenvolvedor.cliente;

import ev.campus_dev.api.models.usuario.Usuario;

public record AtualizacaoCliente(


        String tipoDeMercado,
        String nomeEmpresa,
        String telefone
) {
}
