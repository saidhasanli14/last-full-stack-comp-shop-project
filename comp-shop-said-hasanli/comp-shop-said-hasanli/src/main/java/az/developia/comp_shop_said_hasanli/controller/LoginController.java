package az.developia.comp_shop_said_hasanli.controller;

import az.developia.comp_shop_said_hasanli.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, Model model) {
        if (userService.authenticate(username, password)) {
            return "redirect:/home";
        }
        model.addAttribute("error", "Yanlış istifadəçi adı və ya şifrə");
        return "login";
    }
}
