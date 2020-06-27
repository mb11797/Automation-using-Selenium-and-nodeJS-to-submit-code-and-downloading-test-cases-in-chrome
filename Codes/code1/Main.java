//factorial
import java.io.*;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        // write your code here
        BufferedReader b_r = new BufferedReader(new InputStreamReader(System.in));
        
        int n = Integer.parseInt(b_r.readLine());
        
        System.out.println(factorial(n));
        return;
    }

    public static int factorial(int n){
        if(n==1){
            return 1;
        }
        return n*factorial(n-1);
    }

}
