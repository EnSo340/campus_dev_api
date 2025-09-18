package ev.campus_dev.api.controller;

import ev.campus_dev.api.models.projeto.Projeto;
import ev.campus_dev.api.repositories.ProjetoRepository;
import ev.campus_dev.api.dto.projetos.CadastroProjeto;
import ev.campus_dev.api.dto.projetos.AtualizacaoProjeto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoRepository repository;

    // Criar projeto
    @PostMapping
    @Transactional
    public ResponseEntity<Projeto> cadastrar(@RequestBody CadastroProjeto dados) {
        var projeto = new Projeto(dados);
        repository.save(projeto);
        return ResponseEntity.status(201).body(projeto);
    }

    // Listar projetos
    @GetMapping
    public ResponseEntity<List<Projeto>> listar() {
        var projetos = repository.findAll();
        return ResponseEntity.ok(projetos);
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar projeto
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Projeto> atualizar(@PathVariable Long id, @RequestBody AtualizacaoProjeto dados) {
        return repository.findById(id)
                .map(projeto -> {
                    projeto.atualizarProjeto(dados);
                    return ResponseEntity.ok(projeto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar projeto
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> deletar(@PathVariable Long id) {
        return repository.findById(id)
                .map(projeto -> {
                    repository.delete(projeto);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
