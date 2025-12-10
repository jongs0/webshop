package eindproject.webshop.model.cart;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue
    private Long id;
    private Long userId;

    @OneToMany(mappedBy = "Cart")
    private List<CartItem> cartItems;


}

//id, userId, List<CartItem>	Holds List<CartItem> One-to-one User