import java.util.Scanner;
class InvalidAgeException extends Exception{
    InvalidAgeException(String message){
        super(message);
    }
}

public class CustomException {

    public static void checkAge(int age) throws InvalidAgeException{
        if(age<18){
            throw new InvalidAgeException("Age should be greater than or equal to 18");
        }
        System.out.println("Valid Age");
    }

    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter age: ");
        int age=sc.nextInt();
        try{
            checkAge(age);
        }catch(InvalidAgeException e){
            System.out.println(e.getMessage());
        }
    }
}
