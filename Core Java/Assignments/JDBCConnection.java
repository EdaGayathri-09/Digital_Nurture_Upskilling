import java.sql.*;
public class JDBCConnection {
    public static void main(String[] args) {
        String url="jdbc:mysql://localhost:3306/cognizant_db";
        String user="root";
        String password="usha1979";
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn=DriverManager.getConnection(url,user,password);
            Statement stmt=conn.createStatement();
            ResultSet rs=stmt.executeQuery("SELECT * FROM Students");
            System.out.println("ID | Name | Age");
            while(rs.next()){
                System.out.println(rs.getInt("id")+"|"+rs.getString("name")+"|"+rs.getInt("age"));
            }
            conn.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
