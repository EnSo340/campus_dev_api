package ev.campus_dev.api.repositories;

import ev.campus_dev.api.models.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
