package eindproject.webshop.config;

import eindproject.webshop.model.Role;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.repository.AppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(
            AppUserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            if (!userRepository.existsByEmail("admin@webshop.com")) {
                AppUser admin = new AppUser();
                admin.setEmail("admin@webshop.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                admin.setFirstName("Admin");
                admin.setLastName("User");

                userRepository.save(admin);
            }

            if (!userRepository.existsByEmail("user@webshop.com")) {
                AppUser user = new AppUser();
                user.setEmail("user@webshop.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole(Role.USER);
                user.setFirstName("Normal");
                user.setLastName("User");

                userRepository.save(user);
            }
        };
    }
}
