package eindproject.webshop.model.cart;

import eindproject.webshop.model.appuser.AppUser;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private AppUser appUser;

    @OneToMany(mappedBy = "cart")
    private List<CartItem> cartItems = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void addCartItem(CartItem cartItem) {
        cartItems.add(cartItem);
    }

    public void removeCartItem(CartItem cartItem) {
        cartItems.remove(cartItem);
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = new ArrayList<>(cartItems);
    }
}

//id, userId, List<CartItem>	Holds List<CartItem> One-to-one User