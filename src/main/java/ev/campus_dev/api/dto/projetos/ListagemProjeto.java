package ev.campus_dev.api.dto.projetos;

import java.util.Date;

public record ListagemProjeto(


        String titulo,
        String descricao,
        String linguagemTecnologia,
        String status,
        Date prazoEntrega

) {
}
