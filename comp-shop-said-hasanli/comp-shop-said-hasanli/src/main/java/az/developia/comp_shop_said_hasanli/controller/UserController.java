package az.developia.comp_shop_said_hasanli.controller;

import az.developia.comp_shop_said_hasanli.DTO.UserDTO;
import az.developia.comp_shop_said_hasanli.entity.UserEntity;
import az.developia.comp_shop_said_hasanli.repository.UserRepository;
import az.developia.comp_shop_said_hasanli.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        Boolean isRegistered = userService.registerUser(userDTO);

        if (isRegistered) {
            return new ResponseEntity<>("İstifadəçi uğurla qeydiyyatdan keçdi!", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("İstifadəçi adı artıq mövcuddur.", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDTO userDTO) {
        Optional<UserEntity> userOptional = userRepository.findByUsername(userDTO.getUsername());

        if (userOptional.isPresent() && userOptional.get().getPassword().equals(userDTO.getPassword())) {
            return new ResponseEntity<>("Giriş uğurludur!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("İstifadəçi adı və ya şifrə yanlışdır.", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<UserEntity> getUserProfile(@PathVariable String username) {
        Optional<UserEntity> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
