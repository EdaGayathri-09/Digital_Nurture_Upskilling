import java.sql.*;
public class StudentDAO{
    static String url="jdbc:mysql://localhost:3306/cognizant_db";
    static String user="root";
    static String password="usha1979";
    public static void insertStudent(String name,int age){
        try{
            Connection conn=DriverManager.getConnection(url,user,password);
            String query="INSERT INTO Students(name,age) VALUES(?,?)";
            PreparedStatement ps=conn.prepareStatement(query);
            ps.setString(1,name);
            ps.setInt(2,age);
            int rows=ps.executeUpdate();
            System.out.println(rows+"record inserted");
            conn.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public static void updateStudent(int id,String name,int age){
        try{
            Connection conn=DriverManager.getConnection(url,user,password);
            String query="UPDATE Students SET name=?,age=? WHERE id=?";
            PreparedStatement ps=conn.prepareStatement(query);
            ps.setString(1,name);
            ps.setInt(2,age);
            ps.setInt(3,id);
            int rows=ps.executeUpdate();
            System.out.println(rows+"record updated");
            conn.close();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public static void main(String[] args) {
        insertStudent("Jack",20);
        updateStudent(1,"John",31);
    }
}
