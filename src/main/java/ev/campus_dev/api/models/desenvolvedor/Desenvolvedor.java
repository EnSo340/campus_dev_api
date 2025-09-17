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
    private long id;

    private String nomeCompleto;
    private String email;
    private int anoDeNasc;
    private String senha;
    private String curso;
    private String semestre;
    private String skills;
    private int dataDeCadastro;

    public Desenvolvedor(CadastroDesenvolvedor dadosDesenvolvedor) {
        this.nomeCompleto = dadosDesenvolvedor.nomeCompleto();
        this.email = dadosDesenvolvedor.email();
        this.anoDeNasc = dadosDesenvolvedor.anoDeNasc();
        this.senha = dadosDesenvolvedor.senha();
        this.curso = dadosDesenvolvedor.curso();
        this.semestre = dadosDesenvolvedor.semestre();
        this.skills = dadosDesenvolvedor.skills();
        this.dataDeCadastro = getDataDeCadastro();
    }

    public void atualizarDesenvolvedor(AtualizacaoDesenvolvedor dados) {
        if (dados.nomeCompleto() != null) {
            this.nomeCompleto = dados.nomeCompleto();
        }
        if (dados.email() != null) {
            this.email = dados.email();
        }
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
