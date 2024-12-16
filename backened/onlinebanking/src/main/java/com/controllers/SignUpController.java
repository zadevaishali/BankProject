package com.controllers;



import java.sql.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.models.Role;
import com.models.User;
import com.services.SignUpService;

import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class SignUpController {

    @Autowired
    private SignUpService signUpService;

    @PostMapping("/signup")
    public ResponseEntity<User> Signup(@RequestBody User user) {
         
       
        user.setRole(Role.USER); 
       
        User theUser = signUpService.createUser(user);

        return new ResponseEntity<User>(theUser, HttpStatus.OK);
    }


}