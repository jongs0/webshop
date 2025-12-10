package eindproject.webshop.model.cart;

import jakarta.persistence.*;

@Entity
public class CartItem {

    @GeneratedValue
    @Id
    Long id;
    Long productId;
    Integer quantity;

    @ManyToOne
    @JoinColumn(name="cart_id")
    Cart cart;
}
