package ev.campus_dev.api.dtos.projetos_dto;

public record AtualizacaoProjeto(
        String titulo,
        String descricao,
        String linguagemTecnologia,
        Integer qndPessoasNecessarias,
        String status,
        String prazoEntrega,
        String linkConvite
) { }
