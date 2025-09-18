package ev.campus_dev.api.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // Segredo do JWT (você pode colocar no application.properties)
    @Value("${jwt.secret:MinhaChaveSecretaSuperSegura123456}")
    private String jwtSecret;

    // Tempo de expiração do token (em milissegundos) -> 1h
    @Value("${jwt.expiration:3600000}")
    private long jwtExpiration;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Gerar token JWT
    public String gerarToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        Date agora = new Date();
        Date validade = new Date(agora.getTime() + jwtExpiration);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername()) // geralmente é o email
                .setIssuedAt(agora)
                .setExpiration(validade)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Obter email/usuário do token
    public String getUsernameDoToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Validar token
    public boolean validarToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expirado: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Token não suportado: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Token inválido: " + e.getMessage());
        } catch (SignatureException e) {
            System.out.println("Assinatura inválida: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Token vazio: " + e.getMessage());
        }
        return false;
    }
}
