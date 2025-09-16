package ev.campus_dev.api.models.projeto;


import ev.campus_dev.api.dto.projetos.AtualizacaoProjeto;
import ev.campus_dev.api.dto.projetos.CadastroProjeto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "projeto")
@Table(name = "projetos")
@Getter
@Setter


public class Projeto {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long id_projeto;
    String titulo;
    String descricao;
    String linguagemTecnologia;
    int qndPessoasNecessarias;
    String status;
    String dataCricao;
    String prazoEntrega;
    String linkConvite;

    public Projeto(CadastroProjeto dados) {
    }


    public void atualizarProjeto (AtualizacaoProjeto dados) {


            if (dados.titulo() != null) {
                this.titulo = dados.titulo();
            }
            if (dados.descricao() != null) {
                this.descricao = dados.descricao();
            }
            if (dados.linguagemTecnologia() != null) {
                this.linguagemTecnologia = dados.linguagemTecnologia();
            }
            if (dados.qndPessoasNecessarias() != null) {
                this.qndPessoasNecessarias = dados.qndPessoasNecessarias();
            }
            if (dados.status() != null) {
                this.status = dados.status();
            }
            if (dados.prazoEntrega() != null) {
                this.prazoEntrega = dados.prazoEntrega();
            }
            if (dados.linkConvite() != null) {
                this.linkConvite = dados.linkConvite();
            }

    }




}
