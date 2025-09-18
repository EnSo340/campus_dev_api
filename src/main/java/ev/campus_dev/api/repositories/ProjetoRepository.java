package ev.campus_dev.api.repositories;


import ev.campus_dev.api.models.projeto.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
}
