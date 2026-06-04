import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

record Person(String name,int age){}
public class RecordsExample {
    public static void main(String[] args) {
        Person p1=new Person("Alice",20);
        Person p2=new Person("Bob",25);
        Person p3=new Person("Charlie",14);

        System.out.println("Person Details:");
        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);
        List<Person>persons=new ArrayList<>();
        persons.add(p1);
        persons.add(p2);
        persons.add(p3);
        List<Person>canVote=persons.stream().filter(person->person.age()>=18).collect(Collectors.toList());
        System.out.println("People eligible to vote:");
        for(Person person:canVote){
            System.out.println(person);
        }
    }
}
