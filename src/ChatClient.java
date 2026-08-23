import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class ChatClient {

    public static void main(String[] args) throws IOException {

        Socket socket = new Socket("localhost", 5000);

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(socket.getInputStream()));

        PrintWriter writer = new PrintWriter(
                socket.getOutputStream(), true);

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter Username: ");
        String username = scanner.nextLine();

        writer.println(username);

        System.out.println("Connected to ChatVerse!");

        // Receive messages
        new Thread(() -> {

            try {

                while (true) {

                    String message = reader.readLine();

                    if (message != null) {
                        System.out.println(message);
                    }

                }

            } catch (IOException e) {

                System.out.println("Disconnected from server.");

            }

        }).start();

        // Send messages
        while (true) {

            String message = scanner.nextLine();

            writer.println(message);

        }

    }

}