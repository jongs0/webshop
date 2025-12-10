package eindproject.webshop.dto.appuser;

import eindproject.webshop.dto.adress.AdressDTO;
import eindproject.webshop.dto.order.OrderDTO;
import eindproject.webshop.model.appuser.AppUser;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AppUserDTO(
        @NotNull
        Long id,
        @NotBlank
        String email,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotNull
        AdressDTO address,
        @NotNull
        List<OrderDTO> orders
) {
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
