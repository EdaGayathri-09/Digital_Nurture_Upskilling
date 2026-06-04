import java.util.Scanner;
public class Fibonacci {

    static int nthfibonacci(int n){
        if(n==0 || n==1) return n;
        return nthfibonacci(n-1)+nthfibonacci(n-2);
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter a positive integer: ");
        int n=sc.nextInt();
        int result=nthfibonacci(n);
        System.out.println("Fibonacci number at position "+n+" is: "+result);
    }
}
