package ev.campus_dev.api.dtos.projetos_dto;

import java.util.Date;

public record ListagemProjeto(


        String titulo,
        String descricao,
        String linguagemTecnologia,
        String status,
        Date prazoEntrega

) {
}
