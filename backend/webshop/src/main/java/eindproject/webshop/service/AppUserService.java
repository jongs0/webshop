package eindproject.webshop.service;

import eindproject.webshop.dto.appuser.AppUserCreateDTO;
import eindproject.webshop.dto.appuser.AppUserDTO;
import eindproject.webshop.dto.appuser.AppUserSummaryDTO;
import eindproject.webshop.dto.appuser.AppUserUpdateDTO;
import eindproject.webshop.model.Role;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AppUserService {
    final private AppUserRepository appUserRepository;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    // Incoming GET for single user (for profile page) - getUser method
    // Incoming GET for all users (admin-only) - getAllUsers method
    // Incoming PUT for data update - updateUser method
    // optional incoming DELETE for single user (admin-only) - deleteUser method

    public AppUserSummaryDTO createAppUser(AppUserCreateDTO createDTO) {
        // check if account already exists?
        AppUser newAppUser = createDTO.toEntity();
        newAppUser.setRole(Role.USER);
        AppUser savedNewAppUser = appUserRepository.save(newAppUser);
        return AppUserSummaryDTO.fromEntity(savedNewAppUser);
    }

    public AppUserDTO findAppUserById(Long appUserId) {
        return appUserRepository.findById(appUserId)
                .map(AppUserDTO::fromEntity)
                .orElse(null);
    }

    // null returnen is even snel, kan later vervangen met proper 404 error
    public AppUserDTO findAppUserByEmail(String appUserEmail) {
        List<AppUserDTO> all = appUserRepository.findAll()
                .stream()
                .map(AppUserDTO::fromEntity)
                .toList();
        AppUserDTO output = null;
        for (AppUserDTO user : all) {
            if (user.email().equals(appUserEmail)) {
                output = user;
            }
        }
        return output;
    }

    // Need to put in admin-only when we're doing Spring Sec
    public List<AppUserDTO> findAllAppUsers() {
         List<AppUserDTO> all = appUserRepository.findAll()
                .stream()
                .map(AppUserDTO::fromEntity)
                .toList();
         return all;
    }

    public AppUserSummaryDTO updateUser(Long id, AppUserUpdateDTO updateDTO) {
        AppUser appUseruser = appUserRepository.findById(id)
                        .orElse(null);
        assert appUseruser != null;
        {
            if (!Objects.equals(appUseruser.getEmail(), updateDTO.email())) {
                appUseruser.setEmail(updateDTO.email());
            }
            if (!Objects.equals(appUseruser.getFirstName(), updateDTO.firstName())) {
                appUseruser.setFirstName(updateDTO.firstName());
            }
            if (!Objects.equals(appUseruser.getLastName(), updateDTO.lastName())) {
                appUseruser.setLastName(updateDTO.lastName());
            }
        }
        appUserRepository.save(appUseruser);
        return AppUserSummaryDTO.fromEntity(appUseruser);
    }

    public ResponseEntity<String> deleteUser(Long id) {
        AppUser appUser = appUserRepository.findById(id)
                .orElse(null);
        assert appUser != null;
        appUserRepository.delete(appUser);
        return ResponseEntity.status(HttpStatus.OK).body("AppUser deleted.");
    }




}
