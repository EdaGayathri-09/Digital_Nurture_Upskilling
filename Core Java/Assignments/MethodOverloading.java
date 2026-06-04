public class MethodOverloading {

    //Method with two integers
    static int add(int a,int b){
        return a+b;
    }

    //Method with two doubles
    static double add(double a,double b){
        return a+b;
    }

    //Method with three integers
    static int add(int a,int b,int c){
        return a+b+c;
    }
    public static void main(String args[]){
        int sum1=add(10,20);
        double sum2=add(5.5,2.3);
        int sum3=add(10,299,498);

        System.out.println("Sum of two integers: "+sum1);
        System.out.println("Sum of two doubles: "+sum2);
        System.out.println("Sum of three integers: "+sum3);
    }
}
