package eindproject.webshop.dto.appuser;

import eindproject.webshop.model.appuser.AppUser;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AppUserSummaryDTO(
        @NotNull
        Long id,
        @NotBlank
        String email,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName
) {
    public static AppUserSummaryDTO fromEntity(AppUser appUser) {
        return new AppUserSummaryDTO(
                appUser.getId(),
                appUser.getEmail(),
                appUser.getFirstName(),
                appUser.getLastName()
        );
    }
}
