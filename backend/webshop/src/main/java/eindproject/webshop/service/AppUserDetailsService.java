package eindproject.webshop.service;

import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AppUserDetailsService implements UserDetailsService {
    private final AppUserRepository userRepository;

    @Autowired
    public AppUserDetailsService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        AppUser user = userRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException(username));

        var roles = new ArrayList<>();
        roles.add(user.getRole());

        var authorities = roles
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .toList();

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(authorities)
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails appUser = User.withDefaultPasswordEncoder()
                .username("henk")
                .password("password")
                .roles("USER")
                .build();

        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("admin")
                .password("admin123")
                .roles("ADMIN"
                        , "USER")
                .build();
        return new InMemoryUserDetailsManager(appUser, admin);
    }
}
