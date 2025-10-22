package ev.campus_dev.api.models.projeto;


import java.util.Set;
import ev.campus_dev.api.models.desenvolvedor.Desenvolvedor;
import ev.campus_dev.api.dtos.projetos_dto.AtualizacaoProjeto;
import ev.campus_dev.api.dtos.projetos_dto.CadastroProjeto;
import ev.campus_dev.api.models.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;

@Entity(name = "projeto")
@Table(name = "projetos")
@Getter
@Setter
@NoArgsConstructor
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

//    // relacionamento com desenvolvedor (quem executa)
//    @ManyToOne
//    @JoinColumn(name = "desenvolvedor_id")
//    private Usuario desenvolvedor;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "projetos_desenvolvedores",
            joinColumns = @JoinColumn(name = "projeto_id"),
            inverseJoinColumns = @JoinColumn(name = "desenvolvedor_id")
    )
    private Set<Desenvolvedor> desenvolvedores = new HashSet<>();

    public Projeto(CadastroProjeto dados) {
        //construtor (se precisar)
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
