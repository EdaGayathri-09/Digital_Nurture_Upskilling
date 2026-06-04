import java.util.Scanner;
public class SumAndAvg {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the number of elements: ");
        int n=sc.nextInt();
        System.out.println("Enter space separated numbers: ");
        long sum=0,avg=0;
        int count=0;
        int arr[]=new int[n];
        for(int i=0;i<n;i++){
            arr[i]=sc.nextInt();
            sum+=arr[i];
            count++;
        }
        System.out.println("Sum is: "+sum);
        System.out.println("Average is: "+(sum/count));
    }
}
