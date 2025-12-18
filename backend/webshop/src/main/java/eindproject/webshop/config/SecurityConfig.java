package eindproject.webshop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Wordt automatisch aangeroepen door Spring Security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/api/auth").permitAll()
                        // Publieke endpoints - iedereen mag
                        .requestMatchers(HttpMethod.GET, "/api/quotes").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/quotes/**").permitAll()

                        // POST /api/posts - alleen USERS en ADMINS
                        .requestMatchers(HttpMethod.POST, "/api/quotes")
                        .hasAnyRole("USER", "ADMIN")

                        // DELETE /api/posts/** - alleen ADMINS
                        .requestMatchers(HttpMethod.DELETE, "/api/quotes/**")
                        .authenticated()

                        // Alle andere requests vereisen authenticatie
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        // Standaard: 10 rounds
        // Voor meer security: new BCryptPasswordEncoder(12)
    }
}
