class MyThread extends Thread{
    private String threadName;
    MyThread(String name){
        this.threadName=name;
    }
    public void run(){
        for(int i=1;i<=5;i++){
            System.out.println(threadName+" is running: "+i);
        }
    }
}

public class ThreadCreation {
    public static void main(String[] args) {
        MyThread t1=new MyThread("Thread-1");
        MyThread t2=new MyThread("Thread-2");
        t1.start();
        t2.start();
    }
}
