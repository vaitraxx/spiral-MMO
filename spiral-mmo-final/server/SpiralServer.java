
import java.io.*;
import java.net.*;
import java.util.*;

public class SpiralServer {
    static Set<Client> clients = new HashSet<>();
    public static void main(String[] args) throws Exception {
        ServerSocket server = new ServerSocket(8080);
        System.out.println("SPIRAL MMO ONLINE");
        while (true) {
            Socket socket = server.accept();
            Client c = new Client(socket);
            clients.add(c);
            new Thread(c).start();
        }
    }
    static void broadcast(String msg) {
        for (Client c : clients) c.send(msg);
    }
    static class Client implements Runnable {
        Socket s; BufferedReader in; PrintWriter out;
        String name = "Player-" + UUID.randomUUID().toString().substring(0,4);
        Client(Socket s) throws Exception {
            this.s = s;
            in = new BufferedReader(new InputStreamReader(s.getInputStream()));
            out = new PrintWriter(s.getOutputStream(), true);
            send("WELCOME " + name);
        }
        public void run() {
            try {
                String line;
                while ((line = in.readLine()) != null) {
                    String res = SpiralEngine.process(line, name);
                    broadcast(res);
                }
            } catch (Exception e) {}
        }
        void send(String msg) { out.println(msg); }
    }
}
