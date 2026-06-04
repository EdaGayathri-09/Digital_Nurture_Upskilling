import java.util.Scanner;
public class SimpleCalculator {
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter first number:");
        double number1=sc.nextDouble();
        System.out.println("Enter second number:");
        double number2=sc.nextDouble();
        System.out.println("Choose an operation: +, -, *, /");
        char operation = sc.next().charAt(0);
        double answer=0;
        switch(operation){
            case '+':
                answer=number1+number2;
                break;
            case '-':
                answer=number1-number2;
                break;
            case '*':
                answer=number1*number2;
                break;
            case '/':
                if(number2==0){
                    System.out.println("Error:Division by zero");
                    return;
                }else{
                    answer=number1/number2;
                }
                break;
            default:
                System.out.println("Choose a valid operation");
                return;
        }
        System.out.println("Result:" +answer);
    }
}
