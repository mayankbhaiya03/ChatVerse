package com.mayank.backend.service;

import com.mayank.backend.entity.Message;
import com.mayank.backend.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository repository;

    public MessageService(MessageRepository repository) {
        this.repository = repository;
    }

    public Message save(String sender, String receiver, String message) {

        Message chatMessage = new Message(
                sender,
                receiver,
                message,
                LocalDateTime.now());

        return repository.save(chatMessage);
    }

    public List<Message> getAllMessages() {
        return repository.findAll();
    }

    public List<Message> getConversation(String user1, String user2) {
        return repository.findConversation(user1, user2);
    }

    public List<Message> getGroupMessages() {
        return repository.findByReceiverOrderByTimestampAsc("GROUP");
    }
}