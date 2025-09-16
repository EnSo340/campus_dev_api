package ev.campus_dev.api.models.desenvolvedor;

import ev.campus_dev.api.dto.desenvolvedor.AtualizacaoDesenvolvedor;
import ev.campus_dev.api.dto.desenvolvedor.CadastroDesenvolvedor;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;  // identificador único

    private String nomeCompleto;
    private String email;
    private int anoDeNasc;
    private String senha;
    private String curso;
    private String semestre;
    private String skills;
    private int dataDeCadastro;

    public Desenvolvedor(CadastroDesenvolvedor dadosDesenvolvedor) {
        this.nomeCompleto = dadosDesenvolvedor.id_nomeCompleto();
        this.email = dadosDesenvolvedor.id_email();
        this.anoDeNasc = dadosDesenvolvedor.id_anoDeNasc();
        this.senha = dadosDesenvolvedor.senha();
        this.curso = dadosDesenvolvedor.id_curso();
        this.semestre = dadosDesenvolvedor.id_semestre();
        this.skills = dadosDesenvolvedor.skills();
        this.dataDeCadastro = getDataDeCadastro();
    }

    public void atualizarDesenvolvedor(AtualizacaoDesenvolvedor dados) {
        if (dados.id_nomeCompleto() != null) {
            this.nomeCompleto = dados.id_nomeCompleto();
        }
        if (dados.id_email() != null) {
            this.email = dados.id_email();
        }
        if (dados.id_curso() != null) {
            this.curso = dados.id_curso();
        }
        if (dados.id_skills() != null) {
            this.skills = dados.id_skills();
        }
        if (dados.id_semestre() != null) {
            this.semestre = dados.id_semestre();
        }
    }
}
