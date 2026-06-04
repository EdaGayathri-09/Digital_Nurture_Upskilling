import java.util.Scanner;
public class TryCatch {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter first integer: ");
        int number1=sc.nextInt();
        System.out.print("Enter second integer: ");
        int number2=sc.nextInt();

        try{
            int result=number1/number2;
            System.out.println("Result is: "+result);
        }catch(ArithmeticException e){
            System.out.println("Error: Division by zero is not allowed.");
        }
    }   
}
