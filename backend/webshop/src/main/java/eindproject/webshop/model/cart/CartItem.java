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

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}
