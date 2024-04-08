// User.java
package NaingLynn.demo.Model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class User {
    private String username;
    private String password;

    public User() {
        fetchUserFromFile("Auth.txt");
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
    public void fetchUserFromFile(String fileName) {
    try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(fileName);
         BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
        String line = reader.readLine();
        if (line != null) {
            String[] parts = line.split(",");
            if (parts.length == 2) {
                this.username = parts[0];
                this.password = parts[1];
            }
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

}

