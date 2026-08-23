package com.mayank.backend.tcp;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ConcurrentHashMap;

public class ChatServer {

    // Thread-safe map for connected clients
    public static final ConcurrentHashMap<String, ClientHandler> clients = new ConcurrentHashMap<>();
    private static volatile boolean running = false;

    public static synchronized void start() {
        if (running) {
            return;
        }
        running = true;

        try (ServerSocket server = new ServerSocket(5000)) {

            System.out.println("==================================");
            System.out.println(" TCP Chat Server Started on 5000 ");
            System.out.println("==================================");

            while (true) {

                Socket socket = server.accept();

                System.out.println("[TCP] New client connected: "
                        + socket.getInetAddress());

                ClientHandler client = new ClientHandler(socket);

                client.start();
            }

        } catch (IOException e) {

            System.err.println("[TCP] Server error:");
            e.printStackTrace();

        } finally {
            running = false;
        }
    }
}