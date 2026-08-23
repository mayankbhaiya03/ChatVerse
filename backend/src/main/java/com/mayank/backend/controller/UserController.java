package com.mayank.backend.controller;

import com.mayank.backend.dto.UserResponse;
import com.mayank.backend.entity.User;
import com.mayank.backend.repository.UserRepository;
import com.mayank.backend.tcp.ChatServer;
import com.mayank.backend.tcp.TcpClientManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final TcpClientManager tcpClientManager;

    public UserController(UserRepository userRepository, TcpClientManager tcpClientManager) {
        this.userRepository = userRepository;
        this.tcpClientManager = tcpClientManager;
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(Principal principal) {

        tcpClientManager.connect(principal.getName());

        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
    }

    @GetMapping("/online")
    public List<UserResponse> getOnlineUsers(Principal principal) {

        tcpClientManager.connect(principal.getName());

        return ChatServer.clients.keySet().stream()
                .filter(username -> !username.equals(principal.getName()))
                .map(username -> userRepository.findByUsername(username).orElse(null))
                .filter(Objects::nonNull)
                .map(user -> new UserResponse(user.getId(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
    }
}