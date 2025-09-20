package ev.campus_dev.api.models.cliente;

import ev.campus_dev.api.dto.desenvolvedor.cliente.AtualizacaoCliente;
import ev.campus_dev.api.dto.desenvolvedor.cliente.CadastroCliente;
import ev.campus_dev.api.dto.desenvolvedor.cliente.ListagemCliente;
import ev.campus_dev.api.models.usuario.Usuario;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity (name = "cliente")
@Table(name = "clientes")
@EqualsAndHashCode
@Getter
@Setter

public class Cliente {

    @Id
    private Long id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    private String tipoDeMercado;
    private String nomeEmpresa;
    private String telefone;

    // Métodos corrigidos para usar os acessadores de Record
    public void atualizarDados(AtualizacaoCliente dados) {
        if (dados.tipoDeMercado() != null) {
            this.tipoDeMercado = dados.tipoDeMercado();
        }
        if (dados.nomeEmpresa() != null) {
            this.nomeEmpresa = dados.nomeEmpresa();
        }
        if (dados.telefone() != null) {
            this.telefone = dados.telefone();
        }
    }

    public void cadastrarDados(CadastroCliente dados){
        this.tipoDeMercado = dados.tipoDeMercado();
        this.nomeEmpresa = dados.nomeEmpresa();
        this.telefone = dados.telefone();
    }

    public void listarDados (ListagemCliente dados) {
        this.tipoDeMercado = dados.tipoDeMercado();
        this.nomeEmpresa = dados.nomeEmpresa();
        this.telefone = dados.telefone();
    }
}