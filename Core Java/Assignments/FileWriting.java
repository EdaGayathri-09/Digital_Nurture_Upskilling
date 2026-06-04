import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
public class FileWriting{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter a message: ");
        String message=sc.nextLine();
        try{
            FileWriter writer=new FileWriter("output.txt");
            writer.write(message);
            writer.close();
            System.out.println("Message has been written into output file");
        }catch(IOException e){
            System.out.println("An error occurred while writing to the file.");
        }
    }
}
