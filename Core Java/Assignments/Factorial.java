import java.util.Scanner;
public class Factorial {
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter a non-negative number: ");
        int n=sc.nextInt();
        long factorial=1;
        for(int i=2;i<=n;i++){
            factorial*=(long)i;
        }
        System.out.println("Factorial of "+n+" is "+factorial);
    }
}
