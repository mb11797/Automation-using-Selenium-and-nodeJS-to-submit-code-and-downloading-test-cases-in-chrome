import java.io.*;
import java.util.*;

public class Main {
    static class Edge {
        int src;
        int nbr;

        Edge(int src, int nbr) {
            this.src = src;
            this.nbr = nbr;
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int vtces = Integer.parseInt(br.readLine());
        ArrayList < Edge > [] graph = new ArrayList[vtces];
        for (int i = 0; i < vtces; i++) {
            graph[i] = new ArrayList < > ();
        }

        int edges = Integer.parseInt(br.readLine());
        for (int i = 0; i < edges; i++) {
            String[] parts = br.readLine().split(" ");
            int v1 = Integer.parseInt(parts[0]);
            int v2 = Integer.parseInt(parts[1]);
            graph[v1].add(new Edge(v1, v2));
            graph[v2].add(new Edge(v2, v1));
        }

        int src = Integer.parseInt(br.readLine());

        // write your code here  
        bfs(graph, src);
        return;
    }
    
    public static class Pair{
        int v;
        String path;
        
        Pair(int v, String path){
            this.v = v;
            this.path = path;
        }
    }
    
    public static void bfs(ArrayList<Edge>[] graph, int src){
        boolean[] visited = new boolean[graph.length];
        
        LinkedList<Pair> queue = new LinkedList<>();
        
        queue.addLast(new Pair(src, src+""));
        
        while(!queue.isEmpty()){
            Pair front = queue.removeFirst();
            
            if(visited[front.v])
                continue;
            
            visited[front.v] = true;
            
            System.out.println(front.v + "@" + front.path);
            
            for(Edge edge: graph[front.v]){
                if(!visited[edge.nbr]){
                    queue.addLast(new Pair(edge.nbr, front.path + edge.nbr));
                }
            }
        }
        return;
    }
}