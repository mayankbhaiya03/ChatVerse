package com.mayank.backend.tcp;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TcpClientManager {

    private static final String HOST = "localhost";
    private static final int PORT = 5000;

    private static class ClientSession {
        final Socket socket;
        final PrintWriter writer;
        final Thread listenerThread;

        ClientSession(Socket socket, PrintWriter writer, Thread listenerThread) {
            this.socket = socket;
            this.writer = writer;
            this.listenerThread = listenerThread;
        }

        boolean isOpen() {
            return socket != null && !socket.isClosed() && socket.isConnected();
        }

        void close() {
            try {
                if (socket != null && !socket.isClosed()) {
                    socket.close();
                }
            } catch (Exception ignored) {
            }
            if (listenerThread != null && listenerThread.isAlive()) {
                listenerThread.interrupt();
            }
        }
    }

    private final ConcurrentHashMap<String, ClientSession> sessions = new ConcurrentHashMap<>();

    public synchronized void connect(String username) {
        if (username == null || username.isBlank()) {
            return;
        }

        ClientSession existing = sessions.get(username);
        if (existing != null && existing.isOpen()) {
            return;
        }

        try {
            Socket socket = new Socket(HOST, PORT);
            PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);

            // Send username as the first line to register with TCP ChatServer
            writer.println(username);

            // Background listener thread to drain server responses and handle disconnection
            Thread listenerThread = new Thread(() -> {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        // Socket is kept active and buffer drained
                    }
                } catch (Exception ignored) {
                } finally {
                    sessions.remove(username);
                }
            });
            listenerThread.setDaemon(true);
            listenerThread.start();

            sessions.put(username, new ClientSession(socket, writer, listenerThread));
            System.out.println("[TCP Bridge] User '" + username + "' connected to TCP ChatServer on port " + PORT);

        } catch (Exception e) {
            System.err.println("[TCP Bridge] Error connecting user '" + username + "' to TCP server: " + e.getMessage());
        }
    }

    public synchronized void disconnect(String username) {
        if (username == null) return;
        ClientSession session = sessions.remove(username);
        if (session != null) {
            session.close();
            System.out.println("[TCP Bridge] User '" + username + "' disconnected from TCP ChatServer");
        }
    }

    public boolean isConnected(String username) {
        ClientSession session = sessions.get(username);
        return session != null && session.isOpen();
    }

    public void sendMessage(String sender, String receiver, String message) {
        if (sender == null || message == null || message.isBlank()) {
            return;
        }

        // Ensure sender has an active TCP connection
        if (!isConnected(sender)) {
            connect(sender);
        }

        ClientSession session = sessions.get(sender);
        if (session != null && session.isOpen()) {
            if (receiver != null && !receiver.isBlank() && !receiver.equalsIgnoreCase("GROUP")) {
                // Forward private message command to TCP ChatServer
                session.writer.println("/msg " + receiver + " " + message);
            } else {
                // Forward group message to TCP ChatServer
                session.writer.println(message);
            }
            System.out.println("[TCP Bridge] Message forwarded through TCP from '" + sender + "' to '" + (receiver != null ? receiver : "GROUP") + "'");
        } else {
            System.err.println("[TCP Bridge] Failed to send message: session for '" + sender + "' is not active.");
        }
    }
}
