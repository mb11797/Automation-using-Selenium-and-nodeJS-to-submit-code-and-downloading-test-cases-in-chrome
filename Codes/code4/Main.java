import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        // write your code here
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        int n = Integer.parseInt(br.readLine());
        int m = Integer.parseInt(br.readLine());
        
        int[][] gold_mine = new int[n][m];
        
        for(int i=0; i<n; i++){
            String str = br.readLine();
            for(int j=0; j<m; j++){
                gold_mine[i][j] = Integer.parseInt(str.split(" ")[j]);
            }
        }
        
        int max_gold_reward = Integer.MIN_VALUE;
        int[][] memo = new int[n][m];
        for(int sr=0; sr<n; sr++){
            max_gold_reward = Math.max(max_gold_reward, dig_max_gold(gold_mine, sr, 0, n, m, memo));
        }        
        
        System.out.println(max_gold_reward);
        return;
    }
    
    public static int dig_max_gold(int[][] gold_mine, int sr, int sc, int n, int m, int[][] memo){
        if(sr<0 || sc<0 || sr>=n || sc>=m){
            return Integer.MIN_VALUE;
        }
        
        if(sc == m-1){
            return gold_mine[sr][sc];
        }
    
        if(memo[sr][sc] != 0)
            return memo[sr][sc];
            
        int reward = gold_mine[sr][sc];
        
        reward += Math.max(dig_max_gold(gold_mine, sr-1, sc+1, n, m, memo), Math.max(dig_max_gold(gold_mine, sr, sc+1, n, m, memo), dig_max_gold(gold_mine, sr+1, sc+1, n, m, memo)));
        
        memo[sr][sc] = reward;
        
        return memo[sr][sc];
    }
}