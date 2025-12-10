package eindproject.webshop.model.appuser;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import eindproject.webshop.model.Role;
import eindproject.webshop.model.order.Order;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}")
    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private List<Role> role;

    @OneToOne(cascade = CascadeType.ALL)
    private Adress adress;

    @OneToMany(mappedBy = "appUser", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

}
