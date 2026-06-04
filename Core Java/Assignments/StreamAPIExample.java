import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
public class StreamAPIExample {
    public static void main(String[] args) {
        List<Integer>nums=new ArrayList<>();
        nums.add(1);
        nums.add(2);
        nums.add(3);
        nums.add(4);
        nums.add(5);
        nums.add(6);
        nums.add(7);

        System.out.println("Original List:");
        System.out.println(nums);
        List<Integer>evenNums=nums.stream().filter(n->n%2==0).collect(Collectors.toList());
        System.out.println("Even numbers:");
        System.out.println(evenNums);

    }
}
