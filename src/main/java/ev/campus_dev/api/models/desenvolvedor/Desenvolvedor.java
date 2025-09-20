package ev.campus_dev.api.models.desenvolvedor;

import ev.campus_dev.api.dto.desenvolvedor.desenvolvedor.AtualizacaoDesenvolvedor;
import ev.campus_dev.api.dto.desenvolvedor.desenvolvedor.CadastroDesenvolvedor;
import ev.campus_dev.api.models.usuario.Usuario;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "desenvolvedor")
@Table(name = "desenvolvedores")
@Getter
@Setter
@EqualsAndHashCode
public class Desenvolvedor {

    @Id
    private long id_desenvolvedor;
    private String curso;
    private String semestre;
    private String skills;
    private int dataDeCadastro;

    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public Desenvolvedor(CadastroDesenvolvedor dadosDesenvolvedor) {
        this.curso = dadosDesenvolvedor.curso();
        this.semestre = dadosDesenvolvedor.semestre();
        this.skills = dadosDesenvolvedor.skills();
        this.dataDeCadastro = getDataDeCadastro();

    }

    public void atualizarDesenvolvedor(AtualizacaoDesenvolvedor dados) {


        if (dados.curso() != null) {
            this.curso = dados.curso();
        }
        if (dados.skills() != null) {
            this.skills = dados.skills();
        }
        if (dados.semestre() != null) {
            this.semestre = dados.semestre();
        }
    }
}
