package NaingLynn.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import NaingLynn.demo.Model.User;

@Controller
public class LoginController {

    private final User validUser;

    public LoginController() {
        this.validUser = new User();
        this.validUser.fetchUserFromFile("Auth.txt");
    }

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @PostMapping("/login")
    public String login(User user) {
        if (validUser.getUsername().equals(user.getUsername()) && validUser.getPassword().equals(user.getPassword())) {
            return "redirect:/index";
        } else {
            return "login";
        }
    }
}
