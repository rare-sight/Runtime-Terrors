package com.Wikeels.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.Wikeels")  // Ensure all packages are scanned
public class WikeelsApplication {
    public static void main(String[] args) {
        SpringApplication.run(WikeelsApplication.class, args);
    }
}
