package com.example.reddit.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Pattern;

@Component
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final String emailRegex = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
    private final Pattern pattern = Pattern.compile(emailRegex);

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public ResponseEntity<User> getUserById(long Id){
        return new ResponseEntity<>(userRepository.findById(Id).get(), HttpStatus.OK) ;
    }

    public User getUserByEmail(String email){
        return userRepository.findUserByEmail(email).get(0);
    }

    public ResponseEntity<String> addNewUser(User user){
        if(!userRepository.findUserByEmail(user.getEmail()).isEmpty()){
            return new ResponseEntity<>("Email already in use", HttpStatus.NOT_ACCEPTABLE);
        }else if(!pattern.matcher(user.getEmail()).matches()){
            return new ResponseEntity<>("Invalid email", HttpStatus.NOT_ACCEPTABLE);
        }else{
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            User newUser = new User();
            newUser.setName(user.getName());
            newUser.setSurname(user.getSurname());
            newUser.setPassword(encodedPassword);
            newUser.setEmail(user.getEmail());
            userRepository.save(newUser);
            return new ResponseEntity<>("User created", HttpStatus.OK);
        }
    }

    public ResponseEntity<User> loginUser(User user){
        List<User> userList = userRepository.findUserByEmail(user.getEmail());
        if(userList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            User dbUser = userList.get(0);
            if(!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())){
                return new ResponseEntity<User>(HttpStatus.CONFLICT);
            }else{
                return new ResponseEntity<User>(dbUser, HttpStatus.OK);
            }
        }
    }

    public ResponseEntity<String> passwordVerification(String password, Long id){
        User user = userRepository.findById(id).get();
        if(!passwordEncoder.matches(password, user.getPassword())){
            return new ResponseEntity<String>("Incorrect password.", HttpStatus.CONFLICT);
        }else{
            return new ResponseEntity<String>(HttpStatus.OK);
        }
    }

    public ResponseEntity<String> updatePassword(String newPassword, Long id){
        User user = userRepository.findById(id).get();
        String pas = passwordEncoder.encode(newPassword);
        user.setPassword(pas);
        userRepository.save(user);
        return new ResponseEntity<String>("Password changed.", HttpStatus.OK);
    }

    public ResponseEntity<String> userDelete(Long id){
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>("User deleted", HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }
    }

}
