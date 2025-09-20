package ev.campus_dev.api.controller;

import ev.campus_dev.api.models.projeto.Projeto;
import ev.campus_dev.api.models.cliente.Cliente;
import ev.campus_dev.api.repositories.ProjetoRepository;
import ev.campus_dev.api.repositories.ClienteRepository;
import ev.campus_dev.api.dto.projetos.CadastroProjeto;
import ev.campus_dev.api.dto.projetos.AtualizacaoProjeto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/{clienteId}")
    @Transactional
    public ResponseEntity<Projeto> cadastrar(@PathVariable Long clienteId, @RequestBody CadastroProjeto dados) {
        Cliente cliente = clienteRepository.findById(clienteId).orElseThrow();
        Projeto projeto = new Projeto(dados);
        projeto.setCliente(cliente.getUsuario());
        Projeto salvo = projetoRepository.save(projeto);
        return ResponseEntity.status(201).body(salvo);
    }

    @GetMapping
    public ResponseEntity<List<Projeto>> listar() {
        return ResponseEntity.ok(projetoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscar(@PathVariable Long id) {
        return projetoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Projeto> atualizar(@PathVariable Long id, @RequestBody AtualizacaoProjeto dados) {
        return projetoRepository.findById(id)
                .map(projeto -> {
                    projeto.atualizarProjeto(dados);
                    Projeto atualizado = projetoRepository.save(projeto);
                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return projetoRepository.findById(id)
                .map(projeto -> {
                    projetoRepository.delete(projeto);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
