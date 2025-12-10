package eindproject.webshop.model.cart;

import jakarta.persistence.*;

@Entity
public class CartItem {

    @GeneratedValue
    @Id
    private Long id;
    private Long productId;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name="cart_id")
    private Cart cart;
}
