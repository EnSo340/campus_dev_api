package ev.campus_dev.api.controller;

import ev.campus_dev.api.models.usuario.Usuario;
import ev.campus_dev.api.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        usuario.setDataCadastro(new Date());
        Usuario salvo = usuarioRepository.save(usuario);
        return ResponseEntity.status(201).body(salvo);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioRepository.findById(id)
                .map(existente -> {
                    existente.setNomeCompleto(usuario.getNomeCompleto());
                    existente.setEmail(usuario.getEmail());
                    existente.setSenha(usuario.getSenha());
                    existente.setRole(usuario.getRole());
                    Usuario atualizado = usuarioRepository.save(existente);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuarioRepository.delete(usuario);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
