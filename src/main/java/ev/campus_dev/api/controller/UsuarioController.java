package ev.campus_dev.api.controller;

import ev.campus_dev.api.models.usuario.Usuario;
import ev.campus_dev.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario existente = usuarioRepository.findById(id).orElseThrow();
        existente.setNomeCompleto(usuario.getNomeCompleto());
        existente.setTipoDeMercado(usuario.getTipoDeMercado());
        existente.setEmail(usuario.getEmail());
        existente.setSenha(usuario.getSenha());
        existente.setDataCadastro(usuario.getDataCadastro());
        return usuarioRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }
}
