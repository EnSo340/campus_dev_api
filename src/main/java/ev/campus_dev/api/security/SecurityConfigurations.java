package ev.campus_dev.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // Indica que é uma classe de configuração
@EnableWebSecurity // Habilita a segurança web do Spring
public class SecurityConfigurations {

    @Autowired
    private SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(csrf -> csrf.disable()) // Desabilitando CSRF
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(req -> {
                    // regras de autorização
                    req.requestMatchers(HttpMethod.POST, "/api/login").permitAll(); // Permite acesso público ao login
                    req.requestMatchers(HttpMethod.POST, "/api/register").permitAll(); // Permite acesso público ao registro
                    req.requestMatchers(HttpMethod.GET, "/projetos").permitAll(); // Permite que todos vejam os projetos
                    req.anyRequest().authenticated(); // Exige autenticação para todas as outras requisições
                })
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class) // Adiciona nosso filtro para ser executado antes dos filtros padrão
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        // Necessário para o processo de autenticação no controller
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Define o algoritmo de criptografia de senhas
        return new BCryptPasswordEncoder();
    }
}