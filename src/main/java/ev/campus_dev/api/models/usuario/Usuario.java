package ev.campus_dev.api.models.usuario;

import ev.campus_dev.api.dtos.usuario_dto.AtualizacaoUsuario;
import ev.campus_dev.api.dtos.usuario_dto.CadastroUsuario;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity(name = "usuario")
@Table(name = "usuarios")
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@NoArgsConstructor //
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nomeCompleto;
    private String email;
    private String senha;
    private LocalDateTime dataCadastro;
    private String role;


    public Usuario(CadastroUsuario dadosUsuario) {
        this.nomeCompleto = dadosUsuario.nomeCompleto();
        this.email = dadosUsuario.email();
        this.senha = dadosUsuario.senha();
        this.dataCadastro = LocalDateTime.now();
        this.role = dadosUsuario.role();
    }


    }


