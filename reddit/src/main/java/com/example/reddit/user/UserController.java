package com.example.reddit.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/getAllUsers")
    public @ResponseBody List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @GetMapping("/getUserByEmail")
    public @ResponseBody User getUserByEmail(@RequestBody String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("passwordVerification/{id}")
    public @ResponseBody ResponseEntity<String> passwordVerification(@RequestBody String password, @PathVariable Long id){
        return userService.passwordVerification(password, id);
    }

    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody User user){
        return userService.addNewUser(user);
    }

    @PostMapping("/auth")
    public @ResponseBody ResponseEntity<User> loginUser(@RequestBody User user){
        return userService.loginUser(user);
    }

    @PatchMapping("/updatePassword/{id}/{newPassword}")
    public ResponseEntity<String> updatePassword(@PathVariable String newPassword, @PathVariable Long id){
        return userService.updatePassword(newPassword, id);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        return userService.userDelete(id);
    }

}
