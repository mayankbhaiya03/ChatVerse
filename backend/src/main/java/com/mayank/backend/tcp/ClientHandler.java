package com.mayank.backend.tcp;

import com.mayank.backend.service.MessageService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ClientHandler extends Thread {

    private final Socket socket;
    private PrintWriter writer;
    private String username;

    public ClientHandler(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {

        MessageService messageService = SpringContext.getBean(MessageService.class);

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(socket.getInputStream()))) {

            writer = new PrintWriter(socket.getOutputStream(), true);

            // Read username
            username = reader.readLine();

            if (username == null || username.isBlank()) {
                socket.close();
                return;
            }

            // Duplicate username
            if (ChatServer.clients.containsKey(username)) {
                writer.println("Username already taken.");
                socket.close();
                return;
            }

            // Add client
            ChatServer.clients.put(username, this);

            System.out.println("[JOIN] " + username);

            broadcast(username + " joined the chat.");

            while (true) {

                String message = reader.readLine();

                if (message == null) {
                    break;
                }

                // ---------------- PRIVATE MESSAGE ----------------
                if (message.startsWith("/msg ")) {

                    String[] parts = message.split(" ", 3);

                    if (parts.length != 3) {
                        sendMessage("Usage: /msg <username> <message>");
                        continue;
                    }

                    String receiver = parts[1];
                    String privateMessage = parts[2];

                    ClientHandler target = ChatServer.clients.get(receiver);

                    if (target == null) {
                        sendMessage("User '" + receiver + "' is not online.");
                        continue;
                    }

                    // Save private message
                    messageService.save(username, receiver, privateMessage);

                    target.sendMessage("[Private] " + username + ": " + privateMessage);

                    sendMessage("[Private to " + receiver + "] " + privateMessage);
                }

                // ---------------- ONLINE USERS ----------------
                else if (message.equals("/users")) {

                    sendMessage("------ Online Users ------");

                    for (String user : ChatServer.clients.keySet()) {
                        sendMessage(user);
                    }

                    sendMessage("--------------------------");
                }

                // ---------------- GROUP MESSAGE ----------------
                else {

                    System.out.println("[CHAT] " + username + ": " + message);

                    // Save group message
                    messageService.save(username, "GROUP", message);

                    broadcast(username + ": " + message);
                }
            }

        } catch (IOException e) {

            System.out.println("[LEFT] " + username);

        } finally {

            if (username != null) {
                ChatServer.clients.remove(username);
                broadcast(username + " left the chat.");
            }

            try {
                socket.close();
            } catch (IOException ignored) {
            }
        }
    }

    private void broadcast(String message) {

        for (ClientHandler client : ChatServer.clients.values()) {
            client.sendMessage(message);
        }
    }

    public void sendMessage(String message) {

        if (writer != null) {
            writer.println(message);
        }
    }
}