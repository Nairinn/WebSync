package NaingLynn.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StudyController {

    @GetMapping("/index")
    public String home() {
        return "index";
    }

    @GetMapping("/calls")
    public String calls() {
        return "calls";
    }
    @GetMapping("/messages")
    public String messages() {
        return "messages";
    }

    @GetMapping("/documents")
    public String documents() {
        return "documents";
    }
}
