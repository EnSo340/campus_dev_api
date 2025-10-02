package ev.campus_dev.api.dtos.cliente_dto;

import java.time.LocalDateTime;

public record CadastroCliente(
        String tipoDeMercado,
        String nomeEmpresa,
        String telefone,
        LocalDateTime dataDeCadastro
) {
}
