public class PatternMatchingExample {

    static void check(Object obj) {

        if (obj instanceof Integer i) {
            System.out.println("Integer object: " + i);
        }
        else if (obj instanceof String s) {
            System.out.println("String object: " + s);
        }
        else if (obj instanceof Double d) {
            System.out.println("Double object: " + d);
        }
        else if (obj instanceof Boolean b) {
            System.out.println("Boolean object: " + b);
        }
        else if (obj == null) {
            System.out.println("Object is null");
        }
        else {
            System.out.println("Unknown type");
        }
    }

    public static void main(String[] args) {
        check(200);
        check("Hello");
        check(57.748);
        check(true);
        check(null);
    }
}