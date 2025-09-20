package ev.campus_dev.api.models.usuario;

import ev.campus_dev.api.dto.usuario.AtualizacaoUsuario;
import ev.campus_dev.api.dto.usuario.CadastroUsuario;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity(name = "usuario")
@Table(name= "usuarios")
@Getter
@Setter
@EqualsAndHashCode




public class Usuario {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_user;
    private String nomeCompleto;
    private String email;
    private String senha;
    private Date dataCadastro;
    private String role; // CLIENTE, DESENVOLVEDOR, AMBO

public void atualizarDados (AtualizacaoUsuario dadosUsuario) {


    if (dadosUsuario.nomeCompleto() != null) {
        this.nomeCompleto = dadosUsuario.nomeCompleto();
    }
    if (dadosUsuario.email() != null) {
        this.email = dadosUsuario.email();
    }
    if (dadosUsuario.senha() != null) {
        this.senha = dadosUsuario.senha();
    }
    if (dadosUsuario.role() !=null ) {
        this.role = dadosUsuario.role();
    }
}

public void cadastrarDados (CadastroUsuario dadosUsuario) {

    this.nomeCompleto = dadosUsuario.nomeCompleto();
    this.curso = dadosUsuario.curso();
    this.curso = dadosDesenvolvedor.curso();
    this.curso = dadosDesenvolvedor.curso();


}





}
