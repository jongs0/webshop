package eindproject.webshop.service;

import eindproject.webshop.dto.appuser.*;
import eindproject.webshop.model.appuser.AppUser;
import eindproject.webshop.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    // made an extra GET by mistake. Good news, we can now search by email!
    // maybe implement incoming DELETE for single user (admin-only) - deleteUser method


    public AppUserSummaryDTO createAppUser(AppUserCreateDTO createDTO) {
        // check if account already exists?
        AppUser newAppUser = createDTO.toEntity();
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
        AppUser user = appUserRepository.findById(id)
                        .orElse(null);
        assert user != null;
        {
            if (!Objects.equals(user.getEmail(), updateDTO.email())) {
                user.setEmail(updateDTO.email());
            }
            if (!Objects.equals(user.getFirstName(), updateDTO.firstName())) {
                user.setFirstName(updateDTO.firstName());
            }
            if (!Objects.equals(user.getLastName(), updateDTO.lastName())) {
                user.setLastName(updateDTO.lastName());
            }
        }
        appUserRepository.save(user);
        return AppUserSummaryDTO.fromEntity(user);
    }




}
