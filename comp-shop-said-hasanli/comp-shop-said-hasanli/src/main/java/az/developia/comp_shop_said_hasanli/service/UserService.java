package az.developia.comp_shop_said_hasanli.service;

import az.developia.comp_shop_said_hasanli.DTO.UserDTO;
import az.developia.comp_shop_said_hasanli.entity.UserEntity;
import az.developia.comp_shop_said_hasanli.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            return false;
        }

        UserEntity user = new UserEntity();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setFullname(userDTO.getFullname());

        userRepository.save(user);
        return true;
    }

    public boolean authenticate(String username, String password) {
        return "admin".equals(username) && "password".equals(password);
    }
}
