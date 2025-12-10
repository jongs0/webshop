package eindproject.webshop.dto.appuser;

import eindproject.webshop.dto.adress.AdressDTO;
import eindproject.webshop.dto.order.OrderDTO;
import eindproject.webshop.model.appuser.AppUser;

import java.util.List;

public record AppUserDTO(
        Long id,
        String email,
        String firstName,
        String lastName,
        AdressDTO address,
        List<OrderDTO> orders
) {
    // Double-check getters when AppUser model is implemented
    // Make sure OrderDTO has fromEntity
    public static AppUserDTO fromEntity(AppUser appUser) {
        return new AppUserDTO(
                appUser.getId(),
                appUser.getEmail(),
                appUser.getFirstName(),
                appUser.getLastName(),
                appUser.getAdress(),
                appUser.getOrders().stream().map(OrderDTO::fromEntity).toList()
        );
    }
}
