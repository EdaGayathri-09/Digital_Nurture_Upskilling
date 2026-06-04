import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
public class LambdaExample {
    public static void main(String[] args) {
        List<String>names=new ArrayList<>();
        names.add("John");
        names.add("Charlie");
        names.add("Alice");
        names.add("Bob");
        names.add("Oliver");
        System.out.println("Before Sorting:");
        System.out.println(names);
        Collections.sort(names,(a,b)->a.compareTo(b));
        System.out.println("After Sorting: ");
        System.out.println(names);
    }
}
