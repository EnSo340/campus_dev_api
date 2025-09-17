package ev.campus_dev.api.models.usuario;

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
    private String tipoDeMercado;
    private String email;
    private String senha;
   private Date dataCadastro;




}
