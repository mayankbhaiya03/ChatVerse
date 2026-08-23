package com.mayank.backend.config;

import com.mayank.backend.tcp.ChatServer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TcpServerRunner implements CommandLineRunner {

    @Override
    public void run(String... args) {

        new Thread(() -> {
            try {
                ChatServer.start();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }
}