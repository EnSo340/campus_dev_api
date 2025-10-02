package ev.campus_dev.api.models.projeto;


import ev.campus_dev.api.dtos.projetos_dto.AtualizacaoProjeto;
import ev.campus_dev.api.dtos.projetos_dto.CadastroProjeto;
import ev.campus_dev.api.models.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "projeto")
@Table(name = "projetos")
@Getter
@Setter


public class Projeto {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id_projeto;
    private String titulo;
    private String descricao;
    private String linguagemTecnologia;
    private int qndPessoasNecessarias;
    private String status;
    private LocalDateTime dataDeCadastro;
    private String prazoEntrega;
    private String linkConvite;

    // relacionamento com cliente (quem pede)
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Usuario cliente;

    // relacionamento com desenvolvedor (quem executa)
    @ManyToOne
    @JoinColumn(name = "desenvolvedor_id")
    private Usuario desenvolvedor;

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
