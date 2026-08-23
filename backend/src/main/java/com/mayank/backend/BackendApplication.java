package com.mayank.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mayank.backend.tcp.ChatServer;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(BackendApplication.class, args);

        // Start TCP server in a separate thread
        new Thread(ChatServer::start).start();
    }
}