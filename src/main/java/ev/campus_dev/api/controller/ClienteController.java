package ev.campus_dev.api.controller;

import ev.campus_dev.api.models.cliente.Cliente;
import ev.campus_dev.api.models.usuario.Usuario;
import ev.campus_dev.api.repositories.ClienteRepository;
import ev.campus_dev.api.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Cliente>> listar() {
        return ResponseEntity.ok(clienteRepository.findAll());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Cliente> cadastrar(@RequestBody Cliente cliente) {
        Usuario usuario = cliente.getUsuario();
        usuario.setRole("CLIENTE");
        usuario.setDataCadastro(new Date());
        usuarioRepository.save(usuario);

        Cliente salvo = clienteRepository.save(cliente);
        return ResponseEntity.status(201).body(salvo);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteRepository.findById(id)
                .map(existente -> {
                    existente.setTipoDeMercado(cliente.getTipoDeMercado());
                    existente.setNomeEmpresa(cliente.getNomeEmpresa());
                    existente.setTelefone(cliente.getTelefone());
                    Cliente atualizado = clienteRepository.save(existente);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return clienteRepository.findById(id)
                .map(cliente -> {
                    clienteRepository.delete(cliente);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
