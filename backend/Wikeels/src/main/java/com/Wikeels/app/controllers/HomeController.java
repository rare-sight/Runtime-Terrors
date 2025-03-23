package com.Wikeels.app.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "wiki"; // Loads wiki.html from src/main/resources/templates/
    }
}
