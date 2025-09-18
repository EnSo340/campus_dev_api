package ev.campus_dev.api.repositories;

import ev.campus_dev.api.models.desenvolvedor.Desenvolvedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesenvolvedorRepository extends JpaRepository<Desenvolvedor, Long> {
}
