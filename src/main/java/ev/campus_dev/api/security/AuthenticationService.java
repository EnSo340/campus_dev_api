package ev.campus_dev.api.security;


import ev.campus_dev.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UsuarioRepository repository;

    //@Override
    public UserDetails loadUserbyUsername(String username) throws UsernameNotFoundException{
        return repository.findByEmail(username);
    }



}
