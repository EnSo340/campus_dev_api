package ev.campus_dev.api.controller;

import ev.campus_dev.api.dto.desenvolvedor.desenvolvedor.CadastroDesenvolvedor;
import ev.campus_dev.api.models.desenvolvedor.Desenvolvedor;
import ev.campus_dev.api.models.usuario.Usuario;
import ev.campus_dev.api.repositories.DesenvolvedorRepository;
import ev.campus_dev.api.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Date;

@RestController
@RequestMapping("/desenvolvedores")
public class DesenvolvedorController {

    @Autowired
    private DesenvolvedorRepository desenvolvedorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    @Transactional
    public Desenvolvedor cadastrar(@RequestBody @Valid CadastroDesenvolvedor dados) {
        // Criar usuário primeiro
        Usuario usuario = new Usuario();
        usuario.setNomeCompleto(dados.nomeCompleto());
        usuario.setEmail(dados.email());
        usuario.setSenha(dados.senha());
        usuario.setRole("DEV");
        usuario.setDataCadastro(new Date());
        usuarioRepository.save(usuario);

        // Criar perfil de desenvolvedor vinculado ao usuário
        Desenvolvedor dev = new Desenvolvedor();
        dev.setUsuario(usuario);
        dev.setCurso(dados.curso());
        dev.setSemestre(dados.semestre());
        dev.setSkills(dados.skills());
        desenvolvedorRepository.save(dev);

        return dev;
    }
}
