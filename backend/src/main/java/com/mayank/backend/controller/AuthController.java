package com.mayank.backend.controller;

import org.springframework.web.bind.annotation.*;

import com.mayank.backend.dto.LoginRequest;
import com.mayank.backend.dto.LoginResponse;
import com.mayank.backend.dto.RegisterRequest;
import com.mayank.backend.service.UserService;
import com.mayank.backend.tcp.TcpClientManager;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService service;
    private final TcpClientManager tcpClientManager;

    public AuthController(UserService service, TcpClientManager tcpClientManager) {
        this.service = service;
        this.tcpClientManager = tcpClientManager;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }

    @PostMapping("/logout")
    public String logout(Principal principal) {
        if (principal != null) {
            tcpClientManager.disconnect(principal.getName());
        }
        return "Logged out successfully";
    }
}