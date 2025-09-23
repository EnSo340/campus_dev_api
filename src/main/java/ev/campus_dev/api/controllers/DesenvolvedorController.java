package ev.campus_dev.api.controllers;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import ev.campus_dev.api.dtos.desenvolvedor_dto.ListagemDesenvolvedor;
import ev.campus_dev.api.dtos.desenvolvedor_dto.AtualizacaoDesenvolvedor;
import ev.campus_dev.api.dtos.desenvolvedor_dto.CadastroDesenvolvedor;
import ev.campus_dev.api.models.usuario.Usuario;
import ev.campus_dev.api.models.desenvolvedor.Desenvolvedor;
import ev.campus_dev.api.repositories.UsuarioRepository;
import ev.campus_dev.api.repositories.DesenvolvedorRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/desenvolvedores")
public class DesenvolvedorController {

    @Autowired
    private DesenvolvedorRepository desenvolvedorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Criar Desenvolvedor
    @PostMapping
    @Transactional
    public ResponseEntity<ListagemDesenvolvedor> cadastrar(@RequestBody @Valid CadastroDesenvolvedor dados) {
        Usuario usuario = new Usuario();
        usuario.setNomeCompleto(dados.nomeCompleto());
        usuario.setEmail(dados.email());
        usuario.setSenha(dados.senha());
        usuario.setRole("DEV");
        usuario.setDataCadastro(LocalDateTime.now());

        usuarioRepository.save(usuario);

        Desenvolvedor dev = new Desenvolvedor();
        dev.setUsuario(usuario);
        dev.setCurso(dados.curso());
        dev.setSemestre(dados.semestre());
        dev.setSkills(dados.skills());
        desenvolvedorRepository.save(dev);

        return ResponseEntity.status(201).body(new ListagemDesenvolvedor(dev));
    }

    // Listar todos os desenvolvedores
    @GetMapping
    public ResponseEntity<List<ListagemDesenvolvedor>> listar() {
        var lista = desenvolvedorRepository.findAll()
                .stream()
                .map(ListagemDesenvolvedor::new)
                .toList();

        return ResponseEntity.ok(lista);
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<ListagemDesenvolvedor> buscar(@PathVariable Long id) {
        Optional<Desenvolvedor> desenvolvedorOptional = desenvolvedorRepository.findById(id);
        return desenvolvedorOptional.map(desenvolvedor -> ResponseEntity.ok(new ListagemDesenvolvedor(desenvolvedor)))
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar desenvolvedor
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<ListagemDesenvolvedor> atualizar(@PathVariable Long id, @RequestBody AtualizacaoDesenvolvedor dados) {
        return desenvolvedorRepository.findById(id)
                .map(dev -> {
                    dev.atualizarDesenvolvedor(dados);
                    Desenvolvedor devAtualizado = desenvolvedorRepository.save(dev);
                    return ResponseEntity.ok(new ListagemDesenvolvedor(devAtualizado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return desenvolvedorRepository.findById(id)
                .map(dev -> {
                    usuarioRepository.delete(dev.getUsuario());
                    desenvolvedorRepository.delete(dev);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
