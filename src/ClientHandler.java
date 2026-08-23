import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ClientHandler extends Thread {

    private Socket socket;
    private PrintWriter writer;
    private String username;

    public ClientHandler(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {

        try {

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            writer = new PrintWriter(socket.getOutputStream(), true);

            // Read username
            username = reader.readLine();

            // Check duplicate username
            if (ChatServer.clients.containsKey(username)) {
                writer.println("Username already taken. Disconnecting...");
                socket.close();
                return;
            }

            // Store user
            ChatServer.clients.put(username, this);

            System.out.println("[INFO] " + username + " joined the chat.");

            // Notify everyone
            for (ClientHandler client : ChatServer.clients.values()) {
                client.sendMessage(username + " joined the chat.");
            }

            while (true) {

                String message = reader.readLine();

                if (message == null) {
                    break;
                }

                // ---------------- PRIVATE MESSAGE ----------------
                if (message.startsWith("/msg ")) {

                    String[] parts = message.split(" ", 3);

                    if (parts.length == 3) {

                        String receiver = parts[1];
                        String privateMessage = parts[2];

                        ClientHandler target = ChatServer.clients.get(receiver);

                        if (target != null) {

                            target.sendMessage("[Private] " + username + ": " + privateMessage);

                            // Show sender
                            sendMessage("[Private to " + receiver + "] " + privateMessage);

                        } else {

                            sendMessage("User '" + receiver + "' is not online.");

                        }

                    } else {

                        sendMessage("Usage: /msg <username> <message>");

                    }

                }

                // ---------------- SHOW ONLINE USERS ----------------
                else if (message.equals("/users")) {

                    sendMessage("------ Online Users ------");

                    for (String user : ChatServer.clients.keySet()) {
                        sendMessage(user);
                    }

                    sendMessage("--------------------------");

                }

                // ---------------- GROUP MESSAGE ----------------
                else {

                    System.out.println("[MESSAGE] " + username + ": " + message);

                    for (ClientHandler client : ChatServer.clients.values()) {
                        client.sendMessage(username + ": " + message);
                    }

                }

            }

        } catch (IOException e) {

            System.out.println("[INFO] " + username + " disconnected.");

        } finally {

            ChatServer.clients.remove(username);

            for (ClientHandler client : ChatServer.clients.values()) {
                client.sendMessage(username + " left the chat.");
            }

            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }

    public void sendMessage(String message) {
        writer.println(message);
    }

}