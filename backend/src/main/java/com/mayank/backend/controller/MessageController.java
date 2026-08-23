package com.mayank.backend.controller;

import com.mayank.backend.dto.SendMessageRequest;
import com.mayank.backend.entity.Message;
import com.mayank.backend.service.MessageService;
import com.mayank.backend.tcp.TcpClientManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService service;
    private final TcpClientManager tcpClientManager;

    public MessageController(MessageService service, TcpClientManager tcpClientManager) {
        this.service = service;
        this.tcpClientManager = tcpClientManager;
    }

    @GetMapping
    public List<Message> getMessages() {
        return service.getAllMessages();
    }

    @GetMapping("/group")
    public List<Message> getGroupMessages() {
        return service.getGroupMessages();
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam("with") String withUser,
                                          Principal principal) {
        return service.getConversation(principal.getName(), withUser);
    }

    @PostMapping
    public ResponseEntity<Void> sendMessage(@RequestBody SendMessageRequest request,
                                            Principal principal) {
        // Forward message to the TCP ChatServer via persistent TCP socket
        tcpClientManager.sendMessage(
                principal.getName(),
                request.getReceiver(),
                request.getMessage());

        return ResponseEntity.ok().build();
    }
}