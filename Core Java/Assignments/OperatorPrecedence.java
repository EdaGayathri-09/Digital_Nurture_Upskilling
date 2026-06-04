public class OperatorPrecedence {
    public static void main(String[] args) {
        int result1 = 10 + 20 / 5 * 3 - 2;
        int result2 = (8 + 2) * 5 - 10 / 2;
        int result3 = 50 - 10 + 2 * 6 / 3;
        int result4 = 100 / (5 * 2) + 8 - 3 * 2;
        int result5 = 5 + 3 * 2 - 8 / 4 + (6 - 2) * 3;

        System.out.println("Result 1 = " + result1);
        System.out.println("Result 2 = " + result2);
        System.out.println("Result 3 = " + result3);
        System.out.println("Result 4 = " + result4);
        System.out.println("Result 5 = " + result5);

        /*
        Java Follows:
        1. () Parantheses
        2. * / %
        3. + - 
        4. Left to right when operators have same precendence
         */
    }
}
