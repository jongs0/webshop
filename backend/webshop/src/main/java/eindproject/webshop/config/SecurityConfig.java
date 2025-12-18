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

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth").permitAll()
                        // Public
                        .requestMatchers(HttpMethod.GET, "/products/bestsellers").permitAll()
                        .requestMatchers(HttpMethod.GET, "/ipad").permitAll()
                        .requestMatchers(HttpMethod.GET, "/ipad/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/iphone").permitAll()
                        .requestMatchers(HttpMethod.GET, "/iphone/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/iwatch").permitAll()
                        .requestMatchers(HttpMethod.GET, "/iwatch/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/macbook").permitAll()
                        .requestMatchers(HttpMethod.GET, "/macbook/**").permitAll()

                        // Admin only
                        .requestMatchers(HttpMethod.GET, "/products/all")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/products/**")
                        .hasAnyRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/ipad")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/ipad/**")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/iphone")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/iphone/**")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/iwatch")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/iwatch/**")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/macbook")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/macbook/**")
                        .hasAnyRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/user")
                        .hasAnyRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/user/**")
                        .hasAnyRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/order")
                        .hasAnyRole("ADMIN")

                        // Other endpoints: authenticated users
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
