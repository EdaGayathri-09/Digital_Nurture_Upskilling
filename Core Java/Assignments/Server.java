import java.io.*;
import java.net.*;
import java.util.Scanner;

public class Server {

    public static void main(String[] args) {

        try {
            ServerSocket serverSocket = new ServerSocket(5000);

            System.out.println("Server is waiting for client...");

            Socket socket = serverSocket.accept();

            System.out.println("Client connected!");

            BufferedReader in =
                    new BufferedReader(
                            new InputStreamReader(socket.getInputStream()));

            PrintWriter out =
                    new PrintWriter(socket.getOutputStream(), true);

            Scanner sc = new Scanner(System.in);

            while (true) {

                String clientMessage = in.readLine();
                System.out.println("Client: " + clientMessage);

                System.out.print("Server: ");
                String serverMessage = sc.nextLine();

                out.println(serverMessage);

                if (serverMessage.equalsIgnoreCase("bye")) {
                    break;
                }
            }

            socket.close();
            serverSocket.close();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}