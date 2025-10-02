package ev.campus_dev.api.dtos.projetos_dto;

import java.time.LocalDateTime;

public record CadastroProjeto(
        String titulo,
        String descricao,
        String linguagemTecnologia,
        Integer qndPessoasNecessarias,
        String status,
        LocalDateTime dataDeCadastro,
        String prazoEntrega,
        String linkConvite
) {}
