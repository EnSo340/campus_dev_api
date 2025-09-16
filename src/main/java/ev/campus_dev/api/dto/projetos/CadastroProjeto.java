package ev.campus_dev.api.dto.projetos;

public record CadastroProjeto(
        String titulo,
        String descricao,
        String linguagemTecnologia,
        Integer qndPessoasNecessarias,
        String status,
        String dataCricao,
        String prazoEntrega,
        String linkConvite
) {}
