package ev.campus_dev.api.controller;

import ev.campus_dev.api.dto.AtualizacaoDesenvolvedor;
import ev.campus_dev.api.dto.CadastroDesenvolvedor;
import ev.campus_dev.api.dto.ListagemDesenvolvedor;
import ev.campus_dev.api.models.desenvolvedor.Desenvolvedor;
import ev.campus_dev.api.models.desenvolvedor.DesenvolvedorRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/desenvolvedores")
public class DesenvolvedorController {

    @Autowired
    private DesenvolvedorRepository desenvolvedorRepository;

    // Cadastrar novo desenvolvedor
    @PostMapping
    @Transactional
    public ResponseEntity<Void> cadastrarDesenvolvedor(@RequestBody @Valid CadastroDesenvolvedor dados) {
        desenvolvedorRepository.save(new Desenvolvedor(dados));
        return ResponseEntity.ok().build();
    }


    @GetMapping
    public ResponseEntity<List<ListagemDesenvolvedor>> ListarDesenvolvedor() {
        List<ListagemDesenvolvedor> lista = desenvolvedorRepository.findAll()
                .stream()
                .map(dev -> new ListagemDesenvolvedor(
                        dev.getNomeCompleto(),
                        dev.getEmail(),
                        dev.getCurso(),
                        dev.getSkills()
                ))
                .toList();

        return ResponseEntity.ok(lista);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody AtualizacaoDesenvolvedor dados) {
        Desenvolvedor desenvolvedor = desenvolvedorRepository.findById(id).orElse(null);

        if (desenvolvedor != null) {
            desenvolvedor.atualizarDesenvolvedor(dados);
            desenvolvedorRepository.save(desenvolvedor);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluirDesenvolvedor(@PathVariable Long id) {
        return desenvolvedorRepository.findById(id)
                .map(desenvolvedor -> {
                    desenvolvedorRepository.delete(desenvolvedor);



                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().<Void>build());
    }


}
