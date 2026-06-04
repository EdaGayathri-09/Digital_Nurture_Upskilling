import java.sql.*;
public class JDBCTransaction {

    static String url = "jdbc:mysql://localhost:3306/cognizant_db";
    static String user = "root";
    static String password = "usha1979";
    public static void transfer(int fromAccount, int toAccount, double amount) {
        try {
            Connection conn=DriverManager.getConnection(url, user, password);
            conn.setAutoCommit(false);
            String debitQuery="UPDATE accounts SET balance = balance - ? WHERE id = ?";
            PreparedStatement debitPs=conn.prepareStatement(debitQuery);
            debitPs.setDouble(1, amount);
            debitPs.setInt(2, fromAccount);
            int debitRows = debitPs.executeUpdate();
            String creditQuery="UPDATE accounts SET balance = balance + ? WHERE id = ?";
            PreparedStatement creditPs=conn.prepareStatement(creditQuery);
            creditPs.setDouble(1, amount);
            creditPs.setInt(2, toAccount);
            int creditRows = creditPs.executeUpdate();
            if (debitRows > 0 && creditRows > 0) {
                conn.commit();
                System.out.println("Transaction Successful");
            } else {
                conn.rollback();
                System.out.println("Transaction Failed");
            }
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) {
        transfer(1, 2, 1000);
    }
}
