package ev.campus_dev.api.repositories;

import ev.campus_dev.api.models.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository <Cliente,Long> {
}
