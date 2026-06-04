import java.util.Scanner;
import java.util.ArrayList;
public class ArrayListExample {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.print("Enter the number of students: ");
        int n=sc.nextInt();
        sc.nextLine();
        ArrayList<String>studentNames=new ArrayList<>();
        for(int i=0;i<n;i++){
            System.out.println("Enter student name: ");
            String s=sc.nextLine();
            studentNames.add(s);
        }
        System.out.println("Student Names: ");
        for(String name:studentNames){
            System.out.println(name);
        }
    }
}
