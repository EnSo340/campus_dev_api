package ev.campus_dev.api.dtos.cliente_dto;

import java.util.Date;

public record ListagemCliente(

        String tipoDeMercado,
        String nomeEmpresa,
        String telefone,
        Date dataDeCadastro
) {
}
