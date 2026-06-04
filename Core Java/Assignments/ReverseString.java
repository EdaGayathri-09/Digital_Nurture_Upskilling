import java.util.Scanner;
public class ReverseString {
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter a String: ");
        String str=sc.nextLine();
        StringBuilder sb=new StringBuilder(str);
        System.out.println("Reversed string: "+sb.reverse());
    }
}
