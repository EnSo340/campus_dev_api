classDiagram
    direction LR
    
    %% ENTIDADE BASE
    class Usuario {
        + long id
        + String nome
        + String email
        + String senha
        + String role
        
        <<Entity>>
        <<Base Table>>
    }

    %% ENTIDADES FILHAS
    class Cliente {
        + String tipoDeMercado
        + Usuario usuario
        
        <<Entity>>
    }
    
    class Desenvolvedor {
        + String skills
        + Usuario usuario
        + Set<Projeto> projetos
        
        <<Entity>>
    }
    
    %% ENTIDADE DE PROJETO
    class Projeto {
        + String status
        + int qndPessoasNecessarias
        + Cliente cliente
        + Set<Desenvolvedor> desenvolvedores
        
        <<Entity>>
    }
    
    
    %% RELACIONAMENTOS DE HERANÇA (JOINED)
    Usuario <|-- Cliente : Herança por Junção
    Usuario <|-- Desenvolvedor : Herança por Junção
    
    %% RELACIONAMENTOS ONE-TO-ONE (@MapsId)
    Cliente "1" -- "1" Usuario : @MapsId
    Desenvolvedor "1" -- "1" Usuario : @MapsId
    
    %% RELACIONAMENTO ONE-TO-MANY/MANY-TO-ONE
    Cliente "1" -- "N" Projeto : Cliente gerencia Projeto
    
    %% RELACIONAMENTO MANY-TO-MANY
    Projeto "N" -- "N" Desenvolvedor : Atribuição (Tabela de Junção)
