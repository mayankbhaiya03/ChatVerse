package com.mayank.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mayank.backend.dto.LoginRequest;
import com.mayank.backend.dto.LoginResponse;
import com.mayank.backend.dto.RegisterRequest;
import com.mayank.backend.entity.User;
import com.mayank.backend.jwt.JwtService;
import com.mayank.backend.repository.UserRepository;
import com.mayank.backend.tcp.TcpClientManager;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TcpClientManager tcpClientManager;

    public UserService(UserRepository repository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            TcpClientManager tcpClientManager) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tcpClientManager = tcpClientManager;
    }

    public String register(RegisterRequest request) {

        if (repository.existsByUsername(request.getUsername()))
            return "Username already exists.";

        if (repository.existsByEmail(request.getEmail()))
            return "Email already exists.";

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        repository.save(user);

        return "Registration Successful!";
    }

    public LoginResponse login(LoginRequest request) {

        Optional<User> optionalUser = repository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getUsername());

        // Connect user to TCP ChatServer upon login
        tcpClientManager.connect(user.getUsername());

        return new LoginResponse(token);
    }
}