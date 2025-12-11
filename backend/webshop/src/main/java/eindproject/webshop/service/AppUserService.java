package eindproject.webshop.service;

import eindproject.webshop.dto.appuser.AppUserCreateDTO;
import eindproject.webshop.dto.appuser.AppUserSummaryDTO;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    final private AppUserRepository appUserRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository) {this.appUserRepository = appUserRepository;}

    // Incoming GET for single user (for profile page) - getUser method
    // Incoming GET for all users (admin-only) - getAllUsers method
    // Incoming PUT for data update - updateUser method
    // optional incoming DELETE for single user (admin-only) - deleteUser method

    public AppUserSummaryDTO createAppUser(AppUserCreateDTO createDTO) {
        // check if account already exists?
        AppUser newAppUser = createDTO.toEntity();
        AppUser savedNewAppUser = appUserRepository.save(newAppUser);
        return AppUserSummaryDTO.fromEntity(savedNewAppUser);
    }


}
