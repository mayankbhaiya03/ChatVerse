import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;

public class ChatServer {

    public static HashMap<String, ClientHandler> clients = new HashMap<>();

    public static void main(String[] args) throws IOException {

        ServerSocket server = new ServerSocket(5000);

        System.out.println("Server Started...");

        while (true) {

            Socket socket = server.accept();

            System.out.println("New Client Connected!");

            ClientHandler client = new ClientHandler(socket);

            client.start();
        }
    }
}